import fs from "node:fs/promises";
import path from "node:path";
import { getRouteSlug, pathExists, transformRoute } from "../utils.js";
import { execFileSync } from "node:child_process";

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

interface SiteMapContextOp {
  slug: string;
  changeFreq?: ChangeFreq;
  lastMod?: string;
}

export interface SiteMapPage {
  slug: string;
  changeFreq: ChangeFreq;
  lastMod: string;
}

export interface SiteMapContext {
  routes: {
    include?: SiteMapContextOp[];
    allowed?: SiteMapContextOp[];
    disallowed?: SiteMapContextOp[];
  };
  dynamicRoute?: Map<string, { slug: string; changeFreq?: ChangeFreq; lastMod?: string }[]>;
}

function getAllowedRoute(
  context: SiteMapContext & { route: string },
  transformedRoute: string
): SiteMapContextOp | undefined {
  const includedRoute = context.routes.include?.find((pattern) => transformedRoute === pattern.slug);
  if (includedRoute) {
    return includedRoute;
  }

  const allowedRoute = context.routes.allowed?.find((pattern) => transformedRoute.startsWith(pattern.slug));
  const disallowedRoute = context.routes.disallowed?.find((pattern) => transformedRoute.startsWith(pattern.slug));

  return disallowedRoute ? undefined : allowedRoute;
}

async function getGitLastModified(filePath: string): Promise<string> {
  try {
    const timestamp = execFileSync("git", ["log", "-1", "--format=%cI", "--", path.basename(filePath)], {
      encoding: "utf-8",
      cwd: path.dirname(filePath),
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
    if (timestamp) return timestamp;
  } catch {
    // No git or no repo: fall back to mtime
  }

  return new Date((await fs.stat(filePath)).mtime).toISOString();
}

export async function transformSitemapData(
  context: SiteMapContext & { route: string },
  sitemapData: Map<string, SiteMapPage>
): Promise<void> {
  const transformedRoute = transformRoute(context.route);
  const slug = getRouteSlug(transformedRoute);
  const routeChangFreq = "weekly";
  const routeLastMod = await getGitLastModified(context.route);

  if (context.dynamicRoute?.has(slug)) {
    for (const { slug: dynamicSlug, changeFreq, lastMod } of context.dynamicRoute?.get(slug) ?? []) {
      sitemapData.set(dynamicSlug, {
        slug: dynamicSlug,
        changeFreq: changeFreq || routeChangFreq,
        lastMod: lastMod ?? routeLastMod
      });
    }
  }

  const allowedRoute = getAllowedRoute(context, transformedRoute);
  if (!allowedRoute) return;

  const sitemapPage: SiteMapPage = {
    slug,
    changeFreq: allowedRoute.changeFreq || routeChangFreq,
    lastMod: allowedRoute.lastMod || routeLastMod
  };

  sitemapData.set(slug, sitemapPage);
}

export async function createStaticPageFile(vendorFolder: string, directInsert: boolean, fileContents: object = {}) {
  await fs.writeFile(
    path.resolve(process.cwd(), `${directInsert ? "src/lib" : vendorFolder}/sitemap-static-routes.json`),
    JSON.stringify(fileContents, null, 2)
  );
}

export async function writeStaticPageSitemap(vendorFolder: string, directInsert: boolean, sitemapData: SiteMapPage[]) {
  const fileContents = sitemapData.sort((a, b) => a.slug.localeCompare(b.slug));

  await createStaticPageFile(vendorFolder, directInsert, fileContents);
}

export async function removeStaticPageSitemap(vendorFolder: string, directInsert: boolean) {
  try {
    await fs.unlink(
      path.resolve(process.cwd(), `${directInsert ? "src/lib" : vendorFolder}/sitemap-static-routes.json`)
    );
  } catch (err) {
    console.log(err);
  }
}

function sortSitemap(a: SiteMapPage & { priority?: string }, b: SiteMapPage & { priority?: string }) {
  const priorityA = +(a.priority ?? 0);
  const priorityB = +(b.priority ?? 0);

  if (priorityA === priorityB) {
    const timeA = new Date(a.lastMod).getTime();
    const timeB = new Date(b.lastMod).getTime();

    return timeA === timeB ? a.slug.localeCompare(b.slug) : timeB - timeA;
  }

  return priorityB - priorityA;
}

const createSitemap = (site: string, pages: SiteMapPage[], getPriorityCb: (route: string) => string) => {
  return `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
  ${pages
    .map((page) => {
      const slug = page.slug.replace(/\/$/, "");
      const priority = getPriorityCb(slug);
      return {
        ...page,
        slug,
        priority,
        html: `
          <url>
            <loc>${site}/${slug}</loc>
            <changefreq>${page.changeFreq}</changefreq>
            <lastmod>${page.lastMod}</lastmod>
            <priority>${priority}</priority>
          </url>
        `
      };
    })
    .sort((a, b) => {
      return sortSitemap(a, b);
    })
    .map(({ html }) => html)
    .join("")}
    </urlset>`;
};

export async function handleSitemapGET(sitemapData: {
  vendorFolder: string;
  site: string;
  pages?: SiteMapPage[];
  getPriorityCb: (route: string) => string;
}) {
  const { vendorFolder, site, pages, getPriorityCb } = sitemapData;
  let sitemapJSON = [];
  const resolvedSitemapPath = path.resolve(process.cwd(), `${vendorFolder}/sitemap-static-routes.json`);
  if (await pathExists(resolvedSitemapPath)) {
    sitemapJSON = JSON.parse(await fs.readFile(resolvedSitemapPath, "utf-8"));
  }
  const body = createSitemap(site, [...sitemapJSON, ...(pages ?? [])], getPriorityCb);
  const response = new Response(body);
  response.headers.set("Cache-Control", "max-age=0, s-maxage=3600");
  response.headers.set("Content-Type", "application/xml");
  return response;
}

export async function handleSitemapStaticGET(sitemapData: {
  site: string;
  pages?: SiteMapPage[];
  sitemapJSON: any[];
  getPriorityCb: (route: string) => string;
}) {
  const { site, pages, sitemapJSON, getPriorityCb } = sitemapData;

  const body = createSitemap(site, [...sitemapJSON, ...(pages ?? [])], getPriorityCb);
  const response = new Response(body);
  response.headers.set("Cache-Control", "max-age=0, s-maxage=3600");
  response.headers.set("Content-Type", "application/xml");
  return response;
}
