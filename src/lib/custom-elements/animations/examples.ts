import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-brand-logo-spinner`]: {
    html: `
<${prefix}-brand-logo-spinner
  sw-icon="string"
  sw-icon-props='{}'
  sw-color-outer="string"
  sw-color-center="string"
  sw-color-inner="string"
  sw-size="0"
  sw-style="string"></${prefix}-brand-logo-spinner>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-brand-logo-spinner.js";
`
  },
  [`${prefix}-circle-carousel`]: {
    html: `
<${prefix}-circle-carousel
  sw-items='[]'
  sw-context='{}'
  sw-background-image-url="string"
  sw-intersection-actions='[]'
  sw-intersection-action-params='{}'
  sw-style="string">
  <div slot="itemSnippet" data-text-content="arg"></div>
</${prefix}-circle-carousel>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-circle-carousel.js";
`
  },
  [`${prefix}-linear-carousel`]: {
    html: `
<${prefix}-linear-carousel
  sw-gradient-color="string"
  sw-gsap-animation='{}'
  sw-gsap-context='{}'
  sw-gsap-distance="0"
  sw-button-class="string"
  sw-intersection-actions='[]'
  sw-intersection-action-params='{}'
  sw-style="string">
  <div></div>
</${prefix}-linear-carousel>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-linear-carousel.js";
`
  },
  [`${prefix}-loading-message-spinner`]: {
    html: `
<${prefix}-loading-message-spinner
  sw-size="0"
  sw-color="string"
  sw-duration="0"
  sw-message="string"
  sw-style="string"></${prefix}-loading-message-spinner>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-loading-message-spinner.js";
`
  },
  [`${prefix}-slideshow-carousel`]: {
    html: `
<${prefix}-slideshow-carousel
  sw-items='[]'
  sw-duration="0"
  sw-gradient-color="string"
  sw-button-class="string"
  sw-style="string">
  <div slot="textSnippet"></div>
  <div slot="slideSnippet" data-text-content="arg"></div>
</${prefix}-slideshow-carousel>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-slideshow-carousel.js";
`
  },
  [`${prefix}-slideshow-icon`]: {
    html: `
<${prefix}-slideshow-icon
  sw-items='[]'
  sw-duration="0"
  sw-height="string"
  sw-style="string"></${prefix}-slideshow-icon>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-slideshow-icon.js";
`
  },
  [`${prefix}-svelte-spinner`]: {
    html: `
<${prefix}-svelte-spinner
  sw-type="string"
  sw-spinner-props='{}'
  sw-style="string"></${prefix}-svelte-spinner>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-svelte-spinner.js";
`
  }
};
