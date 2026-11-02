import { BRAND_LAB, SKYWALK_VENDOR } from "$lib/brand/data.js";
import { handleSitemapGET, type SiteMapPage } from "$lib/server/plugins/seo/sitemap.js";

function getPriorityCb(route: string) {
  switch (route) {
    case "":
      return "1";
    default:
      return ".8";
  }
}

export async function GET() {
  if (!import.meta.env.SSR) return new Response("");
  const site = BRAND_LAB.site;
  const pages: SiteMapPage[] = [];

  return await handleSitemapGET({ vendorFolder: SKYWALK_VENDOR, site, pages, getPriorityCb });
}
