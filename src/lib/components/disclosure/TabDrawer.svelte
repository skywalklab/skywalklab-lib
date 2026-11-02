<script lang="ts">
  import type { Snippet } from "svelte";
  import Plus from "@lucide/svelte/icons/plus";
  import Minus from "@lucide/svelte/icons/minus";

  interface Props {
    /** Label on the drawer tab. */
    tabText: string;
    /** Whether the drawer is open. Bindable. */
    open?: boolean;
    /** Rendered in the always-visible top half, above the drawer. */
    children: Snippet;
    /** Rendered in the lower half, revealed only while the drawer is open. */
    drawerContentSnippet: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { tabText, open = false, children, drawerContentSnippet, style }: Props = $props();
  let uid: string = $props.id();
  let showContent = $derived<boolean>(open);
  let Icon = $derived<any>(showContent ? Minus : Plus);
  let bottomHalfHeight = $state<number>(0);
  let bottomHalfMgTop = $derived<number>(bottomHalfHeight * -1 + 16 * 3.25);
</script>

<div id="tab-drawer-{uid}" class="tab-drawer" class:open={showContent} {style}>
  <div class="tab-drawer--inner-container">
    <div class="tab-drawer--top-half">{@render children()}</div>
    <div
      class="tab-drawer--bottom-half"
      role="region"
      id={`bottom-half-${uid}`}
      aria-labelledby={`tab-${uid}`}
      style:margin-top={(showContent ? 0 : bottomHalfMgTop) + "px"}
      bind:clientHeight={bottomHalfHeight}>
      {@render drawerContentSnippet()}
    </div>
  </div>
  <button
    class="tab-drawer--tab"
    id={`tab-${uid}`}
    aria-controls={`bottom-half-${uid}`}
    aria-expanded={showContent}
    onclick={() => (showContent = !showContent)}>{tabText}<Icon /></button>
</div>

<style>
  .tab-drawer {
    position: relative;
    width: 100%;
    border-radius: 28px;

    &.open {
      .tab-drawer--tab::after {
        filter: brightness(85%);
      }
    }

    .tab-drawer--inner-container {
      height: 100%;
      width: 100%;
      border-radius: 36px;
      overflow: hidden;
      background-color: inherit;
      color: inherit;
    }
  }

  .tab-drawer--top-half {
    box-shadow:
      0 4px 12px #24212e33,
      0 4px 24px #1211154d;
    background-color: inherit;
    color: inherit;
    border-radius: 32px 32px 0 0;
    padding: 3rem 2rem;
    z-index: 2;
    position: relative;
  }

  .tab-drawer--bottom-half {
    background-color: inherit;
    color: inherit;
    padding: 2.5rem 2vw 3.25rem;
    border-radius: 0 0 32px 32px;
    position: relative;
    z-index: 1;
    transition: margin-top 0.3s linear;

    @media (prefers-reduced-motion: reduce) {
      transition: all 0.75s linear;
    }

    @media (min-width: 768px) {
      padding: 2.5rem 2rem 3.25rem;
    }
  }

  .tab-drawer--tab {
    background-color: inherit;
    color: inherit;
    position: absolute;
    width: fit-content;
    padding: 12px 26px;
    border: none;
    border-radius: 6px;
    bottom: -1rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    overflow: hidden;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      inset: 0;
      z-index: -1;
      background-color: inherit;
      transition: filter 0.15s linear;

      @media (prefers-reduced-motion: reduce) {
        transition: all 0.75s linear;
      }
    }

    &:hover,
    &:focus-visible {
      &::after {
        filter: brightness(85%);
      }
    }
  }
</style>
