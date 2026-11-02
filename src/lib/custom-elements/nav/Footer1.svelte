<svelte:options
  customElement={{
    tag: "skywalk-footer-1",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      logo: { type: "Object", attribute: "sw-logo" },
      links: { type: "Array", attribute: "sw-links" },
      contactInfo: { type: "Array", attribute: "sw-contact-info" },
      disclaimer: { type: "String", attribute: "sw-disclaimer" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "nav/Footer1", false);
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
  /* eslint-disable svelte/no-useless-children-snippet */
  import Footer1 from "../../components/nav/Footer1.svelte";

  let { logo, links, contactInfo, disclaimer, style }: any = $props();
</script>

<Footer1 {logo} {links} {contactInfo} {disclaimer} {style} >
  {#snippet logoSnippet()}
    <slot name="logoSnippet"/>
  {/snippet}
{#snippet children()}
    <slot />
  {/snippet}
</Footer1>


<style>
  :host {
    display: block;
  }

  :global {
.footer-1 {
    width: 100%;
    padding: 0 0 1px;
    height: fit-content;
    margin-top: auto;

    .footer-1--divider {
      color: currentColor;
      opacity: 1;
      margin: 0 0 1rem;
      border: 0;
      border-top: 1px solid currentColor;
    }

    .footer-1--content {
      padding: 0 var(--inline-padding, 1rem);
      max-width: var(--max-page-width, 1200px);
      margin: 3rem auto 1rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 2rem 4rem;

      .footer-1--logo {
        text-decoration: none;
        width: fit-content;
        min-width: 280px;
        margin-bottom: 2rem;

        @media (min-width: 480px) {
          min-width: 400px;
        }

        .footer-1--logo-inner-container {
          display: flex;
          height: 3.5rem;
          align-items: center;
        }

        .footer-1--logo-img {
          width: auto;
          height: 100%;
          margin: 0 0.15rem 0 0;
        }

        .footer-1--logo-name {
          margin: 0;
          line-height: 1.5;
          font-weight: bold;
          color: currentColor;
          font-size: 2rem;
        }
      }

      .footer-1--links-container {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 4rem 2rem;
        min-width: 280px;
        margin-inline: auto;
        width: fit-content;

        @media (min-width: 768px) {
          min-width: 500px;
        }

        .footer-1--links-inner-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: min(280px, 100%);
          margin-inline: auto;
        }

        .footer-1--links-heading {
          font-size: 22px;
          pointer-events: none;
        }

        .footer-1--links,
        .footer-1--contact-info {
          display: grid;
          grid-template-columns: repeat(1, auto);
          gap: 0.75rem 2rem;
          height: fit-content;

          .footer-1--links-item,
          .footer-1--contact-info-item {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            font-size: 16px;
          }
        }
      }
    }

    .footer-1--disclaimer {
      margin: 2rem auto 2rem;
      border-top: 1px solid currentColor;
      padding-top: 1.5rem;
      max-width: var(--max-page-width, 1200px);
      text-align: center;

      .footer-1--disclaimer-text {
        font-size: 14px;
      }
    }
  }
  }
</style>
      