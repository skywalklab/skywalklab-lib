<svelte:options
  customElement={{
    tag: "skywalk-top-bar-3",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      iconSize: { type: "String", attribute: "sw-icon-size" },
      iconColor: { type: "String", attribute: "sw-icon-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "banners/TopBar3", false);
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
  import TopBar3 from "../../components/banners/TopBar3.svelte";

  let { items, iconSize, iconColor, style }: any = $props();
</script>

<TopBar3 {items} {iconSize} {iconColor} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.top-bar-3 {
    .top-bar-3--inner-container {
      max-width: 1170px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: center;
    }

    .top-bar-3--contact-details {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;

      .top-bar-3--item {
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        padding: 15px 20px;
      }

      .top-bar-3--item > :first-child {
        text-decoration: none;
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .top-bar-3--item > :first-child {
        color: var(--top-bar-3-icon-color);

        &:hover,
        &:focus-visible {
          filter: invert(0.2);
        }
      }

      .top-bar-3--item .top-bar-3--text {
        display: none;

        @media (min-width: 768px) {
          display: flex;
        }
      }
    }
  }
  }
</style>
      