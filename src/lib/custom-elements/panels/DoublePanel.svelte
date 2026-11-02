<svelte:options
  customElement={{
    tag: "skywalk-double-panel",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      slideDistance: { type: "String", attribute: "sw-slide-distance" },
      intersectionActions: { type: "Array", attribute: "sw-intersection-actions" },
      intersectionActionParams: { type: "Object", attribute: "sw-intersection-action-params" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "panels/DoublePanel", false);
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
  import DoublePanel from "../../components/panels/DoublePanel.svelte";

  let { slideDistance, intersectionActions, intersectionActionParams, style }: any = $props();
</script>

<DoublePanel {slideDistance} {intersectionActions} {intersectionActionParams} {style} >
  {#snippet leftPanelSnippet()}
    <slot name="leftPanelSnippet"/>
  {/snippet}
{#snippet rightPanelSnippet()}
    <slot name="rightPanelSnippet"/>
  {/snippet}
</DoublePanel>


<style>
  :host {
    display: block;
  }

  :global {
.double-panel {
    width: 100%;
    height: 100%;
    min-height: 300px;
    position: relative;
    margin: 0 auto;
    border-radius: 16px;
    transition:
      margin-left 1s ease,
      margin-right 1s ease;

    &.entry-animate {
      .double-panel--left {
        margin-left: var(--double-panel-slide-distance);
      }

      .double-panel--right {
        margin-right: var(--double-panel-slide-distance);
      }
    }

    .double-panel--left {
      height: 100%;
      width: 55%;
      border: 1px solid #fff;
      border-radius: inherit;
      min-width: max(280px, 100%);
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      transition: inherit;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (min-width: 480px) {
        min-width: max(400px, 50%);
      }
    }

    .double-panel--right {
      font-size: 1rem;
      border-radius: inherit;
      min-width: max(280px, 100%);
      max-width: 55%;
      width: 45vw;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
      transition: inherit;
      padding: 2rem clamp(1rem, 5vw, 2rem);
      background-color: #fff;
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3);

      @media (min-width: 480px) {
        min-width: max(400px, 50%);
      }
    }
  }
  }
</style>
      