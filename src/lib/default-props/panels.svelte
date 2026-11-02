<script module lang="ts">
  import ContactForm2 from "../components/utilities/ContactForm2.svelte";
  import PatternGrid from "../components/patterns/PatternGrid.svelte";
  import LucideIcon from "../components/icons/LucideIcon.svelte";
  import {
    testDescription,
    testTitle,
    testLogo,
    testAboutSplitPanel,
    testStorySplitPanel,
    testTabbedSplitPanel
  } from "../data/test-data.js";
  import { PUBLIC_GOOGLE_MAPS_API_KEY } from "$env/static/public";
  import { utilities_default_props } from "./utilities.svelte";
  import LightboxOverlay from "../components/galleries/LightboxOverlay.svelte";
  import default_ui from "../css-modules/default-ui.module.css";
  import { panels_static_props } from "./panels.js";
  import { withDynamicProps } from "./utils.js";

  export const panels_default_props = withDynamicProps(panels_static_props, {
    AboutSplitPanel: {
      props: {
        buttonSnippet: AboutSplitPanelButtonSnippet
      }
    },
    DoublePanel: {
      props: {
        leftPanelSnippet: DoublePanelLeftPanelSnippet,
        rightPanelSnippet: DoublePanelRightPanelSnippet
      }
    },
    GoogleMap: {
      props: {
        googleMapApiKey: PUBLIC_GOOGLE_MAPS_API_KEY
      }
    },
    SplitImagePanel: {
      props: {
        children: SplitImagePanelChildren
      }
    },
    StorySplitPanel: {
      props: {
        buttonSnippet: StorySplitPanelButtonSnippet
      }
    },
    StaticGrid: {
      props: {
        buttonClass: default_ui["default-ui"]
      },
      extraSnippet: StaticGridExtraSnippet
    },
    TabbedSplitPanel: {
      props: {
        buttonClass: default_ui["default-ui"],
        buttonSnippet: TabbedSplitPanelButtonSnippet,
        items: panels_static_props
          .get("TabbedSplitPanel")
          .props.items.map((item: any) => ({ ...item, icon: LucideIcon }))
      }
    }
  });
</script>

{#snippet TabbedSplitPanelButtonSnippet()}
  <a class={default_ui["default-ui"]} href={testTabbedSplitPanel.cta.href}>{testTabbedSplitPanel.cta.text}</a>
{/snippet}

{#snippet StorySplitPanelButtonSnippet()}
  <a class={default_ui["default-ui"]} href={testStorySplitPanel.cta.href}>{testStorySplitPanel.cta.text}</a>
{/snippet}

{#snippet AboutSplitPanelButtonSnippet()}
  <a class={default_ui["default-ui"]} href={testAboutSplitPanel.cta.href}>{testAboutSplitPanel.cta.text}</a>
{/snippet}

{#snippet StaticGridExtraSnippet(componentName: string, args: { galleryIndex?: number; images: any[] })}
  {#if componentName === "StaticGrid" && args.galleryIndex !== undefined}
    <LightboxOverlay bind:lightboxIndex={args.galleryIndex} itemLength={args.images.length} unlockScroll={true}>
      {#snippet imageSnippet()}
        {@const image = args.images[args.galleryIndex!]}
        <img
          class="lightbox-overlay--image"
          src={image.src}
          alt={image.alt ?? image.title}
          width={image.width}
          height={image.height} />
      {/snippet}
    </LightboxOverlay>
  {/if}
{/snippet}

{#snippet DoublePanelLeftPanelSnippet()}
  <div>
    <PatternGrid fadeMid="15%" fadeEnd="80%" />
    <img
      src={testLogo}
      alt="logo"
      width="100"
      height="100"
      style="margin-right: 15%; position: relative; z-index: 1;" />
  </div>
{/snippet}

{#snippet DoublePanelRightPanelSnippet()}
  <div>
    <h2>{testTitle}</h2>
    <p>{testDescription}</p>
  </div>
{/snippet}

{#snippet SplitImagePanelChildren()}
  <ContactForm2 labels={utilities_default_props.get("ContactForm2").props.labels} />
{/snippet}
