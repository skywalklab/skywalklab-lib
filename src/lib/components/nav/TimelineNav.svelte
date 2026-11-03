<script lang="ts">
  import { untrack, type Snippet } from "svelte";
  import { snippetWrap } from "../../utils/snippets.js";
  import { slide, type SlideParams } from "svelte/transition";

  interface Props {
    /** Steps in the timeline, each passed to `buttonSnippet` and `itemSnippet`. */
    items: any[];
    /** Index of the open step, or -1 for none; bindable so a parent can track or set which step is open. */
    activeItemIndex?: number;
    /** Seconds for each step of the line and marker transitions, and for the dropdown slide. */
    transitionTiming?: number;
    /** Called when the list item is clicked. */
    onclick?: (index: number) => void;
    /** Renders inside every step's button; `item` is that step and `index` its position in `items`. */
    buttonSnippet?: Snippet<[{ item: any; index: number }]>;
    /** Renders under the open step; `item` is that step and `index` its position in `items`. */
    itemSnippet?: Snippet<[{ item: any; index: number }]>;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    items,
    activeItemIndex = $bindable(-1),
    transitionTiming = 1,
    onclick,
    buttonSnippet,
    itemSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();

  const deferredSlide = (node: Element, params: SlideParams) => () => slide(node, params);

  let fromIndex = $state(activeItemIndex);
  let toIndex = $state(activeItemIndex);
  $effect.pre(() => {
    const next = activeItemIndex;
    untrack(() => {
      if (next === toIndex) return;
      fromIndex = toIndex;
      toIndex = next;
    });
  });

  const transitionDelay = (i: number): number => {
    const step = toIndex > fromIndex ? i - fromIndex - 1 : fromIndex - i;
    const delay = Math.max(step, 0) * (transitionTiming / items.length);

    return delay;
  };
</script>

<div
  id="timeline-nav-{uid}"
  class="timeline-nav"
  style:--timeline-nav-active-items={activeItemIndex + 1}
  style:--timeline-nav-total-items={items.length}
  style:--timeline-nav-timing-duration={transitionTiming / items.length + "s"}
  {style}>
  <ul class="timeline-nav--list">
    {#each items as item, i (i)}
      <li
        class="timeline-nav--list-item"
        class:active={i <= activeItemIndex}
        class:active-open={i === activeItemIndex}
        style:--timeline-nav-item-transition-delay={transitionDelay(i) + "s"}>
        <button
          class="timeline-nav--button"
          onclick={() => {
            activeItemIndex = activeItemIndex === i ? -1 : i;

            onclick?.(i);
          }}>
          {@render snippetWrap(buttonSnippet)?.({ item, index: i })}
        </button>
        {#if activeItemIndex === i}
          <div
            class="timeline-nav--dropdown"
            in:deferredSlide={{ duration: 300 }}
            out:deferredSlide={{ duration: transitionDelay(i) * 1000 }}>
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

      .timeline-nav--list-item {
        position: relative;
        min-height: var(--timeline-nav-min-item-height);

        &.active {
          &::before {
            background-color: currentColor;
          }

          &:not(:last-of-type) {
            .timeline-nav--button::before {
              height: 100%;
            }
          }
        }

        &:before,
        &:after {
          content: "";
          position: absolute;
          top: calc(var(--timeline-nav-marker-diameter) / 2);
          margin: auto 0;
          background-color: var(--timeline-nav-initial-line-color);
          transition: background-color var(--timeline-nav-timing-duration) linear;
        }

        &:before {
          aspect-ratio: 1 / 1;
          left: calc(var(--timeline-nav-line-width) / 2);
          width: var(--timeline-nav-marker-diameter);
          height: auto;
          z-index: 4;
          transition-delay: var(--timeline-nav-item-transition-delay);
        }

        &:after {
          left: calc(var(--timeline-nav-marker-diameter) / 2);
          width: var(--timeline-nav-line-width);
          height: 100%;
          z-index: 2;
        }

        &:last-of-type:after {
          display: none;
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
            transition: height var(--timeline-nav-timing-duration) linear;
            transition-delay: var(--timeline-nav-item-transition-delay);
            /* display: none; */
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
