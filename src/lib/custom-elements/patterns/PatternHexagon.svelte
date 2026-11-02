<svelte:options
  customElement={{
    tag: "skywalk-pattern-hexagon",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      bgColor: { type: "String", attribute: "sw-bg-color" },
      outlineColor: { type: "String", attribute: "sw-outline-color" },
      dotColor: { type: "String", attribute: "sw-dot-color" },
      backOutlineColor: { type: "String", attribute: "sw-back-outline-color" },
      opacity: { type: "Number", attribute: "sw-opacity" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "patterns/PatternHexagon", false);
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
  import PatternHexagon from "../../components/patterns/PatternHexagon.svelte";

  let { bgColor, outlineColor, dotColor, backOutlineColor, opacity, style }: any = $props();
</script>

<PatternHexagon {bgColor} {outlineColor} {dotColor} {backOutlineColor} {opacity} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.pattern-hexagon {
    width: 100%;
    height: 100%;
    background-color: var(--pattern-hexagon-bg-color);
  }
  }
</style>
      