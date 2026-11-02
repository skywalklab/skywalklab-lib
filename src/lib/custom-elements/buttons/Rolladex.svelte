<svelte:options
  customElement={{
    tag: "skywalk-rolladex",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      attrs: { type: "Object", attribute: "sw-attrs" },
      buttonClass: { type: "String", attribute: "sw-button-class" },
      pathname: { type: "String", attribute: "sw-pathname" },
      swOnclick: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "buttons/Rolladex", false);
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
  import Rolladex from "../../components/buttons/Rolladex.svelte";

  let { attrs, buttonClass, pathname, swOnclick, style }: any = $props();
</script>

<Rolladex {attrs} {buttonClass} {pathname} onclick={swOnclick} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</Rolladex>


<style>
  :host {
    display: block;
  }

  :global {
.roll-a-dex {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    transition: transform 0.15s linear;
    cursor: pointer;

    @media (prefers-reduced-motion: reduce) {
      transition: transform 0.75s ease;
    }

    &.is-page {
      pointer-events: none;
    }

    &:has(:focus-visible) {
      outline: 1px solid;
    }

    .roll-a-dex--link-text-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      overflow: hidden;
      width: 100%;
      height: var(--rolladex-inner-anchor-height);

      > span {
        transition: transform 0.5s ease;
        transform: translateY(0px);
        display: inline-block;

        @media (prefers-reduced-motion: reduce) {
          transition: transform 1s ease;
        }
      }
    }

    &.rolled:not(.is-page) .roll-a-dex--link-text-container :first-child,
    &.rolled:not(.is-page) .roll-a-dex--link-text-container :last-child {
      transform: translateY(var(--rolladex-slide-gap));
    }

    &:active:not(.is-page) .roll-a-dex--link-text-container :is(span) {
      transform: translateY(calc(var(--rolladex-slide-gap) + 4px));
      transition: transform 0.1s cubic-bezier(0.05, 1, 0.5, 2);
    }
  }
  }
</style>
      