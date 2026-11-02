<svelte:options
  customElement={{
    tag: "skywalk-hamburger-base",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      open: { type: "Boolean", attribute: "sw-open", reflect: true },
      type: { type: "String", attribute: "sw-type" },
      title: { type: "String", attribute: "sw-title" },
      ariaControls: { type: "String", attribute: "sw-aria-controls" },
      ariaLabel: { type: "String", attribute: "sw-aria-label" },
      cssModule: { type: "Object", attribute: "sw-css-module" },
      swOnclick: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "nav/HamburgerBase", false, "hamburgers/hamburger-base");
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
  import HamburgerBase from "../../components/nav/HamburgerBase.svelte";

  let { open = $bindable(false), type, title, ariaControls, ariaLabel, cssModule, swOnclick, style }: any = $props();
</script>

<HamburgerBase bind:open={open} {type} {title} {ariaControls} {ariaLabel} {cssModule} onclick={swOnclick} {style} />


<style>
  :host {
    display: block;
  }
</style>
      