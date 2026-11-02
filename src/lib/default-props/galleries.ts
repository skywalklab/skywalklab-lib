import { component_descriptions } from "../stories/component-descriptions.js";
import { testSlides } from "../data/test-data.js";

const images = [...testSlides, ...testSlides, ...testSlides].map((slide) => {
  const { description, ...props } = slide;
  return props;
});

export const galleries_static_props = new Map<string, any>([
  [
    "LightboxOverlay",
    {
      storyDescription: component_descriptions.galleries.get("LightboxOverlay"),
      props: {
        title: images[0].title,
        unlockScroll: true,
        lightboxIndex: 0,
        style: "position: relative; width: var(--full-width-max); max-width: 100%;"
      }
    }
  ],
  [
    "MasonryGallery",
    {
      storyDescription: component_descriptions.galleries.get("MasonryGallery"),
      props: {
        images: images,
        galleryIndex: undefined,
        disableLightbox: false,
        unlockScroll: true,
        style: "width: 100%; max-height: 100svh"
      }
    }
  ]
]);
