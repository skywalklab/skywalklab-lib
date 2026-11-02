<script module lang="ts">
  import { testCardSlideshowHero, testStaggeredSlideshowHero } from "../data/test-data.js";
  import default_ui from "../css-modules/default-ui.module.css";
  import { heros_static_props } from "./heros.js";
  import { withDynamicProps } from "./utils.js";

  export const heros_default_props = withDynamicProps(heros_static_props, {
    CardSlideshowHero: { props: { buttonSnippet: CardSlideshowHeroButtonSnippet } },
    StaggeredSlideshowHero: {
      props: { buttonClass: default_ui["default-ui"], buttonSnippet: StaggeredSlideshowHeroButtonSnippet }
    }
  });
</script>

{#snippet StaggeredSlideshowHeroButtonSnippet()}
  <a class={default_ui["default-ui"]} href="/contact">{testStaggeredSlideshowHero.ctaText}</a>
{/snippet}

{#snippet CardSlideshowHeroButtonSnippet()}
  <a class="{default_ui['default-ui']} slideshow-card--link" href="/">{testCardSlideshowHero.ctaText}</a>
{/snippet}
