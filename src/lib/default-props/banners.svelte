<script module lang="ts">
  import {
    testCallback,
    testDescription,
    testIcon,
    testCopyrightBanner1,
    testTopDisclaimerBanner
  } from "../data/test-data.js";
  import AccentHeading from "../components/headings/AccentHeading.svelte";
  import default_ui from "../css-modules/default-ui.module.css";
  import LucideIcon from "../components/icons/LucideIcon.svelte";
  import { testTitle } from "../data/test-data.js";
  import { BRAND_LAB } from "../brand/data.js";
  import { getSocialSVG } from "../utils/icons.js";
  import { banners_static_props } from "./banners.js";
  import { withDynamicProps } from "./utils.js";

  export const banners_default_props = withDynamicProps(banners_static_props, {
    CopyrightBanner1: {
      props: {
        children: CopyrightBanner1Children
      }
    },
    StaircaseBanner: {
      props: {
        children: StaircaseBannerChildren
      }
    },
    TopBarSlide: {
      props: {
        itemSnippet: TopBarSlideItemSnippet
      }
    },
    TopDisclaimerBanner: {
      props: {
        children: TopDisclaimerBannerChildren
      }
    }
  });
</script>

{#snippet StaircaseBannerChildren()}
  <AccentHeading text={testTitle} tag="h3" fadeOutColor="#1e2a39" style="font-size: 36px;" />
  <p>{testDescription}</p>
  <div class="cta-btn-container">
    {#each new Array(2).fill( { title: testTitle, icon: testIcon, callback: testCallback } ) as { title, icon, callback }, i (i)}
      <button class="{default_ui['default-ui']} custom-btn cta-btn" onclick={callback}
        ><LucideIcon lucide_icon={icon} size={20} color="currentColor" /> {title}</button>
    {/each}
  </div>
{/snippet}

{#snippet CopyrightBanner1Children()}
  <p class="copyright">
    <span class="copyright--text">© Copyright {new Date().getFullYear()}</span>
    <a href="/" class="copyright--company copyright--link">{testCopyrightBanner1.library}</a>
    <span class="copyright--text">{testCopyrightBanner1.by}</span>
    <a href={BRAND_LAB.site} target="_blank" rel="noreferrer" class="copyright--author copyright--link">{testTitle}</a>
  </p>
{/snippet}

{#snippet TopBarSlideItemSnippet({
  item
}: {
  item: { text: string; icon?: string; href?: string; cb?: () => void };
  index: number;
})}
  {#if item.href}
    <a
      href={item.href}
      aria-label={item.text}
      style="display: flex; align-items: center; gap: 0.25rem; cursor: pointer;">
      {#if item.icon === "house"}
        <LucideIcon lucide_icon="house" size={18} />
      {:else}
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html getSocialSVG({ social: item.icon!, size: "18px", stroke: "currentColor" })}
      {/if}
    </a>
  {:else if item.cb}
    <button style="display: flex; align-items: center; gap: 0.25rem; cursor: pointer;" onclick={() => item.cb?.()}>
      <span>{item.text}</span>
    </button>
  {/if}
{/snippet}

{#snippet TopDisclaimerBannerChildren()}
  <p>{testTopDisclaimerBanner.text}</p>
{/snippet}
