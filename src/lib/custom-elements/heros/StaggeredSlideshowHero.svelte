<svelte:options
  customElement={{
    tag: "skywalk-staggered-slideshow-hero",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      slides: { type: "Array", attribute: "sw-slides" },
      duration: { type: "Number", attribute: "sw-duration" },
      crossfadeDuration: { type: "Number", attribute: "sw-crossfade-duration" },
      contentMaxWidth: { type: "String", attribute: "sw-content-max-width" },
      buttonClass: { type: "String", attribute: "sw-button-class" },
      tintColor: { type: "String", attribute: "sw-tint-color" },
      decorationColor: { type: "String", attribute: "sw-decoration-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "heros/StaggeredSlideshowHero", false);
        }

        connectedCallback() {
          this.#adopt();
          return (Base.prototype as any).connectedCallback.call(this);
        }

        attributeChangedCallback(...args: any[]) {
          const result = (Base.prototype as any).attributeChangedCallback.apply(this, args);
          if (this.shadowRoot) this.#adopt();
          return result;
        }
      }
  }} />

<script module lang="ts">
  import { shadowSheets } from "../../utils/shadow-styles.js";
</script>

<script lang="ts">
  import StaggeredSlideshowHero from "../../components/heros/StaggeredSlideshowHero.svelte";

  let { slides, duration, crossfadeDuration, contentMaxWidth, buttonClass, tintColor, decorationColor, style }: any = $props();
</script>

<StaggeredSlideshowHero {slides} {duration} {crossfadeDuration} {contentMaxWidth} {buttonClass} {tintColor} {decorationColor} {style} >
  {#snippet buttonSnippet()}
    <slot name="buttonSnippet"/>
  {/snippet}
</StaggeredSlideshowHero>


<style>
  :host {
    display: block;
  }

  :global {
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
  }
</style>
      