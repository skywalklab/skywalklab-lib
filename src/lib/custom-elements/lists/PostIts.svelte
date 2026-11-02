<svelte:options
  customElement={{
    tag: "skywalk-post-its",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      color: { type: "String", attribute: "sw-color" },
      bgFromColor: { type: "String", attribute: "sw-bg-from-color" },
      bgToColor: { type: "String", attribute: "sw-bg-to-color" },
      cornerColor: { type: "String", attribute: "sw-corner-color" },
      intersectionActions: { type: "Array", attribute: "sw-intersection-actions" },
      intersectionActionParams: { type: "Object", attribute: "sw-intersection-action-params" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "lists/PostIts", false);
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
  import PostIts from "../../components/lists/PostIts.svelte";

  let { items, color, bgFromColor, bgToColor, cornerColor, intersectionActions, intersectionActionParams, style }: any = $props();
</script>

<PostIts {items} {color} {bgFromColor} {bgToColor} {cornerColor} {intersectionActions} {intersectionActionParams} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.post-its {
    width: 100%;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(205px, 1fr));
    justify-items: center;
    column-gap: 1rem;
    row-gap: 2.5rem;

    .post-its--item {
      position: relative;
      background: linear-gradient(145deg, var(--post-its-bg-from), var(--post-its-bg-to));
      color: var(--post-its-color);
      box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      padding: 2rem 1rem 1rem;
      transform: rotate(-2deg);
      max-width: 300px;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
      transition: transform 0.5s ease;
      overflow: hidden;

      @media (prefers-reduced-motion: reduce) {
        transition: all 1s ease;
      }

      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-top: 30px solid var(--post-its-corner-color);
        border-left: 30px solid transparent;
      }

      &:nth-of-type(even) {
        transform: rotate(2deg);

        &::after {
          border-left: unset;
          border-right: 30px solid transparent;
          right: unset;
          left: 0;
        }
      }

      .post-its--title {
        font-size: clamp(20px, 5vw, 28px);
        text-align: center;
      }

      .post-its--body {
        display: flex;
        gap: 0.5rem;

        .post-its--description {
          text-wrap: balance;
        }
      }

      .post-its--divider {
        width: 100%;
        margin-top: 0.5rem;
      }
    }

    &.entry-animate {
      .post-its--item {
        &:nth-of-type(even) {
          transform: rotate(-2deg);

          &::after {
            border-left: 30px solid transparent;
            border-right: unset;
            right: 0;
            left: unset;
          }
        }

        &:nth-of-type(odd) {
          transform: rotate(2deg);

          &::after {
            border-left: unset;
            border-right: 30px solid transparent;
            right: unset;
            left: 0;
          }
        }
      }
    }
  }
  }
</style>
      