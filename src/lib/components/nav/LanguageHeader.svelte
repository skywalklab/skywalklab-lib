<script lang="ts">
  import { handleHeaderHeight } from "../../actions/header.svelte.js";
  import { type Snippet } from "svelte";
  import HeaderLogo from "./HeaderLogo.svelte";
  import LargeScreenNav from "./LargeScreenNav.svelte";
  import SmallScreenNav from "./SmallScreenNav.svelte";
  import type { LinkSnippet, Links, Logo, NavItemDropdowns } from "./types.js";
  import type { Action } from "svelte/action";
  import type { HamburgerType } from "./HamburgerBase.svelte";

  export interface Props {
    /** Logo shown in the header. */
    logo: Logo;
    /** Navigation links shown in the header. */
    links: Links[];
    /** Whether the mobile menu is open. Bindable; the hamburger toggles it, so a parent can open or close the menu and react when it does. */
    openHamburger?: boolean;
    /**
     * Animation and styles for the small-screen hamburger, which is
     * svelte-hamburgers with its CSS vendored into hamburgers css modules`.
     * The module has to match `type`, or the button renders unanimated.
     */
    hamburger: {
      /** The hamburger animation, e.g. `"spin"`. */
      type: HamburgerType;
      /** Module from hamburgers css modules matching `type`, e.g. `spin_hamburger`. */
      module: CSSModuleClasses;
    };
    /** Dropdown menus, keyed by the `key` of the link in `links` they belong to. */
    navItemDropdowns?: NavItemDropdowns;
    /** Classes applied to the header, for a caller that styles it from its own stylesheet. */
    headerClass?: string;
    /**
     * `"shrink"` shrinks the header from `--landing-header-height` to `--header-height` once the page
     * scrolls past 80px, and restores it below 30px; `"none"` leaves it at a fixed height.
     */
    actionType?: "shrink" | "none";
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
    openHamburger = $bindable(false),
    hamburger,
    navItemDropdowns,
    headerClass,
    actionType = "shrink",
    showHeaderCb,
    linkSnippet,
    ctaSnippet,
    style
  }: Props = $props();
  let windowWidth = $state<number>(1024);
  let isDesktop = $derived<boolean>(windowWidth >= 1024);
  let uid: string = $props.id();

  const headerAction: Action<HTMLElement, any> = (node, args) => {
    if (actionType === "none") return;

    return handleHeaderHeight(node, args);
  };
</script>

<svelte:window bind:innerWidth={windowWidth} />

<header
  id="language-header-{uid}"
  class="language-header show {headerClass ?? ''}"
  {style}
  use:headerAction={{ className: "show", cb: showHeaderCb }}>
  <div class="language-header--inner-container">
    <HeaderLogo {logo} />
    {#if isDesktop}
      <LargeScreenNav {links} {linkSnippet} {navItemDropdowns} {ctaSnippet} />
    {:else if !isDesktop}
      <SmallScreenNav {links} bind:openHamburger {hamburger} {linkSnippet} {navItemDropdowns} {ctaSnippet} />
    {/if}
  </div>
</header>

<style>
  :where(.language-header) {
    --language-header-color: #000000;
    --language-header-bg-color: #ffffff;
    --language-header-hover-bg-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    width: 100%;
    background-color: var(--language-header-bg-color);
    color: var(--language-header-color);
    transition:
      background-color 0.3s cubic-bezier(0, 0, 0.58, 1),
      color 0.3s cubic-bezier(0, 0, 0.58, 1),
      height 0.3s cubic-bezier(0, 0, 0.58, 1);
    box-shadow: none;

    .language-header--inner-container {
      width: 100%;
      height: 100%;
      max-width: var(--max-page-width, 1200px);
      padding: 0 var(--side-padding, 12px);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media (max-width: 1024px) {
        :global(.large-screen-nav) {
          display: none;
        }
      }
    }

    @media (prefers-reduced-motion: reduce) {
      transition:
        background-color 0.75s ease,
        color 0.75s ease,
        height 0.75s ease;
    }

    &:not(.show) {
      box-shadow: var(--box-shadow, none);
    }
  }
</style>
