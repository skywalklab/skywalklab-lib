import { SKYWALK_ATTR_PREFIX } from "../../brand/data.js";
import { testCircleLogo, testCircleLogoInverse, testLogo, testLogoWhite } from "../../data/test-data.js";
import { kebab } from "../../utils/helpers.js";
import type { Example } from "../../server/plugins/custom-elements/example.js";
import { snippet_examples } from "./snippet-examples.js";

const attrPrefix = SKYWALK_ATTR_PREFIX;

const iconFallbacks = [testLogoWhite, testLogo, testCircleLogo, testCircleLogoInverse];

// Kept rather than dropped: the rest configure the component an `icon` would have rendered, and
// each one the element spreads onto its `<img>` instead is an invalid attribute. `size` is one
// number the component splits across both axes itself.
const imgAttributes = ["alt", "width", "height", "loading", "decoding", "srcset", "sizes"];

const imgIconProps = ({ size, ...rest }: Record<string, any>): Record<string, any> => ({
  ...Object.fromEntries(Object.entries(rest).filter(([key]) => imgAttributes.includes(key))),
  ...(size == undefined ? {} : { width: size, height: size })
});

const attributeValue = (value: unknown): string => {
  if (typeof value !== "object" || value === null) return String(value);

  // Cycled rather than fixed, so repeated items in a list do not all show the same image.
  let used = 0;
  return JSON.stringify(value, (_key, entry) => {
    if (_key === "icon") return iconFallbacks[used++ % iconFallbacks.length];
    // Rewritten where the object is visited, not the key: a replacer sees one key at a time and
    // `iconProps` is only wrong because its sibling `icon` renders an `<img>`, whether it fell back
    // to a URL or was written as one.
    if (entry && typeof entry === "object" && "icon" in entry && entry.iconProps) {
      return { ...entry, iconProps: imgIconProps(entry.iconProps) };
    }
    return entry;
  });
};

/**
 * Fills a generated example's placeholders with a component's default props.
 *
 * The examples in `custom-elements/<dir>/examples.ts` name a type where a value goes, so the shape
 * is stable and testable. This swaps in real values: an attribute per prop, and for a snippet that
 * takes an argument the slotted markup from `snippet_examples`, which carries the `data-*` mapping.
 */
export function fillExample(example: Example, componentName: string, props: Record<string, any>): Example {
  const { html, js } = example;
  let filled = html;
  const unfilled = new Map<string, boolean | undefined>();

  // A top-level `icon` given as a component has no attribute form, so it falls back to a URL.
  // Either way it reaches the element as one, so `iconProps` is rewritten for the `<img>` it
  // renders. Only this pair: every other function prop is a callback, which crosses as a property.
  const isIcon = html.includes(`${attrPrefix}-icon=`);
  const resolved: Record<string, any> = {
    ...props,
    ...(isIcon && typeof props.icon === "function" ? { icon: iconFallbacks[0] } : {}),
    ...(isIcon && props.iconProps ? { iconProps: imgIconProps(props.iconProps) } : {})
  };

  // Every prop attribute the example declares; whatever is still here at the end had no default.
  for (const [, attribute] of html.matchAll(new RegExp(`\\s(${attrPrefix}-[\\w-]+)=`, "g"))) {
    unfilled.set(attribute, undefined);
  }

  for (const [propName, value] of Object.entries(resolved)) {
    const attribute = `${attrPrefix}-${kebab(propName)}`;
    if (typeof value === "function") {
      unfilled.delete(attribute);
      continue;
    }

    // Both quote styles: a scalar placeholder is double-quoted, a JSON one single-quoted.
    const placeholder = new RegExp(`${attribute}=(?:"[^"]*"|'[^']*')`);
    if (!placeholder.test(filled)) {
      unfilled.delete(attribute);
      continue;
    }

    // A Boolean attribute is true whenever it is present, so `false` is left for removal below
    // rather than written out as the string "false", which the element reads as true. A prop the
    // defaults set to `undefined` is left for removal too: written out it becomes the string
    // "undefined", which a Number attribute converts to NaN rather than to no value at all.
    if (value === false || value == undefined) {
      unfilled.set(attribute, value ?? undefined);
      continue;
    }

    // JSON carries double quotes, so the attribute is single-quoted and an apostrophe in the
    // content, e.g. "Côte d'Azur", has to be escaped or it closes the attribute early.
    const serialized = attributeValue(value);
    const quote = serialized.includes('"') ? "'" : '"';
    const escaped = quote === "'" ? serialized.replaceAll("'", "&#39;") : serialized;
    filled = filled.replace(placeholder, `${attribute}=${quote}${escaped}${quote}`);
    unfilled.delete(attribute);
  }

  // A hinted slot has markup in `snippet_examples`. Those entries are whole elements keyed
  // `<Component>.<snippet>`, and one entry can cover several slots, so every entry for the
  // component is parsed and the slotted elements lifted out of it.
  const sources = Object.entries(snippet_examples)
    .filter(([key]) => key.startsWith(`${componentName}.`))
    .map(([, value]) => value)
    .join("\n");

  // Parsed rather than read line by line: a slotted element can span several lines and nest others.
  const parsed = sources ? new DOMParser().parseFromString(sources, "text/html") : undefined;

  for (const [, slotName] of filled.matchAll(/<div slot="([a-zA-Z]+)" data-text-content="arg"><\/div>/g)) {
    const slotted = [...(parsed?.querySelectorAll(`[slot="${slotName}"]`) ?? [])]
      .map((element) => element.outerHTML)
      .join("\n  ");
    if (!slotted) continue;

    filled = filled.replace(`<div slot="${slotName}" data-text-content="arg"></div>`, slotted);
  }

  // An attribute the defaults never set still holds its type placeholder. Dropped rather than
  // blanked: the element runs JSON.parse on an Object or Array attribute, and "" throws.
  for (const [attribute] of unfilled) {
    filled = filled.replace(new RegExp(`\\n?\\s*${attribute}=(?:"[^"]*"|'[^']*')`), "");
  }

  return { html: filled, unfilled: [...unfilled.entries()].map(([key, val]) => `${key}="${val}"`), js };
}
