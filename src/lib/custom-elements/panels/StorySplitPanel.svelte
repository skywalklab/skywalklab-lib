<svelte:options
  customElement={{
    tag: "skywalk-story-split-panel",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      title: { type: "String", attribute: "sw-title" },
      description: { type: "String", attribute: "sw-description" },
      items: { type: "Array", attribute: "sw-items" },
      image: { type: "Object", attribute: "sw-image" },
      headingColor: { type: "String", attribute: "sw-heading-color" },
      dotColor: { type: "String", attribute: "sw-dot-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "panels/StorySplitPanel", false);
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
  import StorySplitPanel from "../../components/panels/StorySplitPanel.svelte";

  let { title, description, items, image, headingColor, dotColor, style }: any = $props();
</script>

<StorySplitPanel {title} {description} {items} {image} {headingColor} {dotColor} {style} >
  {#snippet buttonSnippet()}
    <slot name="buttonSnippet"/>
  {/snippet}
</StorySplitPanel>


<style>
  :host {
    display: block;
  }

  :global {
.story-split-panel {
    --story-split-panel-accent: var(--accent, lightblue);

    display: grid;
    gap: 3rem;
    align-items: center;

    .story-split-panel--visual {
      position: relative;
      aspect-ratio: 4 / 5;
      isolation: isolate;

      .story-split-panel--frame {
        position: absolute;
        inset: 3% 12% 8% 8%;
        border: 2px solid color-mix(in srgb, var(--story-split-panel-accent), transparent 45%);
        border-radius: 24px;
        z-index: -1;
      }

      .story-split-panel--wedge {
        position: absolute;
        top: 2%;
        right: 3%;
        width: 20%;
        aspect-ratio: 1;
        background-color: var(--story-split-panel-accent);
        border-radius: 0 0 0 100%;
        z-index: -1;
      }

      .story-split-panel--image {
        position: absolute;
        top: 8%;
        left: 0;
        width: 78%;
        height: 92%;
        object-fit: cover;
        border-radius: 24px;
      }

      .story-split-panel--dots {
        position: absolute;
        right: 4%;
        bottom: 14%;
        width: 150px;
        height: 190px;
        color: var(--story-split-panel-dot-color, var(--story-split-panel-accent));
        z-index: -2;
      }
    }

    .story-split-panel--content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .story-split-panel--title {
        color: var(--story-split-panel-heading-color, var(--primary, black));
        font-size: clamp(30px, 3.4vw, 46px);
        line-height: 1.15;
        font-weight: 800;
        letter-spacing: -0.02em;
        text-transform: none;
        margin: 0 0 1.5rem;
        max-width: 18ch;
      }

      .story-split-panel--description {
        font-size: 16px;
        line-height: 28px;
        max-width: 58ch;
      }

      .story-split-panel--items {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
        gap: 1.75rem 2.5rem;
        width: 100%;
        margin: 2.5rem 0;

        .story-split-panel--item {
          .story-split-panel--item-title {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            color: var(--story-split-panel-heading-color, var(--primary, black));
            font-size: 18px;
            font-weight: 800;
            line-height: 1.3;
            margin-bottom: 0.6rem;

            .story-split-panel--item-icon {
              display: flex;
              flex-shrink: 0;
              color: var(--story-split-panel-accent);
            }
          }

          .story-split-panel--item-description {
            font-size: 15px;
            line-height: 26px;
          }
        }
      }
    }

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1.1fr;
      gap: 4.5rem;
    }
  }
  }
</style>
      