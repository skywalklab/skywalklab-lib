<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    /** Rendered inside the card, to the right of its side border. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { children, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="help-card-{uid}" class="help-card" {style}>{@render children()}</div>

<style>
  .help-card {
    max-width: 300px;
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 10px;
    border-left: 4px solid var(--primary, black);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }
</style>
