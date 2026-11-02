import { component_descriptions } from "../stories/component-descriptions.js";
import {
  testDescription,
  testText,
  testTitle,
  iconItems,
  testSlides,
  testLogoWhite,
  testIcon,
  testFounderCard,
  testPricingCard,
  segments,
  testPricingPlan
} from "../data/test-data.js";

export const infoCardList = segments.slice(0, 5);

export const pricingCard = {
  name: testPricingPlan.name,
  price: 150,
  priceLabel: testPricingPlan.priceLabel,
  included: testPricingPlan.included,
  beforeColor: "var(--accent, lightblue)",
  afterColor: "var(--primary, black)",
  color: "#fff",
  bgColor:
    "linear-gradient(to bottom right, var(--accent-analogous-1, cornflowerblue) 0%, var(--primary-analogous-1, black) 100%)",
  beforeSize: 96,
  indicatorText: testPricingPlan.indicatorText
};

export const cards_static_props = new Map<string, any>([
  [
    "BubbleIcon",
    {
      storyDescription: component_descriptions.cards.get("BubbleIcon"),
      props: {
        iconProps: { lucide_icon: testIcon, size: 22 },
        title: testTitle,
        tag: "div",
        highlight: true,
        bgColor: "#fff",
        highlightColor: "var(--primary, black)"
      }
    }
  ],
  [
    "BubbleIcon3",
    {
      storyDescription: component_descriptions.cards.get("BubbleIcon3"),
      props: {
        items: iconItems,
        highlightIndex: 0,
        style: "width: fit-content; margin: 0 auto 3rem;"
      }
    }
  ],
  [
    "Card3Block1",
    {
      storyDescription: component_descriptions.cards.get("Card3Block1"),
      props: {
        cards: testSlides
      }
    }
  ],
  [
    "CircleNode",
    {
      storyDescription: component_descriptions.cards.get("CircleNode"),
      props: {
        iconProps: { lucide_icon: testIcon, size: 22 },
        animate: true
      }
    }
  ],
  [
    "CircleNode3",
    {
      storyDescription: component_descriptions.cards.get("CircleNode3"),
      props: {
        cards: iconItems.slice(0, 3).map((item, i) => {
          const { icon, iconProps, title } = item;
          return { icon, iconProps, title, animate: true, description: testSlides[i].description };
        })
      }
    }
  ],
  [
    "FounderCard",
    {
      storyDescription: component_descriptions.cards.get("FounderCard"),
      props: {
        name: testFounderCard.name,
        role: testFounderCard.role,
        bio: testDescription,
        image: { src: testLogoWhite, alt: "", width: "160", height: "160" },
        contact: testFounderCard.contact,
        headingColor: "var(--primary, black)"
      }
    }
  ],
  [
    "HelpCard",
    {
      storyDescription: component_descriptions.cards.get("HelpCard"),
      props: { style: "width: 280px;" }
    }
  ],
  [
    "InfoCard1",
    {
      storyDescription: component_descriptions.cards.get("InfoCard1"),
      props: {}
    }
  ],
  [
    "PricingCard",
    {
      storyDescription: component_descriptions.cards.get("PricingCard"),
      props: {
        name: pricingCard.name,
        included: pricingCard.included,
        notIncluded: testPricingCard.notIncluded,
        indicatorText: pricingCard.indicatorText,
        beforeSize: pricingCard.beforeSize,
        beforeColor: pricingCard.beforeColor,
        afterColor: pricingCard.afterColor,
        style: `color: ${pricingCard.color}; background: ${pricingCard.bgColor}; width: 200px;`
      }
    }
  ],
  [
    "TopImageCard",
    {
      storyDescription: component_descriptions.cards.get("TopImageCard"),
      props: {
        title: testTitle,
        text: testText,
        hover: false,
        style: "max-width: 20rem;"
      }
    }
  ]
]);
