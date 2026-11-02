<script lang="ts">
  import BubbleIcon, { type Props as BubbleIconProps } from "./BubbleIcon.svelte";

  interface Props {
    /** Bubbles shown in the row. Each renders as a button, so `tag` is set here rather than per item. */
    items: Omit<BubbleIconProps, "tag">[];
    /** Index of the highlighted bubble. Bindable; clicking a bubble sets it, so a parent can read which one is active. */
    highlightIndex?: number;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { items, highlightIndex = $bindable(0), style }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="bubble-icon-3-{uid}" class="bubble-icon-3" {style}>
  {#each items as item, i (i)}
    <BubbleIcon {...item} tag="button" highlight={highlightIndex === i} onclick={() => (highlightIndex = i)} />
  {/each}
</div>

<style>
  .bubble-icon-3 {
    display: flex;
    gap: clamp(0.25rem, 4vw, 1rem);

    :global {
      .bubble-icon.highlight {
        svg {
          color: #fff;
        }
      }

      .bubble-icon--icon-container svg {
        width: clamp(24px, 5vw, 40px);
        height: auto;
      }
    }
  }
</style>
