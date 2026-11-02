import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-back-to-top-1`]: {
    html: `
<${prefix}-back-to-top-1
  sw-scroll-threshold="0"
  sw-size="string"
  sw-bg-color="string"
  sw-hover-bg-color="string"
  sw-icon-color="string"
  sw-scroll-container="string"
  sw-style="string"></${prefix}-back-to-top-1>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-back-to-top-1.js";
`
  },
  [`${prefix}-back-to-top-2`]: {
    html: `
<${prefix}-back-to-top-2
  sw-scroll-threshold="0"
  sw-size="string"
  sw-ring-width="string"
  sw-scroll-container="string"
  sw-track-color="string"
  sw-indicator-color="string"
  sw-icon-color="string"
  sw-button-bg-color="string"
  sw-style="string"></${prefix}-back-to-top-2>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-back-to-top-2.js";
`
  },
  [`${prefix}-contact-form-1`]: {
    html: `
<${prefix}-contact-form-1
  sw-action="string"
  sw-labels='{}'
  sw-binding='{}'
  sw-button-class="string"
  sw-error-color="string"
  sw-message-color="string"
  sw-style="string">
  <div slot="turnstileSnippet"></div>
</${prefix}-contact-form-1>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-contact-form-1.js";
`
  },
  [`${prefix}-contact-form-2`]: {
    html: `
<${prefix}-contact-form-2
  sw-action="string"
  sw-labels='{}'
  sw-binding='{}'
  sw-title="string"
  sw-centered="false"
  sw-max-width="string"
  sw-button-class="string"
  sw-accent-color="string"
  sw-field-bg-color="string"
  sw-field-border-color="string"
  sw-field-color="string"
  sw-label-color="string"
  sw-title-color="string"
  sw-style="string">
  <div slot="turnstileSnippet"></div>
</${prefix}-contact-form-2>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-contact-form-2.js";
`
  }
};
