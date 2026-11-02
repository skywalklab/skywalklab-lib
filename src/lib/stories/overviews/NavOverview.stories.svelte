<script module lang="ts">
  import { overview_descriptions } from "../component-descriptions.js";
  import { getComponentModules } from "../../utils/component-modules.js";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { kebab, parseComponentPath, title } from "../../utils/helpers.js";
  import { getDefaultProps } from "../../default-props/index.svelte";
  import { linkTo } from "@storybook/addon-links";

  const componentDir = "nav";
  const modules = getComponentModules(componentDir, true);
  let selectedIndex = $state<number>(getDefaultProps(componentDir).get("AsideNav1").props.selectedIndex);
  let openHamburger = $state<boolean>(getDefaultProps(componentDir).get("HamburgerBase").props.open);

  const { Story } = defineMeta({
    title: "Component Overviews/Nav",
    parameters: {
      docs: {
        description: {
          component: `(${modules.length}) ${overview_descriptions.get(componentDir)}`
        }
      },
      // The gallery renders Header1 and LanguageHeader together, so two banner landmarks and two
      // navs named "Main" are inherent to it. Each component's own story still checks both rules.
      a11y: {
        config: {
          rules: [
            { id: "landmark-no-duplicate-banner", enabled: false },
            { id: "landmark-unique", enabled: false }
          ]
        }
      }
    },
    tags: ["autodocs", "!dev"]
  });
</script>

<Story name="Grid">
  {#snippet template()}
    <ul class="overview-grid {componentDir}-grid">
      {#each modules as [filePath, module] (filePath)}
        {@const { componentName } = parseComponentPath(filePath)}
        {#await module() then component}
          {@const Component = (component as any).default}
          {@const defaultProps = getDefaultProps(componentDir).get(componentName)}
          <li>
            <button
              class="overview-label"
              onclick={linkTo(`Components/${title(componentDir)}/${componentName}`, "Docs")}>
              {componentName}
            </button>
            <div class="overview-preview {kebab(componentName)}-story-example">
              <Component {...defaultProps.props} bind:selectedIndex bind:open={openHamburger} />
              {@render defaultProps.extraSnippet?.(componentName, { selectedIndex })}
            </div>
            <p class="story-description">{defaultProps.storyDescription}</p>
          </li>
        {/await}
      {/each}
    </ul>
  {/snippet}
</Story>
