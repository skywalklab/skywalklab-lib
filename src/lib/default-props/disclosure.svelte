<script module lang="ts">
  import { testDescription, testText, testLogo, testSlides } from "../data/test-data.js";
  import default_ui from "../css-modules/default-ui.module.css";
  import TopImageCard from "../components/cards/TopImageCard.svelte";
  import BrandLogoSpinner from "../components/animations/BrandLogoSpinner.svelte";
  import { disclosure_static_props } from "./disclosure.js";
  import { withDynamicProps } from "./utils.js";

  export const disclosure_default_props = withDynamicProps(disclosure_static_props, {
    Accordion: {
      props: {
        children: AccordionChildren
      }
    },
    Accordion2: {
      props: {
        children: Accordion2Children
      }
    },
    ClickableTabs: {
      props: {
        buttonSnippet: ClickableTabsButtonSnippet,
        panelSnippet: ClickableTabsPanelSnippet
      }
    },
    MenuOverlay: {
      props: {
        children: MenuOverlayChildren
      }
    },
    TabDrawer: {
      props: {
        children: TabDrawerChildren,
        drawerContentSnippet: TabDrawerContent
      }
    }
  });
</script>

{#snippet AccordionChildren()}
  <p>{testDescription}</p>
{/snippet}
{#snippet Accordion2Children()}
  <p>{testText}</p>
{/snippet}

{#snippet ClickableTabsButtonSnippet({
  item,
  index,
  isActive
}: {
  item: { title: string; description: string };
  index: number;
  isActive: boolean;
})}
  <span
    class={default_ui["default-ui"]}
    class:is-active={isActive}
    style:--default-ui-color={isActive ? "var(--primary)" : "white"}
    style:--default-ui-bg-color={isActive ? "white" : "var(--primary)"}
    style:border-color={isActive ? "var(--primary)" : "initial"}>{item.title}</span>
{/snippet}

{#snippet ClickableTabsPanelSnippet({
  item,
  isActive
}: {
  item: { title: string; description: string };
  isActive: boolean;
})}
  <p class:active-panel={isActive}>{item.description}</p>
{/snippet}

{#snippet MenuOverlayChildren()}
  <div class="list-item" style="height: 210px; width: 180px;">
    <TopImageCard>
      <BrandLogoSpinner icon={testLogo} size={32} />
    </TopImageCard>
  </div>
{/snippet}

{#snippet TabDrawerChildren()}
  <p style="text-align: center; font-size: 2rem;">{testSlides[0].title}</p>
{/snippet}

{#snippet TabDrawerContent()}
  <p style="text-align: center;">{testSlides[0].description}</p>
{/snippet}
