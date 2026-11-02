<svelte:options
  customElement={{
    tag: "skywalk-skywalklab-logo",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      fill: { type: "String", attribute: "sw-fill" },
      endFill: { type: "String", attribute: "sw-end-fill" },
      offset: { type: "Object", attribute: "sw-offset" },
      stroke: { type: "String", attribute: "sw-stroke" },
      opacity: { type: "Number", attribute: "sw-opacity" },
      position: { type: "String", attribute: "sw-position" },
      width: { type: "String", attribute: "sw-width" },
      height: { type: "String", attribute: "sw-height" },
      singleCurve: { type: "Boolean", attribute: "sw-single-curve" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "brand/SkywalklabLogo", false);
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
  import SkywalklabLogo from "../../components/brand/SkywalklabLogo.svelte";

  let { fill, endFill, offset, stroke, opacity, position, width, height, singleCurve, style }: any = $props();
</script>

<SkywalklabLogo {fill} {endFill} {offset} {stroke} {opacity} {position} {width} {height} {singleCurve} {style} />


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
      