import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-ai-chatbot`]: {
    html: `
<${prefix}-ai-chatbot
  sw-chat='{}'
  sw-open-chat="false"
  sw-logo="string"
  sw-company="string"
  sw-chat-suggestions='[]'
  sw-assistant-greeting-msg="string"
  sw-speaker-labels='{}'
  sw-error-message="string"
  sw-placeholder="string"
  sw-toggle-height="string"
  sw-toggle-bottom="string"
  sw-toggle-right="string"
  sw-float="false"
  sw-button-class="string"
  sw-suggestion-button-class="string"
  sw-style="string">
  <div></div>
  <div slot="headerSnippet"></div>
</${prefix}-ai-chatbot>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-ai-chatbot.js";

document.querySelector("${prefix}-ai-chatbot").sendMessage = (message: { text: string }) => void;
`
  }
};
