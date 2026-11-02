import fs from "node:fs";
import path from "node:path";
import { uncataloged } from "../../../stories/uncatalogued.js";
import { component_descriptions } from "../../../stories/component-descriptions.js";
import { parseComponentPath } from "../../../utils/helpers.js";
import type { PluginOption } from "../types.js";
import { getPropsSource } from "../custom-elements/helpers.js";
import { getStaticProps } from "../../../default-props/index.js";
import { SKYWALK_PACKAGE } from "../../../brand/data.js";
import { getPkgRoot } from "../utils.js";

export interface SkywalkLabAiProps {
  fileToWrite: string;
  execute: boolean;
}

interface ComponentData {
  componentDir: string;
  storyDescription: string;
  defaultProps: string;
  propsSource: string;
}

const stringifyMap = (map: Map<string, any>) => {
  return JSON.stringify(Object.fromEntries([...map.entries()]), null, 2).replace(/"(?:[^"\\]|\\.)*"/g, (match) => {
    const parsedMatch = JSON.parse(match);
    return parsedMatch.includes("\n")
      ? "`" + parsedMatch.replace(/\\|`|\$\{/g, (newLineMatch: string) => "\\" + newLineMatch) + "`"
      : match;
  });
};

export const labAiPluginOptions = (options: SkywalkLabAiProps): Partial<PluginOption> => {
  return {
    buildStart: async () => {
      const components = path.join(getPkgRoot(SKYWALK_PACKAGE).pkgRoot, "src/lib/components");
      if (!fs.existsSync(components)) return;

      const files = fs
        .readdirSync(components, { recursive: true, encoding: "utf-8" })
        .filter((file) => file.endsWith(".svelte") && !file.endsWith(".stories.svelte"))
        .map((file) => path.join(components, file))
        .sort();

      const componentMap = new Map<string, Record<string, ComponentData>>();
      for (const filePath of files) {
        const { componentDir, componentName } = parseComponentPath(filePath);
        if (!componentMap.has(componentDir)) componentMap.set(componentDir, {});

        if (uncataloged.includes(componentName)) continue;

        const staticProps = getStaticProps(componentDir)?.get(componentName);
        if (!staticProps) continue;
        const propsSource = getPropsSource({
          source: fs.readFileSync(filePath, "utf-8"),
          file: filePath
        });

        const lastImport = [...propsSource.matchAll(/^\s*import\b[^"']*["'][^"']+["'];?/gm)].at(-1);
        const start = lastImport ? lastImport.index + lastImport[0].length : 0;
        const propsCall = /=\s*\$props\(\)/.exec(propsSource);
        const end = propsCall ? propsCall.index + propsCall[0].length : propsSource.length;

        componentMap.get(componentDir)![componentName] = {
          componentDir,
          storyDescription: component_descriptions[componentDir].get(componentName) ?? "",
          defaultProps: JSON.stringify(staticProps.props, null, 2),
          propsSource: propsSource.slice(start, end).trim()
        };
      }

      fs.writeFileSync(options.fileToWrite, `export const componentMap = ${stringifyMap(componentMap)}`);
    }
  };
};
