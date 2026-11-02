<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import ChevronUp from "@lucide/svelte/icons/chevron-up";
  import { onMount } from "svelte";

  interface Props {
    /** Scroll distance in px before the button appears. */
    scrollThreshold?: number;
    /** Diameter of the button. Sets `--back-to-top-1-size`. */
    size?: string;
    /** Button background color. Sets `--back-to-top-1-bg-color`. */
    bgColor?: string;
    /** Background color on hover. Sets `--back-to-top-1-hover-bg-color`. */
    hoverBgColor?: string;
    /** Chevron icon color. Sets `--back-to-top-1-icon-color`. */
    iconColor?: string;
    /** Selector for the element the component scrolls inside, e.g. `"#main"`. Defaults to `.layout-container`; if nothing matches, the viewport is used. */
    scrollContainer?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    scrollThreshold = 1000,
    size = "3.5rem",
    bgColor = "rgba(38, 38, 40, 0.4)",
    hoverBgColor = "var(--primary, black)",
    iconColor = "var(--background, #fff)",
    scrollContainer,
    style
  }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
  let scrollY = $state<number>(0);
  let container = $state<HTMLElement | Window | null>(null);

  onMount(() => {
    const target = document.querySelector<HTMLElement>(scrollContainer ?? ".layout-container") ?? window;
    container = target;
    const checkScrollY = () => (scrollY = target instanceof Window ? window.scrollY : target.scrollTop);
    target.addEventListener("scroll", checkScrollY);
    checkScrollY();

    return () => target.removeEventListener("scroll", checkScrollY);
  });
</script>

{#if scrollY > scrollThreshold}
  <button
    id="back-to-top-1-{uid}"
    class="back-to-top-1"
    aria-label={labels.backToTop}
    style:--back-to-top-1-size={size}
    style:--back-to-top-1-bg-color={bgColor}
    style:--back-to-top-1-hover-bg-color={hoverBgColor}
    style:--back-to-top-1-icon-color={iconColor}
    {style}
    onclick={() => container?.scrollTo({ top: 0, behavior: "smooth" })}>
    <ChevronUp />
  </button>
{/if}

<style>
  .back-to-top-1 {
    background-color: var(--back-to-top-1-bg-color);
    color: var(--back-to-top-1-icon-color);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--back-to-top-1-size);
    height: var(--back-to-top-1-size);
    position: fixed;
    z-index: 500;
    bottom: 3rem;
    right: 0;
    cursor: pointer;
    transition: background-color 0.15s linear;

    &:hover {
      background-color: var(--back-to-top-1-hover-bg-color);
    }

    @media (min-width: 480px) {
      right: 3rem;
    }

    :global(svg) {
      width: 2.25rem;
      height: 2.25rem;
    }
  }
</style>
