<script lang="ts">
  import { prefersReducedMotion, Tween } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import {
    handleIntersectionEvent,
    type IntersectionAction,
    type IntersectionActionParams
  } from "../../actions/intersection-observer.svelte.js";

  interface Props {
    /** Value and label pairs shown across the banner. */
    stats: { value: number | string; label: string }[];
    /** When the animation runs: `onLoad` starts it on page load, `onEnter` starts or resumes it when the component scrolls into view, `onLeave` stops it when it scrolls out. */
    intersectionActions: IntersectionAction[];
    /** Settings for the intersection observer behind those events. `noAnimate` skips it entirely, as does `prefers-reduced-motion`. Passing `onLoad`, `onEnter` or `onLeave` here replaces the component's own handler for that event. */
    intersectionActionParams?: IntersectionActionParams;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { stats, intersectionActions, intersectionActionParams, style }: Props = $props();
  let uid: string = $props.id();

  const addCountStatsFallback = (_intersectionActions: IntersectionAction[], count: Tween<number>, number: number) => {
    return Object.fromEntries(
      _intersectionActions.map((action) => [
        action,
        () => {
          count.target = action === "onLeave" ? 0 : number;
        }
      ])
    );
  };
</script>

<div id="stat-banner-{uid}" class="stat-banner" {style}>
  {#each stats as stat, i (stat.value + stat.label)}
    {@const [, prefix = "", digits = "0", suffix = ""] = String(stat.value).match(/^(\D*)([\d,]*\.?\d+)(.*)$/) ?? []}
    {@const number = parseFloat(digits.replace(/,/g, ""))}
    {@const decimals = digits.split(".")[1]?.length ?? 0}
    {@const count = new Tween(0, { duration: prefersReducedMotion.current ? 0 : 1500, easing: cubicOut })}
    <div
      class="stat-banner--item"
      use:handleIntersectionEvent={{
        key: `stat-banner-${uid}-item-${i}`,
        ...addCountStatsFallback(intersectionActions, count, number),
        ...intersectionActionParams
      }}>
      <span class="stat-banner--value">
        {prefix +
          count.current.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
          }) +
          suffix}
      </span>
      <span class="stat-banner--label">{stat.label}</span>
    </div>
  {/each}
</div>

<style>
  .stat-banner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr) minmax(120px, 1fr));
    gap: 2rem;
    text-align: center;

    .stat-banner--item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      .stat-banner--value {
        font-size: clamp(36px, 6vw, 48px);
        font-weight: bold;
        line-height: 1;
      }

      .stat-banner--label {
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
</style>
