<script lang="ts">
  import type { Snippet } from "svelte";
  import CircleCheck from "@lucide/svelte/icons/circle-check";

  interface Props {
    /** Heading shown beside the image. */
    title: string;
    /** Body copy shown under the title. */
    description: string;
    /** Short proof points shown under the description. */
    items: {
      /** Heading for the proof point. */
      title: string;
      /** Detail shown under the heading. */
      description: string;
    }[];
    /** Image shown beside the copy. */
    image: { src: string; alt: string; width: string; height: string };
    /** Color of the title and item headings. Sets `--story-split-panel-heading-color`. */
    headingColor?: string;
    /** Color of the dot grid. Sets `--story-split-panel-dot-color`. */
    dotColor?: string;
    /** Call-to-action rendered under the items; takes no parameters. */
    buttonSnippet?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { title, description, items, image, headingColor, dotColor, buttonSnippet, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div
  id="story-split-panel-{uid}"
  class="story-split-panel"
  style:--story-split-panel-heading-color={headingColor}
  style:--story-split-panel-dot-color={dotColor}
  {style}>
  <div class="story-split-panel--visual">
    <span class="story-split-panel--frame"></span>
    <span class="story-split-panel--wedge"></span>
    <img class="story-split-panel--image" src={image.src} alt={image.alt} width={image.width} height={image.height} />
    <svg class="story-split-panel--dots" aria-hidden="true">
      <pattern id="story-split-panel--dots-pattern-{uid}" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="3" fill="currentColor" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#story-split-panel--dots-pattern-{uid})" />
    </svg>
  </div>

  <div class="story-split-panel--content">
    <h2 class="story-split-panel--title">{title}</h2>
    <p class="story-split-panel--description">{description}</p>

    <ul class="story-split-panel--items">
      {#each items as item, i (i)}
        <li class="story-split-panel--item">
          <p class="story-split-panel--item-title">
            <span class="story-split-panel--item-icon"><CircleCheck size={20} /></span>{item.title}
          </p>
          <p class="story-split-panel--item-description">{item.description}</p>
        </li>
      {/each}
    </ul>

    {@render buttonSnippet?.()}
  </div>
</div>

<style>
  .story-split-panel {
    --story-split-panel-accent: var(--accent, lightblue);

    display: grid;
    gap: 3rem;
    align-items: center;

    .story-split-panel--visual {
      position: relative;
      aspect-ratio: 4 / 5;
      isolation: isolate;

      .story-split-panel--frame {
        position: absolute;
        inset: 3% 12% 8% 8%;
        border: 2px solid color-mix(in srgb, var(--story-split-panel-accent), transparent 45%);
        border-radius: 24px;
        z-index: -1;
      }

      .story-split-panel--wedge {
        position: absolute;
        top: 2%;
        right: 3%;
        width: 20%;
        aspect-ratio: 1;
        background-color: var(--story-split-panel-accent);
        border-radius: 0 0 0 100%;
        z-index: -1;
      }

      .story-split-panel--image {
        position: absolute;
        top: 8%;
        left: 0;
        width: 78%;
        height: 92%;
        object-fit: cover;
        border-radius: 24px;
      }

      .story-split-panel--dots {
        position: absolute;
        right: 4%;
        bottom: 14%;
        width: 150px;
        height: 190px;
        color: var(--story-split-panel-dot-color, var(--story-split-panel-accent));
        z-index: -2;
      }
    }

    .story-split-panel--content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .story-split-panel--title {
        color: var(--story-split-panel-heading-color, var(--primary, black));
        font-size: clamp(30px, 3.4vw, 46px);
        line-height: 1.15;
        font-weight: 800;
        letter-spacing: -0.02em;
        text-transform: none;
        margin: 0 0 1.5rem;
        max-width: 18ch;
      }

      .story-split-panel--description {
        font-size: 16px;
        line-height: 28px;
        max-width: 58ch;
      }

      .story-split-panel--items {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
        gap: 1.75rem 2.5rem;
        width: 100%;
        margin: 2.5rem 0;

        .story-split-panel--item {
          .story-split-panel--item-title {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            color: var(--story-split-panel-heading-color, var(--primary, black));
            font-size: 18px;
            font-weight: 800;
            line-height: 1.3;
            margin-bottom: 0.6rem;

            .story-split-panel--item-icon {
              display: flex;
              flex-shrink: 0;
              color: var(--story-split-panel-accent);
            }
          }

          .story-split-panel--item-description {
            font-size: 15px;
            line-height: 26px;
          }
        }
      }
    }

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1.1fr;
      gap: 4.5rem;
    }
  }
</style>
