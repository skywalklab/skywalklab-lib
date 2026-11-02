<script lang="ts">
  import SquareCheckBig from "@lucide/svelte/icons/square-check-big";

  interface Props {
    /** Entries shown in the checklist. Each entry's text is split into `segments` so parts of it can be styled; `bold: true` wraps that segment in `.square-check-list--highlighted-text` for styling from outside. */
    items: { segments: { text: string; bold?: boolean }[]; href?: string }[];
    /** Color of the check icon beside each entry. */
    iconColor?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { items, iconColor = "var(--primary, black)", style }: Props = $props();
  let uid: string = $props.id();
</script>

{#snippet highlightText(segments: { text: string; bold?: boolean }[])}
  {#each segments as segment, i (i)}
    {#if segment.bold}
      <span class="square-check-list--highlighted-text">{segment.text}</span>
    {:else}
      {segment.text}
    {/if}
  {/each}
{/snippet}

<ul id="square-check-list-{uid}" class="square-check-list" {style}>
  {#each items as item, i (i)}
    <li class="square-check-list--item">
      <SquareCheckBig class="square-check-list--icon" color={iconColor} />
      {#if item.href}
        <a href={item.href} class="square-check-list--item-text square-check-list--link">
          {@render highlightText(item.segments)}
        </a>
      {:else}
        <span class="square-check-list--item-text">{@render highlightText(item.segments)}</span>
      {/if}
    </li>
  {/each}
</ul>

<style>
  .square-check-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .square-check-list--item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 14px;

      :global(.square-check-list--icon) {
        width: 1.25rem;
        min-width: 1.25rem;
        height: 1.25rem;
        min-height: 1.25rem;
      }

      .square-check-list--item-text {
        &.square-check-list--link {
          text-decoration: underline;
        }
      }
    }
  }
</style>
