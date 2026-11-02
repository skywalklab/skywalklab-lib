<script module lang="ts">
  import LucideIcon from "../components/icons/LucideIcon.svelte";
  import { testItems, testTitle, testDescription } from "../data/test-data.js";
  import default_ui from "../css-modules/default-ui.module.css";
  import pop_up_ui from "../css-modules/pop-up-ui.module.css";
  import { animations_static_props } from "./animations.js";
  import { withDynamicProps } from "./utils.js";

  export const animations_default_props = withDynamicProps(animations_static_props, {
    CircleCarousel: {
      props: {
        itemSnippet: CircleCarouselItemSnippet
      }
    },
    LinearCarousel: {
      props: {
        buttonClass: default_ui["default-ui"],
        children: LinearCarouselChildren
      }
    },
    SlideshowCarousel: {
      props: {
        buttonClass: pop_up_ui["pop-up-ui"],
        textSnippet: SlideshowCarouselTextSnippet,
        slideSnippet: SlideshowCarouselSlideSnippet
      }
    },
    SlideshowIcon: {
      props: {
        items: animations_static_props
          .get("SlideshowIcon")
          .props.items.map((item: any) => ({ ...item, icon: LucideIcon }))
      }
    }
  });
</script>

{#snippet CircleCarouselItemSnippet({
  item,
  index
}: {
  item: { text: string; icon: string; alt: string };
  index: number;
})}
  <img src={item.icon} alt={item.alt} height="32" width="32" />
  <span>{item.text}</span>
{/snippet}

{#snippet LinearCarouselChildren()}
  {#each [...testItems, ...testItems] as item, index (index)}
    <li style="display: flex; flex-direction: column; align-items: center;">
      <img src={item.icon} alt="SkywalkLab Logos" width="48" height="48" /><span>{item.text}</span>
    </li>
  {/each}
{/snippet}

{#snippet SlideshowCarouselTextSnippet()}
  <div style="text-align: center;">
    <h3 class="component-subheading">{testTitle}</h3>
    <p>{testDescription}</p>
  </div>
{/snippet}

{#snippet SlideshowCarouselSlideSnippet({ item, index }: { item: { src: string; alt: string }; index: number })}
  <img src={item.src} alt={item.alt} height="104" width="104" />
{/snippet}
