import type { PluginOption } from "../types.js";
import { labAiPluginOptions, type SkywalkLabAiProps } from "./helpers.js";

export function skywalkLabAiPlugin(options: SkywalkLabAiProps): PluginOption {
  if (!options.execute) return {} as PluginOption;
  const labAiPlugin = labAiPluginOptions(options);

  return {
    name: "vite-plugin-svelte-skywalklab-lab-ai",
    enforce: "pre",
    apply: "build",
    ...labAiPlugin
  };
}
