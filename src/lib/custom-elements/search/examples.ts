import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-search-bar`]: {
    html: `
<${prefix}-search-bar
  sw-id="string"
  sw-value="string"
  sw-debounce="0"
  sw-placeholder="string"
  sw-autofocus="false"
  sw-bg-color="string"
  sw-clear-hover-color="string"
  sw-style="string"></${prefix}-search-bar>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-search-bar.js";

document.querySelector("${prefix}-search-bar").swOninput = () => void;
document.querySelector("${prefix}-search-bar").swOnchange = () => void;
document.querySelector("${prefix}-search-bar").swOnfocus = () => void;
document.querySelector("${prefix}-search-bar").swOnblur = () => void;
document.querySelector("${prefix}-search-bar").swOnkeydown = () => void;
`
  },
  [`${prefix}-search-list`]: {
    html: `
<${prefix}-search-list
  sw-items='[]'
  sw-style="string">
  <div slot="itemTextSnippet" data-text-content="arg"></div>
</${prefix}-search-list>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-search-list.js";

document.querySelector("${prefix}-search-list").swOnItemClick = (text: string) => void;
`
  },
  [`${prefix}-search-list-item-text`]: {
    html: `
<${prefix}-search-list-item-text
  sw-value="string"
  sw-label="string"
  sw-group-label="string"
  sw-style="string"></${prefix}-search-list-item-text>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-search-list-item-text.js";
`
  },
  [`${prefix}-search-modal`]: {
    html: `
<${prefix}-search-modal
  sw-items='{}'
  sw-suggestions='{}'
  sw-search-button-title="string"
  sw-search-color="string"
  sw-search-outline-color="string"
  sw-placeholder="string"
  sw-button-class="string"
  sw-modal-props='{}'
  sw-style="string">
  <div slot="searchResultsChildren" data-text-content="arg"></div>
  <div slot="headerSnippet"></div>
  <div slot="footerSnippet"></div>
</${prefix}-search-modal>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-search-modal.js";

document.querySelector("${prefix}-search-modal").swOninput = () => void;
document.querySelector("${prefix}-search-modal").swOnchange = () => void;
document.querySelector("${prefix}-search-modal").swOnfocus = () => void;
document.querySelector("${prefix}-search-modal").swOnblur = () => void;
document.querySelector("${prefix}-search-modal").swOnkeydown = () => void;
document.querySelector("${prefix}-search-modal").swOnResultItemClick = (text: string) => { keepOpen?: boolean; resetValue?: boolean } | void;
`
  },
  [`${prefix}-search-results`]: {
    html: `
<${prefix}-search-results
  sw-items='[]'
  sw-value="string"
  sw-suggestions='[]'
  sw-style="string">
  <div slot="itemTextSnippet" data-text-content="arg"></div>
  <div></div>
</${prefix}-search-results>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-search-results.js";

document.querySelector("${prefix}-search-results").swOnItemClick = (text: string) => void;
`
  }
};
