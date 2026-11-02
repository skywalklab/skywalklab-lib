<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import { snippetWrap } from "../../utils/snippets.js";
  import HamburgerBase, { type HamburgerType } from "./HamburgerBase.svelte";
  import { slide } from "svelte/transition";
  import NavItemDropdown from "./NavItemDropdown.svelte";
  import type { LinkSnippet, Links, NavItemDropdowns } from "./types.js";
  import type { Snippet } from "svelte";

  interface Props {
    /** Navigation links shown in the menu. */
    links: Links[];
    /** Whether the mobile menu is open. Bindable; the hamburger toggles it and following a link closes it, so a parent can track the menu state. */
    openHamburger?: boolean;
    /**
     * Animation and styles for the hamburger, which is
     * [svelte-hamburgers](https://svelte-hamburgers.willow.codes) with its CSS vendored into
     * hamburgers css modules. The module has to match `type`, or the button renders
     * unanimated.
     */
    hamburger: {
      /** The hamburger animation, e.g. `"spin"`. */
      type: HamburgerType;
      /** Module from hamburgers css modules matching `type`, e.g. `spin_hamburger`. */
      module: CSSModuleClasses;
      /** Accessible name of the hamburger button. Defaults to `"Hamburger menu"`. */
      title?: string;
    };
    /** Dropdown menus, keyed by the `key` of the link in `links` they belong to. */
    navItemDropdowns?: NavItemDropdowns;
    /** Snippet rendering each nav link. */
    linkSnippet: LinkSnippet;
    /** Call-to-action rendered after the links. */
    ctaSnippet?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    links,
    openHamburger = $bindable(false),
    hamburger,
    navItemDropdowns,
    linkSnippet,
    ctaSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
</script>

<nav id="small-screen-nav-{uid}" class="small-screen-nav" aria-label={labels.mainNav} {style}>
  <HamburgerBase
    bind:open={openHamburger}
    type={hamburger.type}
    cssModule={hamburger.module}
    title={hamburger.title}
    ariaControls="small-screen-nav--list-{uid}" />
  {#if openHamburger}
    <ul id="small-screen-nav--list-{uid}" class="small-screen-nav--list" transition:slide={{ duration: 300 }}>
      {#each links as { key, ...link } (link.text)}
        {#if key && navItemDropdowns}
          <NavItemDropdown
            title={navItemDropdowns[key]?.title}
            items={navItemDropdowns[key]?.items.map((item) => ({
              ...item,
              cb: () => {
                openHamburger = false;
                item.cb?.();
              }
            }))}
            lang={navItemDropdowns[key]?.lang}
            interaction={navItemDropdowns[key]?.interaction}
            {linkSnippet}
            style={navItemDropdowns[key]?.style} />
        {:else}
          <li class="small-screen-nav--list-item">
            {@render snippetWrap(linkSnippet)({ ...link, cb: () => (openHamburger = false) })}
          </li>
        {/if}
      {/each}
      {@render ctaSnippet?.()}
    </ul>
  {/if}
</nav>

<style>
  .small-screen-nav {
    .small-screen-nav--list {
      position: absolute;
      top: var(--dynamic-header-height, 56px);
      left: 0;
      right: 0;
      width: 100%;
      margin: 0 auto;
      color: var(--language-header-color, black);
      background-color: var(--language-header-bg-color, white);
      box-shadow: var(--box-shadow, none);

      @media (min-width: 768px) {
        width: calc(100% - 60px);
      }

      :global {
        > li:not(:last-of-type) {
          border-bottom: 1px solid hsla(0, 0%, 47.1%, 0.83);
        }

        li {
          padding: 0 10px;
          background-color: transparent;
          transition: background-color 0.15s linear;
          text-transform: uppercase;
          font-size: 15px;
          position: relative;

          @media (prefers-reduced-motion: reduce) {
            transition: background-color 0.75s linear;
          }

          &:hover {
            background-color: var(--language-header-hover-bg-color, transparent);
          }

          > :first-child {
            padding: 15px 0;
            width: 100%;
          }

          > ul li {
            padding: 0 10px 0 20px;

            > :first-child {
              padding: 8px 0 8px 0px;
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>
