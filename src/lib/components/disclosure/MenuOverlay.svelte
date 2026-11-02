<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import type { Snippet } from "svelte";
  import CircleXIcon from "@lucide/svelte/icons/circle-x";
  import LayoutGrid from "@lucide/svelte/icons/layout-grid";

  interface Props {
    /** Background color of the panel, and the tint of the scrim behind it. Sets `--menu-overlay-bg-color`. */
    bgColor?: string;
    /** Whether the panel is open. Bindable, so the parent can open or close it. */
    openContactMenu?: boolean;
    /** Rendered inside the sliding panel, e.g. contact details, opening hours or social links. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { bgColor, openContactMenu = $bindable(false), children, style }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
</script>

<button
  class="menu-overlay--open-button"
  class:open={openContactMenu}
  aria-label={labels.openContactMenu}
  onclick={() => (openContactMenu = !openContactMenu)}>
  <LayoutGrid size={24} />
</button>
<div
  id="menu-overlay-{uid}"
  class="menu-overlay"
  class:open={openContactMenu}
  {style}
  style:--menu-overlay-bg-color={bgColor}>
  <div class="menu-overlay--panel">
    <button class="menu-overlay--close-button" aria-label={labels.close} onclick={() => (openContactMenu = false)}>
      <CircleXIcon color="#fff" size={36} />
    </button>
    {@render children()}
  </div>
  <button class="menu-overlay--scrim" aria-label={labels.close} onclick={() => (openContactMenu = false)}></button>
</div>

<style>
  .menu-overlay--open-button {
    cursor: pointer;
  }

  .menu-overlay {
    position: fixed;
    height: 100svh;
    width: 100vw;
    top: 0;
    right: 0;
    pointer-events: none;
    overflow: hidden;

    .menu-overlay--panel {
      pointer-events: all;
      position: absolute;
      width: clamp(280px, 40%, 460px);
      height: 100%;
      right: 0;
      overflow: auto;
      transform: translateX(100%);
      top: 0;
      background: #242424;
      opacity: 0;
      visibility: hidden;
      z-index: 999999;
      transition: transform 0.5s ease 0.4s;
      padding: 100px 40px;
      scrollbar-width: none;

      .menu-overlay--close-button {
        position: absolute;
        right: 2rem;
        top: 2rem;
        transition: transform 0.3s linear;
        cursor: pointer;

        &:hover {
          transform: rotate(90deg);
        }
      }
    }

    .menu-overlay--scrim {
      pointer-events: all;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 0;
      transition:
        width 0.8s ease-out,
        visibility 0.8s ease-out,
        background-color 0.8s ease-out;
      visibility: hidden;
      z-index: 99999;
      background: rgba(24, 24, 24, 0.6);
    }

    &.open {
      .menu-overlay--panel {
        opacity: 1;
        visibility: visible;
        transform: translateX(0%);
        background: var(--menu-overlay-bg-color, var(--primary, black));
      }

      .menu-overlay--scrim {
        visibility: visible;
        width: 100%;
        background-color: color-mix(in srgb, var(--menu-overlay-bg-color, var(--primary, black)), transparent 60%);
      }
    }
  }
</style>
