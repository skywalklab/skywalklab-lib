<svelte:options
  customElement={{
    tag: "skywalk-static-grid",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      cards: { type: "Array", attribute: "sw-cards" },
      buttonText: { type: "String", attribute: "sw-button-text" },
      buttonClass: { type: "String", attribute: "sw-button-class" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "panels/StaticGrid", false);
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
  import StaticGrid from "../../components/panels/StaticGrid.svelte";

  let { cards, buttonText, buttonClass, style }: any = $props();
</script>

<StaticGrid {cards} {buttonText} {buttonClass} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.static-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }

    .static-grid--card {
      padding-inline: var(--side-padding, 12px);
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      justify-content: center;
      height: clamp(10rem, 20vw, 20rem);

      &::before {
        content: "";
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(38, 38, 40, 0.75);
        transition: opacity 0.15s linear;
        opacity: 0;
      }

      &:hover {
        &::before {
          opacity: 1;
        }
      }

      .static-grid--image {
        object-fit: cover;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }

      .static-grid--title {
        position: relative;
        z-index: 2;
        color: #fff;
        text-wrap: balance;
        text-align: center;
      }

      .static-grid--button {
        text-transform: uppercase;
        font-size: 14px;
        padding: 0.75rem 1.25rem;
        border-radius: 999px;
        position: relative;
        z-index: 3;

        &:hover {
          border-color: var(--primary, black);
        }
      }
    }
  }
  }
</style>
      