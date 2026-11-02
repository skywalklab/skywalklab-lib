<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { getDefaultProps } from "../../default-props/index.svelte";
  import { kebab, parseComponentPath } from "../../utils/helpers.js";
  import { findComponentModule } from "../../utils/component-modules.js";
  import { handleStoryBindables } from "../../stories/utils.js";
  import { fn } from "storybook/test";
  import { useArgs } from "storybook/internal/preview-api";
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

  let showCookieBanner = $state<boolean>(defaultProps.props.showCookieBanner);
  const { Story } = defineMeta({
    title: "Components/Legal/CookieBanner",
    component: Component,
    parameters: {
      docs: { description: { component: defaultProps.storyDescription } }
    },
    decorators: [
      (story) => {
        const [args, updateArgs] = useArgs();

        handleStoryBindables({
          name: "showCookieBanner",
          value: showCookieBanner,
          setValue: (next) => (showCookieBanner = next),
          args,
          updateArgs
        });

        return story();
      }
    ],
    argTypes: {},
    args: {
      onnecessary: (agreed: boolean) => {
        fn();
      },
      onanalytics: (agreed: boolean) => {
        fn();
      },
      ontracking: (agreed: boolean) => {
        fn();
      },
      onmarketing: (agreed: boolean) => {
        fn();
      }
    }
  });
</script>

<Story name="Default" args={{ ...defaultProps.props }}>
  {#snippet template(args)}
    <div class="{kebab(componentName)}-story-example">
      <Component {...args} bind:showCookieBanner />
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
