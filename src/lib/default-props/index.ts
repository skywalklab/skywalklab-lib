import { animations_static_props } from "./animations.js";
import { banners_static_props } from "./banners.js";
import { brand_static_props } from "./brand.js";
import { buttons_static_props } from "./buttons.js";
import { cards_static_props } from "./cards.js";
import { carousels_static_props } from "./carousels.js";
import { chatbots_static_props } from "./chatbots.js";
import { diagrams_static_props } from "./diagrams.js";
import { disclosure_static_props } from "./disclosure.js";
import { frames_static_props } from "./frames.js";
import { galleries_static_props } from "./galleries.js";
import { headings_static_props } from "./headings.js";
import { heros_static_props } from "./heros.js";
import { icons_static_props } from "./icons.js";
import { legal_static_props } from "./legal.js";
import { lists_static_props } from "./lists.js";
import { modals_static_props } from "./modals.js";
import { nav_static_props } from "./nav.js";
import { panels_static_props } from "./panels.js";
import { patterns_static_props } from "./patterns.js";
import { search_static_props } from "./search.js";
import { seo_static_props } from "./seo.js";
import { utilities_static_props } from "./utilities.js";

export const static_props = {
  animations: animations_static_props,
  banners: banners_static_props,
  brand: brand_static_props,
  buttons: buttons_static_props,
  cards: cards_static_props,
  carousels: carousels_static_props,
  chatbots: chatbots_static_props,
  diagrams: diagrams_static_props,
  disclosure: disclosure_static_props,
  frames: frames_static_props,
  galleries: galleries_static_props,
  headings: headings_static_props,
  heros: heros_static_props,
  icons: icons_static_props,
  legal: legal_static_props,
  lists: lists_static_props,
  modals: modals_static_props,
  nav: nav_static_props,
  panels: panels_static_props,
  patterns: patterns_static_props,
  search: search_static_props,
  seo: seo_static_props,
  utilities: utilities_static_props
} as const;

export const getStaticProps = (dir: string): Map<string, { storyDescription: string; props: Record<string, any> }> =>
  static_props[dir as keyof typeof static_props];
