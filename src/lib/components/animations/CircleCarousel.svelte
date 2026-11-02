<script lang="ts">
  import {
    handleCircleCarouselAnimations,
    type CircleCarouselAnimationParams
  } from "../../actions/circle-carousel-animation.svelte.js";
  import type { Snippet } from "svelte";
  import {
    handleIntersectionEvent,
    type IntersectionAction,
    type IntersectionActionParams
  } from "../../actions/intersection-observer.svelte.js";
  import { snippetWrap } from "../../utils/snippets.js";

  interface Props {
    /** Items rendered around the circle. */
    items: any[];
    /**
     * Rotation parameters: `speed` radians per second (0.25), `radiusAdjustment` multiplier on the smaller
     * item dimension giving the orbit radius (1.25), `moveToTop` revolutions per restack.
     */
    context?: Omit<CircleCarouselAnimationParams, "noAnimate">;
    /** Image shown behind the circle. Sets `--circle-carousel-background-image`. */
    backgroundImageUrl: string;
    /** When the animation runs: `onLoad` starts it on page load, `onEnter` starts or resumes it when the component scrolls into view, `onLeave` stops it when it scrolls out. */
    intersectionActions?: IntersectionAction[];
    /** Settings for the intersection observer behind those events. `noAnimate` skips it entirely, as does `prefers-reduced-motion`. Passing `onLoad`, `onEnter` or `onLeave` here replaces the component's own handler for that event. */
    intersectionActionParams?: IntersectionActionParams;
    /** Rendered once per item, inside that item's `<li>`; receives the item and its index. */
    itemSnippet: Snippet<[{ item: any; index: number }]>;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    items,
    context = { moveToTop: 1, speed: 0.25 },
    backgroundImageUrl,
    intersectionActions = [],
    intersectionActionParams,
    itemSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();
  let animationStarted: boolean = false;

  const startUpAnimation = (node: HTMLElement) => {
    for (let i = 1; i < node.childNodes.length; i++) {
      node.insertBefore(node.childNodes[i], node.firstChild);
    }

    animationStarted = true;
  };

  const handleCarouselAnimation = (node: HTMLElement, action: IntersectionAction) => {
    if (!animationStarted) {
      startUpAnimation(node);
      return handleCircleCarouselAnimations(
        node,
        { ...context, noAnimate: intersectionActionParams?.noAnimate ?? false },
        "onLoad"
      );
    }

    handleCircleCarouselAnimations(
      node,
      { ...context, noAnimate: intersectionActionParams?.noAnimate ?? false },
      action
    );
  };

  const addCarouselAnimationFallback = (_intersectionActions: IntersectionAction[]) => {
    return Object.fromEntries(
      _intersectionActions.map((action) => [action, (node: HTMLElement) => handleCarouselAnimation(node, action)])
    );
  };
</script>

<ul
  id="circle-carousel-{uid}"
  class="circle-carousel"
  style:--circle-carousel-background-image="url('{backgroundImageUrl.replaceAll("'", '%27')}')"
  {style}
  use:handleIntersectionEvent={{
    key: `circle-carousel-${uid}`,
    ...addCarouselAnimationFallback(intersectionActions),
    ...intersectionActionParams
  }}>
  {#each items as item, index (index)}
    <li id="{index}-{uid}" class:is-on-top={index == 0}>
      {@render snippetWrap(itemSnippet)({ item, index })}
    </li>
  {/each}
</ul>

<style>
  ul.circle-carousel {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    min-height: 400px;
    max-height: 100%;
    min-width: 275px;
    max-width: 100%;
    margin: 0;
    padding: 0;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    border-radius: 6px;
    transition: box-shadow 1s ease;
    background: var(--circle-carousel-background-image);
    background-position: center;
    background-size: 50%;
    background-repeat: no-repeat;
    background-color: var(--primary-light, #333);

    li {
      overflow: hidden;
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 1rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      width: clamp(80px, 28%, 150px);
      height: clamp(80px, 24%, 150px);
      background-color: #fffffff7;
      will-change: transform;
      transition:
        opacity 1s linear,
        border 0.3s ease;

      @media (prefers-reduced-motion: reduce) {
        transition: border 0.75s ease;
      }

      &:last-child {
        border: 1px solid var(--primary-light, #333);
      }
    }
  }
</style>
