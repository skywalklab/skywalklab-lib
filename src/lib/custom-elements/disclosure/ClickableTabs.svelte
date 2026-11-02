<svelte:options
  customElement={{
    tag: "skywalk-clickable-tabs",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      useSelect: { type: "Boolean", attribute: "sw-use-select" },
      ariaLabel: { type: "String", attribute: "sw-aria-label" },
      selected: { type: "Number", attribute: "sw-selected" },
      swOnclick: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "disclosure/ClickableTabs", false);
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
  import ClickableTabs from "../../components/disclosure/ClickableTabs.svelte";

  let { items, useSelect, ariaLabel, selected, swOnclick, style }: any = $props();
</script>

<ClickableTabs {items} {useSelect} {ariaLabel} {selected} onclick={swOnclick} {style} >
  {#snippet buttonSnippet()}
    <slot name="buttonSnippet"/>
  {/snippet}
{#snippet panelSnippet()}
    <slot name="panelSnippet"/>
  {/snippet}
</ClickableTabs>


<style>
  :host {
    display: block;
  }

  :global {
.clickable-tabs {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .clickable-tabs--buttons {
    flex: 1;
    min-width: 280px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0 auto;

    select {
      padding: 0.75rem clamp(0.5rem, 2vw, 1.5rem);
    }

    button {
      width: 100%;
      padding: 0;
      background-color: transparent;
      border: none;

      :global > :first-child {
        width: 100%;
        padding: 0.75rem 1.5rem;
      }
    }
  }

  .clickable-tabs--content {
    flex: 1;
    min-width: 280px;

    @media (min-width: 480px) {
      min-width: 450px;
    }

    .clickable-tabs--content-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
  }
</style>
      