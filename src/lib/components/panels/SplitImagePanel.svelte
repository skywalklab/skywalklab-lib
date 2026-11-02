<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    /** Image for the media half. Renders after `mediaSnippet` when both are set. */
    image?: { src: string; alt: string; width: string; height: string };
    /** Heading shown beside the image. */
    title?: string;
    /** Puts the media half on the right. */
    reverse?: boolean;
    /** Background color of the content half. Sets `--split-image-panel-content-bg-color`. */
    contentBgColor?: string;
    /** Rendered in the media half, before `image` if that is set too — a map, video, anything. */
    mediaSnippet?: Snippet;
    /** Rendered in the content half, below the title. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { image, title, reverse = false, contentBgColor, mediaSnippet, children, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div
  id="split-image-panel-{uid}"
  class="split-image-panel"
  class:reverse
  style:--split-image-panel-content-bg-color={contentBgColor}
  {style}>
  <div class="split-image-panel--media">
    {@render mediaSnippet?.()}
    {#if image}
      <img class="split-image-panel--image" src={image.src} alt={image.alt} width={image.width} height={image.height} />
    {/if}
  </div>
  <div class="split-image-panel--content">
    <div class="split-image-panel--inner">
      {#if title}
        <h2 class="split-image-panel--title">{title}</h2>
      {/if}
      {@render children()}
    </div>
  </div>
</div>

<style>
  .split-image-panel {
    display: grid;

    .split-image-panel--media {
      min-height: 320px;
      display: grid;

      .split-image-panel--image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .split-image-panel--content {
      background-color: var(--split-image-panel-content-bg-color, var(--primary, black));
      color: #fff;
      padding: clamp(3rem, 6vw, 5.5rem) var(--side-padding, 12px);
      display: flex;
      align-items: center;

      .split-image-panel--inner {
        width: 100%;
        max-width: calc(var(--max-page-width, 1200px) / 2);
        margin-right: auto;

        .split-image-panel--title {
          color: #fff;
          font-size: clamp(30px, 3.2vw, 46px);
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -0.02em;
          text-transform: none;
          margin: 0 0 2.5rem;
          max-width: 18ch;
        }
      }
    }

    &.reverse .split-image-panel--inner {
      margin-right: 0;
      margin-left: auto;
    }

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;

      &.reverse .split-image-panel--media {
        order: 1;
      }
    }
  }
</style>
