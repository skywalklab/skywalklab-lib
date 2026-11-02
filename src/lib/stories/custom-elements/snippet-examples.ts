import { SKYWALK_ATTR_PREFIX, SKYWALK_PREFIX } from "../../brand/data.js";
import { testLogo, testLogoWhite, testText, testTitle } from "../../data/test-data.js";

/**
 * How each parameterized snippet is written as slotted markup on the custom element.
 *
 * The Svelte versions live in `src/lib/default-props/*.svelte`. Outside Svelte there is no snippet
 * to receive an argument, so the element renders each item itself and the slotted markup is a
 * static template: the `data-*` mappings stay, and `snippetWrap` fills them per item.
 *
 * Only the slotted markup: the element and its attributes come from the component's default props,
 * which `stories/example-values.ts` fills in around these. Keyed by `<component>.<snippet>`.
 */
const prefix = SKYWALK_PREFIX;
const attrPrefix = SKYWALK_ATTR_PREFIX;

export const snippet_examples: Record<string, string> = {
  "CircleCarousel.itemSnippet": [
    `<img slot="itemSnippet" data-src="item.icon" data-alt="item.alt" src="" alt="" height="32" width="32" />`,
    `<span slot="itemSnippet" data-text-content="item.text"></span>`
  ].join("\n"),

  "SlideshowCarousel.slideSnippet": `<img slot="slideSnippet" data-src="item.src" data-alt="item.alt" src="" alt="" height="104" width="104" />`,

  "Carousel1.itemSnippet": `<img slot="itemSnippet" data-src="item.src" data-alt="item.alt" src="" alt="" width="100" height="100" />`,

  "PricingCard.includedSnippet": [
    `<img slot="includedSnippet" src="${testLogoWhite}" alt="" height="22" width="22" />`,
    `<span slot="includedSnippet" data-text-content="text"></span>`
  ].join("\n"),

  "ClickableTabs.buttonSnippet": [
    `<span`,
    `  slot="buttonSnippet"`,
    `  class="${attrPrefix}_default-ui"`,
    `  data-class-list="isActive.is-active"`,
    `  data-text-content="item.title"></span>`,
    `<p slot="panelSnippet" data-class-list="isActive.is-active" data-text-content="item.description"></p>`
  ].join("\n"),

  "StepList.stepSnippet": `<div slot="stepSnippet" data-text-content="index"></div>`,

  "FileList.itemSnippet": [
    `<img`,
    `  slot="itemSnippet"`,
    `  data-src="item.src"`,
    `  data-alt="item.alt"`,
    `  data-width="item.width"`,
    `  data-height="item.height"`,
    `  src=""`,
    `  alt=""`,
    `  style="width: 100%; height: 100%; object-fit: cover;" />`
  ].join("\n"),

  "LoadMoreList.itemSnippet": [
    `<div slot="itemSnippet" class="list-item" style="height: 210px; width: 180px; position: relative;">`,
    `  <${prefix}-top-image-card sw-title="${testTitle}" sw-text="${testText}">`,
    `    <img width="60" height="96" src="${testLogo}" alt="" loading="lazy" />`,
    `  </${prefix}-top-image-card>`,
    `  <p`,
    `    data-text-content="item.label"`,
    `    style="position: absolute; top: 4px; right: 4px; font-size: 12px; color: var(--accent, lightblue);">`,
    `  </p>`,
    `</div>`
  ].join("\n"),

  "PreviewList.rowSnippet": [
    `<div slot="rowSnippet" style="padding: 0 1rem; display: flex; justify-content: space-between; width: 100%;">`,
    `  <span data-text-content="item.component"></span>`,
    `  <span data-text-content="item.dir"></span>`,
    `</div>`
  ].join("\n"),

  "PreviewList.showcaseSnippet": [
    `<p`,
    `  slot="showcaseSnippet"`,
    `  hidden`,
    `  data-hidden="item.hideDescription"`,
    `  data-text-content="item.description"`,
    `  style="width: 100%; padding: 0 1rem;"></p>`,
    `<img`,
    `  slot="showcaseSnippet"`,
    `  data-hidden="item.isHeader"`,
    `  data-src="item.src"`,
    `  data-alt="item.component"`,
    `  src=""`,
    `  alt=""`,
    `  width="300"`,
    `  height="600"`,
    `  style="height: 300px; width: 100%; object-fit: contain;" />`
  ].join("\n"),

  "PreviewList.previewSnippet": `<img slot="previewSnippet" data-hidden="item.isHeader" data-src="item.src" src="" alt="" style="height: 100%; object-fit: contain;" />`,

  "PreviewList.detailsSnippet": [
    `<div slot="detailsSnippet" data-hidden="item.isHeader" style="padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">`,
    `  <h2 data-text-content="item.component"></h2>`,
    `  <p data-text-content="item.description"></p>`,
    `</div>`
  ].join("\n"),

  "SearchList.itemTextSnippet": `<span slot="itemTextSnippet" data-text-content="text"></span>`,

  "Header1.linkSnippet": `<a slot="linkSnippet" class="${attrPrefix}_nav-item-link" data-text-content="text" data-href="href"></a>`,

  "LanguageHeader.linkSnippet": [
    `<${prefix}-rolladex`,
    `  slot="linkSnippet"`,
    `  data-text="text"`,
    `  data-href="href"`,
    `  data-class-list="isPage.${attrPrefix}_dot"`,
    `  sw-button-class="${attrPrefix}_dot-indicator-ui indicator--custom"></${prefix}-rolladex>`
  ].join("\n"),

  "TimelineNav.buttonSnippet": `<span slot="buttonSnippet" data-text-content="item.text"></span>`,

  "TimelineNav.itemSnippet": `<p slot="itemSnippet" data-text-content="item.description"></p>`,

  "TopBarSlide.itemSnippet": `<a slot="itemSnippet" data-href="item.href" data-text-content="item.text"></a>`
};
