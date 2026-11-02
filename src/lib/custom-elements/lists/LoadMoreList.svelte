<svelte:options
  customElement={{
    tag: "skywalk-load-more-list",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items", reflect: true },
      limit: { type: "Number", attribute: "sw-limit" },
      promise: { type: "Object", attribute: "sw-promise" },
      loadItems: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "lists/LoadMoreList", false);
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
  import LoadMoreList from "../../components/lists/LoadMoreList.svelte";

  let { items = $bindable([]), limit, promise, loadItems, style }: any = $props();
</script>

<LoadMoreList bind:items={items} {limit} {promise} {loadItems} {style} >
  {#snippet itemSnippet()}
    <slot name="itemSnippet"/>
  {/snippet}
{#snippet loadingItemSnippet()}
    <slot name="loadingItemSnippet"/>
  {/snippet}
{#snippet loadBtnSnippet()}
    <slot name="loadBtnSnippet"/>
  {/snippet}
</LoadMoreList>


<style>
  :host {
    display: block;
  }

  :global {
.load-more-list {
    list-style: none;
    margin: 0;
    padding: 0;

    .load-more-list--button-item {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        border: none;
        background-color: transparent;
      }
    }
  }
  }
</style>
      