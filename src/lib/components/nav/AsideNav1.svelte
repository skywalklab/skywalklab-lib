<script lang="ts">
  import ChevronRight from "@lucide/svelte/icons/chevron-right";

  interface Props {
    /** Items shown in the nav; each `text` is the button label and `cb` runs after the item is selected. Any other keys are left for the caller to read off `items[selectedIndex]`. */
    items: ({ text: string; cb?: (e: MouseEvent, i: number) => void } & Record<string, any>)[];
    /** Index of the selected item. Bindable, so a parent can read which item is in view and render its content. */
    selectedIndex?: number;
    /** Classes applied to each nav button. */
    buttonClass?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { items, selectedIndex = $bindable(0), buttonClass, style }: Props = $props();
  let uid: string = $props.id();
</script>

<aside id="aside-nav-1-{uid}" class="aside-nav-1" {style}>
  <ul class="aside-nav-1--list">
    {#each items as item, i (i)}
      <li class="aside-nav-1--list-item">
        <button
          class="{buttonClass} aside-nav-1--list-item-button"
          class:selected={selectedIndex === i}
          aria-current={selectedIndex === i ? "page" : undefined}
          onclick={(e: MouseEvent) => {
            selectedIndex = i;
            item.cb?.(e, i);
          }}>
          <span class="aside-nav-1--list-item-text">{item.text}</span>
          <ChevronRight />
        </button>
      </li>
    {/each}
  </ul>
</aside>

<style>
  .aside-nav-1 {
    .aside-nav-1--list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .aside-nav-1--list-item {
        position: relative;

        .aside-nav-1--list-item-button {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          text-align: start;

          :global(svg) {
            min-width: 1rem;
            min-height: 1rem;
          }
        }
      }
    }
  }
</style>
