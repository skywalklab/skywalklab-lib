<svelte:options
  customElement={{
    tag: "skywalk-modal",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      title: { type: "String", attribute: "sw-title" },
      showModal: { type: "Boolean", attribute: "sw-show-modal", reflect: true },
      closeOnBackdropClick: { type: "Boolean", attribute: "sw-close-on-backdrop-click" },
      headerColor: { type: "String", attribute: "sw-header-color" },
      headerBgColor: { type: "String", attribute: "sw-header-bg-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "modals/Modal", false);
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
  import Modal from "../../components/modals/Modal.svelte";

  let { title, showModal = $bindable(false), closeOnBackdropClick, headerColor, headerBgColor, style }: any = $props();
</script>

<Modal {title} bind:showModal={showModal} {closeOnBackdropClick} {headerColor} {headerBgColor} {style} >
  {#snippet headerSnippet()}
    <slot name="headerSnippet"/>
  {/snippet}
{#snippet bodySnippet()}
    <slot name="bodySnippet"/>
  {/snippet}
{#snippet footerSnippet()}
    <slot name="footerSnippet"/>
  {/snippet}
</Modal>


<style>
  :host {
    display: contents;
  }

  :global {
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
      