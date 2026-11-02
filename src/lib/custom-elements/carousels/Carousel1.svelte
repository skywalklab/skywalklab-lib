<svelte:options
  customElement={{
    tag: "skywalk-carousel-1",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      activeIndex: { type: "Number", attribute: "sw-active-index", reflect: true },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "carousels/Carousel1", false);
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
  import Carousel1 from "../../components/carousels/Carousel1.svelte";

  let { items, activeIndex = $bindable(0), style }: any = $props();
</script>

<Carousel1 {items} bind:activeIndex={activeIndex} {style} >
  {#snippet itemSnippet()}
    <slot name="itemSnippet"/>
  {/snippet}
</Carousel1>


<style>
  :host {
    display: block;
  }

  :global {
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
  }
</style>
      