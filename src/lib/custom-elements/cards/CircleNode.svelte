<svelte:options
  customElement={{
    tag: "skywalk-circle-node",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      icon: { type: "String", attribute: "sw-icon" },
      iconProps: { type: "Object", attribute: "sw-icon-props" },
      animate: { type: "Boolean", attribute: "sw-animate" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "cards/CircleNode", false);
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
  import CircleNode from "../../components/cards/CircleNode.svelte";

  let { icon, iconProps, animate, style }: any = $props();
</script>

<CircleNode {icon} {iconProps} {animate} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.circle-node {
    --circle-node-animation-duration: 0.3s;
    padding: 2.5rem;
    border: 1px solid #e2e6e7;
    border-radius: 50%;
    width: fit-content;
    position: relative;
    margin-bottom: 2.5rem;

    .circle-node--image-container {
      overflow: hidden;
      border-radius: inherit;
    }

    &::before {
      content: "";
      position: absolute;
      top: calc(100%);
      left: 0;
      right: 0;
      margin: 0 auto;
      height: 2rem;
      width: 1px;
      background-color: #e2e6e7;
    }

    &::after {
      content: "";
      position: absolute;
      top: calc(100% + 2rem);
      left: 0;
      right: 0;
      margin: 0 auto;
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      border: 1px solid #e2e6e7;
    }

    &.animate {
      &::before {
        animation: var(--circle-node-animation-duration) ease-in slide-down-before;
        animation-fill-mode: forwards;
      }

      &::after {
        animation: var(--circle-node-animation-duration) ease-in slide-down-after;
        animation-fill-mode: forwards;
      }
    }
  }

  @keyframes slide-down-before {
    0% {
      height: 0rem;
    }

    100% {
      height: 2rem;
    }
  }

  @keyframes slide-down-after {
    0% {
      top: 100%;
    }

    100% {
      top: calc(100% + 2rem);
    }
  }
  }
</style>
      