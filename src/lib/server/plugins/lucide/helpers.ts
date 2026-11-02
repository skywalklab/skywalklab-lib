import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { createRequire } from "node:module";
import { rgPath } from "@vscode/ripgrep";
import type { PluginOption } from "../types.js";
import { SKYWALK_PACKAGE } from "../../../brand/data.js";

export interface SkywalkLucidePluginProps {
  cwd: string;
  useVendor?: boolean;
  /** Icon names to bundle that the source scan can't find, e.g. names built at runtime. */
  whiteList?: string[];
  includeAll?: boolean;
}

const require = createRequire(import.meta.url);
const lucideIconsDir = join(dirname(require.resolve("@lucide/svelte")), "icons");

const getAllLucideIcons = (): Set<string> => {
  const filenames = readdirSync(lucideIconsDir);

  const lucideIcons: Set<string> = filenames.reduce((iconSet, filename) => {
    if (/\.js$/.test(filename) && !/index\.js$/.test(filename)) {
      iconSet.add(filename.replace(/\.js$/, ""));
    }

    return iconSet;
  }, new Set<string>());

  return lucideIcons;
};

const getLucideIconWhiteList = (): Set<string> => {
  const result = spawnSync(
    rgPath,
    [
      String.raw`lucide_icon\s*(?::\s*\w+\s*)?[:=?]*\s*["'](.*?)["']`,
      "--no-filename",
      "--no-line-number",
      "-r",
      "$1",
      "-o"
    ],
    {
      stdio: ["ignore", "pipe", "pipe"],
      encoding: "utf8"
    }
  );

  const lines = (result.stdout ?? "")
    .split("\n")
    .filter((line) => line.length > 0 && !/\./.test(line))
    .filter((icon) => existsSync(`${lucideIconsDir}/${icon}.js`))
    .sort();

  return new Set(lines);
};

const checkLucideWhiteList = (id: string, importer: string, iconWhiteList: RegExp[]): string | undefined => {
  const isLucide = /@lucide/.test(id);
  if (isLucide) {
    const isIconComponent = /LucideIcon\.svelte/.test(importer);
    const isOnWhiteList = iconWhiteList.some((icon) => icon.test(id));

    if (isIconComponent && !isOnWhiteList) {
      return "\0empty";
    }
  }
};

export const lucidePluginOptions = ({
  cwd,
  useVendor,
  whiteList,
  includeAll = false
}: SkywalkLucidePluginProps): Partial<PluginOption> => {
  const packageFolder = SKYWALK_PACKAGE;
  let isBuild: boolean = false;

  return {
    config(config, { command }) {
      isBuild = command === "build";
      return {
        resolve: {
          alias: {
            $skywalk_lib_node_modules: resolve(cwd, `node_modules/${useVendor ? "" : `${packageFolder}/node_modules`}`)
          }
        }
      };
    },
    transform(code, id) {
      if (!id.includes("icons/LucideIcon.svelte") || (!isBuild && !process.env.VITEST)) return;

      const iconNamesSet: Set<string> = includeAll
        ? new Set([...getAllLucideIcons()])
        : new Set([...getLucideIconWhiteList(), ...(whiteList ?? [])]);

      const icons = [...iconNamesSet].filter((icon) => {
        if (existsSync(`${lucideIconsDir}/${icon}.js`)) return true;
        console.warn(`[lucide] no such icon: ${icon}`);
        return false;
      });

      const imports = icons
        .map(
          (icon, i) =>
            `import * as __lucide_${i} from '$skywalk_lib_node_modules/@lucide/svelte/dist/icons/${icon}.js';`
        )
        .join("\n");
      const map = icons.map((icon, i) => `'${icon}': __lucide_${i}`).join(", ");

      const newCode = code
        .replace(
          "const icons: Record<string, { default: Component }> = {};",
          `${imports}\nconst icons: Record<string, { default: Component }> = { ${map} };`
        )
        .replace(
          /import\(`\$skywalk_lib_node_modules\/@lucide\/svelte\/dist\/icons\/\$\{lucide_icon\}\.js`\)/,
          "Promise.reject('Icon not found: ' + lucide_icon)"
        );

      return { code: newCode, map: null };
    }
  };
};
