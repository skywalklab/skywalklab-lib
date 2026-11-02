<svelte:options
  customElement={{
    tag: "skywalk-split-image-panel",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      image: { type: "Object", attribute: "sw-image" },
      title: { type: "String", attribute: "sw-title" },
      reverse: { type: "Boolean", attribute: "sw-reverse" },
      contentBgColor: { type: "String", attribute: "sw-content-bg-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "panels/SplitImagePanel", false);
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
  import SplitImagePanel from "../../components/panels/SplitImagePanel.svelte";

  let { image, title, reverse, contentBgColor, style }: any = $props();
</script>

<SplitImagePanel {image} {title} {reverse} {contentBgColor} {style} >
  {#snippet mediaSnippet()}
    <slot name="mediaSnippet"/>
  {/snippet}
{#snippet children()}
    <slot />
  {/snippet}
</SplitImagePanel>


<style>
  :host {
    display: block;
  }

  :global {
.split-image-panel {
    display: grid;

    .split-image-panel--media {
      min-height: 320px;
      display: grid;

      .split-image-panel--image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .split-image-panel--content {
      background-color: var(--split-image-panel-content-bg-color, var(--primary, black));
      color: #fff;
      padding: clamp(3rem, 6vw, 5.5rem) var(--side-padding, 12px);
      display: flex;
      align-items: center;

      .split-image-panel--inner {
        width: 100%;
        max-width: calc(var(--max-page-width, 1200px) / 2);
        margin-right: auto;

        .split-image-panel--title {
          color: #fff;
          font-size: clamp(30px, 3.2vw, 46px);
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -0.02em;
          text-transform: none;
          margin: 0 0 2.5rem;
          max-width: 18ch;
        }
      }
    }

    &.reverse .split-image-panel--inner {
      margin-right: 0;
      margin-left: auto;
    }

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;

      &.reverse .split-image-panel--media {
        order: 1;
      }
    }
  }
  }
</style>
      