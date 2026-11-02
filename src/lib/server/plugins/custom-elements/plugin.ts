import type { PluginOption } from "../types.js";
import { customElementsPluginOptions, type SkywalkCustomElementPluginProps } from "./helpers.js";

export function skywalkCustomElementsPlugin(options: SkywalkCustomElementPluginProps): PluginOption {
  if (!options.execute) return {} as PluginOption;
  const customElementsPlugin = customElementsPluginOptions(options);

  return {
    name: "vite-plugin-svelte-skywalklab-custom-elements",
    enforce: "pre",
    apply: "build",
    ...customElementsPlugin
  };
}
