<svelte:options
  customElement={{
    tag: "skywalk-image-card-grid",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      title: { type: "String", attribute: "sw-title" },
      description: { type: "String", attribute: "sw-description" },
      items: { type: "Array", attribute: "sw-items" },
      linkText: { type: "String", attribute: "sw-link-text" },
      headingColor: { type: "String", attribute: "sw-heading-color" },
      badgeBgColor: { type: "String", attribute: "sw-badge-bg-color" },
      badgeColor: { type: "String", attribute: "sw-badge-color" },
      cardBgColor: { type: "String", attribute: "sw-card-bg-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "lists/ImageCardGrid", false);
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
  import ImageCardGrid from "../../components/lists/ImageCardGrid.svelte";

  let { title, description, items, linkText, headingColor, badgeBgColor, badgeColor, cardBgColor, style }: any = $props();
</script>

<ImageCardGrid {title} {description} {items} {linkText} {headingColor} {badgeBgColor} {badgeColor} {cardBgColor} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.image-card-grid {
    .image-card-grid--inner-container {
      .image-card-grid--heading {
        display: grid;
        gap: 1.5rem;
        align-items: center;
        margin-bottom: 3.5rem;

        .image-card-grid--title {
          color: var(--image-card-grid-heading-color, var(--primary, black));
          font-size: clamp(30px, 3.4vw, 46px);
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -0.02em;
          text-transform: none;
        }

        .image-card-grid--description {
          font-size: 16px;
          line-height: 28px;
        }

        @media (min-width: 1024px) {
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }
      }

      .image-card-grid--cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;

        .image-card-grid--card {
          background-color: var(--image-card-grid-card-bg-color, var(--accent, lightblue));
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 18px 40px rgba(15, 25, 34, 0.1);

          .image-card-grid--media {
            position: relative;
            margin: 0.75rem 0.75rem 0;

            .image-card-grid--image {
              width: 100%;
              aspect-ratio: 16 / 11;
              height: auto;
              object-fit: cover;
              border-radius: 10px;
            }

            .image-card-grid--badge {
              position: absolute;
              right: 0;
              bottom: 0;
              transform: translate(18%, 34%);
              display: flex;
              align-items: center;
              justify-content: center;
              width: 68px;
              height: 68px;
              border-radius: 50%;
              background-color: var(--image-card-grid-badge-bg-color, var(--primary, black));
              color: var(--image-card-grid-badge-color, var(--accent, lightblue));
            }
          }

          .image-card-grid--body {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            padding: 2rem 1.75rem;

            .image-card-grid--card-title {
              color: var(--image-card-grid-heading-color, var(--primary, black));
              font-size: 24px;
              line-height: 1.25;
              font-weight: 800;
              letter-spacing: -0.01em;
              text-transform: none;
            }

            .image-card-grid--card-summary {
              font-size: 15px;
              line-height: 26px;
            }

            .image-card-grid--card-link {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              color: var(--image-card-grid-heading-color, var(--primary, black));
              font-size: 15px;
              font-weight: 600;
              transition: color 0.15s linear;

              &:hover {
                color: color-mix(in srgb, var(--image-card-grid-heading-color, var(--primary, black)), transparent 35%);
              }
            }
          }
        }
      }
    }
  }
  }
</style>
      