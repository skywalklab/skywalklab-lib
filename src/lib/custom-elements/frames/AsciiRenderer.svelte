<svelte:options
  customElement={{
    tag: "skywalk-ascii-renderer",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      src: { type: "String", attribute: "sw-src" },
      density: { type: "Number", attribute: "sw-density" },
      strength: { type: "Number", attribute: "sw-strength" },
      color: { type: "String", attribute: "sw-color" },
      backgroundColor: { type: "String", attribute: "sw-background-color" },
      glitch: { type: "Boolean", attribute: "sw-glitch" },
      glitchSpeed: { type: "Number", attribute: "sw-glitch-speed" },
      fillLetterbox: { type: "Boolean", attribute: "sw-fill-letterbox" },
      fit: { type: "String", attribute: "sw-fit" },
      position: { type: "String", attribute: "sw-position" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "frames/AsciiRenderer", false);
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
  import AsciiRenderer from "../../components/frames/AsciiRenderer.svelte";

  let { src, density, strength, color, backgroundColor, glitch, glitchSpeed, fillLetterbox, fit, position, style }: any = $props();
</script>

<AsciiRenderer {src} {density} {strength} {color} {backgroundColor} {glitch} {glitchSpeed} {fillLetterbox} {fit} {position} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.ascii-renderer {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

    .ascii-renderer--inner-container {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
  }
  }
</style>
      