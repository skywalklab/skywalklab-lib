<script lang="ts">
  import { itemClass } from "../utils.js";

  interface Props {
    /** The imported CSS module: module class keys mapped to their hashed class names. */
    cssModule: Record<string, string>;
    /** Space-separated module class keys applied to the list. */
    classNames: string;
    /** List items, each with a space-separated `classNames` string of module class keys and an optional `subItems` list. */
    items: any[];
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { cssModule, classNames, items, style }: Props = $props();
  let uid: string = $props.id();
</script>

<ul id="css-module-list-{uid}" class={itemClass(classNames, cssModule)} {style}>
  {#each items as item, i (i)}
    <li class={itemClass(item.classNames, cssModule)}>
      <span class="css-module-list--text">{item.text}</span>
      {#if item.subItems?.length}
        <ul class={itemClass(classNames, cssModule)}>
          {#each item.subItems as subItem, j (j)}
            <li class={itemClass(subItem.classNames, cssModule)}>
              <span class="css-module-list--text">{subItem.text}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </li>
  {/each}
</ul>
