<script lang="ts">
  import type { Snippet } from "svelte";
  import CircleCheck from "@lucide/svelte/icons/circle-check";

  interface Props {
    /** Heading shown beside the image. */
    title: string;
    /** Body copy shown under the title. */
    description: string;
    /** Short one-line proof points. */
    items: {
      /** Text pieces joined with spaces into one line. */
      segments: {
        /** One piece of the line. */
        text: string;
      }[];
    }[];
    /** Image shown beside the copy. */
    image: { src: string; alt: string; width: string; height: string };
    /** Color of the title and item text. Sets `--about-split-panel-heading-color`. */
    headingColor?: string;
    /** Color of the dot grids. Sets `--about-split-panel-dot-color`. */
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
  id="about-split-panel-{uid}"
  class="about-split-panel"
  style:--about-split-panel-heading-color={headingColor}
  style:--about-split-panel-dot-color={dotColor}
  {style}>
  <div class="about-split-panel--inner-container">
    <div class="about-split-panel--visual">
      <svg class="about-split-panel--dots left" aria-hidden="true">
        <pattern id="about-split-panel--dots-pattern-{uid}" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="3" fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#about-split-panel--dots-pattern-{uid})" />
      </svg>
      <span class="about-split-panel--backdrop"></span>
      <span class="about-split-panel--outline"></span>
      <img class="about-split-panel--image" src={image.src} alt={image.alt} width={image.width} height={image.height} />
      <span class="about-split-panel--dot"></span>
      <svg class="about-split-panel--dots right" aria-hidden="true">
        <rect width="100%" height="100%" fill="url(#about-split-panel--dots-pattern-{uid})" />
      </svg>
    </div>

    <div class="about-split-panel--content">
      <h2 class="about-split-panel--title">{title}</h2>
      <p class="about-split-panel--description">{description}</p>
      <ul class="about-split-panel--items">
        {#each items as item, i (i)}
          <li class="about-split-panel--item">
            <span class="about-split-panel--item-icon"><CircleCheck size={20} /></span>
            <span class="about-split-panel--item-text">{item.segments.map((segment) => segment.text).join(" ")}</span>
          </li>
        {/each}
      </ul>
      {@render buttonSnippet?.()}
    </div>
  </div>
</div>

<style>
  .about-split-panel {
    --about-split-panel-accent: var(--accent, lightblue);

    .about-split-panel--inner-container {
      display: grid;
      gap: 3.5rem;
      align-items: center;

      .about-split-panel--visual {
        position: relative;
        aspect-ratio: 1 / 1;
        isolation: isolate;

        .about-split-panel--dots {
          position: absolute;
          width: 36px;
          height: 162px;
          color: var(--about-split-panel-dot-color, var(--about-split-panel-accent));

          &.left {
            left: 2%;
            top: 20%;
          }

          &.right {
            right: 2%;
            bottom: 20%;
          }
        }

        .about-split-panel--backdrop {
          position: absolute;
          inset: 8% 17.5% 5% 17.5%;
          border-radius: 30px;
          background: linear-gradient(
            135deg,
            var(--about-split-panel-accent) 0%,
            color-mix(in srgb, var(--about-split-panel-accent), #fff 94%) 45%,
            color-mix(in srgb, var(--about-split-panel-accent), #fff 94%) 58%,
            var(--about-split-panel-accent) 100%
          );
          z-index: -2;
        }

        .about-split-panel--outline {
          position: absolute;
          inset: 19% 18.5% 10% 26.5%;
          border: 2px solid var(--about-split-panel-accent);
          border-radius: 30px;
          z-index: -1;
        }

        .about-split-panel--image {
          position: absolute;
          top: 51%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 64%;
          aspect-ratio: 1 / 1;
          height: auto;
          object-fit: cover;
          border-radius: 50%;
        }

        .about-split-panel--dot {
          position: absolute;
          left: 26.5%;
          bottom: 13%;
          transform: translateX(-50%);
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background-color: var(--about-split-panel-accent);
        }
      }

      .about-split-panel--content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;

        .about-split-panel--title {
          color: var(--about-split-panel-heading-color, var(--primary, black));
          font-size: clamp(30px, 3.4vw, 46px);
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -0.02em;
          text-transform: none;
        }

        .about-split-panel--description {
          font-size: 16px;
          line-height: 28px;
          max-width: 56ch;
        }

        .about-split-panel--items {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem 2rem;
          width: 100%;
          margin-block: 0.5rem;

          .about-split-panel--item {
            display: flex;
            align-items: center;
            gap: 0.65rem;
            font-size: 16px;
            line-height: 24px;
            color: var(--about-split-panel-heading-color, var(--primary, black));

            .about-split-panel--item-icon {
              display: flex;
              flex-shrink: 0;
              color: var(--about-split-panel-accent);
            }
          }
        }
      }

      @media (min-width: 1024px) {
        grid-template-columns: 1fr 1fr;
        gap: 5rem;
      }
    }
  }
</style>
