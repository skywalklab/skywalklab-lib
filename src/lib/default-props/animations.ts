import { component_descriptions } from "../stories/component-descriptions.js";
import {
  testLogo,
  testItems,
  testCircleLogoInverse,
  testLogoWhite,
  testIcon,
  testTitle,
  testDescription,
  testLoadingMessage
} from "../data/test-data.js";

export const animations_static_props = new Map<string, any>([
  [
    "BrandLogoSpinner",
    {
      storyDescription: component_descriptions.animations.get("BrandLogoSpinner"),
      props: {
        icon: testCircleLogoInverse,
        iconProps: { alt: "SkywalkLab logo" },
        colorOuter: "var(--accent, lightblue)",
        colorCenter: "var(--accent-analogous-1, cornflowerblue)",
        colorInner: "var(--accent-analogous-2, paleturquoise)",
        size: 40
      }
    }
  ],
  [
    "CircleCarousel",
    {
      storyDescription: component_descriptions.animations.get("CircleCarousel"),
      props: {
        items: testItems.map((item, i) => ({ ...item, alt: `Skywalklab Logo ${i}` })),
        context: { moveToTop: 1, speed: 0.25 },
        backgroundImageUrl: testLogo,
        intersectionActions: ["onEnter", "onLeave"],
        intersectionActionParams: {
          threshold: 0.5
        },
        style: "width: var(--full-width-min); max-width: 500px;"
      }
    }
  ],
  [
    "LinearCarousel",
    {
      storyDescription: component_descriptions.animations.get("LinearCarousel"),
      props: {
        gradientColor: "var(--background, white)",
        gsapContext: { xPercent: -50, duration: 60000, repeat: -1, ease: "linear" },
        gsapDistance: 0.25,
        buttonClass: "",
        intersectionActions: ["onEnter", "onLeave"],
        intersectionActionParams: {
          threshold: 0,
          rootMargin: "200px"
        },
        style: "max-width: 1000px"
      }
    }
  ],
  [
    "LoadingMessageSpinner",
    {
      storyDescription: component_descriptions.animations.get("LoadingMessageSpinner"),
      props: {
        size: 46,
        color: "var(--primary, black)",
        duration: 750,
        message: testLoadingMessage
      }
    }
  ],
  [
    "SlideshowCarousel",
    {
      storyDescription: component_descriptions.animations.get("SlideshowCarousel"),
      props: {
        items: [testLogo, testCircleLogoInverse, testLogoWhite].map((src, i) => ({ src, alt: `logo ${i + 1}` })),
        duration: 5000,
        gradientColor: "var(--background, white)",
        buttonClass: "",
        style: "max-width: 400px;"
      }
    }
  ],
  [
    "SlideshowIcon",
    {
      storyDescription: component_descriptions.animations.get("SlideshowIcon"),
      props: {
        items: [
          "var(--accent, lightblue)",
          "var(--accent-analogous-1, cornflowerblue)",
          "var(--accent-analogous-2, paleturquoise)"
        ].map((color) => ({
          icon: testLogo,
          iconProps: { lucide_icon: testIcon, size: 22 },
          color,
          title: testTitle,
          description: testDescription
        })),
        duration: 5000,
        height: "5rem",
        style: "justify-content: center;"
      }
    }
  ],
  [
    "SvelteSpinner",
    {
      storyDescription: component_descriptions.animations.get("SvelteSpinner"),
      props: {
        type: "Wave",
        spinnerProps: {
          color: "var(--primary, black)"
        }
      }
    }
  ]
]);
