import { component_descriptions } from "../stories/component-descriptions.js";
import {
  testDescription,
  testText,
  testClickableTabs,
  testTabDrawer,
  testClickableTabsItems
} from "../data/test-data.js";

export const clickableTabsExamples: { title: string; description: string }[] = testClickableTabsItems;

export const disclosure_static_props = new Map<string, any>([
  [
    "Accordion",
    {
      storyDescription: component_descriptions.disclosure.get("Accordion"),
      props: {
        summary: testText,
        open: true,
        style: "width: var(--full-width-min);"
      }
    }
  ],
  [
    "Accordion2",
    {
      storyDescription: component_descriptions.disclosure.get("Accordion2"),
      props: {
        summary: testDescription,
        index: 0,
        selectedIndex: 0,
        open: true,
        activeColor: "#fff",
        activeBgColor: "var(--primary, black)",
        style: "width: var(--full-width-min);"
      }
    }
  ],
  [
    "ClickableTabs",
    {
      storyDescription: component_descriptions.disclosure.get("ClickableTabs"),
      props: {
        items: clickableTabsExamples,
        useSelect: false,
        ariaLabel: testClickableTabs.ariaLabel,
        selected: 1
      }
    }
  ],
  [
    "MenuOverlay",
    {
      storyDescription: component_descriptions.disclosure.get("MenuOverlay"),
      props: {
        bgColor: "var(--primary, black);",
        openContactMenu: true,
        style: "height: calc(90svh - 2rem); max-height: 100%; width: var(--full-width-min); position: sticky;"
      }
    }
  ],
  [
    "TabDrawer",
    {
      storyDescription: component_descriptions.disclosure.get("TabDrawer"),
      props: {
        tabText: testTabDrawer.tabText,
        open: true,
        style: "background-color: var(--accent-dark, slategray); color: #fff;"
      }
    }
  ]
]);
