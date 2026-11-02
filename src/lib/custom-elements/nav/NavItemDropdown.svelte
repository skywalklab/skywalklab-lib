<svelte:options
  customElement={{
    tag: "skywalk-nav-item-dropdown",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      title: { type: "String", attribute: "sw-title" },
      items: { type: "Array", attribute: "sw-items" },
      lang: { type: "String", attribute: "sw-lang" },
      interaction: { type: "String", attribute: "sw-interaction" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "nav/NavItemDropdown", false);
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
  import NavItemDropdown from "../../components/nav/NavItemDropdown.svelte";

  let { title, items, lang, interaction, style }: any = $props();
</script>

<NavItemDropdown {title} {items} {lang} {interaction} {style} >
  {#snippet linkSnippet()}
    <slot name="linkSnippet"/>
  {/snippet}
</NavItemDropdown>


<style>
  :host {
    display: block;
  }

  :global {
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
      