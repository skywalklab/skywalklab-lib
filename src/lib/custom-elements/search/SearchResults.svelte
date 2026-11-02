<svelte:options
  customElement={{
    tag: "skywalk-search-results",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      value: { type: "String", attribute: "sw-value", reflect: true },
      suggestions: { type: "Array", attribute: "sw-suggestions" },
      swOnItemClick: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "search/SearchResults", false, "logo-list");
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
  import SearchResults from "../../components/search/SearchResults.svelte";

  let { items, value = $bindable(), suggestions, swOnItemClick, style }: any = $props();
</script>

<SearchResults {items} bind:value={value} {suggestions} onItemClick={swOnItemClick} {style} >
  {#snippet itemTextSnippet()}
    <slot name="itemTextSnippet"/>
  {/snippet}
{#snippet children()}
    <slot />
  {/snippet}
</SearchResults>


<style>
  :host {
    display: block;
  }

  :global {
.search-results {
    --logo-list-marker-bg-color: var(--search-outline-color, var(--accent-dark, slategray));

    .search-results--empty {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      color: var(--search-color, var(--primary, black));
    }
  }

:is(ul.search-list) {
    gap: 0.25rem;
    margin: 0;
    padding: 2px;
    width: 100%;
    height: fit-content;
    overflow-y: auto;
    --logo-list-marker-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlLWxpZ2h0YnVsYiI+PHBhdGggZD0iTTE1IDE0Yy4yLTEgLjctMS43IDEuNS0yLjUgMS0uOSAxLjUtMi4yIDEuNS0zLjVBNiA2IDAgMCAwIDYgOGMwIDEgLjIgMi4yIDEuNSAzLjUuNy43IDEuMyAxLjUgMS41IDIuNSIvPjxwYXRoIGQ9Ik05IDE4aDYiLz48cGF0aCBkPSJNMTAgMjJoNCIvPjwvc3ZnPg==");

    li.search-list--item {
      border-radius: 6px;
      background-color: #ffffff;
      min-height: 3.25rem;
      overflow: hidden;
      transition: background-color 0.15s linear;

      &:hover :global {
        .search-list-item-text--parent,
        mark {
          color: inherit;
        }
      }

      .search-list--button {
        min-height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        font-size: 16px;
        color: var(--search-color, var(--primary, black));
        cursor: pointer;
      }
    }
  }
  }
</style>
      