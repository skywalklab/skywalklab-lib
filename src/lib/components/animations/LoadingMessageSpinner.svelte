<script lang="ts">
  import { prefersReducedMotion } from "svelte/motion";
  import SvelteSpinner from "./SvelteSpinner.svelte";

  interface Props {
    /** Spinner diameter in pixels. */
    size?: number;
    /** Spinner color. */
    color?: string;
    /** Milliseconds per revolution. Forced to 6000 under `prefers-reduced-motion`. */
    duration?: number;
    /** Text shown beneath the spinner. Separate lines with `|`. */
    message?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { size = 46, color = "var(--primary, black)", duration = 750, message = "...loading", style }: Props = $props();
  let uid: string = $props.id();
  const messages = $derived(message.split("|"));
</script>

<div id="loading-message-spinner-{uid}" class="loading-message-spinner" {style}>
  <SvelteSpinner
    type="Circle"
    spinnerProps={{ size, color, duration: (prefersReducedMotion.current ? 6000 : duration) + "ms" }} />
  <div class="loading-message-spinner--messages">
    {#each messages as item (item)}
      <p class="loading-message-spinner--message">{item.trim()}</p>
    {/each}
  </div>
</div>

<style>
  .loading-message-spinner {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: fit-content;
    margin: 0 auto;

    :global :is(.circle) {
      @media (prefers-reduced-motion: reduce) {
        --duration: 6s;
      }
    }
  }

  .loading-message-spinner--messages .loading-message-spinner--message {
    text-align: center;
    font-size: 18px;
    color: var(--primary, black);
    margin: 0 0 0.25rem;
  }
</style>
