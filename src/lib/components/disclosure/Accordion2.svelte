<script lang="ts">
  import type { Snippet } from "svelte";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import { slide } from "svelte/transition";

  interface Props {
    /** Text shown in the accordion header. */
    summary: string;
    /** Position of this accordion within its group, compared against `selectedIndex` to decide which one is open. */
    index: number;
    /** Index of the accordion currently open in the group. Owned by the parent, which updates it from `cb`. */
    selectedIndex: number;
    /** Whether this accordion starts open. Only takes effect when `index` matches `selectedIndex`. */
    open?: boolean;
    /** Text color of the open header. Sets `--accordion-2-active-color`. */
    activeColor?: string;
    /** Background color of the open header. Sets `--accordion-2-active-bg-color`. */
    activeBgColor?: string;
    /** Called with this accordion's index when the header is clicked; set `selectedIndex` to it to open this one and close its siblings. */
    cb?: (index: number) => void;
    /** Revealed below the header while this accordion is the open one. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { summary, index, selectedIndex, open, activeColor, activeBgColor, cb, children, style }: Props = $props();
  let uid: string = $props.id();
  let showContent: boolean = $derived<boolean>(open === true && index === selectedIndex);
  let AccordionIcon = $derived<any>(showContent ? ChevronDown : ChevronRight);
</script>

<div
  id="accordion-2-{uid}"
  class="accordion-2 accordion-2-{index}"
  {style}
  style:--accordion-2-active-color={activeColor}
  style:--accordion-2-active-bg-color={activeBgColor}>
  <button
    class="accordion-2--button"
    class:active={showContent}
    id={`accordion-2-summary-${uid}`}
    aria-controls={showContent ? `accordion-2-content-${uid}` : undefined}
    aria-expanded={showContent}
    onclick={() => {
      open = !open;
      cb?.(index);
    }}>
    <span class="accordion-2--icon-container">
      <AccordionIcon color="currentColor" />
    </span>
    <span class="accordion-2--summary">{summary}</span>
  </button>
  {#if showContent}
    <div
      class="accordion-2--content"
      id={`accordion-2-content-${uid}`}
      aria-labelledby={`accordion-2-summary-${uid}`}
      role="region"
      transition:slide={{ duration: 300 }}>
      {@render children()}
    </div>
  {/if}
</div>

<style>
  /**
   * --accordion-2-active-color     Text color of the open header.       (#fff)
   * --accordion-2-active-bg-color  Background color of the open header. (var(--primary), black)
   */
  .accordion-2 {
    width: 100%;
    border-bottom: 1px solid #e6e6e7;
    overflow: hidden;
    border-radius: 5px;

    .accordion-2--button {
      width: 100%;
      background-color: #fff;
      border: none;
      text-align: left;
      cursor: pointer;
      padding: 8px 1rem;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      transition:
        background-color 0.15s linear,
        color 0.15s linear,
        transform 0.15s linear;

      &:not(.active):is(&:hover, &:focus-visible) {
        transform: translateX(7.5px);
      }

      &.active {
        background-color: var(--accordion-2-active-bg-color, var(--primary, black));
        color: var(--accordion-2-active-color, #fff);
      }

      .accordion-2--icon-container {
        border: 1px solid currentColor;
        border-radius: 50%;
      }
    }

    .accordion-2--content {
      width: 100%;
      background-color: #ffffff;
      padding: 1rem 2vw;

      @media (min-width: 768px) {
        padding: 1rem 1rem;
      }
    }
  }
</style>
