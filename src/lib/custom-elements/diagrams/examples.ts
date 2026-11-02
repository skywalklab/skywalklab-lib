import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-animated-mermaid-diagram`]: {
    html: `
<${prefix}-animated-mermaid-diagram
  sw-raw-svg="string"
  sw-caption="string"
  sw-nudge-nodes='[]'
  sw-nudge-by="0"
  sw-cluster-label='{}'
  sw-cluster-radius="string"
  sw-intersection-actions='[]'
  sw-intersection-action-params='{}'
  sw-style="string"></${prefix}-animated-mermaid-diagram>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-animated-mermaid-diagram.js";
`
  }
};
