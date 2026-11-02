<script lang="ts">
  import { getDefaultProps } from "$lib/default-props/index.svelte";
  import { kebab, parseComponentPath, title } from "$lib/utils/helpers.js";
  import { getComponentModules } from "$lib/utils/component-modules.js";

  const { componentDir } = parseComponentPath(import.meta.url, "/(examples)/");

  let selectedIndex = $state<number>(getDefaultProps(componentDir).get("AsideNav1").props.selectedIndex);
  let openHamburger = $state<boolean>(getDefaultProps(componentDir).get("HamburgerBase").props.open);
</script>

<h1>{title(componentDir)}</h1>
<hr />
{#each getComponentModules(componentDir) as [filePath, module] (filePath)}
  {#await module() then component}
    {@const { componentName } = parseComponentPath(filePath)}
    {@const Component = (component as any).default}
    {@const defaultProps = getDefaultProps(componentDir).get(componentName)}
    <article style="position: relative; max-width: unset; width: 100%;">
      <h2 id={componentName} class="component-name">{componentName}</h2>
      <div class="{kebab(componentName)}-story-example">
        <Component {...defaultProps.props} bind:selectedIndex bind:open={openHamburger} />
        {@render defaultProps.extraSnippet?.(componentName, { selectedIndex })}
      </div>
    </article>
  {/await}
{/each}

<style>
  :global(main) {
    min-height: calc(100svh + 5rem);
  }
</style>
