<svelte:options
  customElement={{
    tag: "skywalk-top-bar-slide",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      keepActive: { type: "Boolean", attribute: "sw-keep-active" },
      activeItemIndex: { type: "Number", attribute: "sw-active-item-index", reflect: true },
      color: { type: "String", attribute: "sw-color" },
      bgColor: { type: "String", attribute: "sw-bg-color" },
      activeBgColor: { type: "String", attribute: "sw-active-bg-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "banners/TopBarSlide", false);
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
  import TopBarSlide from "../../components/banners/TopBarSlide.svelte";

  let { items, keepActive, activeItemIndex = $bindable(keepActive ? 0 : -1), color, bgColor, activeBgColor, style }: any = $props();
</script>

<TopBarSlide {items} {keepActive} bind:activeItemIndex={activeItemIndex} {color} {bgColor} {activeBgColor} {style} >
  {#snippet itemSnippet()}
    <slot name="itemSnippet"/>
  {/snippet}
</TopBarSlide>


<style>
  :host {
    display: block;
  }

  :global {
.top-bar-slide {
    --top-bar-slide-padding: 4px;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: var(--top-bar-slide-padding);
    width: fit-content;
    border-radius: 10px;
    overflow: hidden;
    color: var(--top-bar-slide-color);
    background-color: var(--top-bar-slide-bg-color);
    position: relative;

    &.active {
      &::before {
        opacity: 1;
        transition:
          width 0.15s linear,
          transform 0.15s linear,
          opacity 0.15s linear;
      }
    }

    &.inactive {
      &::before {
        transition: opacity 0.15s linear;
      }
    }

    &::before {
      content: "";
      width: var(--top-bar-slide-width);
      height: calc(100% - (var(--top-bar-slide-padding) * 2));
      top: 0;
      bottom: 0;
      left: 0;
      transform: translateX(var(--top-bar-slide-offset-x));
      margin: auto 0;
      position: absolute;
      background-color: var(--top-bar-slide-active-bg-color);
      border-radius: 8px;
      z-index: 1;
      opacity: 0;
    }

    .top-bar-slide--item {
      position: relative;
      z-index: 1;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      > :global(:first-child) {
        padding: 2px 12px;
      }
    }
  }
  }
</style>
      