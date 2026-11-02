<svelte:options
  customElement={{
    tag: "skywalk-linear-carousel",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      gradientColor: { type: "String", attribute: "sw-gradient-color" },
      gsapAnimation: { type: "Object", attribute: "sw-gsap-animation" },
      gsapContext: { type: "Object", attribute: "sw-gsap-context" },
      gsapDistance: { type: "Number", attribute: "sw-gsap-distance" },
      buttonClass: { type: "String", attribute: "sw-button-class" },
      intersectionActions: { type: "Array", attribute: "sw-intersection-actions" },
      intersectionActionParams: { type: "Object", attribute: "sw-intersection-action-params" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "animations/LinearCarousel", false);
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
  /* eslint-disable svelte/no-useless-children-snippet */
  import LinearCarousel from "../../components/animations/LinearCarousel.svelte";

  let { gradientColor, gsapAnimation, gsapContext, gsapDistance, buttonClass, intersectionActions, intersectionActionParams, style }: any = $props();
</script>

<LinearCarousel {gradientColor} {gsapAnimation} {gsapContext} {gsapDistance} {buttonClass} {intersectionActions} {intersectionActionParams} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</LinearCarousel>


<style>
  :host {
    display: block;
  }

  :global {
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
  }
</style>
      