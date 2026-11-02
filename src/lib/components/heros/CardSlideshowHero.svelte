<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import type { Snippet } from "svelte";
  import { fade, fly } from "svelte/transition";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import type { Action } from "svelte/action";

  interface Props {
    /** Images and copy shown in sequence. */
    slides: { src: string; alt?: string; width: string; height: string; title: string; description: string }[];
    /** Call-to-action rendered under each slide's copy, e.g. a link styled as a button. */
    buttonSnippet: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { slides, buttonSnippet, style }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
  let slideIndex = $state<number>(0);
  let interval: NodeJS.Timeout | undefined;
  let showArrows = $state<boolean>(false);

  function startInterval() {
    return setInterval(() => (slideIndex = slideIndex === slides.length - 1 ? 0 : slideIndex + 1), 7500);
  }

  function handleArrowButton(type: "previous" | "next") {
    if (!interval) return;

    clearInterval(interval);

    switch (type) {
      case "previous":
        slideIndex = slideIndex === 0 ? slides.length - 1 : slideIndex - 1;
        break;
      case "next":
        slideIndex = slideIndex === slides.length - 1 ? 0 : slideIndex + 1;
        break;
    }

    interval = startInterval();
  }

  const handleSlideshowHero: Action<HTMLElement> = (node) => {
    $effect(() => {
      interval = startInterval();

      return () => {
        clearInterval(interval);
      };
    });
  };
</script>

<div
  id="card-slideshow-hero-{uid}"
  class="card-slideshow-hero"
  {style}
  role="presentation"
  onmouseenter={() => (showArrows = true)}
  onmouseleave={() => (showArrows = false)}
  use:handleSlideshowHero>
  {#each slides as slide, i (i)}
    {#if slideIndex === i}
      <div class="card-slideshow-hero--inner-container container-{i}">
        <div class="card-slideshow-hero--image-container" transition:fade={{ duration: 1000 }}>
          <img
            src={slide.src}
            alt={slide.alt ?? slide.title}
            width={slide.width}
            height={slide.height}
            class="card-slideshow-hero--image" />
        </div>
        <div class="card-slideshow-hero--card-container">
          <div class="card-slideshow-hero--card" in:fly={{ x: 100, duration: 1000 }} out:fade={{ duration: 300 }}>
            <h1 class="card-slideshow-hero--title">{slide.title}</h1>
            <p class="card-slideshow-hero--description">{slide.description}</p>
            {@render buttonSnippet()}
          </div>
        </div>
      </div>
    {/if}
  {/each}
  <button
    class="card-slideshow-hero--button previous"
    class:show={showArrows}
    aria-label={labels.previousSlide}
    onclick={() => handleArrowButton("previous")}>
    <ArrowLeft size={32} />
  </button>
  <button
    class="card-slideshow-hero--button next"
    class:show={showArrows}
    aria-label={labels.nextSlide}
    onclick={() => handleArrowButton("next")}>
    <ArrowRight size={32} />
  </button>
</div>

<style>
  :where(.card-slideshow-hero) {
    position: relative;
    display: grid;
    width: 100vw;
    height: calc(100svh - var(--landing-header-height, 86px) - 50px);

    .card-slideshow-hero--inner-container {
      width: 100%;
      height: 100%;
      position: relative;
      grid-area: 1 / 1;
    }

    .card-slideshow-hero--image-container {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      .card-slideshow-hero--image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .card-slideshow-hero--card-container {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .card-slideshow-hero--card {
      position: absolute;
      bottom: 10%;
      left: 3.5%;
      width: 50%;
      min-width: 280px;
      max-height: auto;
      white-space: normal;
      background: rgba(38, 38, 40, 0.7);
      padding-bottom: clamp(1.5rem, 4vw, 2rem);
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: background-color 0.15s linear;

      &:hover {
        background: rgba(38, 38, 40, 1);
      }

      @media (min-width: 768px) {
        width: 460px;
        top: 10%;
        bottom: unset;
      }

      .card-slideshow-hero--title {
        border-bottom: 1px solid var(--primary, black);
        background: rgba(38, 38, 40, 0.68);
        font-size: clamp(21px, 4.5vw, 28px);
        line-height: 32px;
        padding: 16px 25px 17px;
        width: 100%;
        text-align: center;
      }

      .card-slideshow-hero--description {
        font-size: clamp(14px, 4vw, 18px);
        line-height: 24px;
        padding: 19px 25px 36px;
      }
    }

    .card-slideshow-hero--button {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      height: fit-content;
      padding: 2.5rem 0.5rem;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      transition:
        background-color 0.15s linear,
        color 0.15s linear,
        opacity 0.15s linear;
      opacity: 0;
      cursor: pointer;

      &.previous {
        left: 0;
      }

      &.next {
        right: 0;
      }

      &.show {
        opacity: 1;
      }

      &:hover {
        background-color: #fff;
        color: #000;
      }

      @media (hover: none) {
        opacity: 1;
      }
    }
  }
</style>
