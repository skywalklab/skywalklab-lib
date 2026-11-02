import { component_descriptions } from "../stories/component-descriptions.js";
import {
  testDescription,
  testTitle,
  testLogo,
  testSlides,
  segments,
  testCircleLogoInverse,
  testStaticGrid,
  testStorySplitPanel,
  testTabbedSplitPanel
} from "../data/test-data.js";

export const panels_static_props = new Map<string, any>([
  [
    "AboutSplitPanel",
    {
      storyDescription: component_descriptions.panels.get("AboutSplitPanel"),
      props: {
        title: testTitle,
        description: testDescription,
        items: segments.slice(0, 4),
        image: { src: testSlides[0].src, alt: testTitle, width: "1200", height: "630" },
        headingColor: "var(--primary, black)",
        dotColor: "var(--accent, lightblue)",
        style: "width: var(--full-width-min);"
      }
    }
  ],
  [
    "DoublePanel",
    {
      storyDescription: component_descriptions.panels.get("DoublePanel"),
      props: {
        slideDistance: "5%",
        intersectionActions: ["onEnter", "onLeave"],
        intersectionActionParams: {
          threshold: 0.5
        },
        style: "height: clamp(400px, 70svh, 680px); width: var(--full-width-min);"
      }
    }
  ],
  [
    "GoogleMap",
    {
      storyDescription: component_descriptions.panels.get("GoogleMap"),
      props: {
        lat: 43.7102,
        lng: 7.262,
        zoom: 13,
        marker: {
          src: testCircleLogoInverse,
          alt: "SkywalkLab logo",
          width: 30,
          height: 30
        },
        mapId: "DEMO_MAP_ID",
        style: "height: 480px; width: var(--full-width-min);"
      }
    }
  ],
  [
    "SplitImagePanel",
    {
      storyDescription: component_descriptions.panels.get("SplitImagePanel"),
      props: {
        image: { src: `${testSlides[0].src}`, alt: testTitle, width: "1200", height: "630" },
        title: testTitle,
        reverse: false,
        contentBgColor: "var(--primary, black)",
        style: "width: var(--full-width-min);"
      }
    }
  ],
  [
    "StaticGrid",
    {
      storyDescription: component_descriptions.panels.get("StaticGrid"),
      props: {
        cards: [...testSlides, testSlides[0]].map((slide) => {
          const { description, ...card } = slide;
          return card;
        }),
        buttonText: testStaticGrid.buttonText,
        buttonClass: "",
        style: "width: var(--full-width-min);"
      }
    }
  ],
  [
    "StorySplitPanel",
    {
      storyDescription: component_descriptions.panels.get("StorySplitPanel"),
      props: {
        title: testTitle,
        description: testDescription,
        items: [
          { title: testStorySplitPanel.items[0], description: testDescription },
          { title: testStorySplitPanel.items[1], description: testDescription }
        ],
        image: { src: `${testSlides[0].src}`, alt: testTitle, width: "1200", height: "630" },
        headingColor: "var(--primary, black)",
        dotColor: "var(--accent, lightblue)",
        style: "width: var(--full-width-min);"
      }
    }
  ],
  [
    "TabbedSplitPanel",
    {
      storyDescription: component_descriptions.panels.get("TabbedSplitPanel"),
      props: {
        title: testTitle,
        description: testDescription,
        items: ["layout-dashboard", "plug", "puzzle"].map((lucide_icon, i) => ({
          title: testTabbedSplitPanel.items[i],
          icon: testLogo,
          iconProps: { lucide_icon, size: 20 },
          overview: testDescription
        })),
        maxItems: 4,
        showMoreText: testTabbedSplitPanel.showMoreText,
        showLessText: testTabbedSplitPanel.showLessText,
        buttonClass: "",
        headingColor: "var(--primary, black)",
        tabsBgColor: "var(--accent, lightblue)",
        style: "var(--full-width-min);"
      }
    }
  ]
]);
