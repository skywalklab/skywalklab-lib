import { component_descriptions } from "../stories/component-descriptions.js";
import { testImg, testPageHeadingBanner2, testPressQuote, testStatStrip } from "../data/test-data.js";
import { testCallback, testTopBarSlide } from "../data/test-data.js";
import { contactMap, testItems, testStats, testText, testTitle } from "../data/test-data.js";

export const banners_static_props = new Map<string, any>([
  [
    "ContactBanner",
    {
      storyDescription: component_descriptions.banners.get("ContactBanner"),
      props: {
        phone: { value: contactMap.get("phone")!.text, label: contactMap.get("phone")!.label },
        address: { value: contactMap.get("location")!.text, label: contactMap.get("location")!.label },
        email: { value: contactMap.get("email")!.text, label: contactMap.get("email")!.label },
        bannerBgColor: "var(--primary, black)",
        style: "padding: 0 var(--side-padding, 12px); width: var(--full-width-max);"
      }
    }
  ],
  [
    "CopyrightBanner1",
    {
      storyDescription: component_descriptions.banners.get("CopyrightBanner1"),
      props: {}
    }
  ],
  [
    "IconStatusBanner",
    {
      storyDescription: component_descriptions.banners.get("IconStatusBanner"),
      props: {
        icons: testItems
          .slice(0, 5)
          .map(({ icon, text }) => ({ icon, iconProps: { size: 48 }, label: text, tag: "button" })),
        i: 0,
        activeColor: "var(--primary, black)",
        onclick: (index: number) => {},
        style: "height: clamp(2.5rem, 15vw, 5rem);"
      }
    }
  ],
  [
    "PageHeadingBanner1",
    {
      storyDescription: component_descriptions.banners.get("PageHeadingBanner1"),
      props: {
        pageTitle: testTitle,
        breadcrumbs: { parent: testTitle, child: testText },
        tag: "h2",
        style: "background-color: #f5f5f5; width: var(--full-width-min);"
      }
    }
  ],
  [
    "PageHeadingBanner2",
    {
      storyDescription: component_descriptions.banners.get("PageHeadingBanner2"),
      props: {
        pageTitle: testPageHeadingBanner2.pageTitle,
        image: { src: testImg, alt: "", width: "1200", height: "630" },
        breadcrumbs: testPageHeadingBanner2.breadcrumbs,
        tag: "h1",
        minHeight: "clamp(220px, 30vw, 340px)",
        maxHeight: "65svh",
        tintFromColor: "var(--accent, lightblue)",
        tintToColor: "var(--primary, black)",
        style: "width: var(--full-width-min);"
      }
    }
  ],
  [
    "PressQuote",
    {
      storyDescription: component_descriptions.banners.get("PressQuote"),
      props: {
        quote: testPressQuote.quote,
        publication: testPressQuote.publication,
        author: testPressQuote.author,
        body: testPressQuote.body,
        bgColor: "var(--primary, black)",
        style: "width: var(--full-width-max);"
      }
    }
  ],
  [
    "StaircaseBanner",
    {
      storyDescription: component_descriptions.banners.get("StaircaseBanner"),
      props: {
        transitionTiming: 1500,
        baseColor: "var(--accent-dark, blue)",
        intersectionActions: ["onEnter", "onLeave"],
        intersectionActionParams: {
          threshold: 0.5
        },
        style: "width: var(--full-width-min);"
      }
    }
  ],
  [
    "StatBanner",
    {
      storyDescription: component_descriptions.banners.get("StatBanner"),
      props: {
        stats: testStats,
        intersectionActions: ["onEnter", "onLeave"],
        intersectionActionParams: {
          threshold: 0.9
        },
        style: "width: var(--full-width-min); margin: 0 auto;"
      }
    }
  ],
  [
    "StatStrip",
    {
      storyDescription: component_descriptions.banners.get("StatStrip"),
      props: {
        items: testStatStrip,
        headingColor: "var(--primary, black)",
        style: "width: var(--full-width-min);"
      }
    }
  ],
  [
    "TopBar",
    {
      storyDescription: component_descriptions.banners.get("TopBar"),
      props: {
        phone: contactMap.get("phone")!.text,
        email: contactMap.get("email")!.text,
        hours: contactMap.get("hours")!.text,
        socials: { facebook: "#", instagram: "#", linkedin: "#" },
        iconColor: "var(--primary, black)"
      }
    }
  ],
  [
    "TopBar2",
    {
      storyDescription: component_descriptions.banners.get("TopBar2"),
      props: {
        email: contactMap.get("email")!.text,
        address: contactMap.get("location")!.text,
        hours: contactMap.get("hours")!.text,
        socials: { facebook: "#", instagram: "#", linkedin: "#" },
        iconColor: "var(--primary, black);",
        style: "background-color: var(--background);"
      }
    }
  ],
  [
    "TopBar3",
    {
      storyDescription: component_descriptions.banners.get("TopBar3"),
      props: {
        items: [
          { label: "phone", value: contactMap.get("phone")!.text, showVal: true },
          { label: "email", value: contactMap.get("email")!.text, showVal: true },
          { label: "hours", value: contactMap.get("hours")!.text, showVal: true },
          { label: "facebook", value: "Facebook", href: "#" },
          { label: "instagram", value: "Instagram", href: "#" },
          { label: "linkedin", value: "LinkedIn", href: "#" }
        ],
        iconSize: "20",
        iconColor: "var(--primary, black)"
      }
    }
  ],
  [
    "TopBarSlide",
    {
      storyDescription: component_descriptions.banners.get("TopBarSlide"),
      props: {
        items: [
          { text: testTopBarSlide.home, icon: "house", href: "/" },
          { text: testTopBarSlide.linkedin, icon: "linkedin", href: "https://linkedin.com" },
          { text: testTopBarSlide.github, icon: "github", href: "https://github.com/" },
          { text: testTopBarSlide.language, cb: testCallback }
        ],
        keepActive: true,
        activeItemIndex: undefined,
        color: "#fff",
        bgColor: "var(--accent-dark, color-mix(in srgb, #000, #fff 35%))",
        activeBgColor: "var(--primary, black)"
      }
    }
  ],
  [
    "TopDisclaimerBanner",
    {
      storyDescription: component_descriptions.banners.get("TopDisclaimerBanner"),
      props: {
        clientHeight: 34,
        style: "background-color: var(--primary, black); color: #fff; width: 100%; padding: 0 8px;"
      }
    }
  ]
]);
