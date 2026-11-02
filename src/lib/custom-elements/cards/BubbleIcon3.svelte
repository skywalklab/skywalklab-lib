<svelte:options
  customElement={{
    tag: "skywalk-bubble-icon-3",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      highlightIndex: { type: "Number", attribute: "sw-highlight-index", reflect: true },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "cards/BubbleIcon3", false);
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
  import BubbleIcon3 from "../../components/cards/BubbleIcon3.svelte";

  let { items, highlightIndex = $bindable(0), style }: any = $props();
</script>

<BubbleIcon3 {items} bind:highlightIndex={highlightIndex} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.bubble-icon-3 {
    display: flex;
    gap: clamp(0.25rem, 4vw, 1rem);

    :global {
      .bubble-icon.highlight {
        svg {
          color: #fff;
        }
      }

      .bubble-icon--icon-container svg {
        width: clamp(24px, 5vw, 40px);
        height: auto;
      }
    }
  }

.bubble-icon {
    appearance: none;
    border: none;
    font: inherit;
    color: inherit;
    text-align: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: clamp(92px, 20vw, 130px);
    height: clamp(120px, 20vw, 130px);
    padding: 0.5rem;
    position: relative;
    transition:
      background-color 0.15s linear,
      color 0.15s linear;
    background-color: var(--bubble-icon-bg-color, white);

    &.highlight,
    &:hover {
      color: #fff;
      background-color: var(--bubble-icon-highlight-color, var(--primary, black));

      .bubble-icon--icon-container {
        :global {
          svg {
            transition: color 0.15s linear;
            color: currentColor;
          }
        }
      }
    }

    .bubble-icon--icon-container {
      :global {
        svg {
          color: var(--bubble-icon-highlight-color, var(--primary, black));
        }
      }
    }

    .bubble-icon--title {
      font-size: clamp(12px, 3vw, 16px);
      text-align: center;
      line-height: 1.2;
      flex: 1;
      max-height: 40%;
    }

    .bubble-icon--chevron-container {
      position: absolute;
      left: 0;
      right: 0;
      margin-inline: auto;
      width: fit-content;
      bottom: -28px;

      :global(svg) {
        stroke-width: 0;
        fill: currentColor;
      }
    }
  }
  }
</style>
      