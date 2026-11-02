import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-modal`]: {
    html: `
<${prefix}-modal
  sw-title="string"
  sw-show-modal="false"
  sw-close-on-backdrop-click="false"
  sw-header-color="string"
  sw-header-bg-color="string"
  sw-style="string">
  <div slot="headerSnippet"></div>
  <div slot="bodySnippet"></div>
  <div slot="footerSnippet"></div>
</${prefix}-modal>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-modal.js";
`
  }
};
