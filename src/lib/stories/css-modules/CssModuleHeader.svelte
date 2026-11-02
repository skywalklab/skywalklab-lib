<script lang="ts">
  import Header1 from "../../components/nav/Header1.svelte";
  import { itemClass } from "../utils.js";
  import type { Links, LinkSnippet, Logo, NavItemDropdowns } from "../../components/nav/types.js";
  import type { Snippet } from "svelte";

  interface Props {
    /** The imported CSS module: module class keys mapped to their hashed class names. */
    cssModule: Record<string, string>;
    /** Space-separated module class keys applied to the wrapper; `show` is the at-top state. */
    classNames: string;
    /** Logo shown in the header. */
    logo: Logo;
    /** Navigation links shown in the header. */
    links: Links[];
    /** Dropdown menus, keyed by the `key` of the link in `links` they belong to. */
    navItemDropdowns?: NavItemDropdowns;
    /** Whether the mobile menu is open. Bindable: a link click closes it, and binding lets a route change close it too. */
    navOpen?: boolean;
    /** Snippet rendering each nav link. */
    linkSnippet: LinkSnippet;
    /** Call-to-action rendered after the links. */
    ctaSnippet?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    cssModule,
    classNames,
    logo,
    links,
    navItemDropdowns,
    navOpen = $bindable(false),
    linkSnippet,
    ctaSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="css-module-header-{uid}" class="{itemClass(classNames, cssModule)} css-module-header" {style}>
  <Header1 {logo} {links} bind:navOpen {navItemDropdowns} {linkSnippet} {ctaSnippet} style="position: relative;" />
</div>

<style>
  .css-module-header {
    position: relative;
    min-height: 6rem;
  }
</style>
