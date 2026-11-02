<svelte:options
  customElement={{
    tag: "skywalk-card-3block-1",
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
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "cards/Card3Block1", false);
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
  import Card3Block1 from "../../components/cards/Card3Block1.svelte";

  let { cards, style }: any = $props();
</script>

<Card3Block1 {cards} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.card-3-block-1 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .card-3-block-1--inner-container {
    background-color: #fff;
    display: flex;
    flex-direction: column;

    .card-3-block-1--image-container {
      width: 100%;
      height: 260px;

      .card-3-block-1--image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.15s linear;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    .card-3-block-1--text-container {
      padding: 1rem 1rem 2rem;

      .card-3-block-1--title {
        margin-top: 22px;
        text-align: center;
        font-size: 18px;
        line-height: 28px;
        text-transform: uppercase;

        &::after {
          content: "";
          display: block;
          background: var(--primary, black);
          height: 2px;
          width: 40px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 23px;
        }
      }

      .card-3-block-1--description {
        padding: 24px 25px 0;
        text-align: center;
        font-size: 16px;
      }
    }
  }
  }
</style>
      