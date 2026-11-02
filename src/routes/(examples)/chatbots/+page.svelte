<script lang="ts">
  import { getDefaultProps } from "$lib/default-props/index.svelte";
  import { kebab, parseComponentPath, title } from "$lib/utils/helpers.js";
  import { getComponentModules } from "$lib/utils/component-modules.js";
  import { createChat } from "$lib/default-props/chatbots.svelte";

  const { componentDir } = parseComponentPath(import.meta.url, "/(examples)/");
</script>

<h1>{title(componentDir)}</h1>
<hr />
{#each getComponentModules(componentDir) as [filePath, module] (filePath)}
  {#await module() then component}
    {@const { componentName } = parseComponentPath(filePath)}
    {@const Component = (component as any).default}
    {@const defaultProps = getDefaultProps(componentDir).get(componentName)}
    {@const chat = createChat()}
    <article style="min-height: 800px; min-width: 320px;">
      <h2 id={componentName} class="component-name">{componentName}</h2>
      <div class="{kebab(componentName)}-story-example">
        <Component {...defaultProps.props} {chat} sendMessage={chat.sendMessage} />
      </div>
    </article>
  {/await}
{/each}
