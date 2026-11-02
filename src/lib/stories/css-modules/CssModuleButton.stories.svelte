<script module lang="ts">
  import { css_module_descriptions } from "../component-descriptions.js";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";
  import { useArgs, useEffect } from "storybook/preview-api";
  import { getDefaultProps } from "../../default-props/index.svelte";
  import { getStoryProps } from "../utils.js";
  import CssModuleButton from "./CssModuleButton.svelte";

  const componentDir = "buttons";
  const componentDefaultProps = getDefaultProps(componentDir);
  const { storyProps, cssModules } = await getStoryProps({
    defaultProps: componentDefaultProps,
    nonCssVarProps: ["text", "style", "onclick"]
  });
  const firstStoryProp = Object.entries(storyProps)[0];
  let renderedComponent = $state<string>(firstStoryProp[1].componentName);

  const { Story } = defineMeta({
    title: "CSS-Modules/Buttons",
    component: CssModuleButton,
    parameters: {
      docs: {
        description: { component: css_module_descriptions.get(componentDir) }
      }
    },
    argTypes: {
      classNames: {
        options: Object.keys(storyProps),
        control: {
          type: "select",
          labels: Object.fromEntries(Object.entries(storyProps).map(([cls, { label }]) => [cls, label]))
        }
      }
    },
    decorators: [
      (story) => {
        const [{ classNames }, updateArgs] = useArgs();
        useEffect(() => {
          const props = storyProps[classNames];
          renderedComponent = props.componentName;

          updateArgs({
            cssModule: props?.cssModule,
            text: props?.label ?? "Default",
            style: props?.style.replaceAll("; ", ";\n") ?? ""
          });
        }, [classNames]);
        return story();
      }
    ],
    args: {
      onclick: fn()
    }
  });
</script>

<Story
  name="Default"
  args={{
    cssModule: cssModules[firstStoryProp[0]],
    classNames: firstStoryProp[0],
    text: firstStoryProp[1].label
  }}>
  {#snippet template(args)}
    <CssModuleButton {...args} />
    <p class="story-description">
      {componentDefaultProps.get(renderedComponent).moduleDescription ??
        componentDefaultProps.get(renderedComponent).storyDescription}
    </p>
  {/snippet}
</Story>
