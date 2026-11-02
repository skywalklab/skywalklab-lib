<script lang="ts">
  import { snippetWrap } from "../../utils/snippets.js";
  import { type Snippet } from "svelte";

  interface Props {
    /** Items rendered in the list. Bindable, and the component appends each loaded page to it. Leave empty to have it fetch the first page itself. */
    items?: any[];
    /** How many items to show per page. The component asks `loadItems` for one more than this to find out whether another page exists. */
    limit?: number;
    /** The in-flight fetch, awaited to show `loadingItemSnippet`. Bindable. Leave it unset and the component calls `loadItems` itself for the first page, unless `items` already has entries. */
    promise?: Promise<any[]> | any[];
    /** Fetches a page. Receives `{ limit, offset }` and returns the items, or a promise of them. */
    loadItems: (context?: { limit?: number; offset?: number }) => Promise<any[]> | any[];
    /** Rendered once per loaded item; receives the item. */
    itemSnippet: Snippet<[{ item: any; index: number }]>;
    /** Rendered `limit` times in place of the list while a fetch is in flight. */
    loadingItemSnippet?: Snippet;
    /** Rendered inside the load-more button. Hidden once a page comes back short, meaning there is nothing left to load. */
    loadBtnSnippet: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    items = $bindable([]),
    limit = 3,
    promise = $bindable(undefined),
    loadItems,
    itemSnippet,
    loadingItemSnippet,
    loadBtnSnippet,
    style
  }: Props = $props();

  let uid: string = $props.id();
  let isComplete = $state<boolean>(false);

  const promiseContext = () => ({ limit: limit + 1, offset: items.length });

  const handleLoadMore = () => {
    promise = loadItems(promiseContext());
  };

  $effect.pre(() => {
    if (!loadItems) return;
    if (promise === undefined && items.length < 1) {
      handleLoadMore();
    }
  });

  $effect(() => {
    Promise.resolve(promise ?? []).then((nextItems) => {
      isComplete = nextItems.length <= limit;
      const newItems = isComplete ? nextItems : nextItems.slice(0, -1);
      items = [...items, ...newItems];
    });
  });
</script>

<ul id="load-more-list-{uid}" class="load-more-list" {style}>
  {#each items as item, index (index)}
    <li class="load-more-list--item">{@render snippetWrap(itemSnippet)({ item, index })}</li>
  {/each}
  {#await promise}
    {#each Array(limit).fill(""), index (index)}
      <li class="load-more-list--loading-item">{@render loadingItemSnippet?.()}</li>
    {/each}
  {:then}
    {#if !isComplete}
      <li class="load-more-list--button-item">
        <button onclick={handleLoadMore}>{@render loadBtnSnippet()}</button>
      </li>
    {/if}
  {/await}
</ul>

<style>
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
</style>
