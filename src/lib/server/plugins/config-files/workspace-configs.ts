import fsPromises from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import { exec } from "node:child_process";
import { getMonorepoRoot } from "../utils.js";

export type WorkspaceConfig = "tsconfig" | "prettier";

interface ResolveWorkspaceConfigArgs {
  configFiles: Record<WorkspaceConfig, string>;
  baseFiles: Record<WorkspaceConfig, string>;
  configs: WorkspaceConfig[];
}

export async function resolveWorkspaceConfigs({ configFiles, baseFiles, configs }: ResolveWorkspaceConfigArgs) {
  const monoRepoRoot = await getMonorepoRoot();
  if (!monoRepoRoot) return;

  for (const config of configs) {
    if (config === "tsconfig") {
      const baseFileName = baseFiles[config];
      const baseFile = path.join(monoRepoRoot, baseFileName);
      const baseCode = await fsPromises.readFile(baseFile, "utf-8");
      const { config: baseConfig } = ts.parseConfigFileTextToJson(baseFile, baseCode);

      const configFile = path.resolve(process.cwd(), configFiles[config]);
      const configCode = await fsPromises.readFile(configFile, "utf-8");
      const { config: tsConfig } = ts.parseConfigFileTextToJson(configFile, configCode);

      const extendsList: string[] = [tsConfig.extends ?? []].flat();
      const includedTsConfig = extendsList.find((extend) => path.basename(extend) === baseFileName);
      if (includedTsConfig) {
        const { extends: _extends, ...ownConfig } = tsConfig;
        const remaining = extendsList.filter((extend) => extend !== includedTsConfig);
        const resolvedCode = {
          ...(remaining.length ? { extends: remaining.length === 1 ? remaining[0] : remaining } : {}),
          ...baseConfig,
          ...ownConfig,
          compilerOptions: { ...baseConfig.compilerOptions, ...ownConfig.compilerOptions }
        };

        await fsPromises.writeFile(configFile, JSON.stringify(resolvedCode, null, 2));
      }
    } else if (config === "prettier") {
      const baseFileName = baseFiles[config];
      const baseFile = path.join(monoRepoRoot, baseFileName);
      const baseCode = await fsPromises.readFile(baseFile, "utf-8");
      const baseConfig = JSON.parse(baseCode);

      const configFile = path.resolve(process.cwd(), configFiles[config]);
      const configCode = await fsPromises.readFile(configFile, "utf-8");

      const extendedPrettierConfig = configCode.match(
        new RegExp(String.raw`import\s+([\w$-]+).*(${baseFileName})['"\`][^\n]*\n*`)
      );
      if (extendedPrettierConfig?.[1]) {
        const resolvedCode = configCode.replace(extendedPrettierConfig[0], "").replace(
          `...${extendedPrettierConfig[1]}`,
          Object.entries(baseConfig)
            .map(([key, val]) => key + ": " + JSON.stringify(val))
            .join(",\n")
        );

        await fsPromises.writeFile(configFile, resolvedCode);
      }
    }
  }
}

export function formatAfterBuild() {
  const project = process.env.npm_package_name;
  exec(`pnpm -F ${project} format`, (_, output, err) => {
    if (err) console.log(err);
  });
}
