<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { useArgs } from "storybook/preview-api";
  import { getDefaultProps } from "../../default-props/index.svelte";
  import { kebab, parseComponentPath } from "../../utils/helpers.js";
  import { findComponentModule } from "../../utils/component-modules.js";
  import CustomElementExample from "../../stories/CustomElementExample.svelte";
  import { SKYWALK_ATTR_PREFIX } from "../../brand/data.js";
  import {
    customElementProperties,
    defineCustomElements
  } from "../../stories/custom-elements/custom-element-examples.js";

  const { componentDir, componentName } = parseComponentPath(import.meta.url);
  const defaultProps = getDefaultProps(componentDir).get(componentName);
  const [, module] = findComponentModule(componentDir, componentName);
  const Component = (await module()).default;

  const { Story } = defineMeta({
    title: "Components/Banners/IconStatusBanner",
    component: Component,
    parameters: {
      docs: { description: { component: defaultProps.storyDescription } }
    },
    // Clicking an icon writes its index back to the `i` arg so the story re-renders with it active.
    decorators: [
      (story, { args }) => {
        const [, updateArgs] = useArgs();
        return story({ args: { ...args, onclick: (index: number) => updateArgs({ i: index }) } });
      }
    ],
    argTypes: {},
    args: {}
  });
</script>

<Story name="Default" args={{ ...defaultProps.props }}>
  {#snippet template(args)}
    <div class="{kebab(componentName)}-story-example">
      <Component {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Custom Element" args={{ ...defaultProps.props }}>
  {#snippet template(args)}
    <div class="{kebab(componentName)}-story-example">
      {#await defineCustomElements(componentName, args) then { tag, attributes, emptySlots, filledSlots, properties }}
        <svelte:element
          this={tag}
          {...attributes}
          class="{SKYWALK_ATTR_PREFIX}-{kebab(componentName)}"
          use:customElementProperties={properties}>
          <!--  eslint-disable-next-line svelte/no-at-html-tags -->
          {@html filledSlots}
          {#each emptySlots as name (name)}
            <div slot={name === "children" ? undefined : name} style="display: contents;">
              {@render args[name]?.()}
            </div>
          {/each}
        </svelte:element>
        <CustomElementExample {componentName} props={args} />
      {/await}
    </div>
  {/snippet}
</Story>
