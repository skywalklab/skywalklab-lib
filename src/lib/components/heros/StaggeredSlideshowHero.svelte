<script lang="ts">
  import type { Snippet } from "svelte";
  import { getLibraryLabels } from "../../utils/labels.js";
  import { onMount } from "svelte";
  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";

  interface Props {
    /** Slides shown in sequence. */
    slides: {
      /** Image source for the slide. */
      src: string;
      /** Alt text for the image. */
      alt?: string;
      /** Intrinsic image width. */
      width: string;
      /** Intrinsic image height. */
      height: string;
      /** Headline shown on the slide. */
      title: string;
      /** Body copy shown under the headline. */
      description: string;
    }[];
    /** Milliseconds each slide stays on screen. */
    duration?: number;
    /** Milliseconds the image crossfade between slides takes. Sets `--staggered-slideshow-hero-crossfade-duration`. */
    crossfadeDuration?: number;
    /** Max width of the text content. Sets `--staggered-slideshow-hero-content-max-width`. */
    contentMaxWidth?: string;
    /** Class applied to the previous and next buttons. */
    buttonClass?: string;
    /** Base color of the overlay tint. Sets `--staggered-slideshow-hero-tint-color`. */
    tintColor?: string;
    /** Color of the decorative marks. Sets `--staggered-slideshow-hero-decoration-color`. */
    decorationColor?: string;
    /** Call-to-action rendered under the description of every slide; takes no parameters. */
    buttonSnippet?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    slides,
    duration = 8000,
    crossfadeDuration,
    contentMaxWidth,
    buttonClass,
    tintColor,
    decorationColor,
    buttonSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
  let slideIndex = $state<number>(0);
  let interval: ReturnType<typeof setInterval> | undefined;

  const TEXT_DELAYS = [300, 600, 900];
  const DECORATION_DELAY = 1500;

  function startInterval() {
    return setInterval(() => (slideIndex = slideIndex === slides.length - 1 ? 0 : slideIndex + 1), duration);
  }

  function goTo(type: "previous" | "next") {
    clearInterval(interval);

    slideIndex =
      type === "previous"
        ? slideIndex === 0
          ? slides.length - 1
          : slideIndex - 1
        : slideIndex === slides.length - 1
          ? 0
          : slideIndex + 1;

    interval = startInterval();
  }

  onMount(() => {
    interval = startInterval();

    return () => clearInterval(interval);
  });
</script>

<section
  id="staggered-slideshow-hero-{uid}"
  class="staggered-slideshow-hero"
  style:--staggered-slideshow-hero-crossfade-duration={crossfadeDuration !== undefined
    ? `${crossfadeDuration}ms`
    : undefined}
  style:--staggered-slideshow-hero-content-max-width={contentMaxWidth}
  style:--staggered-slideshow-hero-tint-color={tintColor}
  style:--staggered-slideshow-hero-decoration-color={decorationColor}
  {style}>
  {#each slides as slide, i (i)}
    <div class="staggered-slideshow-hero--slide-image-container" class:active={slideIndex === i}>
      <img
        src={slide.src}
        alt={slide.alt ?? slide.title}
        width={slide.width}
        height={slide.height}
        class="staggered-slideshow-hero--slide-image"
        loading={i === 0 ? "eager" : "lazy"}
        fetchpriority={i === 0 ? "high" : "auto"} />
    </div>
  {/each}

  {#key slideIndex}
    <div class="staggered-slideshow-hero--slide-content">
      <h1
        class="staggered-slideshow-hero--slide-title"
        style:--staggered-slideshow-hero-rise-delay="{TEXT_DELAYS[0]}ms">
        {slides[slideIndex].title}
      </h1>
      <p
        class="staggered-slideshow-hero--slide-description"
        style:--staggered-slideshow-hero-rise-delay="{TEXT_DELAYS[1]}ms">
        {slides[slideIndex].description}
      </p>
      {#if buttonSnippet}
        <div
          class="staggered-slideshow-hero--slide-cta-container"
          style:--staggered-slideshow-hero-rise-delay="{TEXT_DELAYS[2]}ms">
          {@render buttonSnippet()}
        </div>
      {/if}
    </div>
  {/key}

  {#if slides.length > 1}
    <div class="staggered-slideshow-hero--slideshow-buttons">
      <button
        class="{buttonClass} staggered-slideshow-hero--slideshow-button"
        aria-label={labels.previousSlide}
        onclick={() => goTo("previous")}>
        <ChevronLeft size={22} />
      </button>
      <button
        class="{buttonClass} staggered-slideshow-hero--slideshow-button"
        aria-label={labels.nextSlide}
        onclick={() => goTo("next")}>
        <ChevronRight size={22} />
      </button>
    </div>
  {/if}

  {#key slideIndex}
    <div
      class="staggered-slideshow-hero--decorations"
      aria-hidden="true"
      style:--staggered-slideshow-hero-rise-delay="{DECORATION_DELAY}ms">
      <svg class="staggered-slideshow-hero--decoration-triangles" viewBox="0 0 30 110" fill="currentColor">
        <path d="M15 0 30 26 0 26Z" />
        <path d="M15 42 30 68 0 68Z" />
        <path d="M15 84 30 110 0 110Z" />
      </svg>
      <svg
        class="staggered-slideshow-hero--decoration-arcs"
        viewBox="0 0 260 260"
        fill="none"
        stroke="currentColor"
        stroke-width="2">
        <g transform="rotate(45 130 130)">
          <path d="M60 260 L60 120 A70 70 0 0 1 200 120 L200 260" />
          <path d="M110 260 L110 190 A40 40 0 0 1 190 190 L190 260" />
        </g>
      </svg>
      <svg class="staggered-slideshow-hero--decoration-chevron" viewBox="0 0 240 480" fill="currentColor">
        <path class="staggered-slideshow-hero--chevron-back" d="M240 40 40 240 240 440 240 330 150 240 240 150Z" />
        <path class="staggered-slideshow-hero--chevron-front" d="M340 40 140 240 340 440 340 330 250 240 340 150Z" />
      </svg>
    </div>
  {/key}
</section>

<style>
  @keyframes staggered-slideshow-hero-arrive {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes staggered-slideshow-hero-rise {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .staggered-slideshow-hero {
    --staggered-slideshow-hero-accent: var(--accent, lightblue);
    --staggered-slideshow-hero-tint-deep: color-mix(
      in srgb,
      var(--staggered-slideshow-hero-tint-color, var(--primary, black)),
      #000 45%
    );

    position: relative;
    display: grid;
    overflow: hidden;
    min-height: clamp(520px, calc(100svh - 50px), 760px);

    .staggered-slideshow-hero--slide-image-container {
      grid-area: 1 / 1;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity var(--staggered-slideshow-hero-crossfade-duration, 100ms) ease-in-out;
      will-change: opacity;

      &.active {
        opacity: 1;
      }

      &::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          color-mix(in srgb, var(--staggered-slideshow-hero-tint-deep), transparent 10%) 0%,
          color-mix(in srgb, var(--staggered-slideshow-hero-tint-deep), transparent 40%) 50%,
          color-mix(in srgb, var(--staggered-slideshow-hero-tint-deep), transparent 50%) 100%
        );
      }

      .staggered-slideshow-hero--slide-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        filter: grayscale(1) contrast(1.05);
      }
    }

    .staggered-slideshow-hero--slide-content {
      grid-area: 1 / 1;
      position: relative;
      z-index: 1;
      align-self: center;
      width: 100%;
      max-width: var(--staggered-slideshow-hero-content-max-width, 1170px);
      margin: 0 auto;
      padding-inline: var(--side-padding, 1.5rem);
      color: #fff;

      > * {
        animation: staggered-slideshow-hero-rise 1000ms ease-out var(--staggered-slideshow-hero-rise-delay, 0ms) both;
      }

      @media (prefers-reduced-motion: reduce) {
        > * {
          animation: none;
        }
      }

      .staggered-slideshow-hero--slide-title {
        font-size: clamp(36px, 4.8vw, 64px);
        line-height: 1.1;
        font-weight: 800;
        text-transform: none;
        letter-spacing: -0.02em;
        margin: 0 0 1.5rem;
        max-width: 18ch;
      }

      .staggered-slideshow-hero--slide-description {
        font-size: clamp(15px, 1.2vw, 17px);
        line-height: 28px;
        max-width: 56ch;
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: 2.25rem;
      }
    }

    .staggered-slideshow-hero--slideshow-buttons {
      position: absolute;
      z-index: 1;
      right: max(2rem, calc((100% - var(--staggered-slideshow-hero-content-max-width, 1170px)) / 2 - 3.5rem));
      top: 50%;
      transform: translateY(-50%);
      display: none;

      .staggered-slideshow-hero--slideshow-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 52px;
        border-radius: 50%;
      }

      @media (min-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
    }

    .staggered-slideshow-hero--decorations {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      color: var(--staggered-slideshow-hero-decoration-color, var(--staggered-slideshow-hero-accent));
      display: none;

      > * {
        animation: staggered-slideshow-hero-arrive 800ms ease-out var(--staggered-slideshow-hero-rise-delay, 0ms) both;
      }

      .staggered-slideshow-hero--decoration-triangles {
        position: absolute;
        left: 3.5%;
        bottom: 22%;
        width: 26px;
      }

      .staggered-slideshow-hero--decoration-arcs {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 250px;
        transform: translate(-16%, 24%);
      }

      .staggered-slideshow-hero--decoration-chevron {
        position: absolute;
        right: 0;
        bottom: 6%;
        width: clamp(150px, 14vw, 250px);
        height: auto;

        .staggered-slideshow-hero--chevron-back {
          opacity: 0.5;
        }

        .staggered-slideshow-hero--chevron-front {
          opacity: 0.85;
        }
      }

      @media (min-width: 768px) {
        display: block;
      }
    }
  }
</style>
