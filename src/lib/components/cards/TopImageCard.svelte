<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    /** Heading shown under the image. */
    title?: string;
    /** Body copy shown under the title. */
    text?: string;
    /** Raise the card on hover. */
    hover?: boolean;
    /** Rendered at the top of the card, above its title and text — this is the image slot. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { title, text, hover = false, children, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="top-image-card-{uid}" class="top-image-card" class:hover {style}>
  {@render children()}
  <div class="top-image-card--info">
    {#if title}
      <p class="top-image-card--title">{title}</p>
    {/if}
    {#if text}
      <p class="top-image-card--text">{text}</p>
    {/if}
  </div>
</div>

<style>
  .top-image-card {
    height: 100%;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 20px var(--inline-padding, 1rem);
    z-index: 1;
    background-color: #ffffff;
    transition: transform 0.3s cubic-bezier(0, 0, 0.58, 1);

    @media (min-width: 480px) {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    &.hover {
      &:hover {
        transform: scale(1.05);
        z-index: 2;
      }
    }

    .top-image-card--info {
      flex: 1;

      .top-image-card--title {
        margin: 1rem 0 0.5rem;
        font-size: 18px;
        font-weight: bold;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
      }

      .top-image-card--text {
        font-weight: normal;
        font-size: 15px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
      }
    }
  }
</style>
