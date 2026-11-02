import type { PluginOption } from "../types.js";
import { lucidePluginOptions, type SkywalkLucidePluginProps } from "./helpers.js";

export function skywalkLucidePlugin(options: SkywalkLucidePluginProps): PluginOption {
  const lucidePlugin = lucidePluginOptions(options);

  return {
    name: "vite-plugin-svelte-skywalklab-lucide",
    enforce: "pre",
    // apply: "build",
    ...lucidePlugin
  };
}
