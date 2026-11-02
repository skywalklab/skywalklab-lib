<svelte:options
  customElement={{
    tag: "skywalk-json-ld",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      schema: { type: "Object", attribute: "sw-schema" },
      showSchema: { type: "Boolean", attribute: "sw-show-schema" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "seo/JsonLd", false);
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
  import JsonLd from "../../components/seo/JsonLd.svelte";

  let { schema, showSchema }: any = $props();
</script>

<JsonLd {schema} {showSchema} />


<style>
  :host {
    display: block;
  }
</style>
      