import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-aside-nav-1`]: {
    html: `
<${prefix}-aside-nav-1
  sw-items='[]'
  sw-selected-index="0"
  sw-button-class="string"
  sw-style="string"></${prefix}-aside-nav-1>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-aside-nav-1.js";
`
  },
  [`${prefix}-footer-1`]: {
    html: `
<${prefix}-footer-1
  sw-logo='{}'
  sw-links='[]'
  sw-contact-info='[]'
  sw-disclaimer="string"
  sw-style="string">
  <div slot="logoSnippet"></div>
  <div></div>
</${prefix}-footer-1>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-footer-1.js";
`
  },
  [`${prefix}-hamburger-base`]: {
    html: `
<${prefix}-hamburger-base
  sw-open="false"
  sw-type="string"
  sw-title="string"
  sw-aria-controls="string"
  sw-aria-label="string"
  sw-css-module='{}'
  sw-style="string"></${prefix}-hamburger-base>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-hamburger-base.js";

document.querySelector("${prefix}-hamburger-base").swOnclick = (e: MouseEvent) => void;
`
  },
  [`${prefix}-header-1`]: {
    html: `
<${prefix}-header-1
  sw-logo='{}'
  sw-links='[]'
  sw-nav-open="false"
  sw-float-mobile-menu="false"
  sw-hamburger='{}'
  sw-nav-item-dropdowns='{}'
  sw-style="string">
  <div slot="linkSnippet" data-text-content="arg"></div>
  <div slot="ctaSnippet"></div>
</${prefix}-header-1>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-header-1.js";

document.querySelector("${prefix}-header-1").showHeaderCb = (isTop: boolean) => void;
`
  },
  [`${prefix}-header-1links`]: {
    html: `
<${prefix}-header-1links
  sw-links='[]'
  sw-nav-item-dropdowns='{}'
  sw-nav-open="false"
  sw-float="false"
  sw-hamburger='{}'
  sw-style="string">
  <div slot="linkSnippet" data-text-content="arg"></div>
  <div slot="ctaSnippet"></div>
</${prefix}-header-1links>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-header-1links.js";
`
  },
  [`${prefix}-header-2`]: {
    html: `
<${prefix}-header-2
  sw-logo='{}'
  sw-links='[]'
  sw-open-hamburger="false"
  sw-hamburger='{}'
  sw-nav-item-dropdowns='{}'
  sw-header-class="string"
  sw-action-type="string"
  sw-style="string">
  <div slot="linkSnippet" data-text-content="arg"></div>
  <div slot="ctaSnippet"></div>
</${prefix}-header-2>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-header-2.js";

document.querySelector("${prefix}-header-2").showHeaderCb = (isTop: boolean) => void;
`
  },
  [`${prefix}-header-logo`]: {
    html: `
<${prefix}-header-logo
  sw-logo='{}'
  sw-style="string"></${prefix}-header-logo>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-header-logo.js";
`
  },
  [`${prefix}-language-header`]: {
    html: `
<${prefix}-language-header
  sw-logo='{}'
  sw-links='[]'
  sw-open-hamburger="false"
  sw-hamburger='{}'
  sw-nav-item-dropdowns='{}'
  sw-header-class="string"
  sw-action-type="string"
  sw-style="string">
  <div slot="linkSnippet" data-text-content="arg"></div>
  <div slot="ctaSnippet"></div>
</${prefix}-language-header>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-language-header.js";

document.querySelector("${prefix}-language-header").showHeaderCb = (isTop: boolean) => void;
`
  },
  [`${prefix}-large-screen-nav`]: {
    html: `
<${prefix}-large-screen-nav
  sw-links='[]'
  sw-nav-item-dropdowns='{}'
  sw-style="string">
  <div slot="linkSnippet" data-text-content="arg"></div>
  <div slot="ctaSnippet"></div>
</${prefix}-large-screen-nav>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-large-screen-nav.js";
`
  },
  [`${prefix}-nav-item-dropdown`]: {
    html: `
<${prefix}-nav-item-dropdown
  sw-title="string"
  sw-items='[]'
  sw-lang="string"
  sw-interaction="string"
  sw-style="string">
  <div slot="linkSnippet" data-text-content="arg"></div>
</${prefix}-nav-item-dropdown>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-nav-item-dropdown.js";
`
  },
  [`${prefix}-small-screen-nav`]: {
    html: `
<${prefix}-small-screen-nav
  sw-links='[]'
  sw-open-hamburger="false"
  sw-hamburger='{}'
  sw-nav-item-dropdowns='{}'
  sw-style="string">
  <div slot="linkSnippet" data-text-content="arg"></div>
  <div slot="ctaSnippet"></div>
</${prefix}-small-screen-nav>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-small-screen-nav.js";
`
  },
  [`${prefix}-timeline-nav`]: {
    html: `
<${prefix}-timeline-nav
  sw-items='[]'
  sw-active-item-index="0"
  sw-transition-timing="0"
  sw-style="string">
  <div slot="buttonSnippet" data-text-content="arg"></div>
  <div slot="itemSnippet" data-text-content="arg"></div>
</${prefix}-timeline-nav>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-timeline-nav.js";

document.querySelector("${prefix}-timeline-nav").swOnclick = (index: number) => void;
`
  }
};
