<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import { onMount, type Snippet } from "svelte";
  import { Tween } from "svelte/motion";
  import type { Action } from "svelte/action";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import { snippetWrap } from "../../utils/snippets.js";

  interface Props {
    /** Slides to render. Each item is passed to `slideSnippet`, which decides how to render it. */
    items: any[];
    /** Milliseconds each slide stays on screen. */
    duration?: number;
    /** Color of the fade gradient at each edge. Sets `--slideshow-carousel-gradient-color`. */
    gradientColor?: string;
    /** Class applied to the previous and next buttons. */
    buttonClass?: string;
    /** Rendered in the text area above the slides, e.g. a heading and description. */
    textSnippet: Snippet;
    /** Rendered once per slide, inside that slide's panel; receives its item and index. */
    slideSnippet: Snippet<[{ item: any; index: number }]>;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { items, duration = 5000, gradientColor, buttonClass, textSnippet, slideSnippet, style }: Props = $props();
  const slidesNum = $derived(items.length);
  let uid: string = $props.id();
  const labels = getLibraryLabels();
  let selected = $state<number>(0);
  let progress = $derived<Tween<number>>(new Tween(0, { duration }));
  // eslint-disable-next-line svelte/prefer-writable-derived
  let slideContainerHeight = $state<string>("");
  let dragStartX = $state<number>(0);
  let isDragging = $state<boolean>(false);
  let dragOffset = $state<number>(0);
  let slideDirection = $state<"left" | "right" | "auto">("auto");

  const resetProgress: () => void = () => {
    progress.set(0, { duration: 0 });
  };

  const pauseProgress: () => void = () => {
    progress.set(progress.current, { duration: 0 });
  };

  const startProgress: (resume?: boolean) => void = (resume) => {
    const remaining = resume === true ? duration - (progress.current / 100) * duration : duration;
    progress.set(100, { duration: remaining }).then(() => {
      resetProgress();
      slideDirection = "left";
      selected = selected < slidesNum - 1 ? selected + 1 : 0;
    });
  };

  const setProgress: Action<HTMLElement> = (node) => {
    startProgress();
    $effect(() => {
      slideContainerHeight = node.clientHeight + 28 + "px";
    });
  };

  const handleSlideShowButton: (index: number, slideEnd?: boolean) => void = (index, slideEnd = false) => {
    slideDirection =
      slideEnd && index < selected
        ? "left"
        : slideEnd && index >= selected
          ? "right"
          : index < selected
            ? "right"
            : "left";
    selected = index;
    resetProgress();
  };

  const handlePointerDown = (e: PointerEvent) => {
    e.preventDefault();
    dragStartX = e.clientX;
    isDragging = true;
    dragOffset = 0;
    pauseProgress();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    dragOffset = e.clientX - dragStartX;
  };

  const handlePointerUp = (e: PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    isDragging = false;

    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0 && selected > 0) {
        handleSlideShowButton(selected - 1);
      } else if (dragOffset < 0 && selected < slidesNum - 1) {
        handleSlideShowButton(selected + 1);
      } else if (dragOffset > 0 && selected === 0) {
        handleSlideShowButton(slidesNum - 1, true);
      } else if (dragOffset < 0 && selected === slidesNum - 1) {
        handleSlideShowButton(0, true);
      }
    }

    dragOffset = 0;
    startProgress(true);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const handleArrowBtn = (dir: "left" | "right") => {
    if (dir === "left" && selected > 0) {
      handleSlideShowButton(selected - 1);
    } else if (dir === "right" && selected < slidesNum - 1) {
      handleSlideShowButton(selected + 1);
    } else if (dir === "left" && selected === 0) {
      handleSlideShowButton(slidesNum - 1, true);
    } else if (dir === "right" && selected === slidesNum - 1) {
      handleSlideShowButton(0, true);
    }
  };

  onMount(() => {
    return () => resetProgress();
  });
</script>

<div
  id="slideshow-carousel-{uid}"
  class="slideshow-carousel"
  class:gradient={gradientColor}
  style:--slideshow-carousel-gradient-color={gradientColor}
  {style}
  role="region"
  aria-roledescription={labels.carousel}
  aria-label={labels.slideshow}
  onmouseenter={pauseProgress}
  onmouseleave={() => startProgress(true)}>
  <div class="slideshow-carousel--text">{@render textSnippet()}</div>
  <div class="slideshow-carousel--slide-container" style:height={slideContainerHeight}>
    {#each items as item, i (i)}
      {#if i === selected}
        <div
          id="slideshow-carousel--slide-{uid}-{i}"
          class="slideshow-carousel--slide"
          class:dragging={isDragging}
          style:transform="translateX({dragOffset}px)"
          onpointerdown={(e) => handlePointerDown(e)}
          onpointermove={(e) => handlePointerMove(e)}
          onpointerup={(e) => handlePointerUp(e)}
          use:setProgress
          in:fly={{
            x: slideDirection === "right" ? -200 : slideDirection === "left" ? 200 : 200,
            duration: 750,
            easing: cubicOut
          }}
          out:fly={{
            x: slideDirection === "right" ? 200 : slideDirection === "left" ? -200 : -200,
            duration: 750,
            easing: cubicOut
          }}
          role="tabpanel"
          aria-label={labels.slideOf(i + 1, slidesNum)}
          tabindex="0">
          {@render snippetWrap(slideSnippet)({ item, index: i })}
        </div>
      {/if}
    {/each}
  </div>
  <div class="slideshow-carousel--arrow-buttons">
    <button
      class="slideshow-carousel--arrow-button {buttonClass}"
      aria-label={labels.previousSlide}
      onclick={() => handleArrowBtn("left")}><ArrowLeft size={32} /></button>
    <button
      class="slideshow-carousel--arrow-button {buttonClass}"
      aria-label={labels.nextSlide}
      onclick={() => handleArrowBtn("right")}><ArrowRight size={32} /></button>
  </div>
  <div
    class="slideshow-carousel--button-container"
    style:--slideshow-carousel-active-progress={progress.current + "%"}
    role="tablist">
    {#each items as _, i (i)}
      <button
        class="slideshow-carousel--button-{i + 1}"
        class:active={i === selected}
        class:finished={i < selected}
        role="tab"
        aria-selected={i === selected}
        aria-controls={i === selected ? `slideshow-carousel--slide-${uid}-${i}` : undefined}
        aria-label={labels.showSlide(i + 1)}
        onclick={() => handleSlideShowButton(i)}></button>
    {/each}
  </div>
</div>

<style>
  .slideshow-carousel {
    color: inherit;
    overflow: hidden;
    width: 100%;
    position: relative;

    &.gradient {
      @media (min-width: 480px) {
        position: relative;
        padding: 0 1.5rem;

        --slideshow-carousel-gradient-background: linear-gradient(
          to right,
          var(--slideshow-carousel-gradient-color, var(--background, white)),
          transparent 10%,
          transparent 90%,
          var(--slideshow-carousel-gradient-color, var(--background, white))
        );

        &::after {
          content: "";
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--slideshow-carousel-gradient-background);
          pointer-events: none;
        }
      }
    }
  }

  .slideshow-carousel--slide-container {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;

    .slideshow-carousel--slide {
      position: absolute;
      display: flex;
      justify-content: center;
      cursor: grab;
      transition: transform 0.15s ease-out;

      &.dragging {
        cursor: grabbing;
        transition: none;
      }
    }
  }

  .slideshow-carousel--arrow-buttons {
    position: absolute;
    z-index: 3;
    width: 90%;
    height: fit-content;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .slideshow-carousel--button-container {
    display: flex;
    gap: 1px;
    height: 0.75rem;
    width: 75%;
    margin: 0 auto;

    button {
      overflow: hidden;
      background-color: #eff0f3;
      color: transparent;
      white-space: nowrap;
      border: none;
      position: relative;
      height: 100%;
      transition: background-color 0.3s ease;
      cursor: pointer;
      flex: 1;

      @media (prefers-reduced-motion: reduce) {
        transition: all 0.75s ease;
      }

      &:hover,
      &:focus-visible {
        background-color: #d7d9e0;
      }

      &:first-child {
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
      }

      &:last-child {
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
      }

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        height: 100%;
        width: 0;
        background-color: #8b8fa2;
      }

      &.active::after {
        width: var(--slideshow-carousel-active-progress);
      }

      &.finished::after {
        width: 100%;
      }
    }
  }
</style>
