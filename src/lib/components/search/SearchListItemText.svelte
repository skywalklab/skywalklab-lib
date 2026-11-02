<script lang="ts">
  import ListTree from "@lucide/svelte/icons/list-tree";
  import { escapeRegExp } from "../../utils/helpers.js";

  interface Props {
    /** Current search term, highlighted within the item. */
    value: string;
    /** Text of the item. */
    label: string;
    /** Text of the item's parent, shown as context. */
    groupLabel?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { value, label, groupLabel, style }: Props = $props();
  let uid: string = $props.id();

  function markMatchingValue(text: string): string {
    if (value === "") return text;
    return text.replace(new RegExp(escapeRegExp(value), "gi"), (match) => `<mark>${match}</mark>`);
  }
</script>

<span id="search-list-item-text-{uid}" class="search-list-item-text" {style}>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html markMatchingValue(label)}
  {#if groupLabel}
    <span class="search-list-item-text--parent">
      <ListTree size={20} /><span>{groupLabel}</span>
    </span>
  {/if}
</span>

<style>
  .search-list-item-text {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: color 0.15s linear;

    @media (prefers-reduced-motion: reduce) {
      transition: color 0.75s linear;
    }

    .search-list-item-text--parent {
      margin: 1px 0 0;
      display: flex;
      gap: 0.25rem;
      align-items: center;
      font-size: 12px;
      width: 100%;
      color: inherit;
      transition: inherit;

      :global svg {
        flex: 0 0 16px;
        transition: inherit;
      }

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        transition: inherit;
      }
    }

    :global mark {
      padding: 0 1px;
      color: var(--search-outline-color, var(--accent-dark, slategray));
      background-color: transparent;
      transition: inherit;
    }
  }
</style>
