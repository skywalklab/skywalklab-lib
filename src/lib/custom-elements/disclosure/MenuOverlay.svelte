<svelte:options
  customElement={{
    tag: "skywalk-menu-overlay",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      bgColor: { type: "String", attribute: "sw-bg-color" },
      openContactMenu: { type: "Boolean", attribute: "sw-open-contact-menu", reflect: true },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "disclosure/MenuOverlay", false);
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
  import MenuOverlay from "../../components/disclosure/MenuOverlay.svelte";

  let { bgColor, openContactMenu = $bindable(false), style }: any = $props();
</script>

<MenuOverlay {bgColor} bind:openContactMenu={openContactMenu} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</MenuOverlay>


<style>
  :host {
    display: block;
  }

  :global {
.menu-overlay--open-button {
    cursor: pointer;
  }

  .menu-overlay {
    position: fixed;
    height: 100svh;
    width: 100vw;
    top: 0;
    right: 0;
    pointer-events: none;
    overflow: hidden;

    .menu-overlay--panel {
      pointer-events: all;
      position: absolute;
      width: clamp(280px, 40%, 460px);
      height: 100%;
      right: 0;
      overflow: auto;
      transform: translateX(100%);
      top: 0;
      background: #242424;
      opacity: 0;
      visibility: hidden;
      z-index: 999999;
      transition: transform 0.5s ease 0.4s;
      padding: 100px 40px;
      scrollbar-width: none;

      .menu-overlay--close-button {
        position: absolute;
        right: 2rem;
        top: 2rem;
        transition: transform 0.3s linear;
        cursor: pointer;

        &:hover {
          transform: rotate(90deg);
        }
      }
    }

    .menu-overlay--scrim {
      pointer-events: all;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 0;
      transition:
        width 0.8s ease-out,
        visibility 0.8s ease-out,
        background-color 0.8s ease-out;
      visibility: hidden;
      z-index: 99999;
      background: rgba(24, 24, 24, 0.6);
    }

    &.open {
      .menu-overlay--panel {
        opacity: 1;
        visibility: visible;
        transform: translateX(0%);
        background: var(--menu-overlay-bg-color, var(--primary, black));
      }

      .menu-overlay--scrim {
        visibility: visible;
        width: 100%;
        background-color: color-mix(in srgb, var(--menu-overlay-bg-color, var(--primary, black)), transparent 60%);
      }
    }
  }
  }
</style>
      