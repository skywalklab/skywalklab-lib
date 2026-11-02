<script lang="ts">
  import header1 from "../../css-modules/header1.module.css";
  import Header1Links from "./Header1Links.svelte";
  import { handleHeaderHeight } from "../../actions/header.svelte.js";
  import HeaderLogo from "./HeaderLogo.svelte";
  import type { LinkSnippet, Links, Logo, NavItemDropdowns } from "./types.js";
  import type { Snippet } from "svelte";

  interface Props {
    /** Logo shown in the header. */
    logo: Logo;
    /** Navigation links shown in the header. */
    links: Links[];
    /** Whether the mobile menu is open. Bindable: a link click closes it, and binding lets a route change close it too. */
    navOpen?: boolean;
    /** Float the mobile menu instead of filling the width. */
    floatMobileMenu?: boolean;
    /** Options for the small-screen hamburger button. */
    hamburger?: {
      /** Accessible name of the hamburger button. Defaults to `"Hamburger menu"`. */
      title?: string;
    };
    /** Dropdown menus, keyed by the `key` of the link in `links` they belong to. */
    navItemDropdowns?: NavItemDropdowns;
    /** Called when the header changes size, with `true` while the page is at the top. */
    showHeaderCb?: (isTop: boolean) => void;
    /** Snippet rendering each nav link. */
    linkSnippet: LinkSnippet;
    /** Call-to-action rendered after the links. */
    ctaSnippet?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    logo,
    links,
    navOpen = $bindable(false),
    floatMobileMenu = false,
    hamburger,
    navItemDropdowns,
    showHeaderCb,
    linkSnippet,
    ctaSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();
</script>

<header
  id="header-1-{uid}"
  class={header1.show}
  {style}
  use:handleHeaderHeight={{ className: header1.show, cb: showHeaderCb }}>
  <nav class={header1.nav}>
    <HeaderLogo {logo} />
    <Header1Links
      {links}
      {navItemDropdowns}
      bind:navOpen
      float={floatMobileMenu}
      {hamburger}
      {linkSnippet}
      {ctaSnippet} />
  </nav>
</header>
