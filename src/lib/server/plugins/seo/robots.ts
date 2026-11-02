import path from "node:path";
import fs from "node:fs/promises";
import { getRouteSlug, transformRoute } from "../utils.js";

export interface RobotsContext {
  siteUrl: string;
  routes: { include?: string[]; allowed?: string[]; disallowed?: string[]; exclude?: string[] };
}

function addCommand(route: string, command: string): string {
  const regex = /\[.*\]\/$/;
  const routeSlug = route.match(regex) ? route.replace(regex, "*") : route;
  return `${command}: /${routeSlug.replace(/\/$/, "").replace(/^\//, "")}\n`;
}

function addRobotContent(context: RobotsContext & { route: string }): string[] {
  let command = undefined;
  const route = transformRoute(context.route);

  if (!command && context.routes.disallowed?.find((pattern) => pattern === "")) {
    return ["Disallow", ""];
  }
  if (!command && context.routes.disallowed?.find((pattern) => route.startsWith(pattern))) {
    command = "Disallow";
  }
  if (!command && context.routes.allowed?.find((pattern) => route.startsWith(pattern))) {
    command = "Allow";
  }

  if (command !== undefined) {
    return addCommand(getRouteSlug(route), command).split(":");
  }

  return [];
}

export function transformRobotsData(context: RobotsContext & { route: string }, robotsData: Map<string, string>): void {
  const robotContent = addRobotContent(context);

  if (robotContent[0]) {
    robotsData.set(robotContent[1], robotContent[0]);
  }
}

async function buildRobotsTxt(context: RobotsContext, robotsData: Map<string, string>): Promise<string> {
  let robotsContent = "User-agent: *\n";

  robotsData.entries().forEach(([routeSlug, command]) => (robotsContent += `${command.trim()}: ${routeSlug.trim()}\n`));
  robotsContent += "\n";
  robotsContent += `Sitemap: ${context.siteUrl}/sitemap.xml\n`;

  return robotsContent;
}

export async function writeRobotsTxt(
  vendorFolder: string,
  context: RobotsContext,
  robotsData: Map<string, string>,
  directInsert: boolean
): Promise<void> {
  const content = await buildRobotsTxt(context, robotsData);
  const outputPath = path.resolve(process.cwd(), `${directInsert ? "static" : vendorFolder}/robots.txt`);
  await fs.writeFile(outputPath, content, "utf-8");
}
