<script lang="ts">
  import type { Component } from "svelte";

  interface Props {
    /** Image shown beside the list. */
    image: {
      /** Image source. */
      src: string;
      /** Alt text for the image. */
      alt: string;
      /** Intrinsic image width. */
      width: string;
      /** Intrinsic image height. */
      height: string;
    };
    /** List entries shown beside the image; each `icon` is a component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL; `iconProps` takes `lucide_icon` and `size` for `Icon`, and everything else is forwarded to the component or `<img>`. */
    items: {
      /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
      icon: Component<any, object, ""> | string;
      /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
      iconProps?: Record<string, any>;
      /** Heading for the entry. */
      title: string;
      /** Body copy shown under the heading. */
      description: string;
    }[];
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { image, items, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="image-by-list-{uid}" class="image-by-list" {style}>
  <div class="image-by-list--image-container">
    <img class="image-by-list--image" src={image.src} alt={image.alt} width={image.width} height={image.height} />
  </div>
  <ul class="image-by-list--list">
    {#each items as item, i (i)}
      {@const IconComponent = item.icon}
      <li class="image-by-list--item">
        <div class="image-by-list--icon-container">
          {#if typeof IconComponent === "string"}
            <img
              {...item.iconProps}
              src={IconComponent}
              alt={item.iconProps?.alt ?? item.title}
              width={item.iconProps?.width ?? item.iconProps?.size ?? "48"}
              height={item.iconProps?.height ?? item.iconProps?.size ?? "48"} />
          {:else}
            <IconComponent {...item.iconProps} />
          {/if}
        </div>
        <div class="image-by-list--text-container">
          <p class="image-by-list--title">{item.title}</p>
          <p class="image-by-list--description">{item.description}</p>
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .image-by-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: clamp(2rem, 5.5vw, 4rem);

    .image-by-list--image-container {
      width: clamp(300px, 40vw, 480px);
      height: clamp(300px, 40vw, 480px);
      border-radius: 50%;
      overflow: hidden;

      .image-by-list--image {
        width: 100%;
        height: 100%;
        object-position: top;
        object-fit: cover;
      }
    }

    .image-by-list--list {
      flex: 1;
      min-width: 280px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .image-by-list--item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1.5rem;

        .image-by-list--icon-container {
          padding: 1rem;
          width: fit-content;
          height: fit-content;
          border: 1px solid #e2e6e7;
          border-radius: 50%;

          img,
          :global(svg) {
            width: clamp(32px, 4.5vw, 48px);
            height: clamp(32px, 4.5vw, 48px);
            stroke-width: 1.1px;
          }
        }

        .image-by-list--text-container {
          flex: 1;
          width: fit-content;
          min-width: 250px;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;

          .image-by-list--title {
            font-size: clamp(18px, 2.5vw, 22px);
            line-height: 26px;
          }
        }
      }
    }
  }
</style>
