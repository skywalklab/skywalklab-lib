<svelte:options
  customElement={{
    tag: "skywalk-bubble-icon",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      icon: { type: "String", attribute: "sw-icon" },
      iconProps: { type: "Object", attribute: "sw-icon-props" },
      title: { type: "String", attribute: "sw-title" },
      tag: { type: "String", attribute: "sw-tag" },
      highlight: { type: "Boolean", attribute: "sw-highlight" },
      bgColor: { type: "String", attribute: "sw-bg-color" },
      highlightColor: { type: "String", attribute: "sw-highlight-color" },
      swOnclick: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "cards/BubbleIcon", false);
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
  import BubbleIcon from "../../components/cards/BubbleIcon.svelte";

  let { icon, iconProps, title, tag, highlight, bgColor, highlightColor, swOnclick, style }: any = $props();
</script>

<BubbleIcon {icon} {iconProps} {title} {tag} {highlight} {bgColor} {highlightColor} onclick={swOnclick} {style} />


<style>
  :host {
    display: block;
  }

  :global {
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
      