<svelte:options
  customElement={{
    tag: "skywalk-review-carousel",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      reviews: { type: "Array", attribute: "sw-reviews" },
      icon: { type: "String", attribute: "sw-icon" },
      iconProps: { type: "Object", attribute: "sw-icon-props" },
      backgroundImage: { type: "String", attribute: "sw-background-image" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "carousels/ReviewCarousel", false);
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
  import ReviewCarousel from "../../components/carousels/ReviewCarousel.svelte";

  let { reviews, icon, iconProps, backgroundImage, style }: any = $props();
</script>

<ReviewCarousel {reviews} {icon} {iconProps} {backgroundImage} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.review-carousel {
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    background-image: var(--review-carousel-background-image);
    background-color: rgba(0, 0, 0, 0.65);
    position: relative;
    padding: 3rem 0;
    color: #fff;

    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: inherit;
    }

    .review-carousel--container {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      text-align: center;
      min-width: 280px;

      .review-carousel--review {
        text-wrap: balance;
        padding: 2rem 0 0;
        font-size: clamp(15px, 4vw, 18px);

        &::after {
          display: block;
          content: "";
          background: var(--primary, black);
          width: 40px;
          height: 2px;
          margin: 30px auto 0;
        }
      }

      .review-carousel--title {
        font-size: 13px;
        text-transform: uppercase;
      }
    }

    :global {
      .carousel-1 {
        .carousel-1--button {
          transition:
            background-color 0.15s linear,
            border-color 0.15s linear;

          &:hover {
            background-color: var(--primary, black);
            border-color: var(--primary, black);
          }
        }
      }
    }
  }

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

.circle-node {
    --circle-node-animation-duration: 0.3s;
    padding: 2.5rem;
    border: 1px solid #e2e6e7;
    border-radius: 50%;
    width: fit-content;
    position: relative;
    margin-bottom: 2.5rem;

    .circle-node--image-container {
      overflow: hidden;
      border-radius: inherit;
    }

    &::before {
      content: "";
      position: absolute;
      top: calc(100%);
      left: 0;
      right: 0;
      margin: 0 auto;
      height: 2rem;
      width: 1px;
      background-color: #e2e6e7;
    }

    &::after {
      content: "";
      position: absolute;
      top: calc(100% + 2rem);
      left: 0;
      right: 0;
      margin: 0 auto;
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      border: 1px solid #e2e6e7;
    }

    &.animate {
      &::before {
        animation: var(--circle-node-animation-duration) ease-in slide-down-before;
        animation-fill-mode: forwards;
      }

      &::after {
        animation: var(--circle-node-animation-duration) ease-in slide-down-after;
        animation-fill-mode: forwards;
      }
    }
  }

  @keyframes slide-down-before {
    0% {
      height: 0rem;
    }

    100% {
      height: 2rem;
    }
  }

  @keyframes slide-down-after {
    0% {
      top: 100%;
    }

    100% {
      top: calc(100% + 2rem);
    }
  }
  }
</style>
      