<svelte:options
  customElement={{
    tag: "skywalk-staircase-banner",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      transitionTiming: { type: "Number", attribute: "sw-transition-timing" },
      baseColor: { type: "String", attribute: "sw-base-color" },
      intersectionActions: { type: "Array", attribute: "sw-intersection-actions" },
      intersectionActionParams: { type: "Object", attribute: "sw-intersection-action-params" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "banners/StaircaseBanner", false);
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
  import StaircaseBanner from "../../components/banners/StaircaseBanner.svelte";

  let { transitionTiming, baseColor, intersectionActions, intersectionActionParams, style }: any = $props();
</script>

<StaircaseBanner {transitionTiming} {baseColor} {intersectionActions} {intersectionActionParams} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</StaircaseBanner>


<style>
  :host {
    display: block;
  }

  :global {
.staircase-banner {
    position: relative;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    border-radius: 12px;
    color: #ffffff;

    .staircase-banner--inner-container {
      text-wrap: balance;
      text-align: center;
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem 1rem 4rem;
    }

    .staircase-banner--bg {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;

      svg {
        width: 100%;
        height: 100%;

        polygon,
        rect {
          transition: fill var(--staircase-banner-fill-transition-timing) cubic-bezier(0, 0, 0.58, 1);
        }
      }
    }
  }
  }
</style>
      