import { component_descriptions } from "../stories/component-descriptions.js";
import { testSearchModal } from "../data/test-data.js";
import { modals_static_props } from "./modals.js";

export const search_static_props = new Map<string, any>([
  [
    "SearchModal",
    {
      storyDescription: component_descriptions.search.get("SearchModal"),
      props: {
        items: {},
        suggestions: [],
        searchButtonTitle: testSearchModal.searchButtonTitle,
        searchColor: "var(--primary, black)",
        searchOutlineColor: "var(--accent, lightblue)",
        placeholder: testSearchModal.placeholder,
        buttonClass: "",
        modalProps: {
          title: testSearchModal.modalTitle,
          closeOnBackdropClick: false,
          showModal: true,
          headerColor: "#ffffff",
          headerBgColor: "var(--primary, black)"
        },
        style: modals_static_props.get("Modal").props.style
      }
    }
  ]
]);
