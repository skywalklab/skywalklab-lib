<script lang="ts">
  import { getSocialSVG } from "../../utils/icons.js";

  interface Props {
    /**
     * Items shown in the bar, in order.
     * - `label`: a known label gets a built-in icon; `phone`, `email` and `address` also get a `tel:`, `mailto:` or Google Maps link.
     * - `src`: image URL used as the icon, in place of the built-in one.
     * - `value`: text shown next to the icon, and the source of the generated link.
     * - `href`: link for the item, overriding the generated one. Items with no link render without an anchor.
     * - `showVal`: show `value` next to the icon from 768px up.
     */
    items: {
      label:
        | "phone"
        | "email"
        | "address"
        | "hours"
        | "instagram"
        | "github"
        | "facebook"
        | "youtube"
        | "twitter"
        | "linkedin"
        | "pinterest"
        | "travaux"
        | (string & {});
      src?: string;
      value: string;
      href?: string;
      showVal?: boolean;
    }[];
    /** Width and height of every icon, in px, including `src` images. */
    iconSize?: string;
    /** Color of the contact and social links. Sets `--top-bar-3-icon-color`. */
    iconColor?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { items, iconColor = "var(--primary, black)", iconSize = "18", style }: Props = $props();
  let uid: string = $props.id();

  const toAttrs = (item: Props["items"][number]): Omit<Props["items"][number], "src"> & { icon: string } => {
    let attrs = { ...item, icon: "" };
    switch (item.label) {
      case "phone":
        attrs.href = item.href ?? `tel:${item.value}`;
        attrs.icon = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone preview-icon"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>`;
        break;
      case "email":
        attrs.href = item.href ?? `mailto:${item.value}`;
        attrs.icon = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail preview-icon"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>`;
        break;
      case "address":
        attrs.href = item.href ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.value)}`;
        attrs.icon = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin preview-icon"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`;
        break;
      case "hours":
        attrs.href = item.href;
        attrs.icon = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock preview-icon"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
        break;
      case "instagram":
      case "github":
      case "facebook":
      case "youtube":
      case "twitter":
      case "linkedin":
      case "pinterest":
      case "travaux":
        attrs.icon = getSocialSVG({ social: item.label, size: iconSize, stroke: iconColor });
        break;
    }

    return {
      ...attrs,
      icon: item.src
        ? `<img class="top-bar-3--icon" src="${item.src}"" alt="${item.label} icon" width="${iconSize}" height="${iconSize}" />`
        : attrs.icon
    };
  };
</script>

<div id="top-bar-3-{uid}" class="top-bar-3" style:--top-bar-3-icon-color={iconColor} {style}>
  <div class="top-bar-3--inner-container">
    <ul class="top-bar-3--contact-details">
      {#each items as item, i (i)}
        {@const attrs = toAttrs(item)}
        <li class="top-bar-3--item">
          {#if attrs.href}
            <a
              class="top-bar-3--link"
              target="_blank"
              rel="noreferrer"
              title={attrs.label}
              href={attrs.href}
              aria-label={attrs.label}>
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              {@html attrs.icon}
              {#if attrs.showVal}
                <span class="top-bar-3--text">{attrs.value}</span>
              {/if}
            </a>
          {:else}
            <div>
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              {@html attrs.icon}
              {#if attrs.showVal}
                <span class="top-bar-3--text">{attrs.value}</span>
              {/if}
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .top-bar-3 {
    .top-bar-3--inner-container {
      max-width: 1170px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: center;
    }

    .top-bar-3--contact-details {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;

      .top-bar-3--item {
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        padding: 15px 20px;
      }

      .top-bar-3--item > :first-child {
        text-decoration: none;
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .top-bar-3--item > :first-child {
        color: var(--top-bar-3-icon-color);

        &:hover,
        &:focus-visible {
          filter: invert(0.2);
        }
      }

      .top-bar-3--item .top-bar-3--text {
        display: none;

        @media (min-width: 768px) {
          display: flex;
        }
      }
    }
  }
</style>
