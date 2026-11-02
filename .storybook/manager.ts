// @ts-expect-error Storybook's manager bundler maps react and @storybook/icons
import { createElement } from "react";
import { addons, types } from "storybook/manager-api";
import { Select } from "storybook/internal/components";
// @ts-expect-error Storybook's manager bundler maps react and @storybook/icons
import { GlobeIcon } from "@storybook/icons";
import { BRAND_LAB } from "../src/lib/brand/data.js";

addons.setConfig({
  showNav: true,
  layoutCustomisations: {
    showPanel: ({ path }) => true,
    showToolbar: ({ path }) => true
  }
});

const storybookLocale = (window as any).STORYBOOK_LOCALE ?? "en";
const sites: Record<string, string> = { en: BRAND_LAB.site, fr: BRAND_LAB.frSite! };

addons.register("locale-menu", () => {
  addons.add("locale-menu/tool", {
    type: types.TOOL,
    title: "Locale",
    render: () =>
      createElement(Select, {
        ariaLabel: "Locale",
        icon: createElement(GlobeIcon),
        defaultOptions: storybookLocale,
        options: [
          { value: "en", title: "English", aside: "🇺🇸" },
          { value: "fr", title: "Français", aside: "🇫🇷" }
        ],
        onSelect: (value: string) => {
          if (value === storybookLocale) return;

          if (location.hostname.endsWith(BRAND_LAB.site.replace("https://", ""))) {
            window.location.href = sites[value] + location.search;
          } else {
            window.location.href =
              (value === "fr" ? "http://localhost:6007" : "http://localhost:6006") + location.search;
          }
        }
      })
  });
});
