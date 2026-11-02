<svelte:options
  customElement={{
    tag: "skywalk-contact-banner",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      phone: { type: "Object", attribute: "sw-phone" },
      address: { type: "Object", attribute: "sw-address" },
      email: { type: "Object", attribute: "sw-email" },
      bannerBgColor: { type: "String", attribute: "sw-banner-bg-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "banners/ContactBanner", false);
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
  import ContactBanner from "../../components/banners/ContactBanner.svelte";

  let { phone, address, email, bannerBgColor, style }: any = $props();
</script>

<ContactBanner {phone} {address} {email} {bannerBgColor} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.contact-banner {
    background-color: var(--contact-banner-bg-color);
    color: #fff;

    .contact-banner--inner-container {
      display: grid;
      gap: 1.5rem;
      justify-content: center;
      align-content: center;
      padding: 30px 0;

      @media (min-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      }

      @media (min-width: 1024px) {
        width: 100%;
      }
    }

    .contact-banner--item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(0.75rem, 5vw, 1rem);
      width: fit-content;

      @media (min-width: 400px) {
        flex-direction: row;
      }

      .contact-banner--icon-container {
        align-self: flex-start;
        padding: clamp(0.5rem, 3vw, 1.5rem);
        background-color: #fff;
        border-radius: 50%;

        :global(svg) {
          color: var(--contact-banner-bg-color);
          height: clamp(1.75rem, 3vw, 2.5rem);
          width: clamp(1.75rem, 3vw, 2.5rem);
        }
      }

      .contact-banner--text-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-size: clamp(14px, 4vw, 18px);
      }
    }
  }
  }
</style>
      