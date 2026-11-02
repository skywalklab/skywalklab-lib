<svelte:options
  customElement={{
    tag: "skywalk-lightbox-overlay",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      title: { type: "String", attribute: "sw-title" },
      unlockScroll: { type: "Boolean", attribute: "sw-unlock-scroll" },
      lightboxIndex: { type: "Number", attribute: "sw-lightbox-index", reflect: true },
      itemLength: { type: "Number", attribute: "sw-item-length" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "galleries/LightboxOverlay", false);
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
  import LightboxOverlay from "../../components/galleries/LightboxOverlay.svelte";

  let { title, unlockScroll, lightboxIndex = $bindable(undefined), itemLength, style }: any = $props();
</script>

<LightboxOverlay {title} {unlockScroll} bind:lightboxIndex={lightboxIndex} {itemLength} {style} >
  {#snippet imageSnippet()}
    <slot name="imageSnippet"/>
  {/snippet}
</LightboxOverlay>


<style>
  :host {
    display: contents;
  }

  :global {
.lightbox-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .lightbox-overlay--close-button {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      color: #fff;
      font-size: 3.5rem;
      cursor: pointer;
      transition: background-color 0.15s linear;

      &:hover {
        background: color-mix(in srgb, rgba(0, 0, 0, 0.9) 80%, #fff);
      }

      :global(svg) {
        height: 2rem;
        width: 2rem;
      }
    }

    .lightbox-overlay--title {
      color: #fff;
      margin-top: 1rem;
      font-size: 1.25rem;
    }

    .lightbox-overlay--arrow-button {
      position: absolute;
      z-index: 2;
      top: 0;
      bottom: 0;
      margin: auto 0;
      height: fit-content;
      padding: 2.5rem 0.5rem;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      transition:
        background-color 0.15s linear,
        color 0.15s linear;
      cursor: pointer;

      &.previous {
        left: 0;
      }

      &.next {
        right: 0;
      }

      &:hover {
        background-color: #fff;
        color: #000;
      }
    }
  }
  }
</style>
      