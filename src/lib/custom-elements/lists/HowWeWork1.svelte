<svelte:options
  customElement={{
    tag: "skywalk-how-we-work-1",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      steps: { type: "Array", attribute: "sw-steps" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "lists/HowWeWork1", false);
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
  import HowWeWork1 from "../../components/lists/HowWeWork1.svelte";

  let { steps, style }: any = $props();
</script>

<HowWeWork1 {steps} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.how-we-work-1 {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;

    @media (min-width: 768px) {
      flex-direction: row;
    }

    .how-we-work-1--inner-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;

      @media (min-width: 768px) {
        flex-direction: row;
      }
    }

    .how-we-work-1--step-container {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0.5rem;
      box-shadow:
        0 0 10px 0 rgba(0, 0, 0, 0.025),
        0 1px 1px 0 rgba(0, 0, 0, 0.01),
        0 0 50px 0 rgba(0, 0, 0, 0.07);
      width: 120px;
      font-size: 15px;
    }

    .how-we-work-1--arrow-container {
      width: fit-content;

      &.last {
        display: none;
      }

      :global {
        .lucide-arrow-right {
          display: none;
        }

        @media (min-width: 768px) {
          .lucide-arrow-right {
            display: block;
          }

          .lucide-arrow-down {
            display: none;
          }
        }
      }
    }
  }
  }
</style>
      