<svelte:options
  customElement={{
    tag: "skywalk-pricing-card",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      name: { type: "String", attribute: "sw-name" },
      included: { type: "Array", attribute: "sw-included" },
      notIncluded: { type: "Array", attribute: "sw-not-included" },
      indicatorText: { type: "String", attribute: "sw-indicator-text" },
      beforeSize: { type: "Number", attribute: "sw-before-size" },
      beforeColor: { type: "String", attribute: "sw-before-color" },
      afterColor: { type: "String", attribute: "sw-after-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "cards/PricingCard", false);
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
  import PricingCard from "../../components/cards/PricingCard.svelte";

  let { name, included, notIncluded, indicatorText, beforeSize, beforeColor, afterColor, style }: any = $props();
</script>

<PricingCard {name} {included} {notIncluded} {indicatorText} {beforeSize} {beforeColor} {afterColor} {style} >
  {#snippet includedSnippet()}
    <slot name="includedSnippet"/>
  {/snippet}
{#snippet notIncludedSnippet()}
    <slot name="notIncludedSnippet"/>
  {/snippet}
{#snippet buttonSnippet()}
    <slot name="buttonSnippet"/>
  {/snippet}
</PricingCard>


<style>
  :host {
    display: block;
  }

  :global {
.pricing-card {
    /** Derived from the indicator size, so it stays declared rather than defaulted. */
    --pricing-card-after-size: calc(var(--pricing-card-before-size) - 0.75%);
    padding: 3rem clamp(1.5rem, 3vw, 3rem);
    border-radius: 8px;
    flex: 1;
    min-width: 280px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: transparent;
    position: relative;

    @media (min-width: 480px) {
      min-width: 350px;
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      display: block;
      height: 100%;
      width: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      -webkit-mask: var(--pricing-card-mask) no-repeat center / var(--pricing-card-before-size)
        var(--pricing-card-before-size);
      mask: var(--pricing-card-mask) no-repeat center / var(--pricing-card-before-size) var(--pricing-card-before-size);
      background-color: var(--pricing-card-before-color, var(--primary, black));
      z-index: 0;
    }

    &::after {
      background-color: var(--pricing-card-after-color, #fff);
      -webkit-mask-size: var(--pricing-card-after-size) var(--pricing-card-after-size);
      mask-size: var(--pricing-card-after-size) var(--pricing-card-after-size);
      z-index: 1;
    }

    .pricing-card--indicator {
      position: absolute;
      z-index: 2;
      top: calc((var(--pricing-card-before-size) - var(--pricing-card-after-size)));
      right: 1rem;
      width: 100px;
      height: 2.75rem;
      max-width: 25%;
      color: currentColor;
      white-space: nowrap;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .pricing-card--indicator-text {
        position: relative;
        width: fit-content;
        font-size: 14px;

        &::after {
          content: "";
          height: 6px;
          width: 6px;
          position: absolute;
          background-color: var(--pricing-card-before-color, var(--primary, black));
          border-radius: 50%;
          right: -0.75rem;
          top: 0;
          bottom: 0;
          margin: auto;
          transition:
            background-color 0.5s ease,
            transform 0.5s ease;
          transform-origin: center center;
        }
      }
    }

    .pricing-card--name {
      position: relative;
      z-index: 2;
      font-size: clamp(22px, 4vw, 30px);
      margin-bottom: 0.5rem;
    }

    .pricing-card--divider {
      position: relative;
      z-index: 2;
      margin-bottom: 1rem;
      background-color: color-mix(in srgb, var(--pricing-card-before-color, var(--primary, black)) 75%, #fff);
      height: 1px;
      border: 0;
    }

    .pricing-card--detail-list {
      position: relative;
      z-index: 2;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .pricing-card--detail {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 16px;

        &.not-included {
          color: #666;
        }
      }
    }

    .pricing-card--price {
      margin-top: 5rem;
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: center;
    }
  }
  }
</style>
      