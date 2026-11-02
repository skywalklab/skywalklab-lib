<svelte:options
  customElement={{
    tag: "skywalk-search-modal",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Object", attribute: "sw-items" },
      suggestions: { type: "Object", attribute: "sw-suggestions" },
      searchButtonTitle: { type: "String", attribute: "sw-search-button-title" },
      searchColor: { type: "String", attribute: "sw-search-color" },
      searchOutlineColor: { type: "String", attribute: "sw-search-outline-color" },
      placeholder: { type: "String", attribute: "sw-placeholder" },
      buttonClass: { type: "String", attribute: "sw-button-class" },
      modalProps: { type: "Object", attribute: "sw-modal-props" },
      swOninput: { type: "Object" },
      swOnchange: { type: "Object" },
      swOnfocus: { type: "Object" },
      swOnblur: { type: "Object" },
      swOnkeydown: { type: "Object" },
      swOnResultItemClick: { type: "Object" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "search/SearchModal", false, "logo-list");
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
  import SearchModal from "../../components/search/SearchModal.svelte";

  let { items, suggestions, searchButtonTitle, searchColor, searchOutlineColor, placeholder, buttonClass, modalProps, swOninput, swOnchange, swOnfocus, swOnblur, swOnkeydown, swOnResultItemClick, style }: any = $props();
</script>

<SearchModal {items} {suggestions} {searchButtonTitle} {searchColor} {searchOutlineColor} {placeholder} {buttonClass} {modalProps} oninput={swOninput} onchange={swOnchange} onfocus={swOnfocus} onblur={swOnblur} onkeydown={swOnkeydown} onResultItemClick={swOnResultItemClick} {style} >
  {#snippet searchResultsChildren()}
    <slot name="searchResultsChildren"/>
  {/snippet}
{#snippet headerSnippet()}
    <slot name="headerSnippet"/>
  {/snippet}
{#snippet footerSnippet()}
    <slot name="footerSnippet"/>
  {/snippet}
</SearchModal>


<style>
  :host {
    display: block;
  }

  :global {
.search-modal {
    --search-color: var(--primary-dark, #000);
    --search-outline-color: var(--primary-light, #333);
    margin: 0 auto;
    position: relative;

    .search-modal--toggle-button {
      border: 1px solid transparent;
      border-radius: 8px;
      color: var(--search-color);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 6px 16px;
      font-size: 15px;
      background-color: #e9e9e9;
      transition: border-color 0.15s linear;

      @media (prefers-reduced-motion: reduce) {
        transition: border-color 0.75s linear;
      }

      &:hover {
        border-color: var(--search-outline-color);
      }
    }
  }

  :global .modal--content {
    background-color: #f6f6f7;
    box-shadow:
      rgba(255, 255, 255, 0.5) 1px 1px 0px 0px inset,
      rgb(85, 90, 100) 0px 3px 8px 0px;

    ul.search-list {
      max-height: 55vh;
    }
  }

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

.search-results {
    --logo-list-marker-bg-color: var(--search-outline-color, var(--accent-dark, slategray));

    .search-results--empty {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      color: var(--search-color, var(--primary, black));
    }
  }

:is(ul.search-list) {
    gap: 0.25rem;
    margin: 0;
    padding: 2px;
    width: 100%;
    height: fit-content;
    overflow-y: auto;
    --logo-list-marker-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlLWxpZ2h0YnVsYiI+PHBhdGggZD0iTTE1IDE0Yy4yLTEgLjctMS43IDEuNS0yLjUgMS0uOSAxLjUtMi4yIDEuNS0zLjVBNiA2IDAgMCAwIDYgOGMwIDEgLjIgMi4yIDEuNSAzLjUuNy43IDEuMyAxLjUgMS41IDIuNSIvPjxwYXRoIGQ9Ik05IDE4aDYiLz48cGF0aCBkPSJNMTAgMjJoNCIvPjwvc3ZnPg==");

    li.search-list--item {
      border-radius: 6px;
      background-color: #ffffff;
      min-height: 3.25rem;
      overflow: hidden;
      transition: background-color 0.15s linear;

      &:hover :global {
        .search-list-item-text--parent,
        mark {
          color: inherit;
        }
      }

      .search-list--button {
        min-height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        font-size: 16px;
        color: var(--search-color, var(--primary, black));
        cursor: pointer;
      }
    }
  }

.search-list-item-text {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: color 0.15s linear;

    @media (prefers-reduced-motion: reduce) {
      transition: color 0.75s linear;
    }

    .search-list-item-text--parent {
      margin: 1px 0 0;
      display: flex;
      gap: 0.25rem;
      align-items: center;
      font-size: 12px;
      width: 100%;
      color: inherit;
      transition: inherit;

      :global svg {
        flex: 0 0 16px;
        transition: inherit;
      }

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        transition: inherit;
      }
    }

    :global mark {
      padding: 0 1px;
      color: var(--search-outline-color, var(--accent-dark, slategray));
      background-color: transparent;
      transition: inherit;
    }
  }

.modal--backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    height: 100svh;
    background-color: #000;
    transition: opacity 0.15s linear;

    &.modal--fade {
      opacity: 0;
    }

    &.modal--show {
      opacity: 0.5;
    }
  }

  .modal--viewport {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    font-size: 16px;

    &.modal--fade .modal--dialog {
      transform: translateY(-50px);
    }

    &.modal--show .modal--dialog {
      transform: none;
    }

    .modal--dialog {
      position: relative;
      margin: 0.5rem;
      pointer-events: none;
      transition: transform 0.3s ease-out;

      @media (min-width: 576px) {
        margin: 1.75rem auto;
        max-width: 500px;
      }
    }

    .modal--content {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      pointer-events: auto;
      background-clip: padding-box;
      border: 1px solid rgba(0, 0, 0, 0.175);
      border-radius: 8px;
      outline: 0;
      background-color: #fff;
      box-shadow:
        #ffffff80 1px 1px inset,
        #555a64 0 3px 8px;
    }

    .modal--header {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      padding: 1rem 1rem;
      border-bottom: 1px solid #dee2e6;
      border-top-left-radius: 7px;
      border-top-right-radius: 7px;
      background-color: var(--modal-header-bg-color);
      color: var(--modal-header-color);
      font-size: 26px;

      .modal--title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .modal--close-button {
        box-sizing: content-box;
        width: 1rem;
        height: 1rem;
        color: #000000;
        background: transparent
          url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')
          center/1.5rem auto no-repeat;
        border: 0;
        border-radius: 0.375rem;
        opacity: 0.5;
        padding: 0.5rem;
        margin: -0.5rem;
        margin-left: auto;
        cursor: pointer;
        background-color: #ffffff;

        &:hover,
        &:focus-visible {
          opacity: 0.75;
        }
      }
    }

    .modal--body {
      position: relative;
      flex: 1 1 auto;
      padding: 1rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      font-size: inherit;
    }

    .modal--footer {
      display: flex;
      flex-shrink: 0;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      padding: 0.75rem;
      border-top: 1px solid #dee2e6;
      border-bottom-right-radius: 7px;
      border-bottom-left-radius: 7px;
    }
  }
  }
</style>
      