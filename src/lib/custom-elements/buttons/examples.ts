import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-default-button`]: {
    html: `
<${prefix}-default-button
  sw-text="string"
  sw-color="string"
  sw-bg-color="string"
  sw-disabled-color="string"
  sw-style="string"></${prefix}-default-button>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-default-button.js";

document.querySelector("${prefix}-default-button").swOnclick = (args: any) => void;
`
  },
  [`${prefix}-default-outline-button`]: {
    html: `
<${prefix}-default-outline-button
  sw-text="string"
  sw-color="string"
  sw-bg-color="string"
  sw-disabled-color="string"
  sw-style="string"></${prefix}-default-outline-button>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-default-outline-button.js";

document.querySelector("${prefix}-default-outline-button").swOnclick = (args: any) => void;
`
  },
  [`${prefix}-dot-indicator-button`]: {
    html: `
<${prefix}-dot-indicator-button
  sw-text="string"
  sw-color="string"
  sw-style="string"></${prefix}-dot-indicator-button>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-dot-indicator-button.js";

document.querySelector("${prefix}-dot-indicator-button").swOnclick = (args: any) => void;
`
  },
  [`${prefix}-inset-button`]: {
    html: `
<${prefix}-inset-button
  sw-text="string"
  sw-bg-color="string"
  sw-border-color="string"
  sw-hover-color="string"
  sw-hover-bg-color="string"
  sw-style="string"></${prefix}-inset-button>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-inset-button.js";

document.querySelector("${prefix}-inset-button").swOnclick = (args: any) => void;
`
  },
  [`${prefix}-jump-button`]: {
    html: `
<${prefix}-jump-button
  sw-text="string"
  sw-style="string"></${prefix}-jump-button>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-jump-button.js";

document.querySelector("${prefix}-jump-button").swOnclick = (args: any) => void;
`
  },
  [`${prefix}-line-button`]: {
    html: `
<${prefix}-line-button
  sw-text="string"
  sw-line-width-min="string"
  sw-line-width-max="string"
  sw-style="string"></${prefix}-line-button>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-line-button.js";

document.querySelector("${prefix}-line-button").swOnclick = (args: any) => void;
`
  },
  [`${prefix}-pop-up-button`]: {
    html: `
<${prefix}-pop-up-button
  sw-text="string"
  sw-color="string"
  sw-bg-color="string"
  sw-box-shadow="string"
  sw-active-box-shadow="string"
  sw-style="string"></${prefix}-pop-up-button>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-pop-up-button.js";

document.querySelector("${prefix}-pop-up-button").swOnclick = (args: any) => void;
`
  },
  [`${prefix}-rolladex`]: {
    html: `
<${prefix}-rolladex
  sw-attrs='{}'
  sw-button-class="string"
  sw-pathname="string"
  sw-style="string">
  <div></div>
</${prefix}-rolladex>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-rolladex.js";

document.querySelector("${prefix}-rolladex").swOnclick = (arg1: MouseEvent) => void;
`
  },
  [`${prefix}-slide-button`]: {
    html: `
<${prefix}-slide-button
  sw-text="string"
  sw-color="string"
  sw-inverse-color="string"
  sw-style="string"></${prefix}-slide-button>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-slide-button.js";

document.querySelector("${prefix}-slide-button").swOnclick = (args: any) => void;
`
  },
  [`${prefix}-slide-indicator-button`]: {
    html: `
<${prefix}-slide-indicator-button
  sw-text="string"
  sw-color="string"
  sw-style="string"></${prefix}-slide-indicator-button>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-slide-indicator-button.js";

document.querySelector("${prefix}-slide-indicator-button").swOnclick = (args: any) => void;
`
  },
  [`${prefix}-text-button`]: {
    html: `
<${prefix}-text-button
  sw-text="string"
  sw-color="string"
  sw-hover-color="string"
  sw-style="string"></${prefix}-text-button>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-text-button.js";

document.querySelector("${prefix}-text-button").swOnclick = (args: any) => void;
`
  },
  [`${prefix}-underline-button`]: {
    html: `
<${prefix}-underline-button
  sw-text="string"
  sw-line-height="string"
  sw-color="string"
  sw-bg-color="string"
  sw-hover-color="string"
  sw-hover-bg-color="string"
  sw-style="string"></${prefix}-underline-button>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-underline-button.js";

document.querySelector("${prefix}-underline-button").swOnclick = (args: any) => void;
`
  }
};
