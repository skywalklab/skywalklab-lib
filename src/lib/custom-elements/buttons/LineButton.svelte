<svelte:options
  customElement={{
    tag: "skywalk-line-button",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      text: { type: "String", attribute: "sw-text" },
      lineWidthMin: { type: "String", attribute: "sw-line-width-min" },
      lineWidthMax: { type: "String", attribute: "sw-line-width-max" },
      swOnclick: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "buttons/LineButton", false, "line-ui");
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
  import LineButton from "../../components/buttons/LineButton.svelte";

  let { text, lineWidthMin, lineWidthMax, swOnclick, style }: any = $props();
</script>

<LineButton {text} {lineWidthMin} {lineWidthMax} onclick={swOnclick} {style} />


<style>
  :host {
    display: block;
  }
</style>
      