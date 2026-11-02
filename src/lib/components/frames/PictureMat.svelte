<script lang="ts">
  import {
    handleIntersectionEvent,
    type IntersectionAction,
    type IntersectionActionParams
  } from "../../actions/intersection-observer.svelte.js";
  import { addEntryAnimateFallback } from "../../actions/entry-animate.js";
  import type { Snippet } from "svelte";

  interface Props {
    /** Offsets the mat upward from the content, e.g. `-1rem` sits it 1rem above. Sets `--picture-mat-top`. */
    top?: string;
    /** Offsets the mat left of the content, e.g. `-1rem` sits it 1rem to the left. Sets `--picture-mat-left`. */
    left?: string;
    /** Offsets the mat right of the content, e.g. `-1rem` sits it 1rem to the right. Sets `--picture-mat-right`. */
    right?: string;
    /** Offsets the mat below the content, e.g. `-1rem` sits it 1rem lower. Sets `--picture-mat-bottom`. */
    bottom?: string;
    /** Draw the inner mat bevel. */
    innerMat?: boolean;
    /** Color of the mat surrounding the content. Sets `--picture-mat-mat-color`. */
    matColor?: string;
    /** When the animation runs: `onLoad` starts it on page load, `onEnter` starts or resumes it when the component scrolls into view, `onLeave` stops it when it scrolls out. */
    intersectionActions?: IntersectionAction[];
    /** Settings for the intersection observer behind those events. `noAnimate` skips it entirely, as does `prefers-reduced-motion`. Passing `onLoad`, `onEnter` or `onLeave` here replaces the component's own handler for that event. */
    intersectionActionParams?: IntersectionActionParams;
    /** Rendered inside the mat, e.g. an `<img>` or `<picture>`. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    top = "unset",
    left = "unset",
    right = "unset",
    bottom = "unset",
    innerMat = false,
    matColor = "var(--primary, black)",
    intersectionActions = [],
    intersectionActionParams,
    children,
    style
  }: Props = $props();

  let uid: string = $props.id();
</script>

<div
  id="picture-mat-{uid}"
  class="picture-mat"
  class:entry-animate={intersectionActions.length > 0}
  class:has-inner-mat={innerMat}
  style:--picture-mat-mat-color={matColor}
  style:--picture-mat-top={top}
  style:--picture-mat-left={left}
  style:--picture-mat-right={right}
  style:--picture-mat-bottom={bottom}
  {style}
  use:handleIntersectionEvent={{
    key: `picture-mat-${uid}`,
    ...addEntryAnimateFallback(intersectionActions),
    ...intersectionActionParams
  }}>
  {@render children()}
</div>

<style>
  .picture-mat {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;

    &::before {
      content: "";
      background-color: var(--picture-mat-mat-color);
      position: absolute;
      top: var(--picture-mat-top);
      bottom: var(--picture-mat-bottom);
      left: var(--picture-mat-left);
      right: var(--picture-mat-right);
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
      border-radius: 8px;
      transition:
        top 0.5s cubic-bezier(0, 0, 0.58, 1),
        bottom 0.5s cubic-bezier(0, 0, 0.58, 1),
        left 0.5s cubic-bezier(0, 0, 0.58, 1),
        right 0.5s cubic-bezier(0, 0, 0.58, 1);

      @media (prefers-reduced-motion: reduce) {
        transition: all 1s cubic-bezier(0, 0, 0.58, 1);
      }
    }

    :global {
      > :first-child,
      ::slotted(:first-child) {
        width: 100%;
        height: auto;
        overflow: hidden;
        border-radius: 8px;
        margin: 0 auto;
        transition:
          transform 0.5s cubic-bezier(0, 0, 0.58, 1),
          opacity 0.5s cubic-bezier(0, 0, 0.58, 1);

        @media (prefers-reduced-motion: reduce) {
          transition: all 1s cubic-bezier(0, 0, 0.58, 1);
        }
      }
    }

    &.entry-animate {
      &::before {
        top: calc(var(--picture-mat-top) * 0);
        left: calc(var(--picture-mat-left) * 0);
        right: calc(var(--picture-mat-right) * 0);
        bottom: calc(var(--picture-mat-bottom) * 0);
      }
    }

    &.has-inner-mat {
      :global {
        > :first-child,
        > ::slotted(:first-child) {
          background-color: #ffffff;
          border: 1px solid #ddd;
          box-shadow: 0 2px 4px #0000001a;
          padding: 6px;
        }
      }
    }
  }
</style>
