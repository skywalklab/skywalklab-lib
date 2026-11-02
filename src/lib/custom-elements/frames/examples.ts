import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-ascii-renderer`]: {
    html: `
<${prefix}-ascii-renderer
  sw-src="string"
  sw-density="0"
  sw-strength="0"
  sw-color="string"
  sw-background-color="string"
  sw-glitch="false"
  sw-glitch-speed="0"
  sw-fill-letterbox="false"
  sw-fit="string"
  sw-position="string"
  sw-style="string"></${prefix}-ascii-renderer>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-ascii-renderer.js";
`
  },
  [`${prefix}-book-3d`]: {
    html: `
<${prefix}-book-3d
  sw-width="string"
  sw-height="string"
  sw-spine="string"
  sw-rotation="string"
  sw-hoverable="false"
  sw-dominant-color="string"
  sw-style="string">
  <div></div>
</${prefix}-book-3d>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-book-3d.js";
`
  },
  [`${prefix}-device-frame`]: {
    html: `
<${prefix}-device-frame
  sw-type="string"
  sw-src="string"
  sw-fallback="string"
  sw-alt="string"
  sw-width="string"
  sw-height="string"
  sw-bezel-color="string"
  sw-keyboard-color="string"
  sw-bezel-radius="string"
  sw-bezel-width="string"
  sw-style="string"></${prefix}-device-frame>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-device-frame.js";
`
  },
  [`${prefix}-device-mockup`]: {
    html: `
<${prefix}-device-mockup
  sw-attrs='{}'
  sw-style="string"></${prefix}-device-mockup>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-device-mockup.js";
`
  },
  [`${prefix}-dithered-image`]: {
    html: `
<${prefix}-dithered-image
  sw-src="string"
  sw-dither-map="string"
  sw-pixel-size="0"
  sw-color="string"
  sw-background-color="string"
  sw-threshold="0"
  sw-fit="string"
  sw-position="string"
  sw-style="string"></${prefix}-dithered-image>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-dithered-image.js";
`
  },
  [`${prefix}-picture-mat`]: {
    html: `
<${prefix}-picture-mat
  sw-top="string"
  sw-left="string"
  sw-right="string"
  sw-bottom="string"
  sw-inner-mat="false"
  sw-mat-color="string"
  sw-intersection-actions='[]'
  sw-intersection-action-params='{}'
  sw-style="string">
  <div></div>
</${prefix}-picture-mat>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-picture-mat.js";
`
  },
  [`${prefix}-pixelated-image`]: {
    html: `
<${prefix}-pixelated-image
  sw-src="string"
  sw-initial-grid-size="0"
  sw-step-duration="0"
  sw-pause-step="0"
  sw-style="string"></${prefix}-pixelated-image>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-pixelated-image.js";

document.querySelector("${prefix}-pixelated-image").swOncomplete = () => void;
`
  },
  [`${prefix}-trace-box`]: {
    html: `
<${prefix}-trace-box
  sw-trace-length="string"
  sw-trace-color="string"
  sw-trace-plus='{}'
  sw-trace-plus-color="string"
  sw-intersection-actions='[]'
  sw-intersection-action-params='{}'
  sw-style="string">
  <div></div>
</${prefix}-trace-box>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-trace-box.js";
`
  }
};
