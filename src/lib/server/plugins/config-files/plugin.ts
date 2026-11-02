import type { PluginOption } from "../types.js";
import { formatAfterBuild, resolveWorkspaceConfigs, type WorkspaceConfig } from "./workspace-configs.js";

export interface SkywalkConfigFilesPluginProps {
  configFiles: Record<WorkspaceConfig, string>;
  baseFiles: Record<WorkspaceConfig, string>;
  resolveConfigs?: boolean;
  execute: boolean;
}

export async function skywalkConfigFilesPlugin({
  configFiles,
  baseFiles,
  resolveConfigs = false,
  execute
}: SkywalkConfigFilesPluginProps): Promise<PluginOption> {
  if (!execute) return {} as PluginOption;

  return {
    name: "vite-plugin-svelte-skywalk-monorepo-config-files",
    apply: "build",
    async buildEnd() {
      await resolveWorkspaceConfigs({
        configFiles,
        baseFiles,
        configs: resolveConfigs ? ["tsconfig", "prettier"] : []
      });
    },
    async closeBundle() {
      formatAfterBuild();
    }
  };
}
