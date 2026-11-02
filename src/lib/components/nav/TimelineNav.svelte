<script lang="ts">
  import type { Snippet } from "svelte";
  import { snippetWrap } from "../../utils/snippets.js";
  import { slide, type SlideParams } from "svelte/transition";

  interface Props {
    /** Steps in the timeline, each passed to `buttonSnippet` and `itemSnippet`. */
    items: any[];
    /** Index of the open step, or -1 for none; bindable so a parent can track or set which step is open. */
    openItemIndex?: number;
    /** Called when the list item is clicked. */
    onclick?: (index: number) => void;
    /** Renders inside every step's button; `item` is that step and `index` its position in `items`. */
    buttonSnippet?: Snippet<[{ item: any; index: number }]>;
    /** Renders under the open step; `item` is that step and `index` its position in `items`. */
    itemSnippet?: Snippet<[{ item: any; index: number }]>;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { items, openItemIndex = $bindable(-1), onclick, buttonSnippet, itemSnippet, style }: Props = $props();
  let uid: string = $props.id();

  let activeItemIndex = $state<number>(openItemIndex);
  const deferredSlide = (node: Element, params: SlideParams) => () => slide(node, params);
</script>

<div
  id="timeline-nav-{uid}"
  class="timeline-nav"
  style:--timeline-nav-active-items={activeItemIndex + 1}
  style:--timeline-nav-total-items={items.length}
  {style}>
  <ul class="timeline-nav--list">
    {#each items as item, i (i)}
      <li
        class="timeline-nav--list-item"
        class:active={i <= activeItemIndex}
        class:active-latest={i === activeItemIndex}>
        <button
          class="timeline-nav--button"
          onclick={() => {
            openItemIndex = openItemIndex === i ? -1 : i;
            activeItemIndex = i;
            // activeItemIndex = openItemIndex;
            onclick?.(i);
          }}>
          {@render snippetWrap(buttonSnippet)?.({ item, index: i })}
        </button>
        {#if openItemIndex === i}
          <div class="timeline-nav--dropdown" in:deferredSlide={{ duration: 150 }}>
            {@render snippetWrap(itemSnippet)?.({ item, index: i })}
          </div>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style>
  .timeline-nav {
    --timeline-nav-padding-left: 1.75rem;
    --timeline-nav-marker-diameter: 10px;
    --timeline-nav-line-width: 2px;
    --timeline-nav-initial-line-color: oklch(from currentColor calc(l + (1 - round(l)) * 0.65 - round(l) * 0.45) c h);
    --timeline-nav-line-color: var(--timeline-nav-initial-line-color);
    --timeline-nav-min-item-height: 4rem;

    .timeline-nav--list {
      position: relative;
      display: flex;
      flex-direction: column;

      &:before {
        content: "";
        position: absolute;
        z-index: 3;
        top: var(--timeline-nav-marker-diameter);
        left: calc(var(--timeline-nav-marker-diameter) / 2);
        height: calc(var(--timeline-nav-min-item-height) * var(--timeline-nav-active-items));
        max-height: calc(var(--timeline-nav-min-item-height) * (var(--timeline-nav-total-items) - 1));
        width: var(--timeline-nav-line-width);
        background-color: currentColor;
        transition: height 0.3s linear;
      }

      .timeline-nav--list-item {
        position: relative;
        min-height: var(--timeline-nav-min-item-height);

        &.active {
          --timeline-nav-line-color: currentColor;

          &:not(:last-of-type) {
            .timeline-nav--button::before {
              transition: height 0.15s 0.3s linear;
              height: 100%;
            }
          }
        }

        &:last-of-type:after {
          display: none;
        }

        &:before,
        &:after {
          content: "";
          position: absolute;
          top: calc(var(--timeline-nav-marker-diameter) / 2);
          margin: auto 0;
          width: var(--timeline-nav-marker-diameter);
          height: auto;
          transition: background-color 0.15s linear;
          background-color: var(--timeline-nav-initial-line-color);
        }

        &:before {
          aspect-ratio: 1 / 1;
          left: calc(var(--timeline-nav-line-width) / 2);
          background-color: var(--timeline-nav-line-color);
          z-index: 4;
        }

        &:after {
          left: calc(var(--timeline-nav-marker-diameter) / 2);
          width: var(--timeline-nav-line-width);
          height: 100%;
          z-index: 2;
        }

        .timeline-nav--button {
          padding-left: var(--timeline-nav-padding-left);
          width: 100%;
          height: 100%;
          cursor: pointer;
          text-align: left;
          display: flex;
          z-index: 3;
          position: absolute;
          top: 0;
          left: 0;

          &::before {
            content: "";
            position: absolute;
            top: calc(var(--timeline-nav-marker-diameter) / 2);
            left: calc(var(--timeline-nav-marker-diameter) / 2);
            width: var(--timeline-nav-line-width);
            height: 0%;
            background-color: currentColor;
          }
        }

        .timeline-nav--dropdown {
          position: relative;
          top: 2rem;
          left: var(--timeline-nav-padding-left);
          z-index: 3;
          margin: 0 0 3rem;
        }
      }
    }
  }
</style>
