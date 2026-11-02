<svelte:options
  customElement={{
    tag: "skywalk-terms-it",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      companyName: { type: "String", attribute: "sw-company-name" },
      links: { type: "Object", attribute: "sw-links" },
      updated: { type: "String", attribute: "sw-updated" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "legal/TermsIt", false);
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
  import TermsIt from "../../components/legal/TermsIt.svelte";

  let { companyName, links, updated, style }: any = $props();
</script>

<TermsIt {companyName} {links} {updated} {style} />


<style>
  :host {
    display: block;
  }
</style>
      