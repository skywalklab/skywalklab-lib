<svelte:options
  customElement={{
    tag: "skywalk-default-button",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      text: { type: "String", attribute: "sw-text" },
      color: { type: "String", attribute: "sw-color" },
      bgColor: { type: "String", attribute: "sw-bg-color" },
      disabledColor: { type: "String", attribute: "sw-disabled-color" },
      swOnclick: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "buttons/DefaultButton", false, "default-ui");
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
  import DefaultButton from "../../components/buttons/DefaultButton.svelte";

  let { text, color, bgColor, disabledColor, swOnclick, style }: any = $props();
</script>

<DefaultButton {text} {color} {bgColor} {disabledColor} onclick={swOnclick} {style} />


<style>
  :host {
    display: block;
  }
</style>
      