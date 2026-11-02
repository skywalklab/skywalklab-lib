<svelte:options
  customElement={{
    tag: "skywalk-accordion-2",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      summary: { type: "String", attribute: "sw-summary" },
      index: { type: "Number", attribute: "sw-index" },
      selectedIndex: { type: "Number", attribute: "sw-selected-index" },
      open: { type: "Boolean", attribute: "sw-open" },
      activeColor: { type: "String", attribute: "sw-active-color" },
      activeBgColor: { type: "String", attribute: "sw-active-bg-color" },
      cb: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "disclosure/Accordion2", false);
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
  import Accordion2 from "../../components/disclosure/Accordion2.svelte";

  let { summary, index, selectedIndex, open, activeColor, activeBgColor, cb, style }: any = $props();
</script>

<Accordion2 {summary} {index} {selectedIndex} {open} {activeColor} {activeBgColor} {cb} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</Accordion2>


<style>
  :host {
    display: block;
  }

  :global {
/**
   * --accordion-2-active-color     Text color of the open header.       (#fff)
   * --accordion-2-active-bg-color  Background color of the open header. (var(--primary), black)
   */
  .accordion-2 {
    width: 100%;
    border-bottom: 1px solid #e6e6e7;
    overflow: hidden;
    border-radius: 5px;

    .accordion-2--button {
      width: 100%;
      background-color: #fff;
      border: none;
      text-align: left;
      cursor: pointer;
      padding: 8px 1rem;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      transition:
        background-color 0.15s linear,
        color 0.15s linear,
        transform 0.15s linear;

      &:not(.active):is(&:hover, &:focus-visible) {
        transform: translateX(7.5px);
      }

      &.active {
        background-color: var(--accordion-2-active-bg-color, var(--primary, black));
        color: var(--accordion-2-active-color, #fff);
      }

      .accordion-2--icon-container {
        border: 1px solid currentColor;
        border-radius: 50%;
      }
    }

    .accordion-2--content {
      width: 100%;
      background-color: #ffffff;
      padding: 1rem 2vw;

      @media (min-width: 768px) {
        padding: 1rem 1rem;
      }
    }
  }
  }
</style>
      