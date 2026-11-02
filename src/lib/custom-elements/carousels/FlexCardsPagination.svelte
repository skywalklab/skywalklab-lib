<svelte:options
  customElement={{
    tag: "skywalk-flex-cards-pagination",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      cards: { type: "Array", attribute: "sw-cards" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "carousels/FlexCardsPagination", false);
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
  import FlexCardsPagination from "../../components/carousels/FlexCardsPagination.svelte";

  let { cards, style }: any = $props();
</script>

<FlexCardsPagination {cards} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.flex-cards-pagination {
    overflow: hidden;
    width: 100%;

    .flex-cards-pagination--cards-viewport {
      display: grid;
      justify-content: center;
      position: relative;
      margin-bottom: 3rem;
      width: 100%;
    }

    .flex-cards-pagination--cards-container {
      position: relative;
      grid-area: 1 / 1;
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 1.5rem;

      &.is-paginated {
        cursor: grab;
      }

      .flex-cards-pagination--card {
        filter: grayscale();
        padding: 1rem;
        width: var(--flex-cards-pagination-card-width);
        min-width: 140px;
        height: 115px;
        background-color: #fff;
        user-select: none;

        &:hover {
          filter: grayscale(0);
        }

        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
    }

    .flex-cards-pagination--dots-container {
      display: flex;
      justify-content: center;
      gap: 1rem;

      .flex-cards-pagination--dot {
        width: 1px;
        height: 1px;
        border-radius: 50%;
        border: 5px solid #e2e6e7;
        background: #e2e6e7;

        &.selected {
          border-color: var(--primary, black);
          background: var(--primary, black);
        }
      }
    }
  }
  }
</style>
      