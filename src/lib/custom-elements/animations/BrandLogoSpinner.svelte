<svelte:options
  customElement={{
    tag: "skywalk-brand-logo-spinner",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      icon: { type: "String", attribute: "sw-icon" },
      iconProps: { type: "Object", attribute: "sw-icon-props" },
      colorOuter: { type: "String", attribute: "sw-color-outer" },
      colorCenter: { type: "String", attribute: "sw-color-center" },
      colorInner: { type: "String", attribute: "sw-color-inner" },
      size: { type: "Number", attribute: "sw-size" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "animations/BrandLogoSpinner", false);
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
  import BrandLogoSpinner from "../../components/animations/BrandLogoSpinner.svelte";

  let { icon, iconProps, colorOuter, colorCenter, colorInner, size, style }: any = $props();
</script>

<BrandLogoSpinner {icon} {iconProps} {colorOuter} {colorCenter} {colorInner} {size} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.brand-logo-spinner {
    background-color: transparent;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    pointer-events: none;

    .brand-logo-spinner--img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      display: grid;
      place-items: center;
    }
  }

.svelte-spinner {
    color: inherit;
  }
  }
</style>
      