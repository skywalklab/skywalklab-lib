import { component_descriptions } from "../stories/component-descriptions.js";
import { testIcon } from "../data/test-data.js";

export const icons_static_props = new Map<string, any>([
  [
    "LucideIcon",
    {
      storyDescription: component_descriptions.icons.get("LucideIcon"),
      props: {
        lucide_icon: testIcon,
        color: "currentColor",
        size: 48
      }
    }
  ]
]);
