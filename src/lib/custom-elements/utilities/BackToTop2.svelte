<svelte:options
  customElement={{
    tag: "skywalk-back-to-top-2",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      scrollThreshold: { type: "Number", attribute: "sw-scroll-threshold" },
      size: { type: "String", attribute: "sw-size" },
      ringWidth: { type: "String", attribute: "sw-ring-width" },
      scrollContainer: { type: "String", attribute: "sw-scroll-container" },
      trackColor: { type: "String", attribute: "sw-track-color" },
      indicatorColor: { type: "String", attribute: "sw-indicator-color" },
      iconColor: { type: "String", attribute: "sw-icon-color" },
      buttonBgColor: { type: "String", attribute: "sw-button-bg-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "utilities/BackToTop2", false);
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
  import BackToTop2 from "../../components/utilities/BackToTop2.svelte";

  let { scrollThreshold, size, ringWidth, scrollContainer, trackColor, indicatorColor, iconColor, buttonBgColor, style }: any = $props();
</script>

<BackToTop2 {scrollThreshold} {size} {ringWidth} {scrollContainer} {trackColor} {indicatorColor} {iconColor} {buttonBgColor} {style} />


<style>
  :host {
    display: contents;
  }

  :global {
.back-to-top-2 {
    position: fixed;
    z-index: 500;
    bottom: 2rem;
    right: 1rem;

    .back-to-top-2--button {
      position: relative;
      display: grid;
      place-items: center;
      width: var(--back-to-top-2-size, 3.25rem);
      height: var(--back-to-top-2-size, 3.25rem);
      padding: 0;
      border: 0;
      border-radius: 50%;
      background-color: var(--back-to-top-2-button-bg-color, var(--primary, black));
      color: var(--back-to-top-2-icon-color, var(--accent, lightblue));
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(15, 25, 34, 0.15);
      transition: transform 0.15s linear;

      &:hover {
        transform: translateY(-2px);
      }

      .back-to-top-2--ring {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
        fill: none;
        stroke-linecap: round;

        .back-to-top-2--track {
          stroke: var(--back-to-top-2-track-color, color-mix(in srgb, var(--accent, lightblue), transparent 70%));
          stroke-width: var(--back-to-top-2-ring-width, 3);
        }

        .back-to-top-2--indicator {
          stroke: var(--back-to-top-2-indicator-color, var(--accent, lightblue));
          stroke-width: var(--back-to-top-2-ring-width, 3);
          transition: stroke-dashoffset 0.1s linear;
        }
      }
    }

    @media (min-width: 480px) {
      right: 2rem;
    }
  }
  }
</style>
      