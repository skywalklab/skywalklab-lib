import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-lightbox-overlay`]: {
    html: `
<${prefix}-lightbox-overlay
  sw-title="string"
  sw-unlock-scroll="false"
  sw-lightbox-index="0"
  sw-item-length="0"
  sw-style="string">
  <div slot="imageSnippet"></div>
</${prefix}-lightbox-overlay>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-lightbox-overlay.js";
`
  },
  [`${prefix}-masonry-gallery`]: {
    html: `
<${prefix}-masonry-gallery
  sw-images='[]'
  sw-gallery-index="0"
  sw-disable-lightbox="false"
  sw-unlock-scroll="false"
  sw-style="string"></${prefix}-masonry-gallery>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-masonry-gallery.js";
`
  }
};
