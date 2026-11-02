<script module lang="ts">
  import underline_ui from "../css-modules/underline-ui.module.css";
  import { testSlides, testLightboxOverlay } from "../data/test-data.js";
  import { galleries_static_props } from "./galleries.js";
  import { withDynamicProps } from "./utils.js";

  export const galleries_default_props = withDynamicProps(galleries_static_props, {
    LightboxOverlay: {
      extraSnippet: LightboxOverlayExtraSnippet,
      props: {
        imageSnippet: LightboxOverlayImageSnippet
      }
    }
  });
</script>

{#snippet LightboxOverlayImageSnippet()}
  <img
    class="lightbox-overlay--image"
    src={testSlides[0].src}
    alt={testSlides[0].title}
    width={testSlides[0].width}
    height={testSlides[0].height} />
{/snippet}

{#snippet LightboxOverlayExtraSnippet(
  componentName: string,
  { cb, lightboxIndex }: { cb: () => void; lightboxIndex?: number }
)}
  {#if componentName === "LightboxOverlay" && lightboxIndex === undefined}
    <button class={underline_ui["underline-ui"]} style="margin-top: 5rem;" onclick={cb}
      >{testLightboxOverlay.openText}</button>
  {/if}
{/snippet}
