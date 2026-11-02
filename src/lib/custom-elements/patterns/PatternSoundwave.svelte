<svelte:options
  customElement={{
    tag: "skywalk-pattern-soundwave",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      bgColor: { type: "String", attribute: "sw-bg-color" },
      barOpacity: { type: "Number", attribute: "sw-bar-opacity" },
      barWidth: { type: "Number", attribute: "sw-bar-width" },
      barCap: { type: "String", attribute: "sw-bar-cap" },
      barColor1: { type: "String", attribute: "sw-bar-color-1" },
      barColor2: { type: "String", attribute: "sw-bar-color-2" },
      barColor3: { type: "String", attribute: "sw-bar-color-3" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "patterns/PatternSoundwave", false);
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
  import PatternSoundwave from "../../components/patterns/PatternSoundwave.svelte";

  let { bgColor, barOpacity, barWidth, barCap, barColor1, barColor2, barColor3, style }: any = $props();
</script>

<PatternSoundwave {bgColor} {barOpacity} {barWidth} {barCap} {barColor1} {barColor2} {barColor3} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.pattern-soundwave {
    width: 100%;
    height: 100%;
    background-color: var(--pattern-soundwave-bg-color);

    .pattern-soundwave--bar-1,
    .pattern-soundwave--bar-2,
    .pattern-soundwave--bar-3 {
      opacity: var(--pattern-soundwave-bar-opacity);
      transform: scaleY(1);
      transform-origin: center;
      transition:
        opacity 0.75s cubic-bezier(0.34, 1.5, 0.64, 1),
        transform 0.75s cubic-bezier(0.34, 1.5, 0.64, 1);
    }

    .pattern-soundwave--bar-1 {
      stroke: var(--pattern-soundwave-bar-color-1);
    }

    .pattern-soundwave--bar-2 {
      stroke: var(--pattern-soundwave-bar-color-2);
    }

    .pattern-soundwave--bar-3 {
      stroke: var(--pattern-soundwave-bar-color-3);
    }
  }
  }
</style>
      