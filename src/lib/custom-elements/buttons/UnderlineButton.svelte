<svelte:options
  customElement={{
    tag: "skywalk-underline-button",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      text: { type: "String", attribute: "sw-text" },
      lineHeight: { type: "String", attribute: "sw-line-height" },
      color: { type: "String", attribute: "sw-color" },
      bgColor: { type: "String", attribute: "sw-bg-color" },
      hoverColor: { type: "String", attribute: "sw-hover-color" },
      hoverBgColor: { type: "String", attribute: "sw-hover-bg-color" },
      swOnclick: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "buttons/UnderlineButton", false, "underline-ui");
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
  import UnderlineButton from "../../components/buttons/UnderlineButton.svelte";

  let { text, lineHeight, color, bgColor, hoverColor, hoverBgColor, swOnclick, style }: any = $props();
</script>

<UnderlineButton {text} {lineHeight} {color} {bgColor} {hoverColor} {hoverBgColor} onclick={swOnclick} {style} />


<style>
  :host {
    display: block;
  }
</style>
      