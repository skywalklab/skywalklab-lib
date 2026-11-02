<script module lang="ts">
  import { overview_descriptions } from "../component-descriptions.js";
  import { getComponentModules } from "../../utils/component-modules.js";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { kebab, parseComponentPath, title } from "../../utils/helpers.js";
  import { getDefaultProps } from "../../default-props/index.svelte";
  import { linkTo } from "@storybook/addon-links";

  const componentDir = "panels";
  const modules = getComponentModules(componentDir, true);
  let galleryIndex = $state<number | undefined>(getDefaultProps("galleries").get("MasonryGallery").props.galleryIndex);

  const { Story } = defineMeta({
    title: "Component Overviews/Panels",
    parameters: {
      docs: {
        description: {
          component: `(${modules.length}) ${overview_descriptions.get(componentDir)}`
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
              <Component
                {...defaultProps.props}
                cards={defaultProps.props.cards?.map((card: any) => ({
                  ...card,
                  cb: (e: Event, i: number) => (galleryIndex = i)
                }))} />
              {@render defaultProps.extraSnippet?.(componentName, {
                get galleryIndex() {
                  return galleryIndex;
                },
                set galleryIndex(index: number | undefined) {
                  galleryIndex = index;
                },
                images: defaultProps.props.cards ?? []
              })}
            </div>
            <p class="story-description">{defaultProps.storyDescription}</p>
          </li>
        {/await}
      {/each}
    </ul>
  {/snippet}
</Story>
