<svelte:options
  customElement={{
    tag: "skywalk-page-heading-banner-1",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      pageTitle: { type: "String", attribute: "sw-page-title" },
      breadcrumbs: { type: "Object", attribute: "sw-breadcrumbs" },
      tag: { type: "String", attribute: "sw-tag" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "banners/PageHeadingBanner1", false);
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
  import PageHeadingBanner1 from "../../components/banners/PageHeadingBanner1.svelte";

  let { pageTitle, breadcrumbs, tag, style }: any = $props();
</script>

<PageHeadingBanner1 {pageTitle} {breadcrumbs} {tag} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.page-heading-banner-1 {
    padding: 2rem clamp(6px, 4vw, 18px);

    .page-heading-banner-1--inner-container {
      display: flex;
      column-gap: 2rem;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .page-heading-banner-1--title {
        font-size: clamp(20px, 5vw, 24px);
      }

      .page-heading-banner-1--breadcrumbs-container {
        font-size: clamp(13px, 3.75vw, 15px);
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        .page-heading-banner-1--breadcrumbs {
          text-transform: uppercase;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;

          .page-heading-banner-1--breadcrumbs-child {
            font-weight: bold;
          }
        }
      }
    }
  }
  }
</style>
      