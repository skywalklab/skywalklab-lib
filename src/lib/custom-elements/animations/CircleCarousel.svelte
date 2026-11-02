<svelte:options
  customElement={{
    tag: "skywalk-circle-carousel",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      context: { type: "Object", attribute: "sw-context" },
      backgroundImageUrl: { type: "String", attribute: "sw-background-image-url" },
      intersectionActions: { type: "Array", attribute: "sw-intersection-actions" },
      intersectionActionParams: { type: "Object", attribute: "sw-intersection-action-params" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "animations/CircleCarousel", false);
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
  import CircleCarousel from "../../components/animations/CircleCarousel.svelte";

  let { items, context, backgroundImageUrl, intersectionActions, intersectionActionParams, style }: any = $props();
</script>

<CircleCarousel {items} {context} {backgroundImageUrl} {intersectionActions} {intersectionActionParams} {style} >
  {#snippet itemSnippet()}
    <slot name="itemSnippet"/>
  {/snippet}
</CircleCarousel>


<style>
  :host {
    display: block;
  }

  :global {
ul.circle-carousel {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    min-height: 400px;
    max-height: 100%;
    min-width: 275px;
    max-width: 100%;
    margin: 0;
    padding: 0;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    border-radius: 6px;
    transition: box-shadow 1s ease;
    background: var(--circle-carousel-background-image);
    background-position: center;
    background-size: 50%;
    background-repeat: no-repeat;
    background-color: var(--primary-light, #333);

    li {
      overflow: hidden;
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 1rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      width: clamp(80px, 28%, 150px);
      height: clamp(80px, 24%, 150px);
      background-color: #fffffff7;
      will-change: transform;
      transition:
        opacity 1s linear,
        border 0.3s ease;

      @media (prefers-reduced-motion: reduce) {
        transition: border 0.75s ease;
      }

      &:last-child {
        border: 1px solid var(--primary-light, #333);
      }
    }
  }
  }
</style>
      