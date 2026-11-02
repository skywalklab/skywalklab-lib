<script lang="ts">
  import SearchX from "@lucide/svelte/icons/search-x";
  import SearchList from "./SearchList.svelte";
  import type { Snippet } from "svelte";

  interface Props {
    /** Matching items for the current search. */
    items: string[];
    /** Current search term. Bindable; read to decide between results, the empty state and suggestions, and cleared when an item is picked. */
    value: string;
    /** Terms offered when the search is empty. */
    suggestions?: string[];
    /** Called when a result is clicked. */
    onItemClick: (text: string) => void;
    /** Snippet rendering each result's text. */
    itemTextSnippet: Snippet<[{ text: string; index: number }]>;
    /** Rendered above the results, the empty-state term or the suggestions; `result` says which is showing, e.g. a heading or an empty-state message. */
    children?: Snippet<[{ result: "list" | "empty" | "suggestions" }]>;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { items, value = $bindable(), suggestions, onItemClick, itemTextSnippet, children, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="search-results-{uid}" class="search-results" {style}>
  {#if value !== "" && [...items].length > 0}
    {@render children?.({ result: "list" })}
    <SearchList {items} {onItemClick} {itemTextSnippet} />
  {:else if value !== "" && [...items].length < 1}
    <div class="search-results--empty">
      <SearchX size={48} />
      {@render children?.({ result: "empty" })}
      <p class="search-results--empty-text">"{value}"</p>
    </div>
  {:else if value === "" && suggestions}
    {@render children?.({ result: "suggestions" })}
    <SearchList items={suggestions} {onItemClick} {itemTextSnippet} />
  {/if}
</div>

<style>
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
</style>
