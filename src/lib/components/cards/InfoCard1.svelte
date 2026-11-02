<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    /** Rendered inside the card, stacked vertically. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { children, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="info-card-1-{uid}" class="info-card-1" {style}>
  {@render children()}
</div>

<style>
  .info-card-1 {
    display: flex;
    flex-direction: column;
  }
</style>
