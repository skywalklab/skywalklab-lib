<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import { snippetWrap } from "../../utils/snippets.js";
  import type { LinkSnippet, Links, NavItemDropdowns } from "./types.js";
  import type { Snippet } from "svelte";
  import NavItemDropdown from "./NavItemDropdown.svelte";

  interface Props {
    /** Navigation links shown in the nav. */
    links: Links[];
    /** Dropdown menus, keyed by the `key` of the link in `links` they belong to. */
    navItemDropdowns?: NavItemDropdowns;
    /** Snippet rendering each nav link. */
    linkSnippet: LinkSnippet;
    /** Call-to-action rendered after the links. */
    ctaSnippet?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { links, navItemDropdowns, linkSnippet, ctaSnippet, style }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
</script>

<nav id="large-screen-nav-{uid}" class="large-screen-nav" aria-label={labels.mainNav} {style}>
  <ul class="large-screen-nav--list">
    {#each links as { key, ...link } (link.text)}
      {#if key && navItemDropdowns}
        <NavItemDropdown
          title={navItemDropdowns[key]?.title}
          items={navItemDropdowns[key]?.items}
          lang={navItemDropdowns[key]?.lang}
          interaction={navItemDropdowns[key]?.interaction}
          {linkSnippet}
          style={navItemDropdowns[key]?.style} />
      {:else}
        <li class="large-screen-nav--list-item">
          {@render snippetWrap(linkSnippet)({ ...link })}
        </li>
      {/if}
    {/each}
    {@render ctaSnippet?.()}
  </ul>
</nav>

<style>
  .large-screen-nav {
    .large-screen-nav--list {
      display: flex;
      gap: 0.25rem;
      height: var(--dynamic-header-height, 56px);

      :global(li > :first-child) {
        padding: 6px 12px;
        height: 100%;
        display: flex;
        align-items: center;

        &::after {
          right: 6px;
        }
      }
    }
  }
</style>
