<svelte:options
  customElement={{
    tag: "skywalk-stat-strip",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      headingColor: { type: "String", attribute: "sw-heading-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "banners/StatStrip", false);
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
  import StatStrip from "../../components/banners/StatStrip.svelte";

  let { items, headingColor, style }: any = $props();
</script>

<StatStrip {items} {headingColor} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.stat-strip {
    --stat-strip-accent: var(--accent, lightblue);

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 2rem;

    .stat-strip--item {
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.35rem;
        bottom: 0.35rem;
        width: 3px;
        border-radius: 999px;
        background-color: var(--stat-strip-accent);
      }

      .stat-strip--value {
        color: var(--stat-strip-heading-color, var(--primary, black));
        font-size: clamp(34px, 4vw, 48px);
        line-height: 1.05;
        font-weight: 800;
        letter-spacing: -0.03em;
      }

      .stat-strip--label {
        margin-top: 0.5rem;
        font-size: 15px;
        line-height: 22px;
        text-wrap: balance;
      }
    }
  }
  }
</style>
      