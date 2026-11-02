import path from "node:path";
import fs from "fs";
import { getPkgRoot } from "../utils.js";
import type { PluginOption, SkywalkVitePluginConfig } from "../types.js";
import { SKYWALK_ALIAS, SKYWALK_DIR, SKYWALK_PACKAGE } from "../../../brand/data.js";

interface SkywalkConfigPluginProps {
  cwd: string;
  lightningcss?: boolean;
  company?: string;
  noCssHash?: boolean;
  command?: "serve" | "build";
}

interface SkywalkConfigPaths {
  dirFolder: string;
  dist: string;
  libAlias: string;
  systemLibPath: string;
}

function skywalklabViteUserConfig(
  { command, lightningcss, company, noCssHash, cwd }: SkywalkConfigPluginProps,
  { dirFolder, dist, libAlias, systemLibPath }: SkywalkConfigPaths
): SkywalkVitePluginConfig & {
  checkDependencies: (arg: string[]) => void;
} {
  return {
    server: {
      fs:
        command === "serve"
          ? {
              allow: [path.resolve(process.cwd(), "../", `${dirFolder}/dist`), dist]
            }
          : undefined
    },
    css: {
      transformer: lightningcss ? "lightningcss" : "postcss",
      modules: {
        ...(company
          ? { generateScopedName: `${company}_[local]${noCssHash ? "" : "__[hash:base64:5]"}` }
          : { generateScopedName: `[local]${noCssHash ? "" : "__[hash:base64:5]"}` })
      },
      ...(lightningcss
        ? {
            lightningcss: {
              cssModules: { pattern: company ? `${company}_[local]` : `[local]${noCssHash ? "" : "_[hash]"}` }
            }
          }
        : {})
    },
    ...(lightningcss ? { build: { cssMinify: "lightningcss" } } : {}),
    resolve: {
      alias: {
        [libAlias]: systemLibPath
      }
    },
    checkDependencies(dependencies) {
      const missing = [];

      for (const dep of dependencies) {
        if (!fs.existsSync(path.resolve(cwd, "node_modules", dep))) missing.push(dep);
      }

      if (missing.length) {
        throw new Error(
          `[skywalklab-plugin] Missing dependencies:\n` +
            missing.map((d) => `  • ${d}`).join("\n") +
            `Dependencies to install: ${missing.join(" ")}`
        );
      }
    }
  };
}

export function skywalkConfigPlugin(options: SkywalkConfigPluginProps): PluginOption {
  const peerDependencies = ["lightningcss"];

  const dirFolder = SKYWALK_DIR;
  const packageFolder = SKYWALK_PACKAGE;
  const libAlias = SKYWALK_ALIAS;
  const pkgRoot = getPkgRoot(packageFolder).pkgRoot;
  const dist = path.resolve(pkgRoot, "dist");
  const systemLibPath =
    new RegExp(`${dirFolder}$`).test(process.cwd()) || !fs.existsSync(dist) ? path.resolve(pkgRoot, "src/lib") : dist;

  return {
    name: "vite-plugin-svelte-skywalklab-config",
    enforce: "pre",
    config(config, { command }) {
      const skywalklabUserConfig = skywalklabViteUserConfig(
        {
          ...options,
          command
        },
        { dirFolder, dist, libAlias, systemLibPath }
      );
      skywalklabUserConfig.checkDependencies(peerDependencies.filter((dep) => options[dep as keyof typeof options]));
      return {
        server: skywalklabUserConfig.server,
        css: skywalklabUserConfig.css,
        resolve: skywalklabUserConfig.resolve
      };
    },
    configResolved(resolvedConfig) {
      const warningMsg = "[vite:css][lightningcss] 'global' is not recognized as a valid pseudo-class.";
      const originalWarn = console.warn;
      console.warn = (msg, ...args): void => {
        if (msg.includes(warningMsg)) return;
        originalWarn(msg, ...args);
      };
    },
    configureServer(server) {
      server.middlewares.use((req: { url: string }, _res: any, next: () => void) => {
        if (req.url?.startsWith(libAlias)) {
          req.url = `/@fs${systemLibPath}/${req.url.slice(libAlias.length + 1)}`;
        }
        next();
      });
    }
  };
}
