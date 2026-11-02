<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    /** Attributes spread onto the root element, e.g. `href`, `target`, `rel`. An `href` renders an `<a>`, without one it is a `<span>`; an `href` matching the current route disables the roll. */
    attrs?: Record<string, string | undefined>;
    /** Class applied to the root element alongside its own, e.g. a button CSS module from `@skywalklab/lib/css-modules`. */
    buttonClass?: string;
    /** Current route. Matching `href` marks the link as the active page. Pass `page.url.pathname` in SvelteKit; outside it, `location.pathname`. */
    pathname?: string;
    /** Called when the button is clicked. Gives a `<span>` a button role when no `href` is set. */
    onclick?: (arg1: MouseEvent) => void;
    /** Button content. Rendered twice, once per roll face. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }
  let {
    attrs = {},
    buttonClass,
    pathname = attrs.href === "" ? undefined : "",
    onclick,
    children,
    style
  }: Props = $props();
  let uid: string = $props.id();
  let innerAnchorHeight = $state<number>(22);
  let slideGap = $derived<number>(innerAnchorHeight * -1 - 9);
  let rolledHref = $derived<string | undefined>(pathname);

  const makeHrefRolled: (href: string | undefined) => void = (href) => {
    rolledHref = href;
  };

  const isRolledHref: (href: string | undefined) => boolean = (href) => {
    return rolledHref === href;
  };
</script>

<svelte:element
  this={attrs.href ? "a" : "span"}
  draggable="false"
  {...attrs}
  id="roll-a-dex-{uid}"
  role={attrs.href ? "link" : onclick ? "button" : undefined}
  tabindex={attrs.href || onclick ? 0 : -1}
  class="roll-a-dex {buttonClass}"
  class:is-page={attrs.href === pathname}
  class:rolled={isRolledHref(attrs.href)}
  {style}
  onmouseenter={() => makeHrefRolled(attrs.href)}
  onmouseleave={() => makeHrefRolled(pathname)}
  {onclick}>
  <span
    class="roll-a-dex--link-text-container"
    style:--rolladex-inner-anchor-height={innerAnchorHeight + "px"}
    style:--rolladex-slide-gap={slideGap + "px"}>
    <span bind:clientHeight={innerAnchorHeight}>{@render children()}</span>
    <span style:min-height={innerAnchorHeight + "px"}>{@render children()}</span>
  </span>
</svelte:element>

<style>
  .roll-a-dex {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    transition: transform 0.15s linear;
    cursor: pointer;

    @media (prefers-reduced-motion: reduce) {
      transition: transform 0.75s ease;
    }

    &.is-page {
      pointer-events: none;
    }

    &:has(:focus-visible) {
      outline: 1px solid;
    }

    .roll-a-dex--link-text-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      overflow: hidden;
      width: 100%;
      height: var(--rolladex-inner-anchor-height);

      > span {
        transition: transform 0.5s ease;
        transform: translateY(0px);
        display: inline-block;

        @media (prefers-reduced-motion: reduce) {
          transition: transform 1s ease;
        }
      }
    }

    &.rolled:not(.is-page) .roll-a-dex--link-text-container :first-child,
    &.rolled:not(.is-page) .roll-a-dex--link-text-container :last-child {
      transform: translateY(var(--rolladex-slide-gap));
    }

    &:active:not(.is-page) .roll-a-dex--link-text-container :is(span) {
      transform: translateY(calc(var(--rolladex-slide-gap) + 4px));
      transition: transform 0.1s cubic-bezier(0.05, 1, 0.5, 2);
    }
  }
</style>
