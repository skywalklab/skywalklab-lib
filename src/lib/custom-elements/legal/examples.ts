import type { Example } from "../../server/plugins/custom-elements/example.js";
import { SKYWALK_PREFIX as prefix } from "../../brand/data.js";

// Generated: placeholder markup and setup for each custom element, keyed by tag.
export const custom_element_examples: Record<string, Example> = {
  [`${prefix}-cookie-banner`]: {
    html: `
<${prefix}-cookie-banner
  sw-locale="string"
  sw-requires-opt-in="false"
  sw-cookie-name="string"
  sw-cookie-config='{}'
  sw-show-cookie-banner="false"
  sw-show-edit-icon="false"
  sw-show-settings="false"
  sw-ignore-cookies-on-load="false"
  sw-can-reject-cookies="false"
  sw-button-class="string"
  sw-accept-all-label="string"
  sw-accept-selected-label="string"
  sw-reject-label="string"
  sw-settings-label="string"
  sw-close-label="string"
  sw-edit-label="string"
  sw-heading="string"
  sw-description="string"
  sw-choices='{}'
  sw-style="string"></${prefix}-cookie-banner>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-cookie-banner.js";

document.querySelector("${prefix}-cookie-banner").swOnnecessary = (agreed: boolean) => void;
document.querySelector("${prefix}-cookie-banner").swOntracking = (agreed: boolean) => void;
document.querySelector("${prefix}-cookie-banner").swOnanalytics = (agreed: boolean) => void;
document.querySelector("${prefix}-cookie-banner").swOnmarketing = (agreed: boolean) => void;
`
  },
  [`${prefix}-privacy-policy-en`]: {
    html: `
<${prefix}-privacy-policy-en
  sw-company-name="string"
  sw-website-domain="string"
  sw-contact-link="string"
  sw-updated="string"
  sw-google-analytics="false"
  sw-google-ads="false"
  sw-meta-pixel="false"
  sw-klaviyo="false"
  sw-style="string"></${prefix}-privacy-policy-en>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-privacy-policy-en.js";
`
  },
  [`${prefix}-privacy-policy-fr`]: {
    html: `
<${prefix}-privacy-policy-fr
  sw-company-name="string"
  sw-website-domain="string"
  sw-contact-link="string"
  sw-google-analytics="false"
  sw-google-ads="false"
  sw-meta-pixel="false"
  sw-klaviyo="false"
  sw-updated="string"
  sw-style="string"></${prefix}-privacy-policy-fr>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-privacy-policy-fr.js";
`
  },
  [`${prefix}-privacy-policy-it`]: {
    html: `
<${prefix}-privacy-policy-it
  sw-company-name="string"
  sw-website-domain="string"
  sw-contact-link="string"
  sw-google-analytics="false"
  sw-google-ads="false"
  sw-meta-pixel="false"
  sw-klaviyo="false"
  sw-updated="string"
  sw-style="string"></${prefix}-privacy-policy-it>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-privacy-policy-it.js";
`
  },
  [`${prefix}-terms-en`]: {
    html: `
<${prefix}-terms-en
  sw-company-name="string"
  sw-links='{}'
  sw-updated="string"
  sw-style="string"></${prefix}-terms-en>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-terms-en.js";
`
  },
  [`${prefix}-terms-fr`]: {
    html: `
<${prefix}-terms-fr
  sw-company-name="string"
  sw-links='{}'
  sw-updated="string"
  sw-style="string"></${prefix}-terms-fr>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-terms-fr.js";
`
  },
  [`${prefix}-terms-it`]: {
    html: `
<${prefix}-terms-it
  sw-company-name="string"
  sw-links='{}'
  sw-updated="string"
  sw-style="string"></${prefix}-terms-it>
`,
    js: `
import "@${prefix}lab/lib/custom-elements/${prefix}-terms-it.js";
`
  }
};
