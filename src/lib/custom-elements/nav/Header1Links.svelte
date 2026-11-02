<svelte:options
  customElement={{
    tag: "skywalk-header-1links",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      links: { type: "Array", attribute: "sw-links" },
      navItemDropdowns: { type: "Object", attribute: "sw-nav-item-dropdowns" },
      navOpen: { type: "Boolean", attribute: "sw-nav-open", reflect: true },
      float: { type: "Boolean", attribute: "sw-float" },
      hamburger: { type: "Object", attribute: "sw-hamburger" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "nav/Header1Links", false, "hamburgers/collapse-hamburger", "header1", "hamburgers/hamburger-base");
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
  import Header1Links from "../../components/nav/Header1Links.svelte";

  let { links, navItemDropdowns, navOpen = $bindable(false), float, hamburger, style }: any = $props();
</script>

<Header1Links {links} {navItemDropdowns} bind:navOpen={navOpen} {float} {hamburger} {style} >
  {#snippet linkSnippet()}
    <slot name="linkSnippet"/>
  {/snippet}
{#snippet ctaSnippet()}
    <slot name="ctaSnippet"/>
  {/snippet}
</Header1Links>


<style>
  :host {
    display: block;
  }

  :global {
.header-1-links {
    .header-1-links--hamburger {
      display: contents;

      &:global(.header-1-links--hamburger) :global(.hamburger) {
        display: flex;
      }
    }

    &.header-1-links--small-screen {
      display: contents;
    }

    &.header-1-links--large-screen {
      display: none;
    }

    @media (min-width: 1024px) {
      &.header-1-links--small-screen {
        display: none;
      }

      &.header-1-links--large-screen {
        display: contents;
      }
    }
  }

.nav-item-dropdown {
    position: relative;
    display: flex;
    flex-direction: column;

    &:has(.selected):hover {
      background-color: transparent;
    }

    .nav-item-dropdown--button {
      font-size: unset;
      font-family: unset;
      color: unset;
      border: unset;
      text-align: unset;
      padding: unset;
      display: flex;
      gap: 0.4rem;
      align-items: center;
      height: 100%;
      width: 100%;
      background-color: transparent;
      transition:
        background-color 0.15s linear,
        color 0.15s linear;
      cursor: pointer;

      @media (prefers-reduced-motion: reduce) {
        transition: all 0.75s ease;
      }

      :is(&:hover, &.selected) .nav-item-dropdown--icon-container {
        background-color: var(--language-header-color, black);
        color: var(--language-header-bg-color, white);
      }

      &.selected .nav-item-dropdown--icon-container {
        transform: rotate(180deg);
      }

      .nav-item-dropdown--icon-container {
        height: 1.25rem;
        width: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid var(--language-header-color, black);
        background-color: var(--language-header-bg-color, white);
        color: var(--language-header-color, black);
        transition: inherit;
      }

      > :global(:first-child) {
        width: fit-content;
      }
    }

    .nav-item-dropdown--list {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      background-color: var(--background, white);
      overflow: hidden;

      @media (min-width: 1024px) {
        box-shadow: var(--box-shadow, none);
        position: absolute;
        top: var(--dynamic-header-height, 56px);
        right: 0;
      }

      .nav-item-dropdown--list-item {
        border-bottom: 1px solid hsla(0, 0%, 47.1%, 0.83);
        padding-right: 0.25rem;
        justify-content: space-between;

        &:last-of-type {
          border-bottom-width: 0px;
        }
      }
    }
  }
  }
</style>
      