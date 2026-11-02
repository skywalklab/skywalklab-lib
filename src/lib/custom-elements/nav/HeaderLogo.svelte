<svelte:options
  customElement={{
    tag: "skywalk-header-logo",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      logo: { type: "Object", attribute: "sw-logo" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "nav/HeaderLogo", false);
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
  import HeaderLogo from "../../components/nav/HeaderLogo.svelte";

  let { logo, style }: any = $props();
</script>

<HeaderLogo {logo} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.nav-logo-link {
    max-width: 10rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    color: #000000;
    text-decoration: none;
    white-space: nowrap;

    .nav-logo-inner-container {
      display: flex;
      align-items: center;
      height: 100%;
    }

    .nav-logo-img {
      object-fit: contain;
      object-position: center;
      margin: 0 0.15rem 0 0;
    }

    .nav-logo-name {
      margin: 0;
      line-height: 1.5;
      font-size: 1.25rem;
      font-weight: bold;
      color: inherit;
      transition: all 0.3s linear;

      @media (prefers-reduced-motion: reduce) {
        transition: all 0.75s linear;
      }
    }
  }
  }
</style>
      