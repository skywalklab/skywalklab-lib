<script lang="ts">
  import Plus from "@lucide/svelte/icons/plus";
  import type { Component } from "svelte";

  interface Props {
    /** Heading above the grid. */
    title: string;
    /** Body copy under the title. */
    description: string;
    /** Cards shown in the grid; each `icon` is a component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL; `iconProps` takes `lucide_icon` and `size` for `Icon`, and everything else is forwarded to the component or `<img>`. */
    items: {
      /** Card heading. */
      title: string;
      /** Body copy shown under the heading. */
      summary: string;
      /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
      icon: Component<any, object, ""> | string;
      /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
      iconProps?: Record<string, any>;
      /** Image shown at the top of the card. */
      image?: { src: string; alt?: string; width: string; height: string };
      /** Destination the card links to. */
      href: string;
    }[];
    /** Link text on each card. */
    linkText: string;
    /** Color of the title, card headings and card links. Sets `--image-card-grid-heading-color`. */
    headingColor?: string;
    /** Badge background color. Sets `--image-card-grid-badge-bg-color`. */
    badgeBgColor?: string;
    /** Badge icon color. Sets `--image-card-grid-badge-color`. */
    badgeColor?: string;
    /** Card background color. Sets `--image-card-grid-card-bg-color`. */
    cardBgColor?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { title, description, items, linkText, headingColor, badgeBgColor, badgeColor, cardBgColor, style }: Props =
    $props();
  let uid: string = $props.id();
</script>

<div
  id="image-card-grid-{uid}"
  class="image-card-grid"
  style:--image-card-grid-heading-color={headingColor}
  style:--image-card-grid-badge-bg-color={badgeBgColor}
  style:--image-card-grid-badge-color={badgeColor}
  style:--image-card-grid-card-bg-color={cardBgColor}
  {style}>
  <div class="image-card-grid--inner-container">
    <div class="image-card-grid--heading">
      <h2 class="image-card-grid--title">{title}</h2>
      <p class="image-card-grid--description">{description}</p>
    </div>

    <ul class="image-card-grid--cards">
      {#each items as item, i (i)}
        {@const IconComponent = item.icon}
        <li class="image-card-grid--card">
          <div class="image-card-grid--media">
            {#if item.image}
              <img
                class="image-card-grid--image"
                src={item.image.src}
                alt={item.image.alt ?? item.title}
                width={item.image.width}
                height={item.image.height} />
            {/if}
            <span class="image-card-grid--badge">
              {#if typeof IconComponent === "string"}
                <img
                  {...item.iconProps}
                  src={IconComponent}
                  alt=""
                  width={item.iconProps?.size ?? 26}
                  height={item.iconProps?.size ?? 26} />
              {:else}
                <IconComponent {...item.iconProps} />
              {/if}
            </span>
          </div>
          <div class="image-card-grid--body">
            <h3 class="image-card-grid--card-title">{item.title}</h3>
            <p class="image-card-grid--card-summary">{item.summary}</p>
            <a class="image-card-grid--card-link" href={item.href}>{linkText}<Plus size={16} /></a>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .image-card-grid {
    .image-card-grid--inner-container {
      .image-card-grid--heading {
        display: grid;
        gap: 1.5rem;
        align-items: center;
        margin-bottom: 3.5rem;

        .image-card-grid--title {
          color: var(--image-card-grid-heading-color, var(--primary, black));
          font-size: clamp(30px, 3.4vw, 46px);
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -0.02em;
          text-transform: none;
        }

        .image-card-grid--description {
          font-size: 16px;
          line-height: 28px;
        }

        @media (min-width: 1024px) {
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }
      }

      .image-card-grid--cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;

        .image-card-grid--card {
          background-color: var(--image-card-grid-card-bg-color, var(--accent, lightblue));
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 18px 40px rgba(15, 25, 34, 0.1);

          .image-card-grid--media {
            position: relative;
            margin: 0.75rem 0.75rem 0;

            .image-card-grid--image {
              width: 100%;
              aspect-ratio: 16 / 11;
              height: auto;
              object-fit: cover;
              border-radius: 10px;
            }

            .image-card-grid--badge {
              position: absolute;
              right: 0;
              bottom: 0;
              transform: translate(18%, 34%);
              display: flex;
              align-items: center;
              justify-content: center;
              width: 68px;
              height: 68px;
              border-radius: 50%;
              background-color: var(--image-card-grid-badge-bg-color, var(--primary, black));
              color: var(--image-card-grid-badge-color, var(--accent, lightblue));
            }
          }

          .image-card-grid--body {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            padding: 2rem 1.75rem;

            .image-card-grid--card-title {
              color: var(--image-card-grid-heading-color, var(--primary, black));
              font-size: 24px;
              line-height: 1.25;
              font-weight: 800;
              letter-spacing: -0.01em;
              text-transform: none;
            }

            .image-card-grid--card-summary {
              font-size: 15px;
              line-height: 26px;
            }

            .image-card-grid--card-link {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              color: var(--image-card-grid-heading-color, var(--primary, black));
              font-size: 15px;
              font-weight: 600;
              transition: color 0.15s linear;

              &:hover {
                color: color-mix(in srgb, var(--image-card-grid-heading-color, var(--primary, black)), transparent 35%);
              }
            }
          }
        }
      }
    }
  }
</style>
