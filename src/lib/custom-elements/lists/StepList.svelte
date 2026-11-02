<svelte:options
  customElement={{
    tag: "skywalk-step-list",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      breakEven: { type: "Boolean", attribute: "sw-break-even" },
      color: { type: "String", attribute: "sw-color" },
      bgColor: { type: "String", attribute: "sw-bg-color" },
      stepNumColor: { type: "String", attribute: "sw-step-num-color" },
      borderColor: { type: "String", attribute: "sw-border-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "lists/StepList", false);
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
  import StepList from "../../components/lists/StepList.svelte";

  let { items, breakEven, color, bgColor, stepNumColor, borderColor, style }: any = $props();
</script>

<StepList {items} {breakEven} {color} {bgColor} {stepNumColor} {borderColor} {style} >
  {#snippet stepSnippet()}
    <slot name="stepSnippet"/>
  {/snippet}
</StepList>


<style>
  :host {
    display: block;
  }

  :global {
.step-list {
    container: step-list / inline-size;

    .step-list--inner-container {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

      &.break-even {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr) minmax(250px, 1fr));
      }
    }

    .step-list--step-wrapper {
      height: 100%;
    }

    .step-list--step {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      border: 1px solid var(--step-list-border-color, #e0e0e0);
      border-radius: 12px;
      padding: 20px;
      color: inherit;
      background-color: var(--step-list-bg-color);

      .step-list--step-heading {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        color: inherit;

        :global(.step-list--step-img) {
          height: 50px;
          width: auto;
        }

        .step-list--step-num {
          color: var(--step-list-step-num-color, var(--primary, black));
          font-size: 50px;
          margin-bottom: 0.5rem;
        }

        .step-list--step-title {
          font-size: 24px;
        }
      }

      .step-list--step-description {
        color: var(--step-list-color);
      }
    }
  }

  @container step-list (width < 516px) {
    .step-list--inner-container,
    .step-list--inner-container.break-even {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }
  }
</style>
      