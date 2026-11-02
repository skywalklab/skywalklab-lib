<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    /** Reports the banner's rendered height to the parent (`bind:clientHeight={h}`), since it grows when the text wraps on narrow screens. */
    clientHeight?: number;
    /** Rendered inside the banner's inner container, e.g. the disclaimer text. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { clientHeight = $bindable(34), children, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="top-disclaimer-banner-{uid}" class="top-disclaimer-banner" {style} bind:clientHeight>
  <div class="top-disclaimer-banner--inner-container">
    {@render children()}
  </div>
</div>

<style>
  .top-disclaimer-banner {
    width: 100vw;

    .top-disclaimer-banner--inner-container {
      width: fit-content;
      margin: 0 auto;
      text-align: center;
      padding-block: 0.25rem;
    }
  }
</style>
