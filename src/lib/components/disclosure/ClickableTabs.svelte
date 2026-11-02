<script lang="ts">
  import { snippetWrap } from "../../utils/snippets.js";
  import type { Snippet } from "svelte";

  interface Props {
    /** Tabs to render. Each item is passed to `buttonSnippet` and `panelSnippet`, which decide how to render it. */
    items: any[];
    /** Render a select instead of tab buttons on small screens. */
    useSelect?: boolean;
    /** Accessible label for the tab list. */
    ariaLabel?: string;
    /** Index of the active tab. Bindable. */
    selected?: number;
    /** Called with the index of the clicked tab. */
    onclick?: (index: number) => void;
    /** Rendered once per tab; receives that tab's item, its index and whether it's the selected one. */
    buttonSnippet: Snippet<[{ item: any; index: number; isActive: boolean }]>;
    /** Rendered for the selected tab only; receives its item and index. */
    panelSnippet: Snippet<[{ item: any; index: number; isActive: boolean }]>;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { items, useSelect, ariaLabel, selected = 0, onclick, buttonSnippet, panelSnippet, style }: Props = $props();
  let uid: string = $props.id();

  const handleClick: (index: number) => void = (index) => {
    selected = index;
    onclick?.(selected);
  };
</script>

<div id="clickable-tabs-{uid}" class="clickable-tabs" {style}>
  <div class="clickable-tabs--buttons" role={!useSelect ? "tablist" : undefined}>
    {#if useSelect}
      <select
        name="clickable-tabs"
        id="clickable-tabs--select-{uid}"
        aria-label={ariaLabel || "Select an option"}
        bind:value={selected}
        onchange={() => onclick?.(selected)}>
        {#each items as item, i (i)}
          <option
            aria-selected={i === selected}
            aria-controls={i === selected ? `clickable-tabs--panel-${uid}-${i}` : undefined}
            value={i}
            class:active={i === selected}
            >{@render snippetWrap(buttonSnippet)({ item, index: i, isActive: i === selected })}
          </option>
        {/each}
      </select>
    {:else}
      {#each items as item, i (i)}
        <button
          class:active={i === selected}
          role="tab"
          aria-selected={i === selected}
          aria-controls={i === selected ? `clickable-tabs--panel-${uid}-${i}` : undefined}
          onclick={() => handleClick(i)}
          >{@render snippetWrap(buttonSnippet)({ item, index: i, isActive: i === selected })}
        </button>
      {/each}
    {/if}
  </div>
  <div class="clickable-tabs--content">
    {#each items as item, i (i)}
      {#if i === selected}
        <div class="clickable-tabs--content-wrapper" role="tabpanel" id="clickable-tabs--panel-{uid}-{i}">
          {@render snippetWrap(panelSnippet)({ item, index: i, isActive: i === selected })}
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .clickable-tabs {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .clickable-tabs--buttons {
    flex: 1;
    min-width: 280px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0 auto;

    select {
      padding: 0.75rem clamp(0.5rem, 2vw, 1.5rem);
    }

    button {
      width: 100%;
      padding: 0;
      background-color: transparent;
      border: none;

      :global > :first-child {
        width: 100%;
        padding: 0.75rem 1.5rem;
      }
    }
  }

  .clickable-tabs--content {
    flex: 1;
    min-width: 280px;

    @media (min-width: 480px) {
      min-width: 450px;
    }

    .clickable-tabs--content-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
</style>
