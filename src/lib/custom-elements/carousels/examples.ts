import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-carousel-1`]: {
    html: `
<${prefix}-carousel-1
  sw-items='[]'
  sw-active-index="0"
  sw-style="string">
  <div slot="itemSnippet" data-text-content="arg"></div>
</${prefix}-carousel-1>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-carousel-1.js";
`
  },
  [`${prefix}-flex-cards-pagination`]: {
    html: `
<${prefix}-flex-cards-pagination
  sw-cards='[]'
  sw-style="string"></${prefix}-flex-cards-pagination>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-flex-cards-pagination.js";
`
  },
  [`${prefix}-review-carousel`]: {
    html: `
<${prefix}-review-carousel
  sw-reviews='[]'
  sw-icon="string"
  sw-icon-props='{}'
  sw-background-image="string"
  sw-style="string"></${prefix}-review-carousel>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-review-carousel.js";
`
  },
  [`${prefix}-testimonial-carousel`]: {
    html: `
<${prefix}-testimonial-carousel
  sw-title="string"
  sw-items='[]'
  sw-button-class="string"
  sw-heading-color="string"
  sw-card-bg-color="string"
  sw-style="string"></${prefix}-testimonial-carousel>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-testimonial-carousel.js";
`
  }
};
