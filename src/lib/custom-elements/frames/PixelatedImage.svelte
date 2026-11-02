<svelte:options
  customElement={{
    tag: "skywalk-pixelated-image",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      src: { type: "String", attribute: "sw-src" },
      initialGridSize: { type: "Number", attribute: "sw-initial-grid-size" },
      stepDuration: { type: "Number", attribute: "sw-step-duration" },
      pauseStep: { type: "Number", attribute: "sw-pause-step" },
      swOncomplete: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "frames/PixelatedImage", false);
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
  import PixelatedImage from "../../components/frames/PixelatedImage.svelte";

  let { src, initialGridSize, stepDuration, pauseStep, swOncomplete, style }: any = $props();
</script>

<PixelatedImage {src} {initialGridSize} {stepDuration} {pauseStep} oncomplete={swOncomplete} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.pixelated-image {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .pixelated-image--inner-container {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
  }

.pixelated-image-scene {
    width: 100%;
    height: 100%;
  }
  }
</style>
      