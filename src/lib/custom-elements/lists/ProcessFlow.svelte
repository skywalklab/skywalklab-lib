<svelte:options
  customElement={{
    tag: "skywalk-process-flow",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      title: { type: "String", attribute: "sw-title" },
      items: { type: "Array", attribute: "sw-items" },
      headingColor: { type: "String", attribute: "sw-heading-color" },
      discBgColor: { type: "String", attribute: "sw-disc-bg-color" },
      arrowColor: { type: "String", attribute: "sw-arrow-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "lists/ProcessFlow", false);
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
  import ProcessFlow from "../../components/lists/ProcessFlow.svelte";

  let { title, items, headingColor, discBgColor, arrowColor, style }: any = $props();
</script>

<ProcessFlow {title} {items} {headingColor} {discBgColor} {arrowColor} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.process-flow {
    --process-flow-accent: var(--accent, lightblue);

    .process-flow--title {
      color: var(--process-flow-heading-color, var(--primary, black));
      font-size: clamp(30px, 3.4vw, 46px);
      line-height: 1.15;
      font-weight: 800;
      letter-spacing: -0.02em;
      text-transform: none;
      text-align: center;
      margin-bottom: 4rem;
    }

    .process-flow--steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2.5rem 1.5rem;

      .process-flow--step {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1rem;

        .process-flow--disc {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background-color: var(--process-flow-disc-bg-color, var(--process-flow-accent));
          color: var(--primary, black);

          .process-flow--number {
            position: absolute;
            top: -4px;
            left: -10px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background-color: var(--primary, black);
            color: var(--process-flow-accent);
            font-size: 15px;
            font-weight: 700;
          }
        }

        .process-flow--step-title {
          color: var(--process-flow-heading-color, var(--primary, black));
          font-size: 22px;
          line-height: 1.3;
          font-weight: 800;
          letter-spacing: -0.01em;
          text-transform: none;

          .process-flow--step-link {
            transition: color 0.15s linear;
            text-decoration: underline;

            &:hover {
              color: color-mix(in srgb, var(--process-flow-heading-color, var(--primary, black)), transparent 35%);
            }
          }
        }

        .process-flow--step-description {
          font-size: 15px;
          line-height: 26px;
          max-width: 34ch;
        }

        .process-flow--arrow {
          display: none;
          color: var(--process-flow-arrow-color, var(--accent-dark, slategray));

          @media (min-width: 768px) {
            display: block;
            position: absolute;
            top: 42px;
            left: 72%;
            width: 130px;
          }
        }

        &:nth-child(even) .process-flow--arrow {
          transform: scaleY(-1);
          top: -10px;
        }

        @media (min-width: 768px) {
          &:nth-child(even) {
            margin-top: 5rem;
          }
        }
      }
    }
  }
  }
</style>
      