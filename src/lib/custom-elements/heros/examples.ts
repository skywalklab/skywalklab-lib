import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-card-slideshow-hero`]: {
    html: `
<${prefix}-card-slideshow-hero
  sw-slides='[]'
  sw-style="string">
  <div slot="buttonSnippet"></div>
</${prefix}-card-slideshow-hero>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-card-slideshow-hero.js";
`
  },
  [`${prefix}-staggered-slideshow-hero`]: {
    html: `
<${prefix}-staggered-slideshow-hero
  sw-slides='[]'
  sw-duration="0"
  sw-crossfade-duration="0"
  sw-content-max-width="string"
  sw-button-class="string"
  sw-tint-color="string"
  sw-decoration-color="string"
  sw-style="string">
  <div slot="buttonSnippet"></div>
</${prefix}-staggered-slideshow-hero>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-staggered-slideshow-hero.js";
`
  }
};
