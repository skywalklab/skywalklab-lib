<script lang="ts">
  import { getDefaultProps } from "$lib/default-props/index.svelte";
  import { kebab, parseComponentPath, title } from "$lib/utils/helpers.js";
  import { getComponentModules } from "$lib/utils/component-modules.js";

  const { componentDir } = parseComponentPath(import.meta.url, "/(examples)/");
</script>

<h1>{title(componentDir)}</h1>
<hr />
{#each getComponentModules(componentDir) as [filePath, module] (filePath)}
  {#await module() then component}
    {@const { componentName } = parseComponentPath(filePath)}
    {@const Component = (component as any).default}
    {@const defaultProps = getDefaultProps(componentDir).get(componentName)}
    <article style="position: relative; width: 60%; min-width: 280px; margin: 0 auto;">
      <h2 id={componentName} class="component-name">{componentName}</h2>
      <div class="{kebab(componentName)}-story-example">
        {#if componentName === "PatternGrid"}
          <div style="position: relative; height: clamp(96px, 20vw, 320px); width: 100%;">
            <Component {...defaultProps.props} />
          </div>
        {:else}
          <Component {...defaultProps.props} />
        {/if}
      </div>
    </article>
  {/await}
{/each}
