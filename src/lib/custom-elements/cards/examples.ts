import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-bubble-icon`]: {
    html: `
<${prefix}-bubble-icon
  sw-icon="string"
  sw-icon-props='{}'
  sw-title="string"
  sw-tag="string"
  sw-highlight="false"
  sw-bg-color="string"
  sw-highlight-color="string"
  sw-style="string"></${prefix}-bubble-icon>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-bubble-icon.js";

document.querySelector("${prefix}-bubble-icon").swOnclick = () => void;
`
  },
  [`${prefix}-bubble-icon-3`]: {
    html: `
<${prefix}-bubble-icon-3
  sw-items='[]'
  sw-highlight-index="0"
  sw-style="string"></${prefix}-bubble-icon-3>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-bubble-icon-3.js";
`
  },
  [`${prefix}-card-3block-1`]: {
    html: `
<${prefix}-card-3block-1
  sw-cards='[]'
  sw-style="string"></${prefix}-card-3block-1>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-card-3block-1.js";
`
  },
  [`${prefix}-circle-node`]: {
    html: `
<${prefix}-circle-node
  sw-icon="string"
  sw-icon-props='{}'
  sw-animate="false"
  sw-style="string"></${prefix}-circle-node>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-circle-node.js";
`
  },
  [`${prefix}-circle-node-3`]: {
    html: `
<${prefix}-circle-node-3
  sw-cards='[]'
  sw-style="string"></${prefix}-circle-node-3>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-circle-node-3.js";
`
  },
  [`${prefix}-founder-card`]: {
    html: `
<${prefix}-founder-card
  sw-name="string"
  sw-role="string"
  sw-bio="string"
  sw-image='{}'
  sw-contact='{}'
  sw-heading-color="string"
  sw-style="string"></${prefix}-founder-card>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-founder-card.js";
`
  },
  [`${prefix}-help-card`]: {
    html: `
<${prefix}-help-card
  sw-style="string">
  <div></div>
</${prefix}-help-card>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-help-card.js";
`
  },
  [`${prefix}-info-card-1`]: {
    html: `
<${prefix}-info-card-1
  sw-style="string">
  <div></div>
</${prefix}-info-card-1>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-info-card-1.js";
`
  },
  [`${prefix}-pricing-card`]: {
    html: `
<${prefix}-pricing-card
  sw-name="string"
  sw-included='[]'
  sw-not-included='[]'
  sw-indicator-text="string"
  sw-before-size="0"
  sw-before-color="string"
  sw-after-color="string"
  sw-style="string">
  <div slot="includedSnippet" data-text-content="arg"></div>
  <div slot="notIncludedSnippet" data-text-content="arg"></div>
  <div slot="buttonSnippet"></div>
</${prefix}-pricing-card>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-pricing-card.js";
`
  },
  [`${prefix}-top-image-card`]: {
    html: `
<${prefix}-top-image-card
  sw-title="string"
  sw-text="string"
  sw-hover="false"
  sw-style="string">
  <div></div>
</${prefix}-top-image-card>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-top-image-card.js";
`
  }
};
