<svelte:options
  customElement={{
    tag: "skywalk-preview-list",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      color: { type: "String", attribute: "sw-color" },
      bgColor: { type: "String", attribute: "sw-bg-color" },
      insetBgColor: { type: "String", attribute: "sw-inset-bg-color" },
      previewWidth: { type: "String", attribute: "sw-preview-width" },
      previewHeight: { type: "String", attribute: "sw-preview-height" },
      openItemIndex: { type: "Number", attribute: "sw-open-item-index", reflect: true },
      alwaysShowPreview: { type: "Boolean", attribute: "sw-always-show-preview" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "lists/PreviewList", false);
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
  import PreviewList from "../../components/lists/PreviewList.svelte";

  let { items, color, bgColor, insetBgColor, previewWidth, previewHeight, openItemIndex = $bindable(-1), alwaysShowPreview, style }: any = $props();
</script>

<PreviewList {items} {color} {bgColor} {insetBgColor} {previewWidth} {previewHeight} bind:openItemIndex={openItemIndex} {alwaysShowPreview} {style} >
  {#snippet rowSnippet()}
    <slot name="rowSnippet"/>
  {/snippet}
{#snippet showcaseSnippet()}
    <slot name="showcaseSnippet"/>
  {/snippet}
{#snippet previewSnippet()}
    <slot name="previewSnippet"/>
  {/snippet}
{#snippet detailsSnippet()}
    <slot name="detailsSnippet"/>
  {/snippet}
</PreviewList>


<style>
  :host {
    display: block;
  }

  :global {
.preview-list {
    --preview-list-row-block-padding: calc(var(--preview-list-preview-height) / 2);
    background-color: var(--preview-list-background);
    color: var(--preview-list-color);
    padding-bottom: calc(var(--preview-list-preview-height) / 2);

    @media (min-width: 768px) {
      --preview-list-row-block-padding: 1rem;
    }

    .preview-list--row {
      &.header {
        position: sticky;
        top: 0;
        backdrop-filter: blur(6px);
        background-color: color-mix(in srgb, var(--preview-list-background), transparent 50%);
        z-index: 3;
        margin-bottom: var(--preview-list-row-block-padding);

        .preview-list--row-button {
          padding: 1rem 0;
        }
      }

      .preview-list--row-button {
        padding: var(--preview-list-row-block-padding) 0;
        width: 100%;
        position: relative;
        cursor: pointer;

        &:has(+ .preview-list--dropdown .open) {
          padding: 1rem 0;
        }

        &::after {
          content: "";
          display: block;
          position: relative;
          background-color: transparent;
          width: 80%;
          height: 1px;
          transition: width 0.5s ease;
        }

        &.active {
          &::after {
            background-color: currentColor;
            width: 100%;
          }
        }
      }

      .preview-list--dropdown {
        display: flex;
        flex-wrap: wrap;
        column-gap: 1rem;
        position: relative;
        top: 0;
        transition: top 0.3s ease;

        @media (min-width: 768px) {
          flex-wrap: unset;
        }

        &:has(.preview-list--preview-button.open) {
          padding-bottom: 1rem;
        }

        .preview-list--showcase {
          display: flex;
          align-items: center;
          width: 100%;
          min-width: 280px;
          flex: 1;

          @media (min-width: 768px) {
            min-width: 0;
            width: 70%;
          }
        }

        .preview-list--preview {
          background-color: var(--preview-list-background);
          width: 100%;
          flex-shrink: 0;

          @media (min-width: 768px) {
            min-width: 0;
            width: var(--preview-list-preview-width);
            margin: 0 0 0 auto;
          }

          &:not(:has(.preview-list--preview-button > :global(:first-child:not([hidden])))) {
            .preview-list--preview-button {
              display: none;
            }
          }

          &:not(:has(.preview-list--details > :global(:first-child:not([hidden])))) {
            .preview-list--details {
              display: none;
            }
          }

          &:not(:has(.preview-list--preview-button > :global(:first-child:not([hidden])))):not(
              :has(.preview-list--details > :global(:first-child:not([hidden])))
            ) {
            display: none;
          }

          .preview-list--preview-button-wrapper {
            height: 0;
            width: 100%;

            .preview-list--preview-button {
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 2;
              background-color: var(--preview-list-background);
              width: var(--preview-list-preview-width);
              height: var(--preview-list-preview-height);
              padding: clamp(0.5px, 0.5vw, 0.5rem);
              border: 1px solid var(--preview-list-background);
              position: relative;
              cursor: pointer;
              transition:
                background-color 0.3s ease,
                transform 0.3s ease;

              &.open {
                transform: translate(0%, 0%);
                background-color: var(--preview-list-inset-background);
                display: none;

                @media (min-width: 768px) {
                  display: flex;
                }
              }

              &.hovered:not(.open) {
                transform: translate(
                  calc(var(--preview-list-container-width) - var(--preview-list-preview-width)),
                  calc(-50% - var(--preview-list-row-block-padding))
                );

                @media (min-width: 768px) {
                  transform: translate(
                    calc(((var(--preview-list-container-width) / 2) - (var(--preview-list-preview-width) / 2)) * -1),
                    calc(-50% - var(--preview-list-row-block-padding))
                  );
                }
              }
            }
          }

          .preview-list--details {
            background-color: var(--preview-list-inset-background);
            width: 100%;

            @media (min-width: 768px) {
              margin-top: calc(var(--preview-list-preview-height) + 1rem);
            }
          }
        }
      }
    }
  }
  }
</style>
      