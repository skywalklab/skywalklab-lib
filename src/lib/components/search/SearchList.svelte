<script lang="ts">
  import SquareArrowOutDownLeft from "@lucide/svelte/icons/square-arrow-out-down-left";
  import type { Snippet } from "svelte";
  import { flip } from "svelte/animate";
  import logo_list from "../../css-modules/logo-list.module.css";
  import { prefersReducedMotion } from "svelte/motion";
  import { snippetWrap } from "../../utils/snippets.js";

  interface Props {
    /** Items shown in the list. */
    items: string[];
    /** Called when an item is clicked. */
    onItemClick: (text: string) => void;
    /** Snippet rendering each item's text. */
    itemTextSnippet: Snippet<[{ text: string; index: number }]>;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { items, onItemClick, itemTextSnippet, style }: Props = $props();
  let uid: string = $props.id();
</script>

<ul id="search-list-{uid}" class={`${logo_list["logo-list"]} search-list`} {style}>
  {#each items as text, index (text)}
    <li
      class="{logo_list['active-hover']} search-list--item"
      animate:flip={{ duration: prefersReducedMotion.current ? 400 : 150 }}>
      <button class="search-list--button" onclick={() => onItemClick(text)}
        >{@render snippetWrap(itemTextSnippet)({ text, index })}<SquareArrowOutDownLeft /></button>
    </li>
  {/each}
</ul>

<style>
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
</style>
