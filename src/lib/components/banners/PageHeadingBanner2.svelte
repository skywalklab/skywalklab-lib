<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import HomeIcon from "@lucide/svelte/icons/home";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

  interface Props {
    /** Title shown over the banner image. */
    pageTitle: string;
    /** Background image for the banner. */
    image: { src: string; alt?: string; width: string; height: string };
    /** Trail before the current page; the last crumb is rendered as plain text. */
    breadcrumbs?: { text: string; href?: string }[];
    /** Heading level used for the title. */
    tag?: string;
    /** Minimum banner height. Sets `--page-heading-banner-2-min-height`. */
    minHeight?: string;
    /** Maximum banner height. Sets `--page-heading-banner-2-max-height`. */
    maxHeight?: string;
    /** Start color of the overlay tint. Sets `--page-heading-banner-2-tint-from`. */
    tintFromColor?: string;
    /** End color of the overlay tint. Sets `--page-heading-banner-2-tint-to`. */
    tintToColor?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    pageTitle,
    image,
    breadcrumbs,
    tag = "h1",
    minHeight,
    maxHeight,
    tintFromColor,
    tintToColor,
    style
  }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
</script>

<div
  id="page-heading-banner-2-{uid}"
  class="page-heading-banner-2"
  style:--page-heading-banner-2-min-height={minHeight}
  style:--page-heading-banner-2-max-height={maxHeight}
  style:--page-heading-banner-2-tint-from={tintFromColor}
  style:--page-heading-banner-2-tint-to={tintToColor}
  {style}>
  <img
    class="page-heading-banner-2--image"
    src={image.src}
    alt={image.alt ?? ""}
    width={image.width}
    height={image.height} />

  <div class="page-heading-banner-2--inner-container">
    <svelte:element this={tag} class="page-heading-banner-2--title">{pageTitle}</svelte:element>

    {#if breadcrumbs?.length}
      <nav class="page-heading-banner-2--breadcrumbs" aria-label={labels.breadcrumb}>
        <ol class="page-heading-banner-2--breadcrumbs-list">
          {#each breadcrumbs as crumb, i (i)}
            <li class="page-heading-banner-2--breadcrumb">
              {#if i === 0}
                <HomeIcon size={17} />
              {/if}
              {#if crumb.href && i < breadcrumbs.length - 1}
                <a class="page-heading-banner-2--breadcrumb-link" href={crumb.href}>{crumb.text}</a>
              {:else}
                <span
                  class="page-heading-banner-2--breadcrumb-text"
                  aria-current={i === breadcrumbs.length - 1 ? "page" : undefined}>{crumb.text}</span>
              {/if}
              {#if i < breadcrumbs.length - 1}
                <ChevronRightIcon size={16} />
              {/if}
            </li>
          {/each}
        </ol>
      </nav>
    {/if}
  </div>
</div>

<style>
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
</style>
