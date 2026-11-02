<svelte:options
  customElement={{
    tag: "skywalk-circle-node-3",
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
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "cards/CircleNode3", false);
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
  import CircleNode3 from "../../components/cards/CircleNode3.svelte";

  let { cards, style }: any = $props();
</script>

<CircleNode3 {cards} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.circle-node-3 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    .circle-node-3--inner-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      min-width: 280px;
    }
  }

  .circle-node-3--text-container {
    .circle-node-3--title {
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

    .circle-node-3--description {
      padding: 24px 25px 0;
      text-align: center;
      font-size: 16px;
      text-wrap: balance;
    }
  }

.circle-node {
    --circle-node-animation-duration: 0.3s;
    padding: 2.5rem;
    border: 1px solid #e2e6e7;
    border-radius: 50%;
    width: fit-content;
    position: relative;
    margin-bottom: 2.5rem;

    .circle-node--image-container {
      overflow: hidden;
      border-radius: inherit;
    }

    &::before {
      content: "";
      position: absolute;
      top: calc(100%);
      left: 0;
      right: 0;
      margin: 0 auto;
      height: 2rem;
      width: 1px;
      background-color: #e2e6e7;
    }

    &::after {
      content: "";
      position: absolute;
      top: calc(100% + 2rem);
      left: 0;
      right: 0;
      margin: 0 auto;
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      border: 1px solid #e2e6e7;
    }

    &.animate {
      &::before {
        animation: var(--circle-node-animation-duration) ease-in slide-down-before;
        animation-fill-mode: forwards;
      }

      &::after {
        animation: var(--circle-node-animation-duration) ease-in slide-down-after;
        animation-fill-mode: forwards;
      }
    }
  }

  @keyframes slide-down-before {
    0% {
      height: 0rem;
    }

    100% {
      height: 2rem;
    }
  }

  @keyframes slide-down-after {
    0% {
      top: 100%;
    }

    100% {
      top: calc(100% + 2rem);
    }
  }
  }
</style>
      