import type { PluginOption } from "../types.js";
import fs from "node:fs";
import { SKYWALK_ATTR_PREFIX, SKYWALK_PREFIX } from "../../../brand/data.js";
import { kebab, parseComponentPath, title } from "../../../utils/helpers.js";
import ts from "typescript";
import { getExample, type Example } from "./example.js";
import path from "node:path";

export interface SkywalkCustomElementPluginProps {
  cwd: string;
  svelteOnly?: string[];
  includeStoryStyles?: boolean;
  execute: boolean;
}

export type TypeCategory = "unknown" | "callback" | "snippet" | "object" | "array" | "string" | "number" | "boolean";
function getTypeCategory(type: ts.TypeNode | undefined): TypeCategory {
  if (!type) return "unknown";

  if (ts.isFunctionTypeNode(type)) {
    return "callback";
  }

  if (ts.isTypeReferenceNode(type) && /Snippet$/.test(type.typeName.getText())) {
    return "snippet";
  }

  if (ts.isArrayTypeNode(type)) {
    return "array";
  }

  // `(typeof VALUES)[number]`, a union over a const array of strings, e.g. HamburgerBase's `type`.
  if (ts.isIndexedAccessTypeNode(type) && type.indexType.getText() === "number") {
    return "string";
  }

  // `keyof X`, a union of X's keys and so a string, e.g. SvelteSpinner's `type`. Typed Object the
  // attribute path would JSON.parse the name and throw.
  if (ts.isTypeOperatorNode(type) && type.operator === ts.SyntaxKind.KeyOfKeyword) {
    return "string";
  }

  if (ts.isTypeReferenceNode(type) && type.typeName.getText() === "Array") {
    return "array";
  }

  if (ts.isUnionTypeNode(type)) {
    const members = type.types.filter((member) => member.kind !== ts.SyntaxKind.UndefinedKeyword);
    const categories = new Set(members.map(getTypeCategory));
    if (categories.size === 1) return [...categories][0];

    return categories.has("string") ? "string" : "unknown";
  }

  if (ts.isLiteralTypeNode(type)) {
    const { literal } = type;
    if (ts.isStringLiteral(literal)) return "string";
    if (ts.isNumericLiteral(literal)) return "number";
    if (literal.kind === ts.SyntaxKind.TrueKeyword || literal.kind === ts.SyntaxKind.FalseKeyword) return "boolean";
  }

  switch (type.kind) {
    case ts.SyntaxKind.StringKeyword:
      return "string";

    case ts.SyntaxKind.NumberKeyword:
      return "number";

    case ts.SyntaxKind.BooleanKeyword:
      return "boolean";

    case ts.SyntaxKind.TypeLiteral:
      return "object";
  }

  if (ts.isTypeReferenceNode(type)) {
    return "object";
  }

  return "unknown";
}

interface PropsSource {
  source: string;
  file?: string;
  seen?: Set<string>;
}

export function getPropsSource({ source, file, seen = new Set<string>() }: PropsSource): string {
  const instanceScript = source.match(/<script(?![^>]*\bmodule\b)[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? source;

  if (/\binterface\s+Props\b/.test(instanceScript) || !file) return instanceScript;

  for (const [, relative] of instanceScript.matchAll(/import[^"']*\bProps\b[^"']*from\s+"(\.[^"]*\.svelte)"/g)) {
    const imported = path.resolve(path.dirname(file), relative);
    if (seen.has(imported) || !fs.existsSync(imported)) continue;
    seen.add(imported);

    return getPropsSource({ source: fs.readFileSync(imported, "utf-8"), file: imported, seen });
  }

  return instanceScript;
}

export function getTypeMap(source: string, aliasSource = source): Map<string, TypeCategory> {
  const parsed = ts.createSourceFile("example.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const typeMap = new Map<string, TypeCategory>();

  // A prop can name a local alias, e.g. HamburgerBase's `type?: HamburgerType`, which is declared in
  // the module script rather than beside the interface.
  const aliases = new Map<string, ts.TypeNode>();
  const aliasFile = ts.createSourceFile("aliases.ts", aliasSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  for (const statement of aliasFile.statements) {
    if (ts.isTypeAliasDeclaration(statement)) aliases.set(statement.name.text, statement.type);
  }

  const categoryOf = (type: ts.TypeNode | undefined): TypeCategory => {
    const category = getTypeCategory(type);
    if (category !== "object" || !type || !ts.isTypeReferenceNode(type)) return category;

    const alias = aliases.get(type.typeName.getText());
    return alias ? getTypeCategory(alias) : category;
  };

  for (const statement of parsed.statements) {
    if (ts.isInterfaceDeclaration(statement) && statement.name.text === "Props") {
      for (const member of statement.members) {
        if (ts.isPropertySignature(member)) {
          typeMap.set(member.name.getText(), categoryOf(member.type));
        }
      }
    }
  }

  return typeMap;
}

function getCssModuleNames(cwd: string): string[] {
  const root = path.join(cwd, "src/lib/css-modules");
  if (!fs.existsSync(root)) return [];

  const walk = (dir: string): string[] =>
    fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((entry) => {
      const name = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(name);
      return entry.name.endsWith(".module.css") ? [name.replace(/\.module\.css$/, "")] : [];
    });

  return walk(".").map((name) => name.replace(/^\.\//, ""));
}

// A child component renders into the same shadow root, but its CSS is extracted to the document
// like any other component's, so its styles and css-modules are collected here too.
function collectCss(
  file: string,
  code: string,
  cssModuleNames: string[],
  seen = new Set<string>()
): { styles: string[]; modules: string[] } {
  if (seen.has(file)) return { styles: [], modules: [] };
  seen.add(file);

  const own = code.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1]?.trim();
  const styles = own ? [own] : [];
  const modules = cssModuleNames.filter((name) => code.includes(`css-modules/${name}.module.css`));

  for (const [, relative] of code.matchAll(/from\s+"(\.[^"]*\.svelte)"/g)) {
    const child = path.resolve(path.dirname(file), relative);
    if (!fs.existsSync(child)) continue;

    const nested = collectCss(child, fs.readFileSync(child, "utf-8"), cssModuleNames, seen);
    styles.push(...nested.styles);
    modules.push(...nested.modules);
  }

  return { styles, modules: [...new Set(modules)] };
}

// `position: fixed` resolves against the viewport only while no ancestor forms a containing block,
// so these hosts stay out of the box tree. Every other host is a plain block, which a parent can
// give a size or padding — `display: contents` discards both.
const transparentHosts = ["LightboxOverlay", "CookieBanner", "LanguageHeader", "BackToTop1", "BackToTop2", "Modal"];

export const customElementsPluginOptions = ({
  svelteOnly = ["LucideIcon"],
  includeStoryStyles = false,
  cwd
}: SkywalkCustomElementPluginProps): Partial<PluginOption> => {
  const prefix = SKYWALK_PREFIX;
  const attrPrefix = SKYWALK_ATTR_PREFIX;
  const cssModuleNames = getCssModuleNames(cwd);
  const examples = new Map<string, Map<string, Example>>();
  const exampleDirs = new Map<string, string>();

  const isCallback = (propName: string, propType: TypeCategory) =>
    propType === "callback" || /^on[A-Z]?/.test(propName);

  const customElementPropName = (propName: string, propType: TypeCategory) =>
    isCallback(propName, propType) && /^on/.test(propName) ? attrPrefix + title(propName) : propName;

  const getCustomElementConfig = (propName: string, propType: TypeCategory, isBindable: boolean) => {
    const isObject = ["unknown", "object", "callback", "snippet"].includes(propType);

    const type = `type: "${isObject ? "Object" : title(propType)}"`;
    const attr = !isCallback(propName, propType) ? `attribute: "${attrPrefix}-${kebab(propName)}"` : null;
    const reflect = isBindable ? `reflect: true` : null;

    return `${customElementPropName(propName, propType)}: { ${[type, attr, reflect].filter(Boolean).join(", ")} }`;
  };

  return {
    buildStart() {
      const components = path.join(cwd, "src/lib/components");
      if (!fs.existsSync(components)) return;

      const files = fs
        .readdirSync(components, { recursive: true, encoding: "utf-8" })
        .filter((file) => file.endsWith(".svelte") && !file.endsWith(".stories.svelte"))
        .map((file) => path.join(components, file));

      const wrappers = new Map<string, string[]>();

      for (const file of files) {
        const id = file;
        const code = fs.readFileSync(file, "utf-8");

        if (
          !new RegExp(String.raw`^.*src\/lib\/components.*\.svelte$`).test(id) ||
          // A Storybook build pulls the stories into the graph, and they are not components.
          id.endsWith(".stories.svelte") ||
          svelteOnly.some((component) => id.includes(component))
        )
          continue;

        const { componentDir, componentName } = parseComponentPath(id);
        const tag: string = `${prefix}-${kebab(componentName)}`;

        const propsSource: string = getPropsSource({ source: code, file: id });
        const typeMap: Map<string, TypeCategory> = getTypeMap(propsSource, code);

        const props: { customElConfig: string; importArg: string; arg: string }[] = [...typeMap.entries()]
          .filter(([, propType]) => propType !== "snippet")
          .map(([propName, propType]) => {
            const isBindable =
              new RegExp(String.raw`\b${propName}\s*=\s*\$bindable\b`).test(code) &&
              !["unknown", "object", "callback", "snippet"].includes(propType);
            const config = getCustomElementConfig(propName, propType, isBindable);
            const localName = customElementPropName(propName, propType);

            if (isBindable) {
              const fallback = new RegExp(String.raw`\b${propName}\s*=\s*\$bindable\(([^)]*)\)`).exec(code)?.[1] ?? "";

              return {
                customElConfig: config,
                importArg: `${localName} = $bindable(${fallback})`,
                arg: `bind:${propName}={${localName}}`
              };
            }

            return {
              customElConfig: config,
              importArg: localName,
              arg: localName === propName ? `{${propName}}` : `${propName}={${localName}}`
            };
          });

        const hasChildren = typeMap.get("children") === "snippet";

        const { styles: componentStyles, modules: usedCssModules } = collectCss(id, code, cssModuleNames);

        const snippets: string[] = [...typeMap.entries()]
          .filter(([, propType]) => propType === "snippet")
          .map(
            ([propName]) => `{#snippet ${propName}()}
    <slot ${propName === "children" ? "" : `name="${propName}"`}/>
  {/snippet}`
          );

        const content = `<svelte:options
  customElement={{
    tag: "${tag}",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      ${props.map(({ customElConfig }) => customElConfig).join(",\n      ")}
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "${componentDir}/${componentName}", ${includeStoryStyles}${usedCssModules.map((name) => `, "${name}"`).join("")});
        }

        connectedCallback() {
          this.#adopt();
          return (Base.prototype as any).connectedCallback.call(this);
        }

        attributeChangedCallback(...args: any[]) {
          const result = (Base.prototype as any).attributeChangedCallback.apply(this, args);
          if (this.shadowRoot) this.#adopt();
          return result;
        }
      }
  }} />

<script module lang="ts">
  import { shadowSheets } from "../../utils/shadow-styles.js";
</script>

<script lang="ts">
${hasChildren ? "  /* eslint-disable svelte/no-useless-children-snippet */\n" : ""}  import ${componentName} from "../../components/${componentDir}/${componentName}.svelte";

  let { ${props.map(({ importArg }) => importArg).join(", ")} }: any = $props();
</script>

${
  snippets.length
    ? `<${componentName} ${props.map(({ arg }) => arg).join(" ")} >
  ${snippets.join("\n")}
</${componentName}>`
    : `<${componentName} ${props.map(({ arg }) => arg).join(" ")} />`
}


<style>
  :host {
    display: ${transparentHosts.includes(componentName) ? "contents" : "block"};
  }
${
  componentStyles.length
    ? `
  :global {
${componentStyles.join("\n\n")}
  }
`
    : ""
}</style>
      `;

        const customElementsFile = id.replace("/components/", "/custom-elements/");
        fs.mkdirSync(path.dirname(customElementsFile), { recursive: true });
        fs.writeFileSync(customElementsFile, content, "utf-8");
        wrappers.set(componentDir, [...(wrappers.get(componentDir) ?? []), componentName]);

        // Kept per directory so a build that touches only some components leaves the rest in place.
        const directoryExamples = examples.get(componentDir) ?? new Map<string, Example>();
        directoryExamples.set(tag, getExample(tag, typeMap, propsSource, isCallback, customElementPropName));
        examples.set(componentDir, directoryExamples);
        exampleDirs.set(componentDir, path.dirname(customElementsFile));
      }

      for (const [componentDir, directory] of exampleDirs) {
        const directoryExamples = examples.get(componentDir);
        if (!directoryExamples) continue;

        const escape = (value: string) =>
          value.replaceAll("`", "\\`").replaceAll("${", "\\${").replaceAll(prefix, "${prefix}");
        const entries = [...directoryExamples]
          .sort()
          .map(
            ([key, { html, js }]) =>
              `  [\`${escape(key)}\`]: {\n    html: \`\n${escape(html)}\n\`,\n    js: \`\n${escape(js)}\n\`\n  }`
          )
          .join(",\n");

        fs.writeFileSync(
          path.join(directory, "examples.ts"),
          [
            `import type { Example } from "../../server/plugins/custom-elements/example.js";`,
            `import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";`,
            ``,
            `// Generated: placeholder markup and setup for each custom element, keyed by tag.`,
            `export const custom_element_examples: Record<string, Example> = {`,
            entries,
            `};`,
            ``
          ].join("\n"),
          "utf-8"
        );
      }

      // Built from this pass's wrappers, so a wrapper left on disk for a removed component is not exported.
      const customElements = path.join(cwd, "src/lib/custom-elements");
      const directories = [...wrappers.keys()].sort();
      for (const componentDir of directories) {
        const names = wrappers.get(componentDir)!.sort();
        fs.writeFileSync(
          path.join(customElements, componentDir, "index.ts"),
          names.map((name) => `export { default as ${name} } from "./${name}.svelte";`).join("\n") + "\n",
          "utf-8"
        );
      }
      if (directories.length) {
        fs.writeFileSync(
          path.join(customElements, "index.ts"),
          directories.map((componentDir) => `export * from "./${componentDir}/index.js";`).join("\n") + "\n",
          "utf-8"
        );
      }
    }
  };
};
