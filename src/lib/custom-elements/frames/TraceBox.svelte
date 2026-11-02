<svelte:options
  customElement={{
    tag: "skywalk-trace-box",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      traceLength: { type: "String", attribute: "sw-trace-length" },
      traceColor: { type: "String", attribute: "sw-trace-color" },
      tracePlus: { type: "Object", attribute: "sw-trace-plus" },
      tracePlusColor: { type: "String", attribute: "sw-trace-plus-color" },
      intersectionActions: { type: "Array", attribute: "sw-intersection-actions" },
      intersectionActionParams: { type: "Object", attribute: "sw-intersection-action-params" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "frames/TraceBox", false);
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
  import TraceBox from "../../components/frames/TraceBox.svelte";

  let { traceLength, traceColor, tracePlus, tracePlusColor, intersectionActions, intersectionActionParams, style }: any = $props();
</script>

<TraceBox {traceLength} {traceColor} {tracePlus} {tracePlusColor} {intersectionActions} {intersectionActionParams} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</TraceBox>


<style>
  :host {
    display: block;
  }

  :global {
.trace-box {
    --trace-box-border-width: 1px;
    position: relative;
    padding: 1rem;
    color: currentColor;
    background: radial-gradient(
      ellipse at top left,
      color-mix(in srgb, var(--trace-box-color) 50%, transparent),
      var(--trace-box-color) 50%
    );

    &.entry-animate {
      .trace-box--plus {
        &.top-left {
          transform: translate(-50%, -50%) rotate(-90deg);
        }

        &.bottom-left {
          transform: translate(-50%, 50%) rotate(-90deg);
        }

        &.top-right {
          transform: translate(50%, -50%) rotate(-90deg);
        }

        &.bottom-right {
          transform: translate(50%, 50%) rotate(-90deg);
        }
      }
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      border: var(--trace-box-border-width) solid color-mix(in srgb, var(--trace-box-color) 50%, transparent);
      pointer-events: none;
    }

    &::before {
      width: calc(100% + var(--trace-box-length));
      height: 100%;
      border-left: none;
      border-right: none;
      transform: translateX(calc(var(--trace-box-length) / -2));
    }

    &::after {
      width: 100%;
      height: calc(100% + var(--trace-box-length));
      border-top: none;
      border-bottom: none;
    }

    .trace-box--plus {
      position: absolute;
      z-index: 2;
      color: var(--trace-box-plus-color);
      transition: transform 0.5s cubic-bezier(0, 0, 0.58, 1);

      @media (prefers-reduced-motion: reduce) {
        transition: transform 1s cubic-bezier(0, 0, 0.58, 1);
      }

      &.top-left {
        top: calc(var(--trace-box-border-width) * 0.5);
        left: calc(var(--trace-box-border-width) * 0.5);
        transform: translate(-50%, -50%);
      }

      &.bottom-left {
        bottom: calc(var(--trace-box-border-width) * 0.5);
        left: calc(var(--trace-box-border-width) * 0.5);
        transform: translate(-50%, 50%);
      }

      &.top-right {
        top: calc(var(--trace-box-border-width) * 0.5);
        right: calc(var(--trace-box-border-width) * 0.5);
        transform: translate(50%, -50%);
      }

      &.bottom-right {
        bottom: calc(var(--trace-box-border-width) * 0.5);
        right: calc(var(--trace-box-border-width) * 0.5);
        transform: translate(50%, 50%);
      }
    }
  }
  }
</style>
      