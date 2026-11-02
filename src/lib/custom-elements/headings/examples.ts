import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-accent-heading`]: {
    html: `
<${prefix}-accent-heading
  sw-text="string"
  sw-tag="string"
  sw-accent-length="string"
  sw-fade-out-color="string"
  sw-accent-color="string"
  sw-style="string">
  <div></div>
</${prefix}-accent-heading>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-accent-heading.js";
`
  },
  [`${prefix}-flair-heading`]: {
    html: `
<${prefix}-flair-heading
  sw-text="string"
  sw-tag="string"
  sw-background-image="string"
  sw-icon-width="string"
  sw-icon-color="string"
  sw-style="string">
  <div></div>
</${prefix}-flair-heading>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-flair-heading.js";
`
  },
  [`${prefix}-half-underline-heading`]: {
    html: `
<${prefix}-half-underline-heading
  sw-text="string"
  sw-tag="string"
  sw-include-full="false"
  sw-underline-length="string"
  sw-underline-color="string"
  sw-track-color="string"
  sw-style="string">
  <div></div>
</${prefix}-half-underline-heading>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-half-underline-heading.js";
`
  },
  [`${prefix}-icon-heading`]: {
    html: `
<${prefix}-icon-heading
  sw-text="string"
  sw-tag="string"
  sw-icon="string"
  sw-icon-props='{}'
  sw-style="string">
  <div></div>
</${prefix}-icon-heading>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-icon-heading.js";
`
  },
  [`${prefix}-icon-inline-heading`]: {
    html: `
<${prefix}-icon-inline-heading
  sw-vertical-align="string"
  sw-text="string"
  sw-tag="string"
  sw-icon="string"
  sw-icon-props='{}'
  sw-style="string">
  <div></div>
</${prefix}-icon-inline-heading>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-icon-inline-heading.js";
`
  }
};
