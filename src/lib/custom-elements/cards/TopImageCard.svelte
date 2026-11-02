<svelte:options
  customElement={{
    tag: "skywalk-top-image-card",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      title: { type: "String", attribute: "sw-title" },
      text: { type: "String", attribute: "sw-text" },
      hover: { type: "Boolean", attribute: "sw-hover" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "cards/TopImageCard", false);
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
  import TopImageCard from "../../components/cards/TopImageCard.svelte";

  let { title, text, hover, style }: any = $props();
</script>

<TopImageCard {title} {text} {hover} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</TopImageCard>


<style>
  :host {
    display: block;
  }

  :global {
.top-image-card {
    height: 100%;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 20px var(--inline-padding, 1rem);
    z-index: 1;
    background-color: #ffffff;
    transition: transform 0.3s cubic-bezier(0, 0, 0.58, 1);

    @media (min-width: 480px) {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    &.hover {
      &:hover {
        transform: scale(1.05);
        z-index: 2;
      }
    }

    .top-image-card--info {
      flex: 1;

      .top-image-card--title {
        margin: 1rem 0 0.5rem;
        font-size: 18px;
        font-weight: bold;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
      }

      .top-image-card--text {
        font-weight: normal;
        font-size: 15px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
      }
    }
  }
  }
</style>
      