<script module lang="ts">
  import LucideIcon from "../components/icons/LucideIcon.svelte";
  import default_ui from "../css-modules/default-ui.module.css";
  import { carousels_static_props } from "./carousels.js";
  import { withDynamicProps } from "./utils.js";

  export const carousels_default_props = withDynamicProps(carousels_static_props, {
    Carousel1: {
      props: {
        itemSnippet: Carousel1ItemSnippet
      }
    },
    ReviewCarousel: {
      props: {
        icon: LucideIcon
      }
    },
    TestimonialCarousel: {
      props: {
        buttonClass: default_ui["default-ui"]
      }
    }
  });
</script>

{#snippet Carousel1ItemSnippet({ item, index }: { item: { src: string; alt: string }; index: number })}
  <img src={item.src} alt={item.alt} width="100" height="100" />
{/snippet}
