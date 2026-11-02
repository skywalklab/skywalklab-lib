<svelte:options
  customElement={{
    tag: "skywalk-logo-list",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      markerBgColor: { type: "String", attribute: "sw-marker-bg-color" },
      nestedMarkerBgColor: { type: "String", attribute: "sw-nested-marker-bg-color" },
      outlineMarkerColor: { type: "String", attribute: "sw-outline-marker-color" },
      markerImage: { type: "String", attribute: "sw-marker-image" },
      markerSize: { type: "String", attribute: "sw-marker-size" },
      markerMinHeight: { type: "String", attribute: "sw-marker-min-height" },
      gap: { type: "String", attribute: "sw-gap" },
      arrowScale: { type: "String", attribute: "sw-arrow-scale" },
      items: { type: "Array", attribute: "sw-items" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "lists/LogoList", false, "logo-list");
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
  import LogoList from "../../components/lists/LogoList.svelte";

  let { markerBgColor, nestedMarkerBgColor, outlineMarkerColor, markerImage, markerSize, markerMinHeight, gap, arrowScale, items, style }: any = $props();
</script>

<LogoList {markerBgColor} {nestedMarkerBgColor} {outlineMarkerColor} {markerImage} {markerSize} {markerMinHeight} {gap} {arrowScale} {items} {style} />


<style>
  :host {
    display: block;
  }
</style>
      