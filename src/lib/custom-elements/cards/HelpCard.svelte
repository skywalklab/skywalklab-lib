<svelte:options
  customElement={{
    tag: "skywalk-help-card",
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
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "cards/HelpCard", false);
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
  import HelpCard from "../../components/cards/HelpCard.svelte";

  let { style }: any = $props();
</script>

<HelpCard {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</HelpCard>


<style>
  :host {
    display: block;
  }

  :global {
.help-card {
    max-width: 300px;
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 10px;
    border-left: 4px solid var(--primary, black);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }
  }
</style>
      