<svelte:options
  customElement={{
    tag: "skywalk-accordion",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      summary: { type: "String", attribute: "sw-summary" },
      open: { type: "Boolean", attribute: "sw-open" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "disclosure/Accordion", false);
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
  import Accordion from "../../components/disclosure/Accordion.svelte";

  let { summary, open, style }: any = $props();
</script>

<Accordion {summary} {open} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</Accordion>


<style>
  :host {
    display: block;
  }

  :global {
.accordion {
    width: 100%;
    border: 1px solid #e6e6e7;
    overflow: hidden;
    border-radius: 5px;

    .accordion--button {
      width: 100%;
      background-color: #f9f9f9;
      border: none;
      text-align: left;
      cursor: pointer;
      padding: 8px 20px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .accordion--content {
      width: 100%;
      background-color: #ffffff;
      padding: 1rem 2vw;

      @media (min-width: 768px) {
        padding: 1rem 2rem;
      }
    }
  }
  }
</style>
      