<svelte:options
  customElement={{
    tag: "skywalk-image-by-list",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      image: { type: "Object", attribute: "sw-image" },
      items: { type: "Array", attribute: "sw-items" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "lists/ImageByList", false);
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
  import ImageByList from "../../components/lists/ImageByList.svelte";

  let { image, items, style }: any = $props();
</script>

<ImageByList {image} {items} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.image-by-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: clamp(2rem, 5.5vw, 4rem);

    .image-by-list--image-container {
      width: clamp(300px, 40vw, 480px);
      height: clamp(300px, 40vw, 480px);
      border-radius: 50%;
      overflow: hidden;

      .image-by-list--image {
        width: 100%;
        height: 100%;
        object-position: top;
        object-fit: cover;
      }
    }

    .image-by-list--list {
      flex: 1;
      min-width: 280px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .image-by-list--item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1.5rem;

        .image-by-list--icon-container {
          padding: 1rem;
          width: fit-content;
          height: fit-content;
          border: 1px solid #e2e6e7;
          border-radius: 50%;

          img,
          :global(svg) {
            width: clamp(32px, 4.5vw, 48px);
            height: clamp(32px, 4.5vw, 48px);
            stroke-width: 1.1px;
          }
        }

        .image-by-list--text-container {
          flex: 1;
          width: fit-content;
          min-width: 250px;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;

          .image-by-list--title {
            font-size: clamp(18px, 2.5vw, 22px);
            line-height: 26px;
          }
        }
      }
    }
  }
  }
</style>
      