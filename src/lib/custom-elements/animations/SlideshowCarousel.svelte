<svelte:options
  customElement={{
    tag: "skywalk-slideshow-carousel",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      duration: { type: "Number", attribute: "sw-duration" },
      gradientColor: { type: "String", attribute: "sw-gradient-color" },
      buttonClass: { type: "String", attribute: "sw-button-class" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "animations/SlideshowCarousel", false);
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
  import SlideshowCarousel from "../../components/animations/SlideshowCarousel.svelte";

  let { items, duration, gradientColor, buttonClass, style }: any = $props();
</script>

<SlideshowCarousel {items} {duration} {gradientColor} {buttonClass} {style} >
  {#snippet textSnippet()}
    <slot name="textSnippet"/>
  {/snippet}
{#snippet slideSnippet()}
    <slot name="slideSnippet"/>
  {/snippet}
</SlideshowCarousel>


<style>
  :host {
    display: block;
  }

  :global {
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
  }
</style>
      