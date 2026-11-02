<svelte:options
  customElement={{
    tag: "skywalk-tab-drawer",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      tabText: { type: "String", attribute: "sw-tab-text" },
      open: { type: "Boolean", attribute: "sw-open" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "disclosure/TabDrawer", false);
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
  import TabDrawer from "../../components/disclosure/TabDrawer.svelte";

  let { tabText, open, style }: any = $props();
</script>

<TabDrawer {tabText} {open} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
{#snippet drawerContentSnippet()}
    <slot name="drawerContentSnippet"/>
  {/snippet}
</TabDrawer>


<style>
  :host {
    display: block;
  }

  :global {
.tab-drawer {
    position: relative;
    width: 100%;
    border-radius: 28px;

    &.open {
      .tab-drawer--tab::after {
        filter: brightness(85%);
      }
    }

    .tab-drawer--inner-container {
      height: 100%;
      width: 100%;
      border-radius: 36px;
      overflow: hidden;
      background-color: inherit;
      color: inherit;
    }
  }

  .tab-drawer--top-half {
    box-shadow:
      0 4px 12px #24212e33,
      0 4px 24px #1211154d;
    background-color: inherit;
    color: inherit;
    border-radius: 32px 32px 0 0;
    padding: 3rem 2rem;
    z-index: 2;
    position: relative;
  }

  .tab-drawer--bottom-half {
    background-color: inherit;
    color: inherit;
    padding: 2.5rem 2vw 3.25rem;
    border-radius: 0 0 32px 32px;
    position: relative;
    z-index: 1;
    transition: margin-top 0.3s linear;

    @media (prefers-reduced-motion: reduce) {
      transition: all 0.75s linear;
    }

    @media (min-width: 768px) {
      padding: 2.5rem 2rem 3.25rem;
    }
  }

  .tab-drawer--tab {
    background-color: inherit;
    color: inherit;
    position: absolute;
    width: fit-content;
    padding: 12px 26px;
    border: none;
    border-radius: 6px;
    bottom: -1rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    overflow: hidden;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      inset: 0;
      z-index: -1;
      background-color: inherit;
      transition: filter 0.15s linear;

      @media (prefers-reduced-motion: reduce) {
        transition: all 0.75s linear;
      }
    }

    &:hover,
    &:focus-visible {
      &::after {
        filter: brightness(85%);
      }
    }
  }
  }
</style>
      