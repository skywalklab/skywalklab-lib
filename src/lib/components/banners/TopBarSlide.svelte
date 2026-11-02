<script lang="ts">
  import type { Snippet } from "svelte";
  import { snippetWrap } from "../../utils/snippets.js";

  interface Props {
    /** Items to render. Each item is passed to `itemSnippet`, which decides how to render it. */
    items: any[];
    /** Keeps the highlight on the last hovered item when the pointer leaves the bar.  */
    keepActive?: boolean;
    /** Index of the hovered item, or `-1` when none is; bind it to react to hover from a parent. */
    activeItemIndex?: number;
    /** Text color. Sets `--top-bar-slide-color`. */
    color?: string;
    /** Bar background color. Sets `--top-bar-slide-bg-color`. */
    bgColor?: string;
    /** Background color of the highlight that slides behind the hovered item. Sets `--top-bar-slide-active-bg-color`. */
    activeBgColor?: string;
    /** Renders each item inside its hover target; `item` is the entry from `items` and `index` its position. */
    itemSnippet: Snippet<[{ item: any; index: number }]>;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    items,
    keepActive = false,
    activeItemIndex = $bindable(keepActive ? 0 : -1),
    color = "#fff",
    bgColor = "var(--accent-dark, color-mix(in srgb, #000, #fff 35%))",
    activeBgColor = "var(--primary, black)",
    itemSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();

  let wasInactive = $state<boolean>(true);
  let activeItemOffsetX = $state<number | undefined>();
  let activeItemWidth = $state<number | undefined>();
</script>

<div
  id="top-bar-slide-{uid}"
  class="top-bar-slide"
  class:active={activeItemIndex !== -1}
  class:inactive={wasInactive}
  style:--top-bar-slide-color={color}
  style:--top-bar-slide-bg-color={bgColor}
  style:--top-bar-slide-active-bg-color={activeBgColor}
  style:--top-bar-slide-offset-x={activeItemOffsetX + "px"}
  style:--top-bar-slide-width={activeItemWidth + "px"}
  role="presentation"
  onmouseleave={() => {
    if (keepActive) return;
    activeItemIndex = -1;
  }}
  {@attach (node) => {
    $effect(() => {
      if (activeItemIndex === -1) return;

      const activeItem = node.children[activeItemIndex] as HTMLDivElement;
      activeItemOffsetX = activeItem.offsetLeft;
      activeItemWidth = activeItem.clientWidth;
    });
  }}
  {style}>
  {#each items as any as item, i (i)}
    <div
      class="top-bar-slide--item"
      class:active={i === activeItemIndex}
      role="presentation"
      onmouseenter={() => {
        wasInactive = activeItemIndex === -1;
        activeItemIndex = i;
      }}>
      {@render snippetWrap(itemSnippet)({ item, index: i })}
    </div>
  {/each}
</div>

<style>
  .top-bar-slide {
    --top-bar-slide-padding: 4px;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: var(--top-bar-slide-padding);
    width: fit-content;
    border-radius: 10px;
    overflow: hidden;
    color: var(--top-bar-slide-color);
    background-color: var(--top-bar-slide-bg-color);
    position: relative;

    &.active {
      &::before {
        opacity: 1;
        transition:
          width 0.15s linear,
          transform 0.15s linear,
          opacity 0.15s linear;
      }
    }

    &.inactive {
      &::before {
        transition: opacity 0.15s linear;
      }
    }

    &::before {
      content: "";
      width: var(--top-bar-slide-width);
      height: calc(100% - (var(--top-bar-slide-padding) * 2));
      top: 0;
      bottom: 0;
      left: 0;
      transform: translateX(var(--top-bar-slide-offset-x));
      margin: auto 0;
      position: absolute;
      background-color: var(--top-bar-slide-active-bg-color);
      border-radius: 8px;
      z-index: 1;
      opacity: 0;
    }

    .top-bar-slide--item {
      position: relative;
      z-index: 1;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      > :global(:first-child) {
        padding: 2px 12px;
      }
    }
  }
</style>
