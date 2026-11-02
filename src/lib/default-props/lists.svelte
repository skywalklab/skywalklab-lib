<script module lang="ts">
  import inset_ui from "../css-modules/inset-ui.module.css";
  import line_ui from "../css-modules/line-ui.module.css";
  import TopImageCard from "../components/cards/TopImageCard.svelte";
  import BrandLogoSpinner from "../components/animations/BrandLogoSpinner.svelte";
  import LucideIcon from "../components/icons/LucideIcon.svelte";
  import { testText, testTitle, testLogo, testPreviewList, testLoadMoreList } from "../data/test-data.js";
  import { lists_static_props } from "./lists.js";
  import { withDynamicProps } from "./utils.js";
  import SkywalklabLogo from "../components/brand/SkywalklabLogo.svelte";

  export const lists_default_props = withDynamicProps(lists_static_props, {
    FileList: {
      props: {
        navButtons: {
          left: { ...lists_static_props.get("FileList").props.navButtons.left, attrs: { class: line_ui["line-ui"] } },
          right: { ...lists_static_props.get("FileList").props.navButtons.right, attrs: { class: line_ui["line-ui"] } }
        },
        itemSnippet: FileListItemSnippet
      }
    },
    HowWeWork1: {
      props: {
        steps: lists_static_props.get("HowWeWork1").props.steps.map((step: any) => ({ ...step, icon: SkywalklabLogo }))
      }
    },
    ImageByList: {
      props: {
        items: lists_static_props.get("ImageByList").props.items.map((item: any) => ({ ...item, icon: SkywalklabLogo }))
      }
    },
    ImageCardGrid: {
      props: {
        items: lists_static_props.get("ImageCardGrid").props.items.map((item: any) => ({ ...item, icon: LucideIcon }))
      }
    },
    LoadMoreList: {
      props: {
        itemSnippet: LoadMoreListItemSnippet,
        loadingItemSnippet: LoadMoreListLoadingItemSnippet,
        loadBtnSnippet: LoadMoreListLoadBtnSnippet
      }
    },
    OverlapIconCards: {
      props: {
        items: lists_static_props
          .get("OverlapIconCards")
          .props.items.map((item: any) => ({ ...item, icon: LucideIcon }))
      }
    },
    PreviewList: {
      props: {
        rowSnippet: PreviewListRowSnippet,
        showcaseSnippet: PreviewListShowcaseSnippet,
        previewSnippet: PreviewListPreviewSnippet,
        detailsSnippet: PreviewListDetailsSnippet
      }
    },
    ProcessFlow: {
      props: {
        items: lists_static_props.get("ProcessFlow").props.items.map((item: any) => ({ ...item, icon: LucideIcon }))
      }
    }
  });
</script>

{#snippet FileListItemSnippet({
  item
}: {
  item: { src: string; alt: string; width: string; height: string };
  index: number;
})}
  <img
    src={item.src}
    alt={item.alt}
    width={item.width}
    height={item.height}
    style="width: 100%; height: 100%; object-fit: cover;" />
{/snippet}

{#snippet LoadMoreListItemSnippet({ item }: { item: { text: string; icon: string }; index: number })}
  <div class="list-item" style="height: 210px; width: 180px; position: relative;">
    <TopImageCard title={testTitle} text={testText}>
      <img width="60" height="96" src={testLogo} alt="" loading="lazy" />
    </TopImageCard>
  </div>
{/snippet}

{#snippet LoadMoreListLoadBtnSnippet()}
  <span class="{inset_ui['inset-ui']} load-more-button-inner">{testLoadMoreList.buttonText}</span>
{/snippet}

{#snippet LoadMoreListLoadingItemSnippet()}
  <div class="list-item" style="height: 210px; width: 180px;">
    <TopImageCard>
      <BrandLogoSpinner icon={testLogo} size={32} />
    </TopImageCard>
  </div>
{/snippet}

{#snippet PreviewListRowSnippet({ item, index }: { item: { dir: string; component: string }; index: number })}
  <div style="padding: 0 1rem; display: flex; justify-content: space-between; width: 100%;">
    <span>{item.component}</span>
    <span>{item.dir}</span>
  </div>
{/snippet}

{#snippet PreviewListShowcaseSnippet({ item, index }: { item: { component: string; src: string }; index: number })}
  {#if index === 0}
    <p style="width: 100%; padding: 0 1rem;">{testPreviewList.header.description}</p>
  {:else}
    <img
      src={item.src}
      alt={item.component}
      width="300"
      height="600"
      style="height: 300px; width:100%; object-fit: contain;" />
  {/if}
{/snippet}

{#snippet PreviewListPreviewSnippet({ item, index }: { item: { src: string }; index: number })}
  {#if index !== 0}
    <img src={item.src} alt="" style="height: 100%; object-fit: contain;" />
  {/if}
{/snippet}

{#snippet PreviewListDetailsSnippet({
  item,
  index
}: {
  item: { component: string; description: string };
  index: number;
})}
  {#if index !== 0}
    <div style="padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
      <h2>{item.component}</h2>
      <p>{item.description}</p>
    </div>
  {/if}
{/snippet}
