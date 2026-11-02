import { component_descriptions } from "../stories/component-descriptions.js";
import {
  testDescription,
  testText,
  testTitle,
  testItems,
  iconItems,
  testSlides,
  testLogo,
  testLogoWhite,
  segments,
  testImageCardGrid,
  testLogoList,
  testOverlapIconCards,
  testProcessFlow,
  testPreviewList,
  testFileList
} from "../data/test-data.js";

const locale = import.meta.env?.STORYBOOK_LOCALE;
const components = Object.entries(component_descriptions).flatMap(([dir, map]) =>
  [...map.entries()].map(([component, description]) => ({
    dir,
    component,
    description,
    pauseStep: 2,
    src: `/component-shots/${locale ?? "en"}/components-${dir}-${component.toLowerCase()}--default.webp`
  }))
);

export const lists_static_props = new Map<string, any>([
  [
    "FileList",
    {
      storyDescription: component_descriptions.lists.get("FileList"),
      props: {
        items: testSlides.map(({ src, title, width, height }) => ({ src, alt: title, width, height })),
        activeItemKey: 0,
        navButtons: testFileList.navButtons,
        style: "width: var(--full-width-min);"
      }
    }
  ],
  [
    "HowWeWork1",
    {
      storyDescription: component_descriptions.lists.get("HowWeWork1"),
      props: {
        steps: iconItems.map((item) => {
          const { icon, iconProps } = item;
          return { icon, iconProps, text: item.title };
        })
      }
    }
  ],
  [
    "ImageByList",
    {
      storyDescription: component_descriptions.lists.get("ImageByList"),
      props: {
        image: {
          src: testSlides[0].src,
          alt: testSlides[0].title,
          width: testSlides[0].width,
          height: testSlides[0].height
        },
        items: iconItems.map((item, i) => {
          const { icon, iconProps } = item;
          return { icon, iconProps, title: testSlides[i].title, description: testSlides[i].description };
        })
      }
    }
  ],
  [
    "ImageCardGrid",
    {
      storyDescription: component_descriptions.lists.get("ImageCardGrid"),
      props: {
        title: testTitle,
        description: testDescription,
        items: testSlides.map((slide) => ({
          title: slide.title,
          summary: slide.description,
          icon: testLogo,
          iconProps: { lucide_icon: "graduation-cap", size: 26 },
          image: { src: slide.src, width: "1200", height: "630" },
          href: "/services"
        })),
        linkText: testImageCardGrid.linkText,
        headingColor: "var(--primary, black)",
        badgeBgColor: "var(--primary, black)",
        badgeColor: "var(--accent, lightblue)",
        cardBgColor: "var(--accent, lightblue)"
      }
    }
  ],
  [
    "LoadMoreList",
    {
      storyDescription: component_descriptions.lists.get("LoadMoreList"),
      props: {
        items: [],
        limit: 3,
        loadItems: ({ offset = 0, limit = 3 }: { offset?: number; limit?: number } = {}) =>
          testItems.slice(offset, offset + limit).map((item, i) => ({ ...item })),
        style: "display: flex; gap: 1rem; flex-wrap: wrap; width: var(--full-width-min);"
      }
    }
  ],
  [
    "LogoList",
    {
      storyDescription: component_descriptions.lists.get("LogoList"),
      moduleDescription:
        "Wrap each item's content in an element; bare text never matches the first-child rule, which carries the row padding, the marker arrow and the hover fill.",
      props: {
        markerBgColor: "var(--accent, lightblue)",
        nestedMarkerBgColor: "var(--accent-dark, slategray)",
        outlineMarkerColor: "var(--accent, lightblue)",
        markerImage: `url('${testLogoWhite.replaceAll("'", "%27")}')`,
        markerSize: "20px",
        markerMinHeight: "32px",
        gap: "0.25rem",
        arrowScale: "1",
        items: testLogoList.items.map(({ text, subItems }) => ({
          text,
          classNames: "active-hover",
          subItems: subItems.map((subItem) => ({ text: subItem, classNames: "active-hover outline-marker" }))
        }))
      }
    }
  ],
  [
    "OverlapIconCards",
    {
      storyDescription: component_descriptions.lists.get("OverlapIconCards"),
      props: {
        items: [
          {
            icon: testLogo,
            iconProps: { lucide_icon: "monitor-play", size: 28 },
            ...testOverlapIconCards.items[0]
          },
          {
            icon: testLogo,
            iconProps: { lucide_icon: "database", size: 28 },
            ...testOverlapIconCards.items[1]
          },
          {
            icon: testLogo,
            iconProps: { lucide_icon: "graduation-cap", size: 28 },
            ...testOverlapIconCards.items[2]
          }
        ],
        cardBgColor: "var(--accent, lightblue)",
        badgeBgColor: "var(--primary, black)",
        badgeColor: "var(--accent, lightblue)",
        style: "width: var(--full-width-max);"
      }
    }
  ],
  [
    "PostIts",
    {
      storyDescription: component_descriptions.lists.get("PostIts"),
      props: {
        items: testItems.map((item) => ({ title: item.text, icon: item.icon, description: testDescription })),
        color: "#ffffff",
        bgFromColor: "var(--accent, lightblue)",
        bgToColor: "var(--primary, black)",
        cornerColor: "var(--accent-dark, slategray)",
        intersectionActions: ["onEnter", "onLeave"],
        intersectionActionParams: {
          threshold: 0.75
        },
        style: "width: var(--full-width-max);"
      }
    }
  ],
  [
    "PreviewList",
    {
      storyDescription: component_descriptions.lists.get("PreviewList"),
      props: {
        items: [testPreviewList.header, ...components.slice(39, 49)],
        color: "#fff",
        bgColor: "var(--primary, #000000)",
        insetBgColor: "color-mix(in srgb, var(--primary), #000 50%)",
        previewWidth: "clamp(110px, 40vw, 410px)",
        previewHeight: "clamp(100px, 20vw, 120px)",
        openItemIndex: -1,
        alwaysShowPreview: false,
        style: "width: var(--full-width-max);"
      }
    }
  ],
  [
    "ProcessFlow",
    {
      storyDescription: component_descriptions.lists.get("ProcessFlow"),
      props: {
        title: testProcessFlow.title,
        items: ["monitor-play", "database", "graduation-cap", "life-buoy"].map((lucide_icon, i) => ({
          text: testProcessFlow.items[i],
          description: testDescription,
          icon: testLogo,
          iconProps: { lucide_icon, size: 38 }
        })),
        headingColor: "var(--primary, black)",
        discBgColor: "var(--accent, lightblue)",
        arrowColor: "var(--accent-dark, slategray)",
        style: "width: var(--full-width-max);"
      }
    }
  ],
  [
    "SquareCheckList",
    {
      storyDescription: component_descriptions.lists.get("SquareCheckList"),
      props: {
        items: segments,
        iconColor: "var(--primary, black)"
      }
    }
  ],
  [
    "StepList",
    {
      storyDescription: component_descriptions.lists.get("StepList"),
      props: {
        items: [
          { title: testDescription, description: testText },
          ...testSlides.map((slide) => {
            const { title, description } = slide;
            return {
              title,
              description
            };
          })
        ],
        breakEven: false,
        color: "#000000",
        bgColor: "#ffffff",
        stepNumColor: "var(--primary, black)",
        borderColor: "#e0e0e0",
        style: "align-self: normal; width: var(--full-width-max);"
      }
    }
  ]
]);
