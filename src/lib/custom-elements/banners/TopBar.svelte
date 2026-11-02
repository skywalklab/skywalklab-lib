<svelte:options
  customElement={{
    tag: "skywalk-top-bar",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      phone: { type: "String", attribute: "sw-phone" },
      email: { type: "String", attribute: "sw-email" },
      hours: { type: "String", attribute: "sw-hours" },
      socials: { type: "Object", attribute: "sw-socials" },
      iconColor: { type: "String", attribute: "sw-icon-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "banners/TopBar", false);
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
  import TopBar from "../../components/banners/TopBar.svelte";

  let { phone, email, hours, socials, iconColor, style }: any = $props();
</script>

<TopBar {phone} {email} {hours} {socials} {iconColor} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.top-bar {
    background-color: #f5f5f5;

    .top-bar--inner-container {
      max-width: 1170px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: center;
    }

    .top-bar--contact-details {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;

      .top-bar--item {
        font-weight: 500;
        font-size: 13px;
        color: #999;
        line-height: 20px;
        padding: 15px 20px;

        @media (min-width: 1024px) {
          border-right: 1px solid #e2e6e7;

          &:first-child {
            border-left: 1px solid #e2e6e7;
          }

          &.top-bar--schedule {
            flex: 1;
            justify-content: flex-end;
            min-width: 250px;
          }
        }
      }

      .top-bar--item a,
      .top-bar--schedule {
        text-decoration: none;
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .top-bar--schedule {
        color: #6a6a6a;
      }

      .top-bar--item a {
        color: var(--top-bar-icon-color);

        &:hover,
        &:focus-visible {
          filter: invert(0.2);
        }
      }

      .top-bar--item:not(.top-bar--schedule) .top-bar--text {
        display: none;

        @media (min-width: 768px) {
          display: flex;
        }
      }
    }
  }
  }
</style>
      