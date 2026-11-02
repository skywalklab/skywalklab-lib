<svelte:options
  customElement={{
    tag: "skywalk-page-heading-banner-2",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      pageTitle: { type: "String", attribute: "sw-page-title" },
      image: { type: "Object", attribute: "sw-image" },
      breadcrumbs: { type: "Array", attribute: "sw-breadcrumbs" },
      tag: { type: "String", attribute: "sw-tag" },
      minHeight: { type: "String", attribute: "sw-min-height" },
      maxHeight: { type: "String", attribute: "sw-max-height" },
      tintFromColor: { type: "String", attribute: "sw-tint-from-color" },
      tintToColor: { type: "String", attribute: "sw-tint-to-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "banners/PageHeadingBanner2", false);
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
  import PageHeadingBanner2 from "../../components/banners/PageHeadingBanner2.svelte";

  let { pageTitle, image, breadcrumbs, tag, minHeight, maxHeight, tintFromColor, tintToColor, style }: any = $props();
</script>

<PageHeadingBanner2 {pageTitle} {image} {breadcrumbs} {tag} {minHeight} {maxHeight} {tintFromColor} {tintToColor} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.page-heading-banner-2 {
    position: relative;
    display: grid;
    place-items: center;
    min-height: min(
      var(--page-heading-banner-2-min-height, clamp(220px, 30vw, 340px)),
      var(--page-heading-banner-2-max-height, 65svh)
    );
    max-height: var(--page-heading-banner-2-max-height, 65svh);
    overflow: hidden;
    text-align: center;

    .page-heading-banner-2--image {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        100deg,
        color-mix(in srgb, var(--page-heading-banner-2-tint-from, var(--accent, lightblue)), transparent 25%),
        color-mix(in srgb, var(--page-heading-banner-2-tint-to, var(--primary, black)), transparent 30%)
      );
    }

    .page-heading-banner-2--inner-container {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
      padding: 3rem var(--side-padding, 12px);
      color: #fff;
    }

    .page-heading-banner-2--title {
      font-size: clamp(32px, 5.5vw, 62px);
      line-height: 1.1;
      font-weight: 800;
      letter-spacing: -0.02em;
      text-transform: none;
      text-shadow: 0 2px 18px rgba(15, 25, 34, 0.25);
    }

    .page-heading-banner-2--breadcrumbs {
      font-size: clamp(14px, 1.4vw, 17px);

      .page-heading-banner-2--breadcrumbs-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        .page-heading-banner-2--breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;

          .page-heading-banner-2--breadcrumb-link {
            transition: opacity 0.15s linear;

            &:hover {
              opacity: 0.75;
            }
          }

          .page-heading-banner-2--breadcrumb-text[aria-current="page"] {
            font-weight: 600;
          }
        }
      }
    }
  }
  }
</style>
      