<svelte:options
  customElement={{
    tag: "skywalk-picture-mat",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      top: { type: "String", attribute: "sw-top" },
      left: { type: "String", attribute: "sw-left" },
      right: { type: "String", attribute: "sw-right" },
      bottom: { type: "String", attribute: "sw-bottom" },
      innerMat: { type: "Boolean", attribute: "sw-inner-mat" },
      matColor: { type: "String", attribute: "sw-mat-color" },
      intersectionActions: { type: "Array", attribute: "sw-intersection-actions" },
      intersectionActionParams: { type: "Object", attribute: "sw-intersection-action-params" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "frames/PictureMat", false);
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
  import PictureMat from "../../components/frames/PictureMat.svelte";

  let { top, left, right, bottom, innerMat, matColor, intersectionActions, intersectionActionParams, style }: any = $props();
</script>

<PictureMat {top} {left} {right} {bottom} {innerMat} {matColor} {intersectionActions} {intersectionActionParams} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
</PictureMat>


<style>
  :host {
    display: block;
  }

  :global {
.picture-mat {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;

    &::before {
      content: "";
      background-color: var(--picture-mat-mat-color);
      position: absolute;
      top: var(--picture-mat-top);
      bottom: var(--picture-mat-bottom);
      left: var(--picture-mat-left);
      right: var(--picture-mat-right);
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
      border-radius: 8px;
      transition:
        top 0.5s cubic-bezier(0, 0, 0.58, 1),
        bottom 0.5s cubic-bezier(0, 0, 0.58, 1),
        left 0.5s cubic-bezier(0, 0, 0.58, 1),
        right 0.5s cubic-bezier(0, 0, 0.58, 1);

      @media (prefers-reduced-motion: reduce) {
        transition: all 1s cubic-bezier(0, 0, 0.58, 1);
      }
    }

    :global {
      > :first-child,
      ::slotted(:first-child) {
        width: 100%;
        height: auto;
        overflow: hidden;
        border-radius: 8px;
        margin: 0 auto;
        transition:
          transform 0.5s cubic-bezier(0, 0, 0.58, 1),
          opacity 0.5s cubic-bezier(0, 0, 0.58, 1);

        @media (prefers-reduced-motion: reduce) {
          transition: all 1s cubic-bezier(0, 0, 0.58, 1);
        }
      }
    }

    &.entry-animate {
      &::before {
        top: calc(var(--picture-mat-top) * 0);
        left: calc(var(--picture-mat-left) * 0);
        right: calc(var(--picture-mat-right) * 0);
        bottom: calc(var(--picture-mat-bottom) * 0);
      }
    }

    &.has-inner-mat {
      :global {
        > :first-child,
        > ::slotted(:first-child) {
          background-color: #ffffff;
          border: 1px solid #ddd;
          box-shadow: 0 2px 4px #0000001a;
          padding: 6px;
        }
      }
    }
  }
  }
</style>
      