<svelte:options
  customElement={{
    tag: "skywalk-square-check-list",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      iconColor: { type: "String", attribute: "sw-icon-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "lists/SquareCheckList", false);
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
  import SquareCheckList from "../../components/lists/SquareCheckList.svelte";

  let { items, iconColor, style }: any = $props();
</script>

<SquareCheckList {items} {iconColor} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.square-check-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .square-check-list--item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 14px;

      :global(.square-check-list--icon) {
        width: 1.25rem;
        min-width: 1.25rem;
        height: 1.25rem;
        min-height: 1.25rem;
      }

      .square-check-list--item-text {
        &.square-check-list--link {
          text-decoration: underline;
        }
      }
    }
  }
  }
</style>
      