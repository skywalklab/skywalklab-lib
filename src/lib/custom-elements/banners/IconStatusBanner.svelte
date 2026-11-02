<svelte:options
  customElement={{
    tag: "skywalk-icon-status-banner",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      icons: { type: "Array", attribute: "sw-icons" },
      i: { type: "Number", attribute: "sw-i" },
      activeColor: { type: "String", attribute: "sw-active-color" },
      swOnclick: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "banners/IconStatusBanner", false);
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
  import IconStatusBanner from "../../components/banners/IconStatusBanner.svelte";

  let { icons, i, activeColor, swOnclick, style }: any = $props();
</script>

<IconStatusBanner {icons} {i} {activeColor} onclick={swOnclick} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.icon-status-banner {
    width: 100%;
    display: flex;
    gap: 0.25rem 0.5rem;
    justify-content: center;
    align-items: center;

    .icon-status-banner--icon-container {
      height: fit-content;
      width: fit-content;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      align-items: center;
      opacity: 0.45;
      transition:
        opacity 0.2s,
        transform 0.2s;

      &.active {
        opacity: 1;
        transform: scale(1.15);
        color: var(--icon-status-banner-active-color);

        :global(svg),
        img {
          filter: none;
        }

        .icon-status-banner--subtext {
          font-weight: bold;
        }
      }

      :global(svg),
      img {
        filter: grayscale(1);
        transition: filter 0.2s ease;
      }

      .icon-status-banner--subtext {
        font-size: 12px;
        margin: 0;
        display: none;

        @media (min-width: 480px) {
          display: block;
        }
      }
    }

    button.icon-status-banner--icon-container {
      background: transparent;
      border: none;
      cursor: pointer;
    }
  }
  }
</style>
      