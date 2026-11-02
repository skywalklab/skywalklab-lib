import { component_descriptions } from "../stories/component-descriptions.js";
export const modals_static_props = new Map<string, any>([
  [
    "Modal",
    {
      storyDescription: component_descriptions.modals.get("Modal"),
      props: {
        showModal: true,
        closeOnBackdropClick: false,
        headerColor: "#ffffff",
        headerBgColor: "var(--primary, black)",
        style: "width: var(--full-width-min); max-width: 500px;"
      }
    }
  ]
]);
