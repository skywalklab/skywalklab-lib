<svelte:options
  customElement={{
    tag: "skywalk-pattern-world-map",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      bgColor: { type: "String", attribute: "sw-bg-color" },
      activeColor: { type: "String", attribute: "sw-active-color" },
      inactiveColor: { type: "String", attribute: "sw-inactive-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "patterns/PatternWorldMap", false);
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
  import PatternWorldMap from "../../components/patterns/PatternWorldMap.svelte";

  let { bgColor, activeColor, inactiveColor, style }: any = $props();
</script>

<PatternWorldMap {bgColor} {activeColor} {inactiveColor} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.pattern-world-map {
    width: 100%;
    height: 100%;
    background-color: var(--pattern-world-map-bg-color);
  }
  }
</style>
      