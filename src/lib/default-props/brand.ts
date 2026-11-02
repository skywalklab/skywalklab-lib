import { component_descriptions } from "../stories/component-descriptions.js";
export const brand_static_props = new Map<string, any>([
  [
    "SkywalklabLogo",
    {
      storyDescription: component_descriptions.brand.get("SkywalklabLogo"),
      props: {
        fill: "var(--primary, black)",
        endFill: "var(--accent, lightblue)",
        offset: { start: 0, end: 100 },
        stroke: "#ffffff",
        opacity: 1,
        position: "middle",
        height: "150",
        singleCurve: false
      }
    }
  ],
  [
    "SkywalklabAnimatedLogo",
    {
      storyDescription: component_descriptions.brand.get("SkywalklabAnimatedLogo"),
      props: {
        itemIndex: 0,
        itemsLength: 4,
        logoProps: {
          fill: "var(--accent, lightblue)",
          endFill: "var(--primary, black)",
          stroke: "#ffffff",
          height: "150"
        }
      }
    }
  ]
]);
