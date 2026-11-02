<svelte:options
  customElement={{
    tag: "skywalk-about-split-panel",
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
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "panels/AboutSplitPanel", false);
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
  import AboutSplitPanel from "../../components/panels/AboutSplitPanel.svelte";

  let { title, description, items, image, headingColor, dotColor, style }: any = $props();
</script>

<AboutSplitPanel {title} {description} {items} {image} {headingColor} {dotColor} {style} >
  {#snippet buttonSnippet()}
    <slot name="buttonSnippet"/>
  {/snippet}
</AboutSplitPanel>


<style>
  :host {
    display: block;
  }

  :global {
.about-split-panel {
    --about-split-panel-accent: var(--accent, lightblue);

    .about-split-panel--inner-container {
      display: grid;
      gap: 3.5rem;
      align-items: center;

      .about-split-panel--visual {
        position: relative;
        aspect-ratio: 1 / 1;
        isolation: isolate;

        .about-split-panel--dots {
          position: absolute;
          width: 36px;
          height: 162px;
          color: var(--about-split-panel-dot-color, var(--about-split-panel-accent));

          &.left {
            left: 2%;
            top: 20%;
          }

          &.right {
            right: 2%;
            bottom: 20%;
          }
        }

        .about-split-panel--backdrop {
          position: absolute;
          inset: 8% 17.5% 5% 17.5%;
          border-radius: 30px;
          background: linear-gradient(
            135deg,
            var(--about-split-panel-accent) 0%,
            color-mix(in srgb, var(--about-split-panel-accent), #fff 94%) 45%,
            color-mix(in srgb, var(--about-split-panel-accent), #fff 94%) 58%,
            var(--about-split-panel-accent) 100%
          );
          z-index: -2;
        }

        .about-split-panel--outline {
          position: absolute;
          inset: 19% 18.5% 10% 26.5%;
          border: 2px solid var(--about-split-panel-accent);
          border-radius: 30px;
          z-index: -1;
        }

        .about-split-panel--image {
          position: absolute;
          top: 51%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 64%;
          aspect-ratio: 1 / 1;
          height: auto;
          object-fit: cover;
          border-radius: 50%;
        }

        .about-split-panel--dot {
          position: absolute;
          left: 26.5%;
          bottom: 13%;
          transform: translateX(-50%);
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background-color: var(--about-split-panel-accent);
        }
      }

      .about-split-panel--content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;

        .about-split-panel--title {
          color: var(--about-split-panel-heading-color, var(--primary, black));
          font-size: clamp(30px, 3.4vw, 46px);
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -0.02em;
          text-transform: none;
        }

        .about-split-panel--description {
          font-size: 16px;
          line-height: 28px;
          max-width: 56ch;
        }

        .about-split-panel--items {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem 2rem;
          width: 100%;
          margin-block: 0.5rem;

          .about-split-panel--item {
            display: flex;
            align-items: center;
            gap: 0.65rem;
            font-size: 16px;
            line-height: 24px;
            color: var(--about-split-panel-heading-color, var(--primary, black));

            .about-split-panel--item-icon {
              display: flex;
              flex-shrink: 0;
              color: var(--about-split-panel-accent);
            }
          }
        }
      }

      @media (min-width: 1024px) {
        grid-template-columns: 1fr 1fr;
        gap: 5rem;
      }
    }
  }
  }
</style>
      