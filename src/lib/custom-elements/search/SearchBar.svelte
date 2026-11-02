<svelte:options
  customElement={{
    tag: "skywalk-search-bar",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      id: { type: "String", attribute: "sw-id" },
      value: { type: "String", attribute: "sw-value", reflect: true },
      debounce: { type: "Number", attribute: "sw-debounce" },
      placeholder: { type: "String", attribute: "sw-placeholder" },
      autofocus: { type: "Boolean", attribute: "sw-autofocus" },
      bgColor: { type: "String", attribute: "sw-bg-color" },
      clearHoverColor: { type: "String", attribute: "sw-clear-hover-color" },
      swOninput: { type: "Object" },
      swOnchange: { type: "Object" },
      swOnfocus: { type: "Object" },
      swOnblur: { type: "Object" },
      swOnkeydown: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "search/SearchBar", false);
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
  import SearchBar from "../../components/search/SearchBar.svelte";

  let { id, value = $bindable(""), debounce, placeholder, autofocus, bgColor, clearHoverColor, swOninput, swOnchange, swOnfocus, swOnblur, swOnkeydown, style }: any = $props();
</script>

<SearchBar {id} bind:value={value} {debounce} {placeholder} {autofocus} {bgColor} {clearHoverColor} oninput={swOninput} onchange={swOnchange} onfocus={swOnfocus} onblur={swOnblur} onkeydown={swOnkeydown} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.search-bar {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 6px 1rem;
    background-color: var(--search-bar-bg-color);
    color: var(--search-color, var(--primary, black));
    border-radius: 6px;
    width: min(500px, 100%);
    margin: 0 auto 2rem;
    transition: outline-color 0.15s linear;
    outline: 2px solid var(--search-color, var(--primary, black));

    &:focus-within {
      outline: 2px solid var(--search-outline-color, var(--accent-dark, slategray));

      :global svg {
        stroke: var(--search-outline-color, var(--accent-dark, slategray));
      }
    }

    label {
      height: 2rem;

      :global svg {
        transition: stroke 0.15s linear;
        height: 100%;
        width: auto;
        color: var(--search-color, var(--primary, black));
      }
    }

    input.search-bar--input {
      flex: 1;
      font-size: 22px;
      height: 2rem;
      padding: 6px;
      border: none;
      background-color: transparent;
      color: inherit;

      &:focus,
      &:focus-visible {
        outline: none;
      }

      &::-webkit-search-cancel-button {
        display: none;
      }
    }

    input.search-bar--clear {
      background-color: transparent;
      padding: 0 6px;
      border-radius: 8px;
      border: none;
      transition: color 0.15s linear;
      color: var(--search-color, var(--primary, black));
      cursor: pointer;

      &:hover {
        color: var(--search-bar-clear-hover-color);
      }
    }
  }
  }
</style>
      