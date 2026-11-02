<svelte:options
  customElement={{
    tag: "skywalk-animated-mermaid-diagram",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      rawSvg: { type: "String", attribute: "sw-raw-svg" },
      caption: { type: "String", attribute: "sw-caption" },
      nudgeNodes: { type: "Array", attribute: "sw-nudge-nodes" },
      nudgeBy: { type: "Number", attribute: "sw-nudge-by" },
      clusterLabel: { type: "Object", attribute: "sw-cluster-label" },
      clusterRadius: { type: "String", attribute: "sw-cluster-radius" },
      intersectionActions: { type: "Array", attribute: "sw-intersection-actions" },
      intersectionActionParams: { type: "Object", attribute: "sw-intersection-action-params" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "diagrams/AnimatedMermaidDiagram", false);
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
  import AnimatedMermaidDiagram from "../../components/diagrams/AnimatedMermaidDiagram.svelte";

  let { rawSvg, caption, nudgeNodes, nudgeBy, clusterLabel, clusterRadius, intersectionActions, intersectionActionParams, style }: any = $props();
</script>

<AnimatedMermaidDiagram {rawSvg} {caption} {nudgeNodes} {nudgeBy} {clusterLabel} {clusterRadius} {intersectionActions} {intersectionActionParams} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.animated-mermaid-diagram {
    width: 100%;
    position: relative;
    bottom: 2rem;

    .animated-mermaid-diagram--caption {
      font-size: 14px;
      font-style: italic;
      position: absolute;
      top: calc(100% + 1.5rem);
      right: 0;
      text-align: end;
    }
  }
  }
</style>
      