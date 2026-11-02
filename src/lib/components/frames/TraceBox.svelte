<script lang="ts">
  import type { Snippet } from "svelte";
  import Plus from "@lucide/svelte/icons/plus";
  import {
    handleIntersectionEvent,
    type IntersectionAction,
    type IntersectionActionParams
  } from "../../actions/intersection-observer.svelte.js";
  import { addEntryAnimateFallback } from "../../actions/entry-animate.js";
  import { kebab } from "../../utils/helpers.js";

  interface Props {
    /** Length the border extends past the content on each axis. Sets `--trace-box-length`. */
    traceLength?: string;
    /** Color of the traced border. Sets `--trace-box-color`. */
    traceColor?: string;
    /** Which corners show a plus marker. Defaults to the top left only. */
    tracePlus?: {
      /** Show a plus at the top left corner. */
      topLeft?: boolean;
      /** Show a plus at the bottom left corner. */
      bottomLeft?: boolean;
      /** Show a plus at the top right corner. */
      topRight?: boolean;
      /** Show a plus at the bottom right corner. */
      bottomRight?: boolean;
    };
    /** Color of the corner plus markers. Sets `--trace-box-plus-color`. */
    tracePlusColor?: string;
    /** When the animation runs: `onLoad` starts it on page load, `onEnter` starts or resumes it when the component scrolls into view, `onLeave` stops it when it scrolls out. */
    intersectionActions?: IntersectionAction[];
    /** Settings for the intersection observer behind those events. `noAnimate` skips it entirely, as does `prefers-reduced-motion`. Passing `onLoad`, `onEnter` or `onLeave` here replaces the component's own handler for that event. */
    intersectionActionParams?: IntersectionActionParams;
    /** Rendered inside the traced box, after the corner markers, e.g. a block of text. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    traceLength = "30px",
    traceColor = "var(--primary, black)",
    tracePlus = {
      topLeft: true,
      bottomLeft: false,
      topRight: false,
      bottomRight: false
    },
    tracePlusColor = "var(--accent-dark, slategray)",
    intersectionActions = [],
    intersectionActionParams,
    children,
    style
  }: Props = $props();
  let uid: string = $props.id();

  const tracePluses = $derived(
    Object.entries(tracePlus)
      .filter(([, val]) => val)
      .map(([key]) => kebab(key))
  );
</script>

<div
  class="trace-box"
  class:entry-animate={intersectionActions.length > 0}
  style:--trace-box-color={traceColor}
  style:--trace-box-length={traceLength}
  style:--trace-box-plus-color={tracePlusColor}
  {style}
  id="trace-box-{uid}"
  use:handleIntersectionEvent={{
    key: `trace-box-${uid}`,
    ...addEntryAnimateFallback(intersectionActions),
    ...intersectionActionParams
  }}>
  {#each tracePluses as location (location)}
    <span class="trace-box--plus {location}">
      <Plus size={24} />
    </span>
  {/each}
  {@render children()}
</div>

<style>
  .trace-box {
    --trace-box-border-width: 1px;
    position: relative;
    padding: 1rem;
    color: currentColor;
    background: radial-gradient(
      ellipse at top left,
      color-mix(in srgb, var(--trace-box-color) 50%, transparent),
      var(--trace-box-color) 50%
    );

    &.entry-animate {
      .trace-box--plus {
        &.top-left {
          transform: translate(-50%, -50%) rotate(-90deg);
        }

        &.bottom-left {
          transform: translate(-50%, 50%) rotate(-90deg);
        }

        &.top-right {
          transform: translate(50%, -50%) rotate(-90deg);
        }

        &.bottom-right {
          transform: translate(50%, 50%) rotate(-90deg);
        }
      }
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      border: var(--trace-box-border-width) solid color-mix(in srgb, var(--trace-box-color) 50%, transparent);
      pointer-events: none;
    }

    &::before {
      width: calc(100% + var(--trace-box-length));
      height: 100%;
      border-left: none;
      border-right: none;
      transform: translateX(calc(var(--trace-box-length) / -2));
    }

    &::after {
      width: 100%;
      height: calc(100% + var(--trace-box-length));
      border-top: none;
      border-bottom: none;
    }

    .trace-box--plus {
      position: absolute;
      z-index: 2;
      color: var(--trace-box-plus-color);
      transition: transform 0.5s cubic-bezier(0, 0, 0.58, 1);

      @media (prefers-reduced-motion: reduce) {
        transition: transform 1s cubic-bezier(0, 0, 0.58, 1);
      }

      &.top-left {
        top: calc(var(--trace-box-border-width) * 0.5);
        left: calc(var(--trace-box-border-width) * 0.5);
        transform: translate(-50%, -50%);
      }

      &.bottom-left {
        bottom: calc(var(--trace-box-border-width) * 0.5);
        left: calc(var(--trace-box-border-width) * 0.5);
        transform: translate(-50%, 50%);
      }

      &.top-right {
        top: calc(var(--trace-box-border-width) * 0.5);
        right: calc(var(--trace-box-border-width) * 0.5);
        transform: translate(50%, -50%);
      }

      &.bottom-right {
        bottom: calc(var(--trace-box-border-width) * 0.5);
        right: calc(var(--trace-box-border-width) * 0.5);
        transform: translate(50%, 50%);
      }
    }
  }
</style>
