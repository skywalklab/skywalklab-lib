<svelte:options
  customElement={{
    tag: "skywalk-slideshow-icon",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      duration: { type: "Number", attribute: "sw-duration" },
      height: { type: "String", attribute: "sw-height" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "animations/SlideshowIcon", false);
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
  import SlideshowIcon from "../../components/animations/SlideshowIcon.svelte";

  let { items, duration, height, style }: any = $props();
</script>

<SlideshowIcon {items} {duration} {height} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.slideshow-icon {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;

    .slideshow-icon--buttons-container {
      display: flex;
      gap: 1rem;

      .slideshow-icon--button-container {
        border-radius: calc(var(--slideshow-icon-height, 5rem) * var(--slideshow-icon-radius-ratio, 0.25));
        position: relative;
        overflow: hidden;
        height: var(--slideshow-icon-height, 5rem);
        width: var(--slideshow-icon-height, 5rem);
        display: flex;
        justify-content: center;
        align-items: center;
        --slideshow-icon-current-color: #e0dfdd;

        &.selected {
          --slideshow-icon-current-color: var(--slideshow-icon-color);

          .slideshow-icon--button > :first-child {
            filter: unset;
          }
        }

        &::before {
          content: "";
          background: conic-gradient(
            from -45deg,
            var(--slideshow-icon-current-color) var(--slideshow-icon-progress),
            var(--background, white) var(--slideshow-icon-progress)
          );
          height: var(--slideshow-icon-height, 5rem);
          width: var(--slideshow-icon-height, 5rem);
          position: absolute;
          z-index: 0;
        }

        &::after {
          content: "";
          --slideshow-icon-height: 90%;
          height: var(--slideshow-icon-height, 5rem);
          width: var(--slideshow-icon-height, 5rem);
          border-radius: calc(var(--slideshow-icon-height, 5rem) * var(--slideshow-icon-radius-ratio, 0.25));
          background-color: var(--background, white);
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          z-index: 1;
        }

        .slideshow-icon--button {
          --slideshow-icon-height: 75%;
          cursor: pointer;
          height: var(--slideshow-icon-height, 5rem);
          width: var(--slideshow-icon-height, 5rem);
          border-radius: calc(var(--slideshow-icon-height, 5rem) * var(--slideshow-icon-radius-ratio, 0.25));
          background-color: var(--slideshow-icon-current-color);
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background-color 0.3s linear;

          :global {
            img,
            svg {
              height: var(--slideshow-icon-height, 5rem);
              width: auto;
              filter: brightness(0) invert(1);
            }
          }
        }
      }
    }

    .slideshow-icon--text-container {
      width: 200px;

      dl {
        margin: 0;
      }

      .slideshow-icon--title {
        font-weight: bold;
        font-size: 20px;
        text-wrap: balance;
      }

      .slideshow-icon--description {
        color: rgb(119 113 105 / var(--tw-text-opacity, 1));
        text-wrap: balance;
      }
    }
  }
  }
</style>
      