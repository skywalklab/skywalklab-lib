<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import { fade, fly } from "svelte/transition";
  import Cancel from "@lucide/svelte/icons/x";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import { galleryController } from "../../actions/gallery.js";
  import type { Snippet } from "svelte";

  interface Props {
    /** Caption shown below the content. Also the dialog's accessible label, which falls back to the image's `alt`. */
    title?: string;
    /** Unlock scrolling on the page behind while the lightbox is open. */
    unlockScroll?: boolean;
    /** Index of the open image, or `undefined` to close. Bindable; the arrows, Escape and the close button set it, so a parent knows which image is open and when the lightbox closed. */
    lightboxIndex?: number;
    /** How many images the parent's collection holds. The arrows wrap around it; leave it at 1 and they stay put — see `MasonryGallery`. */
    itemLength?: number;
    /** Content shown in the lightbox, usually the open image. The parent swaps it as `lightboxIndex` changes — see `MasonryGallery`. */
    imageSnippet: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    title,
    unlockScroll = false,
    lightboxIndex = $bindable(undefined),
    imageSnippet,
    itemLength = 1,
    style
  }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
  let dialogRef: HTMLDivElement | undefined = $state();
  let previouslyFocused: HTMLElement | null = null;

  const isOpen = $derived<boolean>(lightboxIndex !== undefined);

  // Arrows page within the collection; every other key (Escape) may close by returning undefined.
  const handleKey = (event: KeyboardEvent["key"]) => {
    const newIndex: number | undefined = galleryController({ galleryIndex: lightboxIndex, itemLength, event });
    lightboxIndex = ["ArrowLeft", "ArrowRight"].includes(event) ? (newIndex ?? lightboxIndex) : newIndex;
  };

  $effect(() => {
    if (!isOpen) return;

    previouslyFocused = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => dialogRef?.focus());

    return () => previouslyFocused?.focus();
  });

  function trapFocus(e: KeyboardEvent) {
    if (e.key !== "Tab" || !dialogRef) return;

    const focusable = dialogRef.querySelectorAll<HTMLElement>("button, [href], input, select, textarea");
    if (focusable.length < 1) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && (active === first || active === dialogRef)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  $effect(() => {
    document.body.style.overflow = unlockScroll || lightboxIndex === undefined ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  });
</script>

{#if lightboxIndex !== undefined}
  <div
    bind:this={dialogRef}
    id="lightbox-overlay-{uid}"
    class="lightbox-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby={title ? `lightbox-overlay--title-${uid}` : `lightbox-overlay--image-${uid}`}
    tabindex="0"
    transition:fade={{ duration: 200 }}
    onclick={(e) => {
      if (e.target !== e.currentTarget) return;
      lightboxIndex = undefined;
    }}
    onkeydown={(e) => {
      trapFocus(e);
      handleKey(e.key);
    }}
    {style}>
    <button class="lightbox-overlay--close-button" aria-label={labels.close} onclick={() => (lightboxIndex = undefined)}
      ><Cancel /></button>
    <div id="lightbox-overlay--image-{uid}" style="display: contents;">{@render imageSnippet()}</div>
    {#if title}
      <p
        id="lightbox-overlay--title-{uid}"
        class="lightbox-overlay--title"
        in:fly={{ y: 10, duration: 300, delay: 100 }}>
        {title}
      </p>
    {/if}
    <button
      type="button"
      class="lightbox-overlay--arrow-button previous"
      onclick={(e) => {
        e.stopPropagation();
        handleKey("ArrowLeft");
      }}
      aria-label={labels.previousImage}>
      <ArrowLeft />
    </button>
    <button
      type="button"
      class="lightbox-overlay--arrow-button next"
      onclick={(e) => {
        e.stopPropagation();
        handleKey("ArrowRight");
      }}
      aria-label={labels.nextImage}>
      <ArrowRight />
    </button>
  </div>
{/if}

<style>
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
</style>
