import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-about-split-panel`]: {
    html: `
<${prefix}-about-split-panel
  sw-title="string"
  sw-description="string"
  sw-items='[]'
  sw-image='{}'
  sw-heading-color="string"
  sw-dot-color="string"
  sw-style="string">
  <div slot="buttonSnippet"></div>
</${prefix}-about-split-panel>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-about-split-panel.js";
`
  },
  [`${prefix}-double-panel`]: {
    html: `
<${prefix}-double-panel
  sw-slide-distance="string"
  sw-intersection-actions='[]'
  sw-intersection-action-params='{}'
  sw-style="string">
  <div slot="leftPanelSnippet"></div>
  <div slot="rightPanelSnippet"></div>
</${prefix}-double-panel>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-double-panel.js";
`
  },
  [`${prefix}-google-map`]: {
    html: `
<${prefix}-google-map
  sw-lat="0"
  sw-lng="0"
  sw-zoom="0"
  sw-marker='{}'
  sw-map-id="string"
  sw-google-map-api-key="string"
  sw-style="string"></${prefix}-google-map>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-google-map.js";
`
  },
  [`${prefix}-split-image-panel`]: {
    html: `
<${prefix}-split-image-panel
  sw-image='{}'
  sw-title="string"
  sw-reverse="false"
  sw-content-bg-color="string"
  sw-style="string">
  <div slot="mediaSnippet"></div>
  <div></div>
</${prefix}-split-image-panel>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-split-image-panel.js";
`
  },
  [`${prefix}-static-grid`]: {
    html: `
<${prefix}-static-grid
  sw-cards='[]'
  sw-button-text="string"
  sw-button-class="string"
  sw-style="string"></${prefix}-static-grid>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-static-grid.js";
`
  },
  [`${prefix}-story-split-panel`]: {
    html: `
<${prefix}-story-split-panel
  sw-title="string"
  sw-description="string"
  sw-items='[]'
  sw-image='{}'
  sw-heading-color="string"
  sw-dot-color="string"
  sw-style="string">
  <div slot="buttonSnippet"></div>
</${prefix}-story-split-panel>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-story-split-panel.js";
`
  },
  [`${prefix}-tabbed-split-panel`]: {
    html: `
<${prefix}-tabbed-split-panel
  sw-title="string"
  sw-description="string"
  sw-items='[]'
  sw-max-items="0"
  sw-show-more-text="string"
  sw-show-less-text="string"
  sw-button-class="string"
  sw-heading-color="string"
  sw-tabs-bg-color="string"
  sw-style="string">
  <div slot="buttonSnippet"></div>
</${prefix}-tabbed-split-panel>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-tabbed-split-panel.js";
`
  }
};
