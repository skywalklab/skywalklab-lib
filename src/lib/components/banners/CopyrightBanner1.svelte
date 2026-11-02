<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    /** Rendered inside the banner's inner container, e.g. a copyright line and legal links. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { children, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="copyright-banner-1-{uid}" class="copyright-banner-1" {style}>
  <div class="copyright-banner-1--inner-container">
    {@render children()}
  </div>
</div>

<style>
  :where(.copyright-banner-1) {
    width: 100%;

    .copyright-banner-1--inner-container {
      width: fit-content;
      margin: 0 auto;
      text-align: center;
      padding-block: 30px;
    }
  }
</style>
