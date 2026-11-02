<script lang="ts">
  import { slide, type SlideParams } from "svelte/transition";
  import type { Snippet } from "svelte";
  import { snippetWrap } from "../../utils/snippets.js";

  interface Props {
    /** Entries passed to each snippet; the first renders as a sticky header row. */
    items: any[];
    /** Text color of the list, and of the active row's bottom border. Sets `--preview-list-color`. */
    color?: string;
    /** Background color of the preview and its button. Sets `--preview-list-background`. */
    bgColor?: string;
    /** Background color of the open preview button and the details panel. Sets `--preview-list-inset-background`. */
    insetBgColor?: string;
    /** Width of the preview button, and of the preview column from 768px. Sets `--preview-list-preview-width`. */
    previewWidth?: string;
    /** Height of the preview button. Sets `--preview-list-preview-height`. */
    previewHeight?: string;
    /** Index of the open row, or -1 when none is open; bindable. */
    openItemIndex?: number;
    /** Shows every row's preview button, not only on hover or when open. */
    alwaysShowPreview?: boolean;
    /** Renders each row's always-visible content inside the button that opens it; `item` is the entry and `index` its position. */
    rowSnippet?: Snippet<[{ item: any; index: number }]>;
    /** Renders beside the preview while the row is open; `item` is the entry and `index` its position. */
    showcaseSnippet?: Snippet<[{ item: any; index: number }]>;
    /** Renders inside the preview button while the row is hovered or open, and hides the preview when empty; `item` is the entry and `index` its position. */
    previewSnippet?: Snippet<[{ item: any; index: number }]>;
    /** Renders below the preview button while the row is open; `item` is the entry and `index` its position. */
    detailsSnippet?: Snippet<[{ item: any; index: number }]>;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    items,
    color = "var(--background, #ffffff)",
    bgColor = "var(--primary, black)",
    insetBgColor = "var(--accent-dark, slategray)",
    previewWidth = "clamp(110px, 40vw, 410px)",
    previewHeight = "clamp(80px, 15vw, 120px)",
    openItemIndex = $bindable(-1),
    alwaysShowPreview = false,
    rowSnippet,
    showcaseSnippet,
    previewSnippet,
    detailsSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();

  const deferredSlide = (node: Element, params: SlideParams) => () => slide(node, params);

  let hoveredItemIndex = $state<number | undefined>(-1);
  let containerWidth = $state<number | undefined>(undefined);
</script>

<div
  id="preview-list-{uid}"
  class="preview-list"
  bind:clientWidth={containerWidth}
  style:--preview-list-color={color}
  style:--preview-list-background={bgColor}
  style:--preview-list-inset-background={insetBgColor}
  style:--preview-list-preview-width={previewWidth}
  style:--preview-list-preview-height={previewHeight}
  style:--preview-list-container-width={containerWidth + "px"}
  {style}>
  {#each items as item, i (i)}
    <article
      class="preview-list--row"
      class:header={i === 0}
      onmouseenter={() => (hoveredItemIndex = i)}
      // onmouseleave={() => (hoveredItemIndex = undefined)}
      onfocus={() => (hoveredItemIndex = i)}>
      <button
        class="preview-list--row-button"
        class:active={openItemIndex === i || hoveredItemIndex === i || alwaysShowPreview}
        onclick={() => {
          openItemIndex = openItemIndex === i ? -1 : i;
        }}>
        {@render snippetWrap(rowSnippet)?.({ item, index: i })}
      </button>
      <div class="preview-list--dropdown">
        {#if openItemIndex === i}
          <div class="preview-list--showcase" transition:deferredSlide={{ duration: 300 }}>
            {@render snippetWrap(showcaseSnippet)?.({ item, index: i })}
          </div>
        {/if}
        <div class="preview-list--preview">
          {#if openItemIndex === i || hoveredItemIndex === i || alwaysShowPreview}
            <div class="preview-list--preview-button-wrapper">
              <button
                class="preview-list--preview-button"
                class:open={openItemIndex === i}
                class:hovered={hoveredItemIndex === i || alwaysShowPreview}
                onclick={() => {
                  openItemIndex = openItemIndex === i ? -1 : i;
                }}>
                {@render snippetWrap(previewSnippet)?.({ item, index: i })}
              </button>
            </div>
          {/if}
          {#if openItemIndex === i}
            <aside class="preview-list--details" transition:deferredSlide={{ duration: 300 }}>
              {@render snippetWrap(detailsSnippet)?.({ item, index: i })}
            </aside>
          {/if}
        </div>
      </div>
    </article>
  {/each}
</div>

<style>
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
</style>
