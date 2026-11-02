import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-${prefix}lab-animated-logo`]: {
    html: `
<${prefix}-${prefix}lab-animated-logo
  sw-item-index="0"
  sw-items-length="0"
  sw-logo-props='{}'
  sw-style="string"></${prefix}-${prefix}lab-animated-logo>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-${prefix}lab-animated-logo.js";
`
  },
  [`${prefix}-${prefix}lab-logo`]: {
    html: `
<${prefix}-${prefix}lab-logo
  sw-fill="string"
  sw-end-fill="string"
  sw-offset='{}'
  sw-stroke="string"
  sw-opacity="0"
  sw-position="string"
  sw-width="string"
  sw-height="string"
  sw-single-curve="false"
  sw-style="string"></${prefix}-${prefix}lab-logo>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-${prefix}lab-logo.js";
`
  }
};
