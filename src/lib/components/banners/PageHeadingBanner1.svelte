<script lang="ts">
  interface Props {
    /** Title shown in the banner. */
    pageTitle: string;
    /** Trail before the current page; the last crumb is rendered as plain text. */
    breadcrumbs?: {
      /** Label of the parent crumb. */
      parent: string;
      /** Label of the child crumb. */
      child?: string;
      /** Heading rendered for the crumb. */
      heading: string;
    };
    /** Heading level used for the title. */
    tag?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { pageTitle, breadcrumbs, tag = "h1", style }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="page-heading-banner-1-{uid}" class="page-heading-banner-1" {style}>
  <div class="page-heading-banner-1--inner-container">
    <svelte:element this={tag} class="page-heading-banner-1--title">
      <span class="page-heading-banner-1--title-text">{pageTitle}</span>
    </svelte:element>
    {#if breadcrumbs}
      <span class="page-heading-banner-1--breadcrumbs-container">
        <span class="page-heading-banner-1--breadcrumbs-heading">{breadcrumbs.heading}:</span>
        <span class="page-heading-banner-1--breadcrumbs">
          <span class="page-heading-banner-1--breadcrumbs-parent">
            {#if breadcrumbs.child}
              {breadcrumbs.parent}
            {:else}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-house preview-icon"
                ><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path
                  d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
            {/if}
          </span>
          /
          <span class="page-heading-banner-1--breadcrumbs-child">
            {breadcrumbs.child ?? breadcrumbs.parent}
          </span>
        </span>
      </span>
    {/if}
  </div>
</div>

<style>
  .page-heading-banner-1 {
    padding: 2rem clamp(6px, 4vw, 18px);

    .page-heading-banner-1--inner-container {
      display: flex;
      column-gap: 2rem;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .page-heading-banner-1--title {
        font-size: clamp(20px, 5vw, 24px);
      }

      .page-heading-banner-1--breadcrumbs-container {
        font-size: clamp(13px, 3.75vw, 15px);
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        .page-heading-banner-1--breadcrumbs {
          text-transform: uppercase;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;

          .page-heading-banner-1--breadcrumbs-child {
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
