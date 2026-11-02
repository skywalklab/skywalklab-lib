import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-accordion`]: {
    html: `
<${prefix}-accordion
  sw-summary="string"
  sw-open="false"
  sw-style="string">
  <div></div>
</${prefix}-accordion>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-accordion.js";
`
  },
  [`${prefix}-accordion-2`]: {
    html: `
<${prefix}-accordion-2
  sw-summary="string"
  sw-index="0"
  sw-selected-index="0"
  sw-open="false"
  sw-active-color="string"
  sw-active-bg-color="string"
  sw-style="string">
  <div></div>
</${prefix}-accordion-2>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-accordion-2.js";

document.querySelector("${prefix}-accordion-2").cb = (index: number) => void;
`
  },
  [`${prefix}-clickable-tabs`]: {
    html: `
<${prefix}-clickable-tabs
  sw-items='[]'
  sw-use-select="false"
  sw-aria-label="string"
  sw-selected="0"
  sw-style="string">
  <div slot="buttonSnippet" data-text-content="arg"></div>
  <div slot="panelSnippet" data-text-content="arg"></div>
</${prefix}-clickable-tabs>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-clickable-tabs.js";

document.querySelector("${prefix}-clickable-tabs").swOnclick = (index: number) => void;
`
  },
  [`${prefix}-menu-overlay`]: {
    html: `
<${prefix}-menu-overlay
  sw-bg-color="string"
  sw-open-contact-menu="false"
  sw-style="string">
  <div></div>
</${prefix}-menu-overlay>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-menu-overlay.js";
`
  },
  [`${prefix}-tab-drawer`]: {
    html: `
<${prefix}-tab-drawer
  sw-tab-text="string"
  sw-open="false"
  sw-style="string">
  <div></div>
  <div slot="drawerContentSnippet"></div>
</${prefix}-tab-drawer>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-tab-drawer.js";
`
  }
};
