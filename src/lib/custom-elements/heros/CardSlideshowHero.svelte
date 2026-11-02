<svelte:options
  customElement={{
    tag: "skywalk-card-slideshow-hero",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      slides: { type: "Array", attribute: "sw-slides" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "heros/CardSlideshowHero", false);
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
  import CardSlideshowHero from "../../components/heros/CardSlideshowHero.svelte";

  let { slides, style }: any = $props();
</script>

<CardSlideshowHero {slides} {style} >
  {#snippet buttonSnippet()}
    <slot name="buttonSnippet"/>
  {/snippet}
</CardSlideshowHero>


<style>
  :host {
    display: block;
  }

  :global {
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
  }
</style>
      