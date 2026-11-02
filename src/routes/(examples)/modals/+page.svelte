<script lang="ts">
  import { getDefaultProps } from "$lib/default-props/index.svelte";
  import { kebab, parseComponentPath, title } from "$lib/utils/helpers.js";
  import { getComponentModules } from "$lib/utils/component-modules.js";

  const { componentDir } = parseComponentPath(import.meta.url, "/(examples)/");
  let showModal = $state<boolean>(getDefaultProps(componentDir).get("Modal").props.showModal);
</script>

<h1>{title(componentDir)}</h1>
<hr />
{#each getComponentModules(componentDir) as [filePath, module] (filePath)}
  {#await module() then component}
    {@const { componentName } = parseComponentPath(filePath)}
    {@const Component = (component as any).default}
    {@const defaultProps = getDefaultProps(componentDir).get(componentName)}
    <article>
      <h2 id={componentName} class="component-name">{componentName}</h2>
      <div class="{kebab(componentName)}-story-example">
        <Component {...defaultProps.props} />
        {@render defaultProps.extraSnippet?.(componentName, { cb: () => (showModal = true), showModal })}
      </div>
    </article>
  {/await}
{/each}
