<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import ArrowUp from "@lucide/svelte/icons/arrow-up";
  import { onMount } from "svelte";

  interface Props {
    /** Scroll distance in px before the button appears. */
    scrollThreshold?: number;
    /** Diameter of the button. Sets `--back-to-top-2-size`. */
    size?: string;
    /** Stroke width of the progress ring. Sets `--back-to-top-2-ring-width`. */
    ringWidth?: string;
    /** Selector for the element the component scrolls inside, e.g. `"#main"`. Defaults to `.layout-container`; if nothing matches, the viewport is used. */
    scrollContainer?: string;
    /** Color of the unfilled part of the ring. Sets `--back-to-top-2-track-color`. */
    trackColor?: string;
    /** Color of the filled part of the ring. Sets `--back-to-top-2-indicator-color`. */
    indicatorColor?: string;
    /** Arrow icon color. Sets `--back-to-top-2-icon-color`. */
    iconColor?: string;
    /** Button background color. Sets `--back-to-top-2-button-bg-color`. */
    buttonBgColor?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    scrollThreshold = 1000,
    size,
    ringWidth,
    scrollContainer,
    trackColor,
    indicatorColor,
    iconColor,
    buttonBgColor,
    style
  }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
  let scrollY = $state<number>(0);
  let progress = $state<number>(0);
  let container = $state<HTMLElement | null>(null);

  const CIRCUMFERENCE = 2 * Math.PI * 45;
  const dashoffset = $derived(CIRCUMFERENCE * (1 - progress));

  onMount(() => {
    container = document.querySelector(scrollContainer ?? ".layout-container");
    const target: HTMLElement | Window = container ?? window;

    const onScroll = () => {
      const top = container ? container.scrollTop : window.scrollY;
      const max = container
        ? container.scrollHeight - container.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight;

      scrollY = top;
      progress = max > 0 ? Math.min(top / max, 1) : 0;
    };

    onScroll();
    target.addEventListener("scroll", onScroll, { passive: true });

    return () => target.removeEventListener("scroll", onScroll);
  });
</script>

{#if scrollY > scrollThreshold}
  <div
    id="back-to-top-2-{uid}"
    class="back-to-top-2"
    style:--back-to-top-2-size={size}
    style:--back-to-top-2-ring-width={ringWidth}
    style:--back-to-top-2-track-color={trackColor}
    style:--back-to-top-2-indicator-color={indicatorColor}
    style:--back-to-top-2-icon-color={iconColor}
    style:--back-to-top-2-button-bg-color={buttonBgColor}
    {style}>
    <button
      class="back-to-top-2--button"
      aria-label={labels.backToTop}
      onclick={() => (container ?? window).scrollTo({ top: 0, behavior: "smooth" })}>
      <svg class="back-to-top-2--ring" viewBox="0 0 100 100" aria-hidden="true">
        <circle class="back-to-top-2--track" cx="50" cy="50" r="45" />
        <circle
          class="back-to-top-2--indicator"
          cx="50"
          cy="50"
          r="45"
          stroke-dasharray={CIRCUMFERENCE}
          style:stroke-dashoffset={dashoffset} />
      </svg>
      <ArrowUp size={22} />
    </button>
  </div>
{/if}

<style>
  .back-to-top-2 {
    position: fixed;
    z-index: 500;
    bottom: 2rem;
    right: 1rem;

    .back-to-top-2--button {
      position: relative;
      display: grid;
      place-items: center;
      width: var(--back-to-top-2-size, 3.25rem);
      height: var(--back-to-top-2-size, 3.25rem);
      padding: 0;
      border: 0;
      border-radius: 50%;
      background-color: var(--back-to-top-2-button-bg-color, var(--primary, black));
      color: var(--back-to-top-2-icon-color, var(--accent, lightblue));
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(15, 25, 34, 0.15);
      transition: transform 0.15s linear;

      &:hover {
        transform: translateY(-2px);
      }

      .back-to-top-2--ring {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
        fill: none;
        stroke-linecap: round;

        .back-to-top-2--track {
          stroke: var(--back-to-top-2-track-color, color-mix(in srgb, var(--accent, lightblue), transparent 70%));
          stroke-width: var(--back-to-top-2-ring-width, 3);
        }

        .back-to-top-2--indicator {
          stroke: var(--back-to-top-2-indicator-color, var(--accent, lightblue));
          stroke-width: var(--back-to-top-2-ring-width, 3);
          transition: stroke-dashoffset 0.1s linear;
        }
      }
    }

    @media (min-width: 480px) {
      right: 2rem;
    }
  }
</style>
