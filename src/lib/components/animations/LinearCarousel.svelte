<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import { type Snippet } from "svelte";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
  import type gsap from "gsap";
  import {
    handleIntersectionEvent,
    type IntersectionAction,
    type IntersectionActionParams
  } from "../../actions/intersection-observer.svelte";

  type GsapModule = typeof gsap;
  type GsapTween = gsap.core.Tween;

  interface Props {
    /** Color of the fade gradient at each edge. Sets `--linear-carousel-gradient-color`. */
    gradientColor?: string;
    /** The GSAP tween driving the scroll. Created by the component; bind to it to pause, play or scrub from a parent. */
    gsapAnimation?: GsapTween;
    /** Scroll animation parameters, passed to GSAP. */
    gsapContext?: {
      /** Horizontal distance travelled per repeat, as a percentage. */
      xPercent: number;
      /** Milliseconds per repeat. */
      duration: number;
      /** Number of repeats; -1 loops forever. */
      repeat: number;
      /** GSAP easing function. */
      ease: string;
    };
    /** Scroll distance per step, as a fraction of the track. */
    gsapDistance?: number;
    /** Class applied to the previous and next buttons. */
    buttonClass?: string;
    /** When the animation runs: `onLoad` starts it on page load, `onEnter` starts or resumes it when the component scrolls into view, `onLeave` stops it when it scrolls out. */
    intersectionActions?: IntersectionAction[];
    /** Settings for the intersection observer behind those events. `noAnimate` skips it entirely, as does `prefers-reduced-motion`. Passing `onLoad`, `onEnter` or `onLeave` here replaces the component's own handler for that event. */
    intersectionActionParams?: IntersectionActionParams;
    /** Rendered inside the carousel's `<ul>`, so it should supply the `<li>` items itself. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    gradientColor,
    gsapAnimation = $bindable(undefined),
    gsapContext = {
      xPercent: -50,
      duration: 60000,
      repeat: -1,
      ease: "linear"
    },
    gsapDistance,
    buttonClass,
    intersectionActions = [],
    intersectionActionParams,
    children,
    style
  }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
  // The element itself, not its id: a selector resolves through `document`, which cannot see into
  // the shadow root the component renders in as a custom element.
  let listElement = $state<HTMLUListElement>();

  let gsapModule: GsapModule | undefined;

  const handleCarouselButton = (distance: number) => {
    if (!gsapAnimation || !gsapModule) return;

    const currentProgress = gsapAnimation.progress();
    gsapModule.to(gsapAnimation, {
      progress: currentProgress + distance,
      duration: 1,
      ease: "power1.out"
    });
  };

  const startUpGsap = () => {
    import("gsap").then(({ gsap }) => {
      gsapModule = gsap;
      // GSAP takes seconds; the prop is milliseconds like every other duration in the library.
      if (!listElement) return;
      gsapAnimation = gsap.to(listElement, {
        ...gsapContext,
        duration: gsapContext.duration / 1000
      });
    });

    return () => gsapAnimation?.kill();
  };

  const startCarouselAnimation = () => {
    if (!gsapAnimation) return startUpGsap();

    gsapAnimation?.play();
  };

  const stopCarouselAnimation = () => {
    gsapAnimation?.pause();
  };

  const addCarouselAnimationFallback = (_intersectionActions: IntersectionAction[]) => {
    return Object.fromEntries(
      _intersectionActions.map((action) => [
        action,
        action === "onLeave" ? stopCarouselAnimation : startCarouselAnimation
      ])
    );
  };
</script>

<div
  id="linear-carousel-{uid}"
  class="linear-carousel"
  class:gradient={gradientColor}
  style:--linear-carousel-gradient-color={gradientColor}
  {style}
  role="region"
  aria-label={labels.linearCarousel}
  onmouseenter={() => gsapAnimation?.pause()}
  onmouseleave={() => gsapAnimation?.play()}
  use:handleIntersectionEvent={{
    key: `linear-carousel-${uid}`,
    ...addCarouselAnimationFallback(intersectionActions),
    ...intersectionActionParams
  }}>
  <div class="linear-carousel--items">
    <ul class="linear-carousel--list" id="linear-carousel--list-{uid}" bind:this={listElement}>
      {@render children()}
    </ul>
  </div>
  {#if gsapDistance}
    <div class="linear-carousel--buttons">
      <button
        class="{buttonClass} linear-carousel--button previous"
        aria-label={labels.previousSlide}
        aria-controls="linear-carousel-{uid}"
        onclick={() => handleCarouselButton(gsapDistance * -1)}><ChevronLeft size={22} /></button>
      <button
        class="{buttonClass} linear-carousel--button next"
        aria-label={labels.nextSlide}
        aria-controls="linear-carousel-{uid}"
        onclick={() => handleCarouselButton(gsapDistance)}><ChevronRight size={22} /></button>
    </div>
  {/if}
</div>

<style>
  .linear-carousel {
    position: relative;
    width: calc(100% - 2rem);
    height: 100%;

    &.gradient {
      --linear-carousel-gradient-background: linear-gradient(
        to right,
        var(--linear-carousel-gradient-color, var(--background, white)),
        transparent 5%,
        transparent 95%,
        var(--linear-carousel-gradient-color, var(--background, white))
      );

      &::after {
        content: "";
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--linear-carousel-gradient-background);
        pointer-events: none;
      }
    }

    .linear-carousel--items {
      overflow: hidden;
      width: 100%;
      height: 100%;
      padding: 1rem 2vw;
      line-height: 1.75;
      font-size: clamp(22px, 5vw, 26px);
      text-align: center;
      position: relative;
      z-index: 2;

      .linear-carousel--list {
        display: flex;
        gap: 4rem;
        will-change: transform;
        width: fit-content;
        margin: 0;
        list-style: none;
      }
    }

    .linear-carousel--buttons {
      position: absolute;
      inset: 0;
      pointer-events: none;

      .linear-carousel--button {
        pointer-events: auto;
        height: fit-content;

        &.previous {
          left: 0;
        }

        &.next {
          right: 0;
        }
      }
    }

    .linear-carousel--button {
      position: absolute;
      z-index: 3;
      top: 0;
      bottom: 0;
      margin: auto 0;
      transition:
        background-color 0.15s linear,
        color 0.15s linear;
    }
  }
</style>
