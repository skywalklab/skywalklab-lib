import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-file-list`]: {
    html: `
<${prefix}-file-list
  sw-items='[]'
  sw-active-item-key="0"
  sw-nav-buttons='{}'
  sw-style="string">
  <div slot="itemSnippet" data-text-content="arg"></div>
  <div></div>
</${prefix}-file-list>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-file-list.js";

document.querySelector("${prefix}-file-list").swOnItemClick = ({ item, index }: { item: any; index: number }) => void;
`
  },
  [`${prefix}-how-we-work-1`]: {
    html: `
<${prefix}-how-we-work-1
  sw-steps='[]'
  sw-style="string"></${prefix}-how-we-work-1>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-how-we-work-1.js";
`
  },
  [`${prefix}-image-by-list`]: {
    html: `
<${prefix}-image-by-list
  sw-image='{}'
  sw-items='[]'
  sw-style="string"></${prefix}-image-by-list>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-image-by-list.js";
`
  },
  [`${prefix}-image-card-grid`]: {
    html: `
<${prefix}-image-card-grid
  sw-title="string"
  sw-description="string"
  sw-items='[]'
  sw-link-text="string"
  sw-heading-color="string"
  sw-badge-bg-color="string"
  sw-badge-color="string"
  sw-card-bg-color="string"
  sw-style="string"></${prefix}-image-card-grid>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-image-card-grid.js";
`
  },
  [`${prefix}-load-more-list`]: {
    html: `
<${prefix}-load-more-list
  sw-items='[]'
  sw-limit="0"
  sw-promise='{}'
  sw-style="string">
  <div slot="itemSnippet" data-text-content="arg"></div>
  <div slot="loadingItemSnippet"></div>
  <div slot="loadBtnSnippet"></div>
</${prefix}-load-more-list>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-load-more-list.js";

document.querySelector("${prefix}-load-more-list").loadItems = (context?: { limit?: number; offset?: number }) => Promise<any[]> | any[];
`
  },
  [`${prefix}-logo-list`]: {
    html: `
<${prefix}-logo-list
  sw-marker-bg-color="string"
  sw-nested-marker-bg-color="string"
  sw-outline-marker-color="string"
  sw-marker-image="string"
  sw-marker-size="string"
  sw-marker-min-height="string"
  sw-gap="string"
  sw-arrow-scale="string"
  sw-items='[]'
  sw-style="string"></${prefix}-logo-list>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-logo-list.js";
`
  },
  [`${prefix}-overlap-icon-cards`]: {
    html: `
<${prefix}-overlap-icon-cards
  sw-items='[]'
  sw-card-bg-color="string"
  sw-badge-bg-color="string"
  sw-badge-color="string"
  sw-style="string"></${prefix}-overlap-icon-cards>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-overlap-icon-cards.js";
`
  },
  [`${prefix}-post-its`]: {
    html: `
<${prefix}-post-its
  sw-items='[]'
  sw-color="string"
  sw-bg-from-color="string"
  sw-bg-to-color="string"
  sw-corner-color="string"
  sw-intersection-actions='[]'
  sw-intersection-action-params='{}'
  sw-style="string"></${prefix}-post-its>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-post-its.js";
`
  },
  [`${prefix}-preview-list`]: {
    html: `
<${prefix}-preview-list
  sw-items='[]'
  sw-color="string"
  sw-bg-color="string"
  sw-inset-bg-color="string"
  sw-preview-width="string"
  sw-preview-height="string"
  sw-open-item-index="0"
  sw-always-show-preview="false"
  sw-style="string">
  <div slot="rowSnippet" data-text-content="arg"></div>
  <div slot="showcaseSnippet" data-text-content="arg"></div>
  <div slot="previewSnippet" data-text-content="arg"></div>
  <div slot="detailsSnippet" data-text-content="arg"></div>
</${prefix}-preview-list>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-preview-list.js";
`
  },
  [`${prefix}-process-flow`]: {
    html: `
<${prefix}-process-flow
  sw-title="string"
  sw-items='[]'
  sw-heading-color="string"
  sw-disc-bg-color="string"
  sw-arrow-color="string"
  sw-style="string"></${prefix}-process-flow>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-process-flow.js";
`
  },
  [`${prefix}-square-check-list`]: {
    html: `
<${prefix}-square-check-list
  sw-items='[]'
  sw-icon-color="string"
  sw-style="string"></${prefix}-square-check-list>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-square-check-list.js";
`
  },
  [`${prefix}-step-list`]: {
    html: `
<${prefix}-step-list
  sw-items='[]'
  sw-break-even="false"
  sw-color="string"
  sw-bg-color="string"
  sw-step-num-color="string"
  sw-border-color="string"
  sw-style="string">
  <div slot="stepSnippet" data-text-content="arg"></div>
</${prefix}-step-list>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-step-list.js";
`
  }
};
