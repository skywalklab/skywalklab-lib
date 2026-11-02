<svelte:options
  customElement={{
    tag: "skywalk-top-bar-2",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      email: { type: "String", attribute: "sw-email" },
      address: { type: "String", attribute: "sw-address" },
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
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "banners/TopBar2", false);
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
  import TopBar2 from "../../components/banners/TopBar2.svelte";

  let { email, address, hours, socials, iconColor, style }: any = $props();
</script>

<TopBar2 {email} {address} {hours} {socials} {iconColor} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.top-bar-2 {
    .top-bar-2--inner-container {
      max-width: 1170px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: center;
    }

    .top-bar-2--contact-details {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;

      .top-bar-2--item {
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        padding: 15px 20px;

        @media (min-width: 1024px) {
          &.top-bar-2--schedule {
            flex: 1;
            justify-content: flex-end;
            min-width: 250px;
          }
        }
      }

      .top-bar-2--item a,
      .top-bar-2--schedule {
        text-decoration: none;
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .top-bar-2--item a {
        color: var(--top-bar-2-icon-color);

        &:hover,
        &:focus-visible {
          filter: invert(0.2);
        }
      }

      .top-bar-2--item:not(.top-bar-2--schedule) .top-bar-2--text {
        display: none;

        @media (min-width: 768px) {
          display: flex;
        }
      }
    }
  }
  }
</style>
      