import { findUp } from "find-up";
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

export function getRouteSlug(route: string): string {
  return route.replace(/(\(|\[])[^)]*(\)|\])/g, "").replace(/^\/*/, "");
}

export function transformRoute(route: string) {
  return route
    .replace(/^.*src\/routes/, "")
    .replace(/\+(page|page.server|layout|layout.server|server)\.(svelte|ts|js)$/, "");
}

export async function pathExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

export const getPkgRoot = (packageFolder: string): { pkgJsonPath: string; pkgRoot: string } => {
  const require = createRequire(import.meta.url);
  const pkgJsonPath = require.resolve(`${packageFolder}/package.json`);
  const pkgRoot = path.dirname(pkgJsonPath);

  return {
    pkgJsonPath,
    pkgRoot
  };
};

export const getMonorepoRoot = async (): Promise<string | null> => {
  const pnpmWorkspaceFilePath = await findUp("pnpm-workspace.yaml", { type: "file" });

  return pnpmWorkspaceFilePath ? path.dirname(pnpmWorkspaceFilePath) : null;
};
