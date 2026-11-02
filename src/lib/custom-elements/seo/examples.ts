import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-json-ld`]: {
    html: `
<${prefix}-json-ld
  sw-schema='{}'
  sw-show-schema="false"></${prefix}-json-ld>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-json-ld.js";
`
  }
};
