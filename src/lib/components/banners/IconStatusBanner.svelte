<script lang="ts">
  import type { Component } from "svelte";

  interface Props {
    /** Icons shown across the banner. Each item's `icon` is a component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL; `iconProps` takes `lucide_icon` and `size` for `Icon`, and everything else is forwarded to the component or `<img>`. */
    icons: {
      /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
      icon: Component<any, object, ""> | string;
      /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
      iconProps?: Record<string, any>;
      /** Label rendered under the icon. */
      label?: string;
      /** Element this item renders as. Use `"button"` when it is clickable, which also sets its `aria-label` and `title` from `label`. */
      tag: string;
    }[];
    /** Index of the active icon. */
    i: number;
    /** Text color of the active item's label, and of its icon when it is the library's `Icon` (images are unaffected). Sets `--icon-status-banner-active-color`. */
    activeColor?: string;
    /** Called with the index of the clicked icon. */
    onclick?: (index: number) => void;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { icons, i, activeColor = "var(--primary, black)", onclick, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div
  id="icon-status-banner-{uid}"
  class="icon-status-banner"
  style:--icon-status-banner-active-color={activeColor}
  {style}>
  {#each icons as item, index (index)}
    {@const IconComponent = item.icon}
    <svelte:element
      this={item.tag}
      role={item.tag !== "button" && onclick != undefined ? "button" : undefined}
      tabindex={item.tag !== "button" && onclick != undefined ? 0 : undefined}
      onclick={() => onclick?.(index)}
      class="icon-status-banner--icon-container"
      class:active={i === index}
      aria-label={item.tag === "button" || onclick != undefined ? (item.label ?? "banner button") : undefined}>
      {#if typeof IconComponent === "string"}
        <img
          {...item.iconProps}
          class="icon-status-banner--icon-img"
          src={IconComponent}
          alt={item.iconProps?.alt ?? item.label ?? ""}
          width={item.iconProps?.width ?? item.iconProps?.size ?? "28"}
          height={item.iconProps?.height ?? item.iconProps?.size ?? "28"} />
      {:else}
        <IconComponent {...item.iconProps} />
      {/if}
      {#if item.label}
        <p class="icon-status-banner--subtext">{item.label}</p>
      {/if}
    </svelte:element>
  {/each}
</div>

<style>
  .icon-status-banner {
    width: 100%;
    display: flex;
    gap: 0.25rem 0.5rem;
    justify-content: center;
    align-items: center;

    .icon-status-banner--icon-container {
      height: fit-content;
      width: fit-content;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      align-items: center;
      opacity: 0.45;
      transition:
        opacity 0.2s,
        transform 0.2s;

      &.active {
        opacity: 1;
        transform: scale(1.15);
        color: var(--icon-status-banner-active-color);

        :global(svg),
        img {
          filter: none;
        }

        .icon-status-banner--subtext {
          font-weight: bold;
        }
      }

      :global(svg),
      img {
        filter: grayscale(1);
        transition: filter 0.2s ease;
      }

      .icon-status-banner--subtext {
        font-size: 12px;
        margin: 0;
        display: none;

        @media (min-width: 480px) {
          display: block;
        }
      }
    }

    button.icon-status-banner--icon-container {
      background: transparent;
      border: none;
      cursor: pointer;
    }
  }
</style>
