import type { PluginOption } from "../types.js";
import { storybookPluginOptions } from "./helpers.js";

export function skywalkStorybookPlugin(): PluginOption {
  const storybookPlugin = storybookPluginOptions();

  return {
    name: "vite-plugin-svelte-skywalklab-storybook",
    enforce: "pre",
    ...storybookPlugin
  };
}
