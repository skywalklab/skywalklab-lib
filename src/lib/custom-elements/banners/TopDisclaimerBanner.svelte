<svelte:options
  customElement={{
    tag: "skywalk-top-disclaimer-banner",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      clientHeight: { type: "Number", attribute: "sw-client-height", reflect: true },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "banners/TopDisclaimerBanner", false);
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
  import TopDisclaimerBanner from "../../components/banners/TopDisclaimerBanner.svelte";

  let { clientHeight = $bindable(34), style }: any = $props();
</script>

<TopDisclaimerBanner bind:clientHeight={clientHeight} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</TopDisclaimerBanner>


<style>
  :host {
    display: block;
  }

  :global {
.top-disclaimer-banner {
    width: 100vw;

    .top-disclaimer-banner--inner-container {
      width: fit-content;
      margin: 0 auto;
      text-align: center;
      padding-block: 0.25rem;
    }
  }
  }
</style>
      