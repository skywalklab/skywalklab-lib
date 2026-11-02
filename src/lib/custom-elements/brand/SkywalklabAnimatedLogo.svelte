<svelte:options
  customElement={{
    tag: "skywalk-skywalklab-animated-logo",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      itemIndex: { type: "Number", attribute: "sw-item-index", reflect: true },
      itemsLength: { type: "Number", attribute: "sw-items-length" },
      logoProps: { type: "Object", attribute: "sw-logo-props" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "brand/SkywalklabAnimatedLogo", false);
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
  import SkywalklabAnimatedLogo from "../../components/brand/SkywalklabAnimatedLogo.svelte";

  let { itemIndex = $bindable(0), itemsLength, logoProps, style }: any = $props();
</script>

<SkywalklabAnimatedLogo bind:itemIndex={itemIndex} {itemsLength} {logoProps} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.skywalklab-logo {
    fill-opacity: var(--skywalklab-logo-opacity);
    stroke: var(--skywalklab-logo-stroke);

    &.single-curve {
      transform: rotate(50deg);

      .curve-1,
      .curve-3 {
        display: none;
      }
    }
  }
  }
</style>
      