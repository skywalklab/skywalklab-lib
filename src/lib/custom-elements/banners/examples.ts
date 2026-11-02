import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-contact-banner`]: {
    html: `
<${prefix}-contact-banner
  sw-phone='{}'
  sw-address='{}'
  sw-email='{}'
  sw-banner-bg-color="string"
  sw-style="string"></${prefix}-contact-banner>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-contact-banner.js";
`
  },
  [`${prefix}-copyright-banner-1`]: {
    html: `
<${prefix}-copyright-banner-1
  sw-style="string">
  <div></div>
</${prefix}-copyright-banner-1>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-copyright-banner-1.js";
`
  },
  [`${prefix}-icon-status-banner`]: {
    html: `
<${prefix}-icon-status-banner
  sw-icons='[]'
  sw-i="0"
  sw-active-color="string"
  sw-style="string"></${prefix}-icon-status-banner>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-icon-status-banner.js";

document.querySelector("${prefix}-icon-status-banner").swOnclick = (index: number) => void;
`
  },
  [`${prefix}-page-heading-banner-1`]: {
    html: `
<${prefix}-page-heading-banner-1
  sw-page-title="string"
  sw-breadcrumbs='{}'
  sw-tag="string"
  sw-style="string"></${prefix}-page-heading-banner-1>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-page-heading-banner-1.js";
`
  },
  [`${prefix}-page-heading-banner-2`]: {
    html: `
<${prefix}-page-heading-banner-2
  sw-page-title="string"
  sw-image='{}'
  sw-breadcrumbs='[]'
  sw-tag="string"
  sw-min-height="string"
  sw-max-height="string"
  sw-tint-from-color="string"
  sw-tint-to-color="string"
  sw-style="string"></${prefix}-page-heading-banner-2>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-page-heading-banner-2.js";
`
  },
  [`${prefix}-press-quote`]: {
    html: `
<${prefix}-press-quote
  sw-quote="string"
  sw-publication="string"
  sw-author="string"
  sw-body="string"
  sw-bg-color="string"
  sw-style="string"></${prefix}-press-quote>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-press-quote.js";
`
  },
  [`${prefix}-staircase-banner`]: {
    html: `
<${prefix}-staircase-banner
  sw-transition-timing="0"
  sw-base-color="string"
  sw-intersection-actions='[]'
  sw-intersection-action-params='{}'
  sw-style="string">
  <div></div>
</${prefix}-staircase-banner>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-staircase-banner.js";
`
  },
  [`${prefix}-stat-banner`]: {
    html: `
<${prefix}-stat-banner
  sw-stats='[]'
  sw-intersection-actions='[]'
  sw-intersection-action-params='{}'
  sw-style="string"></${prefix}-stat-banner>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-stat-banner.js";
`
  },
  [`${prefix}-stat-strip`]: {
    html: `
<${prefix}-stat-strip
  sw-items='[]'
  sw-heading-color="string"
  sw-style="string"></${prefix}-stat-strip>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-stat-strip.js";
`
  },
  [`${prefix}-top-bar`]: {
    html: `
<${prefix}-top-bar
  sw-phone="string"
  sw-email="string"
  sw-hours="string"
  sw-socials='{}'
  sw-icon-color="string"
  sw-style="string"></${prefix}-top-bar>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-top-bar.js";
`
  },
  [`${prefix}-top-bar-2`]: {
    html: `
<${prefix}-top-bar-2
  sw-email="string"
  sw-address="string"
  sw-hours="string"
  sw-socials='{}'
  sw-icon-color="string"
  sw-style="string"></${prefix}-top-bar-2>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-top-bar-2.js";
`
  },
  [`${prefix}-top-bar-3`]: {
    html: `
<${prefix}-top-bar-3
  sw-items='[]'
  sw-icon-size="string"
  sw-icon-color="string"
  sw-style="string"></${prefix}-top-bar-3>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-top-bar-3.js";
`
  },
  [`${prefix}-top-bar-slide`]: {
    html: `
<${prefix}-top-bar-slide
  sw-items='[]'
  sw-keep-active="false"
  sw-active-item-index="0"
  sw-color="string"
  sw-bg-color="string"
  sw-active-bg-color="string"
  sw-style="string">
  <div slot="itemSnippet" data-text-content="arg"></div>
</${prefix}-top-bar-slide>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-top-bar-slide.js";
`
  },
  [`${prefix}-top-disclaimer-banner`]: {
    html: `
<${prefix}-top-disclaimer-banner
  sw-client-height="0"
  sw-style="string">
  <div></div>
</${prefix}-top-disclaimer-banner>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-top-disclaimer-banner.js";
`
  }
};
