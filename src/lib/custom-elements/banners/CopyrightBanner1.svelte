<svelte:options
  customElement={{
    tag: "skywalk-copyright-banner-1",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "banners/CopyrightBanner1", false);
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
  /* eslint-disable svelte/no-useless-children-snippet */
  import CopyrightBanner1 from "../../components/banners/CopyrightBanner1.svelte";

  let { style }: any = $props();
</script>

<CopyrightBanner1 {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</CopyrightBanner1>


<style>
  :host {
    display: block;
  }

  :global {
:where(.copyright-banner-1) {
    width: 100%;

    .copyright-banner-1--inner-container {
      width: fit-content;
      margin: 0 auto;
      text-align: center;
      padding-block: 30px;
    }
  }
  }
</style>
      