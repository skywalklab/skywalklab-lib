<script lang="ts">
  import { addEntryAnimateFallback } from "../../actions/entry-animate.js";
  import {
    handleIntersectionEvent,
    type IntersectionAction,
    type IntersectionActionParams
  } from "../../actions/intersection-observer.svelte";
  import type { Snippet } from "svelte";

  interface Props {
    /** How far each panel slides in from its edge before the animation settles. Sets `--double-panel-slide-distance`. */
    slideDistance?: string;
    /** When the animation runs: `onLoad` starts it on page load, `onEnter` starts or resumes it when the component scrolls into view, `onLeave` stops it when it scrolls out. */
    intersectionActions?: IntersectionAction[];
    /** Settings for the intersection observer behind those events. `noAnimate` skips it entirely, as does `prefers-reduced-motion`. Passing `onLoad`, `onEnter` or `onLeave` here replaces the component's own handler for that event. */
    intersectionActionParams?: IntersectionActionParams;
    /** Content of the left panel. */
    leftPanelSnippet: Snippet;
    /** Content of the right panel. */
    rightPanelSnippet: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    slideDistance = "5%",
    intersectionActions = [],
    intersectionActionParams,
    leftPanelSnippet,
    rightPanelSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();
</script>

<div
  id="double-panel-{uid}"
  class="double-panel"
  class:entry-animate={intersectionActions.length > 0}
  style:--double-panel-slide-distance={slideDistance}
  {style}
  use:handleIntersectionEvent={{
    key: `double-panel-${uid}`,
    ...addEntryAnimateFallback(intersectionActions),
    ...intersectionActionParams
  }}>
  <div class="double-panel--left">
    {@render leftPanelSnippet()}
  </div>
  <div class="double-panel--right">
    {@render rightPanelSnippet()}
  </div>
</div>

<style>
  .double-panel {
    width: 100%;
    height: 100%;
    min-height: 300px;
    position: relative;
    margin: 0 auto;
    border-radius: 16px;
    transition:
      margin-left 1s ease,
      margin-right 1s ease;

    &.entry-animate {
      .double-panel--left {
        margin-left: var(--double-panel-slide-distance);
      }

      .double-panel--right {
        margin-right: var(--double-panel-slide-distance);
      }
    }

    .double-panel--left {
      height: 100%;
      width: 55%;
      border: 1px solid #fff;
      border-radius: inherit;
      min-width: max(280px, 100%);
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      transition: inherit;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (min-width: 480px) {
        min-width: max(400px, 50%);
      }
    }

    .double-panel--right {
      font-size: 1rem;
      border-radius: inherit;
      min-width: max(280px, 100%);
      max-width: 55%;
      width: 45vw;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
      transition: inherit;
      padding: 2rem clamp(1rem, 5vw, 2rem);
      background-color: #fff;
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3);

      @media (min-width: 480px) {
        min-width: max(400px, 50%);
      }
    }
  }
</style>
