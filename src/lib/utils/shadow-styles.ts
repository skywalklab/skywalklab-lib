import { SKYWALK_ATTR_PREFIX } from "../brand/data.js";
import preflight from "../styles/preflight.css?inline";
import componentInternals from "../default-props/component-internals.css?inline";
import spinners from "../styles/spinners.css?inline";

const moduleCss: Record<string, string> = Object.fromEntries(
  Object.entries(
    import.meta.glob("/src/lib/css-modules/**/*.module.css", {
      query: "?inline",
      import: "default",
      eager: true
    })
  ).map(([path, css]) => [path.replace("/src/lib/css-modules/", "").replace(".module.css", ""), css as string])
);

// Class names carry the prefix `generateScopedName` applies in vite.config.ts.
const classPattern = (prefix = "") => new RegExp(`${prefix}(${SKYWALK_ATTR_PREFIX}_[\\w-]+)`, "g");

const moduleByClass = new Map<string, string>(
  Object.entries(moduleCss).flatMap(([name, css]) =>
    [...css.matchAll(classPattern("\\."))].map(([, className]): [string, string] => [className, name])
  )
);

const sheets = new Map<string, CSSStyleSheet>();

function sheet(key: string, css: string): CSSStyleSheet {
  let found = sheets.get(key);
  if (!found) {
    found = new CSSStyleSheet();
    found.replaceSync(css);
    sheets.set(key, found);
  }
  return found;
}

// Demo overrides that keep a component inside its story frame, e.g. a modal that would otherwise
// cover the viewport. Wrong for a real page, so they are stripped from a production build.
export const shadowSheets = (
  host: HTMLElement,
  component: string,
  includeStoryStyles: boolean,
  ...modules: string[]
): CSSStyleSheet[] => {
  // Any class named on the host or its slotted markup, from any attribute: `sw-button-class`,
  // `class`, and so on. Slotted content is scanned because it renders inside this root, so the
  // module it names has to be adopted here rather than by the element that carries the class.
  const fromClasses = [host, ...host.querySelectorAll("*")].flatMap((element) =>
    [...element.attributes].flatMap((attribute) =>
      // Matched anywhere in the value, not just as a whitespace-separated token: a class can arrive
      // inside JSON, e.g. a `buttonClass` entry in a links array.
      [...attribute.value.matchAll(classPattern())].flatMap(([, className]) => moduleByClass.get(className) ?? [])
    )
  );

  const includedSheets = [sheet("preflight", preflight)];
  switch (component) {
    case "animations/BrandLogoSpinner":
    case "animations/LoadingMessageSpinner":
    case "animations/SvelteSpinner":
    case "chatbots/AiChatbot":
      includedSheets.push(sheet("spinners", spinners));
      break;
  }

  return [
    ...includedSheets,
    ...(includeStoryStyles ? [sheet("component-internals", componentInternals)] : []),
    ...[...new Set([...modules, ...fromClasses])].map((name) => sheet(name, moduleCss[name] ?? ""))
  ];
};
