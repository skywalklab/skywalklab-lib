<svelte:options
  customElement={{
    tag: "skywalk-pattern-grid",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      bgColor: { type: "String", attribute: "sw-bg-color" },
      fadeStart: { type: "String", attribute: "sw-fade-start" },
      fadeMid: { type: "String", attribute: "sw-fade-mid" },
      fadeEnd: { type: "String", attribute: "sw-fade-end" },
      patternFillColor: { type: "String", attribute: "sw-pattern-fill-color" },
      patternFillOpacity: { type: "Number", attribute: "sw-pattern-fill-opacity" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "patterns/PatternGrid", false);
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
  import PatternGrid from "../../components/patterns/PatternGrid.svelte";

  let { bgColor, fadeStart, fadeMid, fadeEnd, patternFillColor, patternFillOpacity, style }: any = $props();
</script>

<PatternGrid {bgColor} {fadeStart} {fadeMid} {fadeEnd} {patternFillColor} {patternFillOpacity} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.pattern-grid {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    transition: opacity 0.15s linear;

    .pattern-grid--bg {
      fill: var(--pattern-grid-bg-color);
    }

    .pattern-grid--pattern {
      opacity: 0.5;
      transition: inherit;
    }
  }
  }
</style>
      