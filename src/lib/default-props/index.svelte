<script module lang="ts">
  import { animations_default_props } from "./animations.svelte";
  import { banners_default_props } from "./banners.svelte";
  import { brand_default_props } from "./brand.svelte";
  import { buttons_default_props } from "./buttons.svelte";
  import { cards_default_props } from "./cards.svelte";
  import { carousels_default_props } from "./carousels.svelte";
  import { chatbots_default_props } from "./chatbots.svelte";
  import { diagrams_default_props } from "./diagrams.svelte";
  import { disclosure_default_props } from "./disclosure.svelte";
  import { frames_default_props } from "./frames.svelte";
  import { galleries_default_props } from "./galleries.svelte";
  import { headings_default_props } from "./headings.svelte";
  import { heros_default_props } from "./heros.svelte";
  import { icons_default_props } from "./icons.svelte";
  import { legal_default_props } from "./legal.svelte";
  import { lists_default_props } from "./lists.svelte";
  import { modals_default_props } from "./modals.svelte";
  import { nav_default_props } from "./nav.svelte";
  import { panels_default_props } from "./panels.svelte";
  import { patterns_default_props } from "./patterns.svelte";
  import { search_default_props } from "./search.svelte";
  import { seo_default_props } from "./seo.svelte";
  import { utilities_default_props } from "./utilities.svelte";

  export const default_props = {
    animations: animations_default_props,
    banners: banners_default_props,
    brand: brand_default_props,
    buttons: buttons_default_props,
    cards: cards_default_props,
    carousels: carousels_default_props,
    chatbots: chatbots_default_props,
    diagrams: diagrams_default_props,
    disclosure: disclosure_default_props,
    frames: frames_default_props,
    galleries: galleries_default_props,
    headings: headings_default_props,
    heros: heros_default_props,
    icons: icons_default_props,
    legal: legal_default_props,
    lists: lists_default_props,
    modals: modals_default_props,
    nav: nav_default_props,
    panels: panels_default_props,
    patterns: patterns_default_props,
    search: search_default_props,
    seo: seo_default_props,
    utilities: utilities_default_props
  } as const;

  export const getDefaultProps = (dir: string) => default_props[dir as keyof typeof default_props];
</script>
