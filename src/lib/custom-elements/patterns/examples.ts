import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-pattern-grid`]: {
    html: `
<${prefix}-pattern-grid
  sw-bg-color="string"
  sw-fade-start="string"
  sw-fade-mid="string"
  sw-fade-end="string"
  sw-pattern-fill-color="string"
  sw-pattern-fill-opacity="0"
  sw-style="string"></${prefix}-pattern-grid>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-pattern-grid.js";
`
  },
  [`${prefix}-pattern-hexagon`]: {
    html: `
<${prefix}-pattern-hexagon
  sw-bg-color="string"
  sw-outline-color="string"
  sw-dot-color="string"
  sw-back-outline-color="string"
  sw-opacity="0"
  sw-style="string"></${prefix}-pattern-hexagon>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-pattern-hexagon.js";
`
  },
  [`${prefix}-pattern-soundwave`]: {
    html: `
<${prefix}-pattern-soundwave
  sw-bg-color="string"
  sw-bar-opacity="0"
  sw-bar-width="0"
  sw-bar-cap="string"
  sw-bar-color-1="string"
  sw-bar-color-2="string"
  sw-bar-color-3="string"
  sw-style="string"></${prefix}-pattern-soundwave>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-pattern-soundwave.js";
`
  },
  [`${prefix}-pattern-world-map`]: {
    html: `
<${prefix}-pattern-world-map
  sw-bg-color="string"
  sw-active-color="string"
  sw-inactive-color="string"
  sw-style="string"></${prefix}-pattern-world-map>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-pattern-world-map.js";
`
  }
};
