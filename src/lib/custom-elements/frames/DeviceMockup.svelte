<svelte:options
  customElement={{
    tag: "skywalk-device-mockup",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      attrs: { type: "Object", attribute: "sw-attrs" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "frames/DeviceMockup", false);
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
  import DeviceMockup from "../../components/frames/DeviceMockup.svelte";

  let { attrs, style }: any = $props();
</script>

<DeviceMockup {attrs} {style} />


<style>
  :host {
    display: block;
  }

  :global {
:global(.device-mockup--phone) {
    margin-bottom: 1.25rem;
    overflow: hidden;
    box-sizing: content-box;
    padding: 0 3px 3px 0;
  }
  }
</style>
      