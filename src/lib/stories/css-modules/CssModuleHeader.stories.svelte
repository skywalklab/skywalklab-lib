<script module lang="ts">
  import { css_module_descriptions } from "../component-descriptions.js";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import CssModuleHeader from "./CssModuleHeader.svelte";
  import { useArgs, useEffect } from "storybook/preview-api";
  import { getDefaultProps } from "../../default-props/index.svelte";
  import { getStoryProps, handleStoryBindables } from "../utils.js";
  import { linkTo } from "@storybook/addon-links";

  const componentDir = "nav";
  const defaultProps = getDefaultProps(componentDir);
  const { storyProps, cssModules } = await getStoryProps({
    defaultProps,
    nonCssVarProps: ["logo", "links", "navItemDropdowns", "linkSnippet", "ctaSnippet", "style", "floatMobileMenu"]
  });
  const firstStoryProp = Object.entries(storyProps)[0];
  const componentName = firstStoryProp[1].componentName;
  let renderedComponent = $state<string>(componentName);

  let navOpen = $state<boolean>(defaultProps.get(componentName).props.navOpen);

  const { Story } = defineMeta({
    title: "CSS-Modules/Header",
    component: CssModuleHeader,
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
        const [args, updateArgs] = useArgs();
        useEffect(() => {
          const props = storyProps[args.classNames];
          renderedComponent = props.componentName;

          updateArgs({
            cssModule: props?.cssModule,
            style: props?.style.replaceAll("; ", ";\n") ?? ""
          });
        }, [args.classNames]);

        handleStoryBindables({
          name: "navOpen",
          value: navOpen,
          setValue: (next) => (navOpen = next),
          args,
          updateArgs
        });
        return story();
      }
    ]
  });
</script>

<Story
  name="Default"
  args={{
    cssModule: cssModules[firstStoryProp[0]],
    classNames: firstStoryProp[0],
    logo: defaultProps.get(renderedComponent).props.logo,
    links: defaultProps.get(renderedComponent).props.links,
    navItemDropdowns: defaultProps.get(renderedComponent).props.navItemDropdowns,
    linkSnippet: defaultProps.get(renderedComponent).props.linkSnippet,
    ctaSnippet: defaultProps.get(renderedComponent).props.ctaSnippet
  }}>
  {#snippet template(args)}
    <CssModuleHeader {...args} />
    <p class="story-description">
      {defaultProps.get(renderedComponent).moduleDescription ?? defaultProps.get(renderedComponent).storyDescription}
      <span>{css_module_descriptions.get("navSee")}</span>
      <button class="story-description--link" onclick={linkTo("Components/Nav/LanguageHeader", "Docs")}>
        LanguageHeader
      </button>
      <span>{css_module_descriptions.get("navSeeAfter")}</span>
    </p>
  {/snippet}
</Story>
