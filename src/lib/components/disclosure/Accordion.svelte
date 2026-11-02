<script lang="ts">
  import type { Snippet } from "svelte";
  import Plus from "@lucide/svelte/icons/plus";
  import Minus from "@lucide/svelte/icons/minus";
  import { slide } from "svelte/transition";

  interface Props {
    /** Text shown in the accordion header. */
    summary: string;
    /** Whether the accordion starts open. Toggled by the header; independent of any other accordion. */
    open?: boolean;
    /** Revealed below the header while the accordion is open. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { summary, open, children, style }: Props = $props();
  let uid: string = $props.id();
  let showContent: boolean = $derived<boolean>(open === true);
  let AccordionIcon = $derived<any>(showContent ? Minus : Plus);
</script>

<div id="accordion-{uid}" class="accordion" {style}>
  <button
    class="accordion--button"
    id={`accordion-summary-${uid}`}
    aria-controls={showContent ? `accordion-content-${uid}` : undefined}
    aria-expanded={showContent}
    onclick={() => (open = !open)}
    ><span class="accordion--summary">{summary}</span><AccordionIcon color="var(--primary, black)" /></button>
  {#if showContent}
    <div
      class="accordion--content"
      id={`accordion-content-${uid}`}
      aria-labelledby={`accordion-summary-${uid}`}
      role="region"
      transition:slide={{ duration: 300 }}>
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .accordion {
    width: 100%;
    border: 1px solid #e6e6e7;
    overflow: hidden;
    border-radius: 5px;

    .accordion--button {
      width: 100%;
      background-color: #f9f9f9;
      border: none;
      text-align: left;
      cursor: pointer;
      padding: 8px 20px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .accordion--content {
      width: 100%;
      background-color: #ffffff;
      padding: 1rem 2vw;

      @media (min-width: 768px) {
        padding: 1rem 2rem;
      }
    }
  }
</style>
