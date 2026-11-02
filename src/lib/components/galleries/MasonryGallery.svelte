<script lang="ts">
  import { fly } from "svelte/transition";
  import LightboxOverlay from "./LightboxOverlay.svelte";
  import { cubicOut } from "svelte/easing";

  interface Props {
    /** Images laid out in the masonry grid. */
    images: { src: string; title: string; width: string; height: string }[];
    /** Index of the image open in the lightbox, or `undefined` when it's closed. Bindable. */
    galleryIndex?: number;
    /** Prevents opening images in a lightbox on click. */
    disableLightbox?: boolean;
    /** Unlock scrolling on the page behind while the lightbox is open. Passed to `LightboxOverlay`. */
    unlockScroll?: boolean;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { images, galleryIndex, disableLightbox = false, unlockScroll = false, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="masonry-gallery-{uid}" class="masonry-gallery" {style}>
  {#each images as image, i (i)}
    <figure class="masonry-gallery--figure">
      <button
        class="masonry-gallery--button"
        aria-label={image.title}
        onclick={() => (galleryIndex = i)}
        disabled={disableLightbox}>
        <img class="masonry-gallery--img" src={image.src} alt={image.title} width={image.width} height={image.height} />
      </button>
      <figcaption class="masonry-gallery--title">{image.title}</figcaption>
    </figure>
  {/each}
</div>

{#if galleryIndex !== undefined}
  <LightboxOverlay
    title={images[galleryIndex].title}
    bind:lightboxIndex={galleryIndex}
    itemLength={images.length}
    {unlockScroll}>
    {#snippet imageSnippet()}
      <img
        class="lightbox-overlay--image"
        src={images[galleryIndex!].src}
        alt={images[galleryIndex!].title}
        width={images[galleryIndex!].width}
        height={images[galleryIndex!].height}
        in:fly={{ y: 20, duration: 300, easing: cubicOut }} />
    {/snippet}
  </LightboxOverlay>
{/if}

<style>
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
</style>
