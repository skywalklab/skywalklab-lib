<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import type { Snippet } from "svelte";

  export interface Props {
    /** Title shown in the modal header. */
    title?: string;
    /** Whether the modal is rendered. Bindable, so the parent can control it. */
    showModal?: boolean;
    /** Close the modal when the area around it is clicked. Set it false for a dialog that must be dismissed deliberately. */
    closeOnBackdropClick?: boolean;
    /** Text color of the modal header. Sets `--modal-header-color`. */
    headerColor?: string;
    /** Background color of the modal header. Sets `--modal-header-bg-color`. */
    headerBgColor?: string;
    /** Rendered in the header after the title and before the close control, e.g. a logo, an icon or a status badge. Use it in place of `title` for a header of the caller's own. */
    headerSnippet?: Snippet;
    /** Rendered in the modal body, under the header. */
    bodySnippet?: Snippet;
    /** Rendered in the modal footer, under the body. */
    footerSnippet?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    title,
    showModal = $bindable(false),
    closeOnBackdropClick = false,
    headerColor = "var(--background, #ffffff)",
    headerBgColor = "var(--primary, black)",
    headerSnippet,
    bodySnippet,
    footerSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();

  function closeModal() {
    showModal = false;
  }

  function clickBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget && closeOnBackdropClick) {
      closeModal();
    }
  }
</script>

{#if showModal}
  <div
    id="modal-{uid}"
    class="modal"
    style:--modal-header-color={headerColor}
    style:--modal-header-bg-color={headerBgColor}>
    <div id="modal--backdrop-{uid}" role="presentation" class="modal--backdrop modal--fade modal--show"></div>
    <div
      id="modal--viewport-{uid}"
      class="modal--viewport modal--fade modal--show"
      tabindex="-1"
      onclick={clickBackdrop}
      role="presentation">
      <div class="modal--dialog" role="dialog" aria-labelledby="modal--title-{uid} modal--header-snippet-{uid}">
        <div class="modal--content" {style}>
          <div class="modal--header">
            {#if title}
              <div id="modal--title-{uid}" class="modal--title">
                {title}
              </div>
            {/if}
            <div id="modal--header-snippet-{uid}" style="display: contents;">{@render headerSnippet?.()}</div>
            <button type="button" onclick={closeModal} class="modal--close-button" aria-label={labels.close}></button>
          </div>
          <div class:modal--body={bodySnippet != undefined}>
            {@render bodySnippet?.()}
          </div>
          <div class:modal--footer={footerSnippet != undefined}>
            {@render footerSnippet?.()}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
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
</style>
