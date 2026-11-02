<svelte:options
  customElement={{
    tag: "skywalk-tabbed-split-panel",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      title: { type: "String", attribute: "sw-title" },
      description: { type: "String", attribute: "sw-description" },
      items: { type: "Array", attribute: "sw-items" },
      maxItems: { type: "Number", attribute: "sw-max-items" },
      showMoreText: { type: "String", attribute: "sw-show-more-text" },
      showLessText: { type: "String", attribute: "sw-show-less-text" },
      buttonClass: { type: "String", attribute: "sw-button-class" },
      headingColor: { type: "String", attribute: "sw-heading-color" },
      tabsBgColor: { type: "String", attribute: "sw-tabs-bg-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "panels/TabbedSplitPanel", false);
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
  import TabbedSplitPanel from "../../components/panels/TabbedSplitPanel.svelte";

  let { title, description, items, maxItems, showMoreText, showLessText, buttonClass, headingColor, tabsBgColor, style }: any = $props();
</script>

<TabbedSplitPanel {title} {description} {items} {maxItems} {showMoreText} {showLessText} {buttonClass} {headingColor} {tabsBgColor} {style} >
  {#snippet buttonSnippet()}
    <slot name="buttonSnippet"/>
  {/snippet}
</TabbedSplitPanel>


<style>
  :host {
    display: block;
  }

  :global {
.tabbed-split-panel {
    display: grid;
    gap: 3rem;
    align-items: center;

    .tabbed-split-panel--content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .tabbed-split-panel--title {
        color: var(--tabbed-split-panel-heading-color, var(--primary, black));
        font-size: clamp(30px, 3.4vw, 46px);
        line-height: 1.15;
        font-weight: 800;
        letter-spacing: -0.02em;
        text-transform: none;
        margin: 0 0 1.5rem;
        max-width: 16ch;
      }

      .tabbed-split-panel--description {
        font-size: 16px;
        line-height: 28px;
        max-width: 54ch;
      }

      .tabbed-split-panel--overview {
        margin-top: 1.5rem;
        max-width: 54ch;

        .tabbed-split-panel--overview-paragraph {
          font-size: 15px;
          line-height: 27px;
          color: color-mix(in srgb, var(--tabbed-split-panel-heading-color, var(--primary, black)), transparent 25%);

          & + .tabbed-split-panel--overview-paragraph {
            margin-top: 1rem;
          }
        }
      }

      .tabbed-split-panel--button-container {
        margin-top: 2.5rem;
      }
    }

    .tabbed-split-panel--tabs {
      border-radius: 16px;
      overflow: hidden;
      background-color: var(--tabbed-split-panel-tabs-bg-color, var(--accent, lightblue));
      box-shadow: 0 14px 34px rgba(15, 25, 34, 0.08);

      .tabbed-split-panel--tablist {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(max-content, 1fr);
        overflow-x: auto;
        scrollbar-width: none;
        border-bottom: 1px solid
          color-mix(in srgb, var(--tabbed-split-panel-heading-color, var(--primary, black)), transparent 90%);

        &::-webkit-scrollbar {
          display: none;
        }

        .tabbed-split-panel--tab {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          white-space: nowrap;
          background-color: transparent;
          border: 0;
          border-bottom: 3px solid transparent;
          color: color-mix(in srgb, var(--tabbed-split-panel-heading-color, var(--primary, black)), transparent 35%);
          font: inherit;
          font-size: 15px;
          font-weight: 600;
          padding: 1.1rem 1.25rem;
          cursor: pointer;
          transition:
            background-color 0.15s linear,
            color 0.15s linear,
            border-bottom-color 0.15s linear;

          .tabbed-split-panel--tab-icon {
            display: flex;
          }

          &:hover {
            color: var(--tabbed-split-panel-heading-color, var(--primary, black));
            background-color: color-mix(
              in srgb,
              var(--tabbed-split-panel-heading-color, var(--primary, black)),
              transparent 96%
            );
          }

          &.active {
            color: var(--tabbed-split-panel-heading-color, var(--primary, black));
            border-bottom-color: var(--tabbed-split-panel-heading-color, var(--primary, black));
          }
        }
      }

      .tabbed-split-panel--panel {
        padding: 1.5rem 1.75rem 2rem;

        .tabbed-split-panel--panel-head {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;

          .tabbed-split-panel--panel-image {
            flex: none;
            width: 64px;
            height: 76px;
            object-fit: contain;
            object-position: center bottom;
          }

          .tabbed-split-panel--panel-title {
            color: var(--tabbed-split-panel-heading-color, var(--primary, black));
            font-size: 20px;
            line-height: 1.3;
            font-weight: 800;
            letter-spacing: -0.01em;
            text-transform: none;
          }
        }

        .tabbed-split-panel--plans {
          .tabbed-split-panel--plan {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 1rem;
            padding: 0.7rem 0;
            border-bottom: 1px solid
              color-mix(in srgb, var(--tabbed-split-panel-heading-color, var(--primary, black)), transparent 92%);

            .tabbed-split-panel--plan-name {
              font-size: 15px;
            }

            .tabbed-split-panel--plan-price {
              color: var(--tabbed-split-panel-heading-color, var(--primary, black));
              font-size: 15px;
              font-weight: 700;
              white-space: nowrap;
            }
          }
        }

        .tabbed-split-panel--items {
          display: grid;

          .tabbed-split-panel--item {
            display: flex;
            align-items: center;
            gap: 0.65rem;
            font-size: 15px;
            line-height: 1.4;
            padding: 0.8rem 0;
            border-bottom: 1px solid
              color-mix(in srgb, var(--tabbed-split-panel-heading-color, var(--primary, black)), transparent 92%);

            &:last-child {
              border-bottom: 0;
            }

            .tabbed-split-panel--item-icon {
              display: flex;
              flex-shrink: 0;
              color: var(--tabbed-split-panel-heading-color, var(--primary, black));
            }
          }

          &.expanded {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            column-gap: 2rem;

            .tabbed-split-panel--item {
              padding: 0.45rem 0;
              border-bottom: 0;
              align-items: flex-start;

              .tabbed-split-panel--item-icon {
                margin-top: 0.2rem;
              }
            }
          }
        }

        .tabbed-split-panel--toggle {
          margin-top: 1rem;
        }
      }
    }

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr;
      gap: 4.5rem;
    }
  }
  }
</style>
      