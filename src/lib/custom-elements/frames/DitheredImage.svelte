<svelte:options
  customElement={{
    tag: "skywalk-dithered-image",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      src: { type: "String", attribute: "sw-src" },
      ditherMap: { type: "String", attribute: "sw-dither-map" },
      pixelSize: { type: "Number", attribute: "sw-pixel-size" },
      color: { type: "String", attribute: "sw-color" },
      backgroundColor: { type: "String", attribute: "sw-background-color" },
      threshold: { type: "Number", attribute: "sw-threshold" },
      fit: { type: "String", attribute: "sw-fit" },
      position: { type: "String", attribute: "sw-position" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "frames/DitheredImage", false);
        }

        connectedCallback() {
          this.#adopt();
          return (Base.prototype as any).connectedCallback.call(this);
        }

        attributeChangedCallback(...args: any[]) {
          const result = (Base.prototype as any).attributeChangedCallback.apply(this, args);
          if (this.shadowRoot) this.#adopt();
          return result;
        }
      }
  }} />

<script module lang="ts">
  import { shadowSheets } from "../../utils/shadow-styles.js";
</script>

<script lang="ts">
  import DitheredImage from "../../components/frames/DitheredImage.svelte";

  let { src, ditherMap, pixelSize, color, backgroundColor, threshold, fit, position, style }: any = $props();
</script>

<DitheredImage {src} {ditherMap} {pixelSize} {color} {backgroundColor} {threshold} {fit} {position} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.dithered-image {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

    .dithered-image--inner-container {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
  }

.dithered-image-scene {
    width: 100%;
    height: 100%;
  }
  }
</style>
      