import { SKYWALK_PREFIX, SKYWALK_ATTR_PREFIX } from "../../brand/data.js";
import { kebab, title } from "../../utils/helpers.js";
import type { Example } from "../../server/plugins/custom-elements/example.js";
import { fillExample } from "./example-values.js";
import { snippet_examples } from "./snippet-examples.js";
import componentInternals from "../../default-props/component-internals.css?inline";

/** Every generated `custom-elements/<dir>/examples.ts`, merged into one map keyed by tag. */
const examples: Record<string, Example> = Object.assign(
  {},
  ...Object.values(
    import.meta.glob<{ custom_element_examples: Record<string, Example> }>("/src/lib/custom-elements/*/examples.ts", {
      eager: true
    })
  ).map((module) => module.custom_element_examples)
);

/** The generated example for a component, by its Svelte name, e.g. `LanguageHeader`. */
export const getCustomElementExample = (componentName: string): Example =>
  examples[`${SKYWALK_PREFIX}-${kebab(componentName)}`];

/** The example's markup with a component's default props filled in, ready to render. */
export const getCustomElementHtml = (componentName: string, props: Record<string, any>): string =>
  fillExample(getCustomElementExample(componentName), componentName, props).html;

// The built bundles, as a consumer loads them, keyed by tag: each file is named after its element.
// The storybook scripts run `build:custom-elements` first, since dist/ is not committed.
const bundles = import.meta.glob("/dist/custom-elements-bundle/*.js");
const loadElement = (tag: string) => bundles[`/dist/custom-elements-bundle/${tag}.js`]?.();

/**
 * Registers the element and anything its example slots into it, e.g. the rolladex in
 * `LanguageHeader`'s `linkSnippet`. Importing a wrapper is what runs `customElements.define`.
 */
export interface CustomElementParts {
  tag: string;
  /** `sw-*` attributes from the filled example, ready to spread onto the element. */
  attributes: Record<string, string>;
  /** Slots the example leaves empty, so the story can render the snippet itself. */
  emptySlots: string[];
  /** Slotted markup the example does fill, e.g. a `data-*` template from `snippet_examples`. */
  filledSlots: string;
  /** Function props, which cross as DOM properties rather than attributes, keyed as the element declares them. */
  properties: Record<string, (...args: any[]) => any>;
}

// `onclick` is declared as `swOnclick`, since the bare name would collide with the DOM handler.
const propertyName = (propName: string) => (/^on/.test(propName) ? SKYWALK_ATTR_PREFIX + title(propName) : propName);

/**
 * The filled example, split so a story can render it as Svelte: the element's own attributes, the
 * slots it fills, and the ones it leaves empty because the snippet takes no argument to map.
 */
export const getCustomElementParts = (componentName: string, props: Record<string, any>): CustomElementParts => {
  const html = getCustomElementHtml(componentName, props);
  const root = new DOMParser().parseFromString(html, "text/html").body.firstElementChild;

  const attributes = Object.fromEntries(
    [...(root?.attributes ?? [])].map((attribute) => [attribute.name, attribute.value])
  );

  const emptySlots: string[] = [];
  const filled: string[] = [];
  const slotNames = new Set<string>();

  for (const child of [...(root?.children ?? [])]) {
    const name = child.getAttribute("slot") ?? "children";
    slotNames.add(name);
    if (child.tagName === "DIV" && !child.attributes.length) emptySlots.push("children");
    else if (child.tagName === "DIV" && child.attributes.length === 1 && child.getAttribute("slot") && !child.innerHTML)
      emptySlots.push(name);
    else filled.push(child.outerHTML);
  }

  // Only a callback crosses as a property. A snippet is a function too but renders into a slot,
  // and `icon` is a component here yet declared `String`, so it is filled as a URL attribute: the
  // unfilled example still carries every attribute, which is what tells the two apart.
  const raw = getCustomElementExample(componentName)?.html ?? "";
  const properties = Object.fromEntries(
    Object.entries(props)
      .filter(([propName, value]) => typeof value === "function" && !slotNames.has(propName))
      .filter(([propName]) => !raw.includes(`${SKYWALK_ATTR_PREFIX}-${kebab(propName)}=`))
      .map(([propName, value]) => [propertyName(propName), value])
  );

  return {
    tag: `${SKYWALK_PREFIX}-${kebab(componentName)}`,
    attributes,
    emptySlots,
    filledSlots: filled.join("\n"),
    properties
  };
};

/**
 * Sets a function prop on the element, which `<svelte:element>` cannot: a spread writes attributes,
 * and a function has no attribute form. Outside Storybook this is the `js` half of the example.
 */
export const customElementProperties = (element: Element, properties: CustomElementParts["properties"]) => {
  const apply = (values: CustomElementParts["properties"]) => Object.assign(element, values);
  apply(properties);
  return { update: apply };
};

const storySheet = new CSSStyleSheet();
storySheet.replaceSync(componentInternals);
let storySheetInstalled = false;

const installStorySheet = () => {
  if (storySheetInstalled) return;
  storySheetInstalled = true;

  const { get, set } = Object.getOwnPropertyDescriptor(ShadowRoot.prototype, "adoptedStyleSheets")!;
  Object.defineProperty(ShadowRoot.prototype, "adoptedStyleSheets", {
    configurable: true,
    get,
    set(this: ShadowRoot, sheets: CSSStyleSheet[]) {
      const isWrapper = this.host.localName.startsWith(`${SKYWALK_PREFIX}-`);
      set!.call(this, isWrapper && !sheets.includes(storySheet) ? [...sheets, storySheet] : sheets);
    }
  });
};

export const defineCustomElements = async (
  componentName: string,
  props: Record<string, any>
): Promise<CustomElementParts> => {
  // The snippet markup too: the example only holds an empty slot until `fillExample` swaps it in,
  // so an element slotted by `snippet_examples` is not in the example's own html.
  const markup = [
    getCustomElementExample(componentName)?.html ?? "",
    ...Object.entries(snippet_examples)
      .filter(([key]) => key.startsWith(`${componentName}.`))
      .map(([, value]) => value)
  ].join("\n");

  const tags = new Set([...markup.matchAll(new RegExp(`<(${SKYWALK_PREFIX}-[\\w-]+)`, "g"))].map(([, tag]) => tag));

  installStorySheet();
  await Promise.all([...tags].map(loadElement).filter(Boolean));

  return getCustomElementParts(componentName, props);
};
