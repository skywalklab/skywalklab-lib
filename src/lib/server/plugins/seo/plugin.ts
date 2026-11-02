import path from "node:path";
import fsPromises from "node:fs/promises";
import { pathExists } from "../utils.js";
import {
  createStaticPageFile,
  removeStaticPageSitemap,
  transformSitemapData,
  writeStaticPageSitemap,
  type SiteMapContext,
  type SiteMapPage
} from "./sitemap.js";
import { transformRobotsData, writeRobotsTxt, type RobotsContext } from "./robots.js";
import type { PluginOption } from "../types.js";

declare global {
  var sitemapData: Map<string, SiteMapPage>;
  var robotsData: Map<string, string>;
}

globalThis.sitemapData ??= new Map();
globalThis.robotsData ??= new Map();

interface SkywalkSeoPluginProps {
  folder: string;
  sitemap: SiteMapContext;
  robots: RobotsContext;
  directInsert: boolean;
  execute: boolean;
}

export function skywalkSeoPlugin({
  folder,
  sitemap,
  robots,
  directInsert,
  execute
}: SkywalkSeoPluginProps): PluginOption {
  if (!execute) return {} as PluginOption;

  robots.routes.include?.forEach((route) => robotsData.set(route, "Allow"));
  robots.routes.exclude?.forEach((route) => robotsData.set(route, "Disallow"));

  return {
    name: "vite-plugin-svelte-skywalk-seo",
    apply: "build",
    enforce: "pre",
    async buildStart() {
      const resolvedFolderPath = path.resolve(process.cwd(), folder);
      if (!(await pathExists(resolvedFolderPath)) && !directInsert) {
        await fsPromises.mkdir(resolvedFolderPath, { recursive: true });
      }
      await createStaticPageFile(folder, directInsert);
    },
    async transform(src, id, options) {
      if (id.includes("?") || !/^.*src\/routes/.test(id)) return;

      transformRobotsData({ route: id, ...robots }, robotsData);
      await transformSitemapData({ route: id, ...sitemap }, sitemapData);
    },
    async buildEnd() {
      await Promise.all([
        sitemapData.size > 0
          ? writeStaticPageSitemap(folder, directInsert, [...sitemapData.values()])
          : removeStaticPageSitemap(folder, directInsert),
        robotsData.size > 0 ? writeRobotsTxt(folder, robots, robotsData, directInsert) : Promise.resolve()
      ]);
    }
  };
}
