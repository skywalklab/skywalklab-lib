<svelte:options
  customElement={{
    tag: "skywalk-book-3d",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      width: { type: "String", attribute: "sw-width" },
      height: { type: "String", attribute: "sw-height" },
      spine: { type: "String", attribute: "sw-spine" },
      rotation: { type: "String", attribute: "sw-rotation" },
      hoverable: { type: "Boolean", attribute: "sw-hoverable" },
      dominantColor: { type: "String", attribute: "sw-dominant-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "frames/Book3D", false);
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
  /* eslint-disable svelte/no-useless-children-snippet */
  import Book3D from "../../components/frames/Book3D.svelte";

  let { width, height, spine, rotation, hoverable, dominantColor, style }: any = $props();
</script>

<Book3D {width} {height} {spine} {rotation} {hoverable} {dominantColor} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</Book3D>


<style>
  :host {
    display: block;
  }

  :global {
.book-3d {
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 600px;

    &.hoverable:hover,
    &.hoverable:focus-visible,
    &.hoverable:focus {
      .book-3d--cover {
        transform: rotateY(0deg);
      }
    }
  }

  @keyframes initAnimation {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(var(--book-3d-rotation));
    }
  }

  .book-3d--cover {
    width: var(--book-3d-width);
    height: var(--book-3d-height);
    position: relative;
    transform-style: preserve-3d;
    transform: rotateY(var(--book-3d-rotation));
    transition: transform 1s ease;
    animation: 1s ease 0s 1 initAnimation;

    &::before {
      position: absolute;
      content: " ";
      background-color: #fff;
      left: 0;
      top: 1px;
      width: 28px;
      height: calc(var(--book-3d-height) - 2px);
      transform: translateX(var(--book-3d-spine)) rotateY(90deg);
      background: linear-gradient(
        90deg,
        #fff 0%,
        #f9f9f9 5%,
        #fff 10%,
        #f9f9f9 15%,
        #fff 20%,
        #f9f9f9 25%,
        #fff 30%,
        #f9f9f9 35%,
        #fff 40%,
        #f9f9f9 45%,
        #fff 50%,
        #f9f9f9 55%,
        #fff 60%,
        #f9f9f9 65%,
        #fff 70%,
        #f9f9f9 75%,
        #fff 80%,
        #f9f9f9 85%,
        #fff 90%,
        #f9f9f9 95%,
        #fff 100%
      );
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: " ";
      width: var(--book-3d-width);
      height: var(--book-3d-height);
      transform: translateZ(-15px);
      background-color: var(--book-3d-dominant-color);
      border-radius: 0 2px 2px 0;
      box-shadow: 0px 0 5px 0px #666;
    }

    :global {
      picture,
      ::slotted(picture) {
        display: contents;
      }

      img,
      ::slotted(img) {
        position: absolute;
        top: 0;
        left: 0;
        width: var(--book-3d-width) !important;
        height: var(--book-3d-height) !important;
        background-color: var(--book-3d-dominant-color) !important;
        transform: translateZ(15px) !important;
        border-radius: 0 2px 2px 0;
        box-shadow: 5px 5px 20px #666;
      }
    }
  }
  }
</style>
      