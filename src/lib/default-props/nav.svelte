<script module lang="ts">
  import { testHeader1, testLanguageHeader } from "../data/test-data.js";
  import SlideButton from "../components/buttons/SlideButton.svelte";
  import Rolladex from "../components/buttons/Rolladex.svelte";
  import header1 from "../css-modules/header1.module.css";
  import default_outline_ui from "../css-modules/default-outline-ui.module.css";
  import dot_indicator_ui from "../css-modules/dot-indicator-ui.module.css";
  import icon_inline_heading from "../css-modules/icon-inline-heading.module.css";
  import slide_ui from "../css-modules/slide-ui.module.css";
  import LucideIcon from "../components/icons/LucideIcon.svelte";
  import SkywalklabAnimatedLogo from "../components/brand/SkywalklabAnimatedLogo.svelte";
  import SkywalklabLogo from "../components/brand/SkywalklabLogo.svelte";
  import { page } from "$app/state";
  import { hamburger_modules } from "../stories/utils.js";
  import { nav_static_props } from "./nav.js";
  import { withDynamicProps } from "./utils.js";

  let pathname = $derived<string | undefined>(page.url.pathname);

  export const nav_default_props = withDynamicProps(nav_static_props, {
    AsideNav1: {
      props: {
        buttonClass: `${default_outline_ui["default-outline-ui"]} aside-nav-button`
      },
      extraSnippet: AsideNav1ExtraSnippet
    },
    Footer1: {
      props: {
        logo: { ...nav_static_props.get("Footer1").props.logo, icon: SkywalklabAnimatedLogo },
        contactInfo: nav_static_props
          .get("Footer1")
          .props.contactInfo.map((item: any) => ({ ...item, icon: item.iconProps ? LucideIcon : "" }))
      }
    },
    HamburgerBase: {
      props: {
        cssModule: hamburger_modules["spin"]
      }
    },
    Header1: {
      props: {
        linkSnippet: Header1LinkSnippet,
        ctaSnippet: Header1CtaSnippet
      }
    },
    LanguageHeader: {
      props: {
        logo: { ...nav_static_props.get("LanguageHeader").props.logo, icon: SkywalklabLogo },
        hamburger: { ...nav_static_props.get("LanguageHeader").props.hamburger, module: hamburger_modules["spin"] },
        linkSnippet: LanguageHeaderLinkSnippet,
        ctaSnippet: LanguageHeaderCtaSnippet
      }
    },
    TimelineNav: {
      props: {
        buttonSnippet: TimelineNavButtonSnippet,
        itemSnippet: TimelineNavItemSnippet
      }
    }
  });
</script>

{#snippet AsideNav1ExtraSnippet(componentName: string, { selectedIndex }: { selectedIndex: number })}
  {#if componentName === "AsideNav1"}
    {@const props = nav_default_props.get(componentName).props}
    {@const selected = props.items[selectedIndex]}
    <article class="aside-nav-1-example--detail">
      <h2 class={icon_inline_heading["icon-inline-heading"]} style="max-width: 20rem;">
        <LucideIcon size={32} lucide_icon={selected.lucide_icon} /><span>{selected.text}</span>
      </h2>
      <p>{selected.overview}</p>
    </article>
  {/if}
{/snippet}

{#snippet Header1LinkSnippet({ text, href, cb }: { text?: string; href?: string; cb?: () => void })}
  <svelte:element
    this={href ? "a" : "span"}
    role={href ? "link" : cb ? "button" : undefined}
    tabindex={href || cb ? 0 : -1}
    {href}
    class={header1["nav-item-link"]}
    data-sveltekit-preload-data="hover"
    onclick={cb}>{text}</svelte:element>
{/snippet}

{#snippet Header1CtaSnippet(text = testHeader1.ctaText)}
  <li class="vertical-line">&vert;</li>
  <li><SlideButton {text} /></li>
{/snippet}

{#snippet LanguageHeaderLinkSnippet({
  text,
  cb,
  ...attrs
}: { text: string; href?: string; cb?: () => void } & Record<string, any>)}
  <Rolladex
    {attrs}
    {pathname}
    onclick={cb}
    buttonClass="{dot_indicator_ui['dot-indicator-ui']} indicator--custom {attrs.href === pathname
      ? dot_indicator_ui['dot']
      : ''}">
    {text}
  </Rolladex>
{/snippet}

{#snippet LanguageHeaderCtaSnippet()}
  <li class="vertical-line">&vert;</li>
  <li style="display: flex; align-items: center;">
    <a class="{slide_ui['slide-ui']} nav-cta" href="/"><span>{testLanguageHeader.ctaText}</span></a>
  </li>
{/snippet}

{#snippet TimelineNavButtonSnippet({ item }: { item: { text: string }; index: number })}
  <span>{item.text}</span>
{/snippet}

{#snippet TimelineNavItemSnippet({ item, index }: { item: { text: string; description: string }; index: number })}
  <p>{item.description}</p>
{/snippet}
