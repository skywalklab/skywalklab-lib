<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import type { Snippet } from "svelte";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import { fly } from "svelte/transition";
  import { snippetWrap } from "../../utils/snippets.js";

  interface Props {
    /** Items to step through. Only the length is used; each item is passed to `itemSnippet`, which decides how to render it. */
    items: any[];
    /** Index of the item currently in view. Bindable; the arrows and drag gestures move it. */
    activeIndex?: number;
    /** Rendered for the item in view; receives that item. */
    itemSnippet: Snippet<[{ item: any; index: number }]>;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { items, activeIndex = $bindable(0), itemSnippet, style }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
  let containerWidth = $state<number>(0);
  let flyObj = $state({ in: 200, out: -200 });
  const flyDuration = 300;
  let isDragging = $state<boolean>(false);
  let startX = $state<number>(0);

  const slideleft = () => {
    flyObj = { in: -200, out: 200 };
    activeIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
  };

  const slideright = () => {
    flyObj = { in: 200, out: -200 };
    activeIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
  };

  const handleArrowButton = (type: "previous" | "next") => {
    switch (type) {
      case "previous":
        slideleft();
        break;
      case "next":
        slideright();
        break;
    }
  };

  const handleSlide = (e: PointerEvent | MouseEvent) => {
    const target = e.currentTarget as HTMLElement | null;
    if (!isDragging || !target) return;

    isDragging = false;
    const deltaX = e.clientX - startX;
    const threshold = 150;

    if (deltaX > threshold) {
      slideleft();
    } else if (deltaX < -threshold) {
      slideright();
    } else {
      target.style.left = "unset";
    }
  };
</script>

<div id="carousel-1-{uid}" class="carousel-1" {style}>
  <button
    class="carousel-1--button previous"
    aria-label={labels.previousSlide}
    onclick={() => handleArrowButton("previous")}>
    <ArrowLeft size={32} />
  </button>
  <div class="carousel-1--content" bind:clientWidth={containerWidth}>
    {#each items as item, i (i)}
      {#if activeIndex === i}
        <div
          class="carousel-1--content-wrapper"
          role="presentation"
          onpointerdown={(e) => {
            isDragging = true;
            startX = e.clientX;
          }}
          onpointermove={(e) => {
            const deltaX = e.clientX - startX;
            const maxThreshold = containerWidth / 2;
            const isInRange = deltaX < maxThreshold && deltaX > -maxThreshold;

            if (isDragging && isInRange) {
              e.currentTarget.style.left = e.clientX - startX + "px";
            }
          }}
          onpointerup={handleSlide}
          onmouseleave={handleSlide}
          in:fly={{ x: flyObj.in, duration: flyDuration }}
          out:fly={{ x: flyObj.out, duration: flyDuration }}>
          {@render snippetWrap(itemSnippet)({ item, index: i })}
        </div>
      {/if}
    {/each}
  </div>
  <button class="carousel-1--button next" aria-label={labels.nextSlide} onclick={() => handleArrowButton("next")}>
    <ArrowRight size={32} />
  </button>
</div>

<style>
  .carousel-1 {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 auto;
    overflow: hidden;

    .carousel-1--content {
      position: relative;
      flex: 1;
      display: grid;
      justify-content: center;
      max-width: inherit;

      .carousel-1--content-wrapper {
        cursor: grab;
        position: relative;
        grid-area: 1 / 1;
      }
    }

    .carousel-1--button {
      padding: clamp(0.25rem, 3vw, 1.5rem);
      border: 1px solid currentColor;
      border-radius: 50%;
      position: absolute;
      top: 1rem;
      z-index: 2;
      cursor: pointer;

      &.next {
        right: 10%;
      }

      &.previous {
        left: 10%;
      }

      @media (min-width: 768px) {
        position: static;
      }
    }
  }
</style>
