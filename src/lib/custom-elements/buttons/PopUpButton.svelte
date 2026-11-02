<svelte:options
  customElement={{
    tag: "skywalk-pop-up-button",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      text: { type: "String", attribute: "sw-text" },
      color: { type: "String", attribute: "sw-color" },
      bgColor: { type: "String", attribute: "sw-bg-color" },
      boxShadow: { type: "String", attribute: "sw-box-shadow" },
      activeBoxShadow: { type: "String", attribute: "sw-active-box-shadow" },
      swOnclick: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "buttons/PopUpButton", false, "pop-up-ui");
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
  import PopUpButton from "../../components/buttons/PopUpButton.svelte";

  let { text, color, bgColor, boxShadow, activeBoxShadow, swOnclick, style }: any = $props();
</script>

<PopUpButton {text} {color} {bgColor} {boxShadow} {activeBoxShadow} onclick={swOnclick} {style} />


<style>
  :host {
    display: block;
  }
</style>
      