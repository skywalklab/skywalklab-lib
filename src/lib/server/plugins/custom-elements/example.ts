import { SKYWALK_ATTR_PREFIX } from "../../../brand/data.js";
import { kebab } from "../../../utils/helpers.js";
import type { TypeCategory } from "./helpers.js";

const attrPrefix = SKYWALK_ATTR_PREFIX;

/** Names the type rather than giving a value, so a caller can substitute a real one. */
function placeholder(propType: TypeCategory): string {
  switch (propType) {
    case "array":
      return "[]";
    case "object":
    case "unknown":
      return "{}";
    case "boolean":
      return "false";
    case "number":
      return "0";
    default:
      return propType;
  }
}

export interface Example {
  html: string;
  unfilled?: (string | undefined)[];
  js: string;
}

export function getExample(
  tag: string,
  typeMap: Map<string, TypeCategory>,
  propsSource: string,
  isCallback: (propName: string, propType: TypeCategory) => boolean,
  customElementPropName: (propName: string, propType: TypeCategory) => string
): Example {
  const takesArgs = (propName: string) =>
    !new RegExp(String.raw`\b${propName}\??\s*:\s*Snippet\s*[;,}]`).test(propsSource);

  const entries = [...typeMap.entries()];

  const attributes = entries
    .filter(([propName, propType]) => propType !== "snippet" && !isCallback(propName, propType))
    .map(([propName, propType]) => {
      // JSON needs the outer quotes to be single, since the value itself carries double ones.
      const quote = ["object", "array", "unknown"].includes(propType) ? "'" : '"';
      return `\n  ${attrPrefix}-${kebab(propName)}=${quote}${placeholder(propType)}${quote}`;
    })
    .join("");

  const slots = entries
    .filter(([, propType]) => propType === "snippet")
    // `data-*` maps a DOM property to a key from the snippet's argument, so a snippet that takes one
    // shows the mapping as a hint; `children` takes the default slot.
    .map(([propName]) => {
      if (propName === "children") return `\n  <div></div>`;
      const hint = takesArgs(propName) ? ` data-text-content="arg"` : "";
      return `\n  <div slot="${propName}"${hint}></div>`;
    })
    .join("");

  const callbacks = entries
    .filter(([propName, propType]) => isCallback(propName, propType))
    .map(([propName, propType]) => {
      const callbackType = propsSource
        .match(new RegExp(String.raw`\*\/\s+${propName}\??:([\s\S]*?)\/\*\*`))?.[1]
        ?.trim();

      return `document.querySelector("${tag}").${customElementPropName(propName, propType)} = ${callbackType ?? "() => {}"}`;
    });

  const html = slots ? `<${tag}${attributes}>${slots}\n</${tag}>` : `<${tag}${attributes}></${tag}>`;

  const js = [
    `import "@skywalklab/lib/custom-elements/${tag}.js";`,
    ...(callbacks.length ? ["", ...callbacks] : [])
  ].join("\n");

  return { html, js };
}
