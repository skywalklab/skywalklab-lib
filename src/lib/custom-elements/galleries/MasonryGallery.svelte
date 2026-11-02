<svelte:options
  customElement={{
    tag: "skywalk-masonry-gallery",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      images: { type: "Array", attribute: "sw-images" },
      galleryIndex: { type: "Number", attribute: "sw-gallery-index" },
      disableLightbox: { type: "Boolean", attribute: "sw-disable-lightbox" },
      unlockScroll: { type: "Boolean", attribute: "sw-unlock-scroll" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "galleries/MasonryGallery", false);
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
  import MasonryGallery from "../../components/galleries/MasonryGallery.svelte";

  let { images, galleryIndex, disableLightbox, unlockScroll, style }: any = $props();
</script>

<MasonryGallery {images} {galleryIndex} {disableLightbox} {unlockScroll} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.masonry-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: 250px;
    grid-auto-flow: dense;

    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(min(300px, calc(100% / 3)), 1fr));
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(auto-fit, minmax(min(300px, calc(100% / 5)), 1fr));
    }

    .masonry-gallery--figure {
      overflow: hidden;
      position: relative;

      .masonry-gallery--button {
        width: 100%;
        height: 100%;

        &:hover {
          .masonry-gallery--img {
            transform: scale(1.03);
            filter: brightness(0.5);
          }

          + .masonry-gallery--title {
            bottom: 1rem;
          }
        }

        .masonry-gallery--img {
          width: 100%;
          height: 100%;
          object-position: center;
          object-fit: cover;
          position: relative;
          z-index: 1;
          transition:
            transform 0.3s ease,
            filter 0.3s ease;
        }

        + .masonry-gallery--title {
          color: #fff;
          text-align: center;
          width: fit-content;
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4rem;
          margin: 0 auto;
          z-index: 2;
          transition: bottom 0.3s linear;
        }
      }

      @media (min-width: 768px) {
        &:first-of-type {
          grid-column: span 2;
          grid-row: span 2;
        }

        &:nth-of-type(10n + 4) {
          grid-column: span 1;
          grid-row: span 3;
        }

        &:nth-of-type(10n + 6) {
          grid-column: span 2;
          grid-row: span 3;
        }

        &:nth-of-type(10n + 8) {
          grid-column: span 2;
          grid-row: span 1;
        }
      }

      @media (min-width: 1024px) {
        &:first-of-type {
          grid-column: span 2;
          grid-row: span 2;
        }

        &:nth-of-type(10n + 4) {
          grid-column: span 1;
          grid-row: span 3;
        }

        &:nth-of-type(10n + 6) {
          grid-column: span 3;
          grid-row: span 2;
        }

        &:nth-of-type(10n + 8) {
          grid-column: span 1;
          grid-row: span 1;
        }
      }
    }
  }

.lightbox-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .lightbox-overlay--close-button {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      color: #fff;
      font-size: 3.5rem;
      cursor: pointer;
      transition: background-color 0.15s linear;

      &:hover {
        background: color-mix(in srgb, rgba(0, 0, 0, 0.9) 80%, #fff);
      }

      :global(svg) {
        height: 2rem;
        width: 2rem;
      }
    }

    .lightbox-overlay--title {
      color: #fff;
      margin-top: 1rem;
      font-size: 1.25rem;
    }

    .lightbox-overlay--arrow-button {
      position: absolute;
      z-index: 2;
      top: 0;
      bottom: 0;
      margin: auto 0;
      height: fit-content;
      padding: 2.5rem 0.5rem;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      transition:
        background-color 0.15s linear,
        color 0.15s linear;
      cursor: pointer;

      &.previous {
        left: 0;
      }

      &.next {
        right: 0;
      }

      &:hover {
        background-color: #fff;
        color: #000;
      }
    }
  }
  }
</style>
      