<script lang="ts">
  import { snippetWrap } from "../../utils/snippets.js";
  import type { LinkSnippet, Links, NavItemDropdowns } from "./types.js";
  import NavItemDropdown from "./NavItemDropdown.svelte";
  import type { Snippet } from "svelte";
  import header1 from "../../css-modules/header1.module.css";
  import HamburgerBase from "./HamburgerBase.svelte";
  import collapse_hamburger from "../../css-modules/hamburgers/collapse-hamburger.module.css";

  interface Props {
    /** Navigation links shown in the header. */
    links: Links[];
    /** Dropdown menus, keyed by the `key` of the link in `links` they belong to. */
    navItemDropdowns?: NavItemDropdowns;
    /** Whether the small-screen menu is open. Bindable: a link click closes it, and binding lets a route change close it too. */
    navOpen?: boolean;
    /** Float the small-screen menu instead of filling the width. */
    float?: boolean;
    /** Options for the small-screen hamburger button. */
    hamburger?: {
      /** Accessible name of the hamburger button. Defaults to `"Hamburger menu"`. */
      title?: string;
    };
    /** Snippet rendering each nav link. */
    linkSnippet: LinkSnippet;
    /** Call-to-action rendered after the links. */
    ctaSnippet?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    links,
    navItemDropdowns,
    navOpen = $bindable(false),
    float,
    hamburger,
    linkSnippet,
    ctaSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();
</script>

{#snippet openNav(listId: string)}
  <ul id={listId} class="{header1['nav-items']} {float ? header1['float'] : ''}">
    {#each links as { key, ...link } (link.text)}
      {#if key && navItemDropdowns}
        <NavItemDropdown
          title={navItemDropdowns[key]?.title || ""}
          items={navItemDropdowns[key]?.items || []}
          lang={navItemDropdowns[key]?.lang || undefined}
          interaction={navItemDropdowns[key]?.interaction ?? "click"}
          {linkSnippet}
          style={navItemDropdowns[key]?.style} />
      {:else}
        <li>
          {@render snippetWrap(linkSnippet)({ ...link, cb: () => (navOpen = false) })}
        </li>
      {/if}
    {/each}
    {@render ctaSnippet?.()}
  </ul>
{/snippet}

<div id="header-1-links-{uid}" class="header-1-links header-1-links--small-screen" {style}>
  <div class="header-1-links--hamburger">
    <HamburgerBase
      --padding="4px"
      --layer-height="4px"
      type="collapse"
      ariaControls="header-1-links--list-{uid}"
      bind:open={navOpen}
      cssModule={collapse_hamburger}
      title={hamburger?.title} />
  </div>
  {#if navOpen}
    {@render openNav(`header-1-links--list-${uid}`)}
  {/if}
</div>

<div class="header-1-links header-1-links--large-screen">
  {@render openNav(`header-1-links--list-large-${uid}`)}
</div>

<style>
  .header-1-links {
    .header-1-links--hamburger {
      display: contents;

      &:global(.header-1-links--hamburger) :global(.hamburger) {
        display: flex;
      }
    }

    &.header-1-links--small-screen {
      display: contents;
    }

    &.header-1-links--large-screen {
      display: none;
    }

    @media (min-width: 1024px) {
      &.header-1-links--small-screen {
        display: none;
      }

      &.header-1-links--large-screen {
        display: contents;
      }
    }
  }
</style>
