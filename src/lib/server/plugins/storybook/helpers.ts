import type { PluginOption } from "../types.js";
import path from "node:path";
import fs from "node:fs";

const PLACEHOLDER = '<pre class="snippet-example"></pre>';
const META_URL = "parseComponentPath(import.meta.url";

export const storybookPluginOptions = (): Partial<PluginOption> => {
  return {
    transform(code, id) {
      if (!id.includes(".stories")) return;

      let newCode = code;

      if (code.includes(PLACEHOLDER)) {
        const parsed = path.parse(id);
        const name = parsed.name.replace(".stories", "");
        const category = parsed.dir.split("/components/")[1];

        const src = fs.readFileSync(`src/lib/default-props/${category}.svelte`, "utf8");
        const defaultProps = src.match(new RegExp(String.raw`\n    ${name}: \{[\S\s]*?\n    \}`))?.[0];
        const matches = [...src.matchAll(new RegExp(String.raw`\{#snippet ${name}[\s\S]*?\{\/snippet\}`, "g"))].filter(
          ([match]) => {
            const snippetName = match.match(new RegExp(String.raw`\{#snippet\s+(.*)\b\(`))?.[1];
            return snippetName ? defaultProps?.includes(snippetName) : false;
          }
        );

        if (matches.length > 0) {
          newCode = code
            .replace(
              "</script>",
              `  const storyExamples: string[] = ${JSON.stringify(matches.map(([match]) => match))};\n</script>`
            )
            .replace(
              PLACEHOLDER,
              '<div class="snippet-example-container"><hr><p class="snippet-example-label">Snippet Examples</p>{#each storyExamples as storyExample (storyExample)}<pre class="snippet-example">{storyExample}</pre>{/each}</div>'
            );
        }
      }

      if (code.includes(META_URL)) {
        newCode = newCode.replaceAll(META_URL, `parseComponentPath(${JSON.stringify(id)}`);
      }

      return newCode === code ? undefined : { code: newCode, map: null };
    }
  };
};
