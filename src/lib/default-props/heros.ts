import { component_descriptions } from "../stories/component-descriptions.js";
import { testSlides } from "../data/test-data.js";

export const heros_static_props = new Map<string, any>([
  [
    "CardSlideshowHero",
    {
      storyDescription: component_descriptions.heros.get("CardSlideshowHero"),
      props: {
        slides: testSlides,
        style: "width: var(--full-width-max);"
      }
    }
  ],
  [
    "StaggeredSlideshowHero",
    {
      storyDescription: component_descriptions.heros.get("StaggeredSlideshowHero"),
      props: {
        slides: testSlides,
        duration: 8000,
        crossfadeDuration: 100,
        contentMaxWidth: "1170px",
        buttonClass: "",
        tintColor: "var(--primary, black)",
        decorationColor: "var(--accent, lightblue)",
        style: "width: var(--full-width-max);"
      }
    }
  ]
]);
