<svelte:options
  customElement={{
    tag: "skywalk-svelte-spinner",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      type: { type: "String", attribute: "sw-type" },
      spinnerProps: { type: "Object", attribute: "sw-spinner-props" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "animations/SvelteSpinner", false);
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
  import SvelteSpinner from "../../components/animations/SvelteSpinner.svelte";

  let { type, spinnerProps, style }: any = $props();
</script>

<SvelteSpinner {type} {spinnerProps} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.svelte-spinner {
    color: inherit;
  }
  }
</style>
      