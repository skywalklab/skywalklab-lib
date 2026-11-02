<svelte:options
  customElement={{
    tag: "skywalk-aside-nav-1",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      selectedIndex: { type: "Number", attribute: "sw-selected-index", reflect: true },
      buttonClass: { type: "String", attribute: "sw-button-class" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "nav/AsideNav1", false);
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
  import AsideNav1 from "../../components/nav/AsideNav1.svelte";

  let { items, selectedIndex = $bindable(0), buttonClass, style }: any = $props();
</script>

<AsideNav1 {items} bind:selectedIndex={selectedIndex} {buttonClass} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.aside-nav-1 {
    .aside-nav-1--list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .aside-nav-1--list-item {
        position: relative;

        .aside-nav-1--list-item-button {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          text-align: start;

          :global(svg) {
            min-width: 1rem;
            min-height: 1rem;
          }
        }
      }
    }
  }
  }
</style>
      