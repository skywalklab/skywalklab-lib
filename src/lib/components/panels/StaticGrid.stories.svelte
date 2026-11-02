<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { getDefaultProps } from "../../default-props/index.svelte";
  import { kebab, parseComponentPath } from "../../utils/helpers.js";
  import { findComponentModule } from "../../utils/component-modules.js";
  import CustomElementExample from "../../stories/CustomElementExample.svelte";
  import { SKYWALK_ATTR_PREFIX } from "../../brand/data.js";
  import { defineCustomElements } from "../../stories/custom-elements/custom-element-examples.js";

  const { componentDir, componentName } = parseComponentPath(import.meta.url);
  const defaultProps = getDefaultProps(componentDir).get(componentName);
  const [, module] = findComponentModule(componentDir, componentName);
  const Component = (await module()).default;

  let galleryIndex = $state<number | undefined>(getDefaultProps("galleries").get("MasonryGallery").props.galleryIndex);

  const { Story } = defineMeta({
    title: "Components/Panels/StaticGrid",
    component: Component,
    parameters: {
      docs: { description: { component: defaultProps.storyDescription } }
    },
    argTypes: {},
    args: {}
  });
</script>

<Story name="Default" args={{ ...defaultProps.props }}>
  {#snippet template(args)}
    <div class="{kebab(componentName)}-story-example">
      <Component
        {...args}
        cards={args.cards.map((card: any) => ({ ...card, cb: (e: Event, i: number) => (galleryIndex = i) }))} />
      {@render defaultProps.extraSnippet?.(componentName, {
        get galleryIndex() {
          return galleryIndex;
        },
        set galleryIndex(index: number | undefined) {
          galleryIndex = index;
        },
        images: args.cards ?? []
      })}
    </div>
  {/snippet}
</Story>
<Story name="Custom Element" args={{ ...defaultProps.props }}>
  {#snippet template(args)}
    {@const setCards = (node: any, cards: any[]) => {
      const apply = (list: any[]) => {
        node.cards = list.map((card, i) => ({ ...card, cb: () => (galleryIndex = i) }));
      };
      apply(cards);
      return { update: apply };
    }}
    <div class="{kebab(componentName)}-story-example">
      {#await defineCustomElements(componentName, args) then { tag, attributes, emptySlots, filledSlots }}
        <svelte:element
          this={tag}
          {...attributes}
          class="{SKYWALK_ATTR_PREFIX}-{kebab(componentName)}"
          use:setCards={args.cards ?? []}>
          <!--  eslint-disable-next-line svelte/no-at-html-tags -->
          {@html filledSlots}
          {#each emptySlots as name (name)}
            <div slot={name === "children" ? undefined : name} style="display: contents;">
              {@render args[name]?.()}
            </div>
          {/each}
        </svelte:element>
        {@render defaultProps.extraSnippet?.(componentName, {
          get galleryIndex() {
            return galleryIndex;
          },
          set galleryIndex(index: number | undefined) {
            galleryIndex = index;
          },
          images: args.cards ?? []
        })}
        <CustomElementExample {componentName} props={args} />
      {/await}
    </div>
  {/snippet}
</Story>
