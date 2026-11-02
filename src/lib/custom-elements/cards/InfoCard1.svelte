<svelte:options
  customElement={{
    tag: "skywalk-info-card-1",
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
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "cards/InfoCard1", false);
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
  import InfoCard1 from "../../components/cards/InfoCard1.svelte";

  let { style }: any = $props();
</script>

<InfoCard1 {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</InfoCard1>


<style>
  :host {
    display: block;
  }

  :global {
.info-card-1 {
    display: flex;
    flex-direction: column;
  }
  }
</style>
      