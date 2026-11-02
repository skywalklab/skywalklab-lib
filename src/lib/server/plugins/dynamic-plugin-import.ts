import path from "node:path";
import { SKYWALK_PACKAGE } from "../../brand/data.js";
import { getPkgRoot } from "./utils.js";
import type { SkywalkPluginsProps } from "./types.js";
import { createJiti } from "jiti";

export async function getSkywalkPlugins({ debug, cwd }: SkywalkPluginsProps) {
  const jiti = debug ? createJiti(cwd) : null;
  const packageFolder = SKYWALK_PACKAGE;
  const libServer = path.join(getPkgRoot(packageFolder).pkgRoot, "src/lib/server");

  const serverPromise = debug
    ? (jiti?.import(path.join(libServer, "index.ts")) as any)
    : import("@skywalklab/lib/server");
  const pluginPromise = debug
    ? (jiti?.import(path.join(libServer, "plugins/index.ts")) as any)
    : import("@skywalklab/lib/server/plugins");
  const [server, plugins] = await Promise.all([serverPromise, pluginPromise]);

  return {
    skywalkConfigPlugin: plugins.skywalkConfigPlugin,
    skywalkCustomElementsPlugin: plugins.skywalkCustomElementsPlugin,
    skywalkLabAiPlugin: plugins.skywalkLabAiPlugin,
    skywalkLucidePlugin: plugins.skywalkLucidePlugin,
    skywalkSeoPlugin: plugins.skywalkSeoPlugin,
    skywalkStorybookPlugin: plugins.skywalkStorybookPlugin,
    skywalkVendorPlugin: plugins.skywalkVendorPlugin,
    skywalkConfigFilesPlugin: plugins.skywalkConfigFilesPlugin,
    skywalkLibWorkspaceAlias: () => server.skywalkLibWorkspaceAlias({ packageFolder })
  };
}
