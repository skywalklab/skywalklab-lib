<svelte:options
  customElement={{
    tag: "skywalk-back-to-top-1",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      scrollThreshold: { type: "Number", attribute: "sw-scroll-threshold" },
      size: { type: "String", attribute: "sw-size" },
      bgColor: { type: "String", attribute: "sw-bg-color" },
      hoverBgColor: { type: "String", attribute: "sw-hover-bg-color" },
      iconColor: { type: "String", attribute: "sw-icon-color" },
      scrollContainer: { type: "String", attribute: "sw-scroll-container" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "utilities/BackToTop1", false);
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
  import BackToTop1 from "../../components/utilities/BackToTop1.svelte";

  let { scrollThreshold, size, bgColor, hoverBgColor, iconColor, scrollContainer, style }: any = $props();
</script>

<BackToTop1 {scrollThreshold} {size} {bgColor} {hoverBgColor} {iconColor} {scrollContainer} {style} />


<style>
  :host {
    display: contents;
  }

  :global {
.back-to-top-1 {
    background-color: var(--back-to-top-1-bg-color);
    color: var(--back-to-top-1-icon-color);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--back-to-top-1-size);
    height: var(--back-to-top-1-size);
    position: fixed;
    z-index: 500;
    bottom: 3rem;
    right: 0;
    cursor: pointer;
    transition: background-color 0.15s linear;

    &:hover {
      background-color: var(--back-to-top-1-hover-bg-color);
    }

    @media (min-width: 480px) {
      right: 3rem;
    }

    :global(svg) {
      width: 2.25rem;
      height: 2.25rem;
    }
  }
  }
</style>
      