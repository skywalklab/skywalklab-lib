import { component_descriptions } from "../stories/component-descriptions.js";
import {
  testSlides,
  testDescription,
  testTitle,
  testCircleLogoInverse,
  testCircleLogo,
  testItems,
  testLogoWhite,
  testTestimonialCarousel
} from "../data/test-data.js";

export const reviewItems = [
  {
    review: testSlides[0].description,
    name: testTitle,
    title: testDescription,
    src: testCircleLogoInverse,
    alt: "SkywalkLab logo"
  },
  {
    review: testSlides[0].description,
    name: testTitle,
    title: testDescription,
    src: testCircleLogo,
    alt: "SkywalkLab logo"
  },
  {
    review: testSlides[0].description,
    name: testTitle,
    title: testDescription,
    src: testLogoWhite,
    alt: "SkywalkLab logo"
  }
];

export const carousels_static_props = new Map<string, any>([
  [
    "Carousel1",
    {
      storyDescription: component_descriptions.carousels.get("Carousel1"),
      props: {
        items: reviewItems.map(({ src, alt }) => ({ src, alt })),
        activeIndex: 0,
        style: "max-width: 400px; min-width: 400px;"
      }
    }
  ],
  [
    "FlexCardsPagination",
    {
      storyDescription: component_descriptions.carousels.get("FlexCardsPagination"),
      props: {
        cards: testItems.map(({ icon }) => ({ src: icon, alt: "SkywalkLab logo" })).slice(0, 6),
        style: "width: var(--full-width-min); margin: 0 auto;"
      }
    }
  ],
  [
    "ReviewCarousel",
    {
      storyDescription: component_descriptions.carousels.get("ReviewCarousel"),
      props: {
        reviews: reviewItems,
        iconProps: { lucide_icon: "messages-square", lucide_style: "color: #fff; stroke-width: 1.1px;" },
        backgroundImage: `url('${testSlides[0].src}')`,
        style: "background-color: rgba(0, 0, 0, 0.8);"
      }
    }
  ],
  [
    "TestimonialCarousel",
    {
      storyDescription: component_descriptions.carousels.get("TestimonialCarousel"),
      props: {
        title: testTestimonialCarousel.title,
        items: reviewItems,
        buttonClass: "",
        headingColor: "var(--primary, black)",
        cardBgColor: "var(--accent, lightblue)",
        style: "max-width: 90vw;"
      }
    }
  ]
]);
