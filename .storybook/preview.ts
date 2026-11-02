import type { Preview } from "@storybook/sveltekit";
import "../src/lib/styles/preflight.css";
import "./preview.css";
import "../src/lib/default-props/examples.css";
import { addons, useArgs } from "storybook/preview-api";
import { STORY_RENDER_PHASE_CHANGED } from "storybook/internal/core-events";
import { typeDetails } from "./type-details.js";
import { dark, light } from "./themes.js";
// preview.css keys the French props-table note off this

const storybookLocale = import.meta.env.STORYBOOK_LOCALE ?? "en";
if (storybookLocale === "fr") document.documentElement.classList.add("locale-fr");

const expandTypeAliases = (context: any) => {
  const argTypes = { ...context.argTypes };
  for (const [name, argType] of Object.entries<any>(argTypes)) {
    const summary = argType?.table?.type?.summary;
    const alias =
      typeof summary === "string" ? summary.replace(/\[]$/, "").replace(/^Omit<([^,]*),.*$/, "$1") : undefined;
    const detail = alias ? typeDetails[alias] : undefined;
    if (detail) {
      argTypes[name] = { ...argType, table: { ...argType.table, type: { ...argType.table.type, detail } } };
    }
  }
  return argTypes;
};
expandTypeAliases.secondPass = true;

const colorMatcher = /(background|color)$/i;
const apiKeyMatcher = /ApiKey$/i;

const applyControlMatchers = (context: any) => {
  const argTypes = { ...context.argTypes };

  for (const [name, argType] of Object.entries<any>(argTypes)) {
    if (colorMatcher.test(name) && argType?.type?.name === "string") {
      argTypes[name] = { ...argType, control: { type: "color" } };
    }

    if (apiKeyMatcher.test(name) && argType?.type?.name === "string") {
      argTypes[name] = { ...argType, control: false };
    }
  }
  return argTypes;
};
applyControlMatchers.secondPass = true;

const storyExample = '#storybook-root > [class*="-story-example"]';

// scale the story wrapper as large as fits the preview, centered
const zoomToFit = (el: HTMLElement, animate = true) => {
  // measure unzoomed: the render phases rerun on arg updates
  el.style.transform = "";
  const r = el.getBoundingClientRect();
  el.style.transformOrigin = "top left";
  el.style.transition = animate ? "transform 0.4s ease" : "";
  const scale = Math.min(innerWidth / r.width, innerHeight / r.height) * 0.85;
  const left = (innerWidth - r.width * scale) / 2;
  const top = (innerHeight - r.height * scale) / 2;
  el.style.transform = `translate(${left - r.left}px, ${top - r.top}px) scale(${scale})`;
};

// document.addEventListener("dblclick", (e) => {
//   const el = (e.target as Element).closest<HTMLElement>(storyExample);
//   if (!el) return;
//   if (el.style.transform) el.style.transform = "";
//   else zoomToFit(el);
// });

if (new URLSearchParams(location.search).get("zoom") === "true") {
  // hidden until zoomed so the unzoomed render never shows
  document.documentElement.classList.add("zoom-pending");
  // content can size itself after render (e.g. custom elements): re-zoom on resize, reveal once stable
  let settle: ReturnType<typeof setTimeout> | undefined;
  const observer = new ResizeObserver(([entry]) => {
    zoomToFit(entry.target as HTMLElement, false);
    clearTimeout(settle);
    settle = setTimeout(() => document.documentElement.classList.remove("zoom-pending"), 150);
  });
  // "completing" = rendered; STORY_RENDERED waits for animations to finish (up to 5s)
  addons.getChannel().on(STORY_RENDER_PHASE_CHANGED, ({ newPhase }: { newPhase: string }) => {
    if (newPhase !== "completing") return;
    const el = document.querySelector<HTMLElement>(storyExample);
    observer.disconnect();
    if (el) observer.observe(el);
    else document.documentElement.classList.remove("zoom-pending");
  });
}

const preview: Preview = {
  tags: ["autodocs"],
  argTypesEnhancers: [applyControlMatchers, expandTypeAliases],
  parameters: {
    darkMode: { dark, light },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    },
    options: {
      // @ts-expect-error implicit any
      storySort: (a, b) => {
        return a.title.localeCompare(b.title);
      }
    }
  },
  decorators: [
    (story, context) => {
      const [props, updateArgs] = useArgs();
      if (props.style?.includes("; ")) updateArgs({ style: props.style.replaceAll("; ", ";\n") });

      return story();
    }
  ]
};

export default preview;
