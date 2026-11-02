import { component_descriptions } from "../stories/component-descriptions.js";
import { testIcon } from "../data/test-data.js";
import { testLogoWhite } from "../data/test-data.js";

export const headings_static_props = new Map<string, any>([
  [
    "AccentHeading",
    {
      storyDescription: component_descriptions.headings.get("AccentHeading"),
      props: {
        text: "Accent Heading",
        tag: "h3",
        accentLength: "65px",
        fadeOutColor: "#fff",
        accentColor: "currentColor",
        style: "font-size: 26px; justify-content: center;"
      }
    }
  ],
  [
    "FlairHeading",
    {
      storyDescription: component_descriptions.headings.get("FlairHeading"),
      props: {
        text: "Flair Heading",
        tag: "h3",
        backgroundImage: testLogoWhite,
        iconWidth: "32px",
        iconColor: "var(--primary, black)",
        style: "font-size: 26px; margin-top: 2rem;"
      }
    }
  ],
  [
    "HalfUnderlineHeading",
    {
      storyDescription: component_descriptions.headings.get("HalfUnderlineHeading"),
      props: {
        text: "Half Underline Heading",
        tag: "h3",
        includeFull: true,
        underlineLength: "3rem",
        underlineColor: "var(--primary, black)",
        trackColor: "#e2e6e7",
        style: "font-size: 26px; width: fit-content;"
      }
    }
  ],
  [
    "IconHeading",
    {
      storyDescription: component_descriptions.headings.get("IconHeading"),
      moduleDescription:
        "Expects the icon as the first child; wrap the text in an element and leave the icon unwrapped.",
      props: {
        text: "Icon Heading",
        tag: "h3",
        iconProps: { lucide_icon: testIcon, size: 28 },
        style: "width: 12rem; font-size: 26px;"
      }
    }
  ],
  [
    "IconInlineHeading",
    {
      storyDescription: component_descriptions.headings.get("IconInlineHeading"),
      moduleDescription: "Expects the icon as the first child, followed by the rest of the content.",
      props: {
        verticalAlign: "sub",
        text: "Icon Inline Heading",
        tag: "h3",
        iconProps: { lucide_icon: testIcon, size: 28 },
        style: "width: 12rem; font-size: 26px;"
      }
    }
  ]
]);
