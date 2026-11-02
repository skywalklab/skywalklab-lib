<svelte:options
  customElement={{
    tag: "skywalk-stat-banner",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      stats: { type: "Array", attribute: "sw-stats" },
      intersectionActions: { type: "Array", attribute: "sw-intersection-actions" },
      intersectionActionParams: { type: "Object", attribute: "sw-intersection-action-params" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "banners/StatBanner", false);
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
  import StatBanner from "../../components/banners/StatBanner.svelte";

  let { stats, intersectionActions, intersectionActionParams, style }: any = $props();
</script>

<StatBanner {stats} {intersectionActions} {intersectionActionParams} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.stat-banner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr) minmax(120px, 1fr));
    gap: 2rem;
    text-align: center;

    .stat-banner--item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      .stat-banner--value {
        font-size: clamp(36px, 6vw, 48px);
        font-weight: bold;
        line-height: 1;
      }

      .stat-banner--label {
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
  }
</style>
      