<svelte:options
  customElement={{
    tag: "skywalk-privacy-policy-it",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      companyName: { type: "String", attribute: "sw-company-name" },
      websiteDomain: { type: "String", attribute: "sw-website-domain" },
      contactLink: { type: "String", attribute: "sw-contact-link" },
      googleAnalytics: { type: "Boolean", attribute: "sw-google-analytics" },
      googleAds: { type: "Boolean", attribute: "sw-google-ads" },
      metaPixel: { type: "Boolean", attribute: "sw-meta-pixel" },
      klaviyo: { type: "Boolean", attribute: "sw-klaviyo" },
      updated: { type: "String", attribute: "sw-updated" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "legal/PrivacyPolicyIt", false);
        }

        connectedCallback() {
          this.#adopt();
          return (Base.prototype as any).connectedCallback.call(this);
        }

        attributeChangedCallback(...args: any[]) {
          const result = (Base.prototype as any).attributeChangedCallback.apply(this, args);
          if (this.shadowRoot) this.#adopt();
          return result;
        }
      }
  }} />

<script module lang="ts">
  import { shadowSheets } from "../../utils/shadow-styles.js";
</script>

<script lang="ts">
  import PrivacyPolicyIt from "../../components/legal/PrivacyPolicyIt.svelte";

  let { companyName, websiteDomain, contactLink, googleAnalytics, googleAds, metaPixel, klaviyo, updated, style }: any = $props();
</script>

<PrivacyPolicyIt {companyName} {websiteDomain} {contactLink} {googleAnalytics} {googleAds} {metaPixel} {klaviyo} {updated} {style} />


<style>
  :host {
    display: block;
  }
</style>
      