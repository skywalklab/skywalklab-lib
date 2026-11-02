<script lang="ts">
  import { animateStaircase } from "../../actions/staircase-animation.svelte.js";
  import {
    handleIntersectionEvent,
    type IntersectionAction,
    type IntersectionActionParams
  } from "../../actions/intersection-observer.svelte.js";
  import { type Snippet } from "svelte";

  interface Props {
    /** Milliseconds per step of the sweep. Also the length of each step's color transition. Forced to 6000 under prefers-reduced-motion. */
    transitionTiming?: number;
    /** Base color of the banner fill. */
    baseColor?: string;
    /** When the animation runs: `onLoad` starts it on page load, `onEnter` starts or resumes it when the component scrolls into view, `onLeave` stops it when it scrolls out. */
    intersectionActions?: IntersectionAction[];
    /** Settings for the intersection observer behind those events. `noAnimate` skips it entirely, as does `prefers-reduced-motion`. Passing `onLoad`, `onEnter` or `onLeave` here replaces the component's own handler for that event. */
    intersectionActionParams?: IntersectionActionParams;
    /** Rendered inside the banner's inner container, in front of the animated staircase background. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    transitionTiming = 1500,
    baseColor = "var(--primary, black)",
    intersectionActions = [],
    intersectionActionParams,
    children,
    style
  }: Props = $props();
  let uid: string = $props.id();
  const rectFill = $derived<string>(`color-mix(in srgb, ${baseColor} 40%, black)`);
  const polygons = $derived<{ points: string; fill: string }[]>([
    {
      fill: `color-mix(in srgb, ${baseColor} 50%, black)`,
      points: "800 100 0 200 0 800 1600 800 1600 200"
    },
    {
      fill: `color-mix(in srgb, ${baseColor} 55%, black)`,
      points: "800 200 0 400 0 800 1600 800 1600 400"
    },
    {
      fill: `color-mix(in srgb, ${baseColor} 65%, black)`,
      points: "800 300 0 600 0 800 1600 800 1600 600"
    },
    { fill: `color-mix(in srgb, ${baseColor} 75%, black)`, points: "1600 800 800 400 0 800" },
    { fill: `color-mix(in srgb, ${baseColor} 85%, black)`, points: "1280 800 800 500 320 800" },
    { fill: `color-mix(in srgb, ${baseColor} 90%, black)`, points: "533.3 800 1066.7 800 800 600" },
    { fill: baseColor, points: "684.1 800 914.3 800 800 700" }
  ]);
  let staircaseFills = $derived<string[]>([rectFill, ...polygons.map(({ fill }) => fill)]);
  let staircaseAnimationCallback = () => (staircaseFills = [...staircaseFills.slice(1), ...staircaseFills.slice(0, 1)]);
  let timing = $derived<number>(transitionTiming);
  let staircaseAnimation: NodeJS.Timeout | undefined;

  const startStaircaseAnimation = () => {
    if (staircaseAnimation) return;

    staircaseAnimation = animateStaircase({
      transitionTiming: timing,
      noAnimate: intersectionActionParams?.noAnimate ?? false,
      callback: staircaseAnimationCallback
    });

    return () => clearInterval(staircaseAnimation);
  };

  const stopStaircaseAnimation = () => {
    if (!staircaseAnimation) return;
    clearInterval(staircaseAnimation);
    staircaseAnimation = undefined;
  };

  const addStaircaseAnimationFallback = (_intersectionActions: IntersectionAction[]) => {
    return Object.fromEntries(
      _intersectionActions.map((action) => [
        action,
        action === "onLeave" ? stopStaircaseAnimation : startStaircaseAnimation
      ])
    );
  };

  const attributionComment = " <!-- Background SVG by https://www.svgbackgrounds.com -->";
</script>

<div id="staircase-banner-{uid}" class="staircase-banner" {style}>
  <div class="staircase-banner--inner-container">
    {@render children()}
  </div>
  <div
    class="staircase-banner--bg"
    style:--staircase-banner-fill-transition-timing={timing / 1000 + "s"}
    use:handleIntersectionEvent={{
      key: `staircase-banner-${uid}`,
      ...addStaircaseAnimationFallback(intersectionActions),
      ...intersectionActionParams
    }}>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html attributionComment}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1600"
      height="800"
      viewBox="0 0 1600 800"
      preserveAspectRatio="xMidYMax slice">
      <rect fill={rectFill} width="100%" height="100%" class:leading={staircaseFills.indexOf(rectFill) === 0} />
      <g fill-opacity="1">
        {#each polygons as { points, fill }, index (index)}
          <polygon
            fill={staircaseFills.indexOf(rectFill) <= index + 1 ? staircaseFills[index + 1] : fill}
            {points}
            class:leading={staircaseFills.indexOf(rectFill) === index + 1} />
        {/each}
      </g>
    </svg>
  </div>
</div>

<style>
  .staircase-banner {
    position: relative;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    border-radius: 12px;
    color: #ffffff;

    .staircase-banner--inner-container {
      text-wrap: balance;
      text-align: center;
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem 1rem 4rem;
    }

    .staircase-banner--bg {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;

      svg {
        width: 100%;
        height: 100%;

        polygon,
        rect {
          transition: fill var(--staircase-banner-fill-transition-timing) cubic-bezier(0, 0, 0.58, 1);
        }
      }
    }
  }
</style>
