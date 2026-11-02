<script lang="ts">
  import {
    handleIntersectionEvent,
    type IntersectionAction,
    type IntersectionActionParams
  } from "../../actions/intersection-observer.svelte.js";
  import { animateArrowPaths } from "../../actions/animate-paths.js";

  interface Props {
    /** Raw SVG markup for the diagram. Expects a Mermaid `flowchart-v2` export. */
    rawSvg: string;
    /** Caption shown beneath the diagram. */
    caption?: string;
    /** Selectors for nodes nudged down by `nudgeBy`, to sit them off their cluster border. */
    nudgeNodes?: string[];
    /** Pixels to move `nudgeNodes` down by. */
    nudgeBy?: number;
    /** Width, height and font size applied to each cluster label, so long phase titles don't wrap. Left as Mermaid rendered them when unset. */
    clusterLabel?: { width?: string; height?: string; fontSize?: string };
    /** Corner radius applied to each cluster box. */
    clusterRadius?: string;
    /** When the animation runs: `onLoad` starts it on page load, `onEnter` starts or resumes it when the component scrolls into view, `onLeave` stops it when it scrolls out. */
    intersectionActions?: IntersectionAction[];
    /** Settings for the intersection observer behind those events. `noAnimate` skips it entirely, as does `prefers-reduced-motion`. Passing `onLoad`, `onEnter` or `onLeave` here replaces the component's own handler for that event. */
    intersectionActionParams?: IntersectionActionParams;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    rawSvg,
    caption,
    nudgeNodes = [],
    nudgeBy = 5,
    clusterLabel = {},
    clusterRadius = "8px",
    intersectionActions = [],
    intersectionActionParams,
    style
  }: Props = $props();

  let uid: string = $props.id();

  const setStyles = (node: HTMLElement) => {
    const clusterRecs = [...node.querySelectorAll(".cluster rect")] as SVGRectElement[];
    const clusterLabels = [...node.querySelectorAll(".cluster-label")] as HTMLSpanElement[];
    const edgeLabels = [...node.querySelectorAll(".edgeLabels foreignObject")] as SVGForeignObjectElement[];
    const phaseNodes = nudgeNodes.map((selector) => node.querySelector(selector)).filter(Boolean) as SVGGElement[];

    clusterRecs.forEach((clusterRec) => {
      clusterRec.setAttribute("rx", clusterRadius);
      clusterRec.setAttribute("ry", clusterRadius);
    });

    clusterLabels.forEach((label) => {
      const nodeLabel = label.querySelector(".nodeLabel") as HTMLSpanElement | null;
      if (nodeLabel && clusterLabel.fontSize) nodeLabel.style.fontSize = clusterLabel.fontSize;

      const foreignObject = label.querySelector("foreignObject") as SVGForeignObjectElement | null;
      if (!foreignObject) return;
      if (clusterLabel.width) foreignObject.style.width = clusterLabel.width;
      if (clusterLabel.height) foreignObject.style.height = clusterLabel.height;

      const innerContainer = foreignObject.firstElementChild as HTMLDivElement | null;
      if (innerContainer) {
        innerContainer.style.width = "100%";
        innerContainer.style.maxWidth = "unset";
      }
    });

    edgeLabels.forEach((edgeLabelFO) => {
      const edgeLabelFOwidth = edgeLabelFO.getAttribute("width");
      if (edgeLabelFOwidth) {
        edgeLabelFO.setAttribute("width", Math.round(+edgeLabelFOwidth) + 20 + "");
        const innerContainer = edgeLabelFO.firstElementChild as HTMLDivElement | null;
        if (innerContainer) innerContainer.style.display = "block";
      }
    });

    phaseNodes.forEach((g) => {
      const transform = g.getAttribute("transform");
      if (transform) {
        g.setAttribute(
          "transform",
          transform.replace(/(.*),\s(.*)\)$/, (_, p1, p2) => `${p1}, ${Number(p2) + nudgeBy})`)
        );
      }
    });
  };

  const animateMermaidDiagramArrows = (node: HTMLElement) => {
    const arrows = [...node.querySelectorAll(".flowchart-link")] as SVGPathElement[];
    const arrowHeads = [...node.querySelectorAll('[id$="pointEnd-margin"], [id$="pointEnd"]')] as SVGMarkerElement[];

    return animateArrowPaths(arrows, arrowHeads, () => setStyles(node));
  };

  const addDiagramArrowsFallback = (_intersectionActions: IntersectionAction[]) => {
    // onLoad must be included for onEnter to work. Sets strokeDashoffset and opacity.
    return Object.fromEntries(
      [...new Set(["onLoad" as IntersectionAction, ..._intersectionActions])].map((action) => [
        action,
        (node: HTMLElement) => animateMermaidDiagramArrows(node)[action]()
      ])
    );
  };
</script>

<div
  id="animated-mermaid-diagram-{uid}"
  class="animated-mermaid-diagram"
  {style}
  use:handleIntersectionEvent={{
    key: `animated-mermaid-diagram-${uid}`,
    ...addDiagramArrowsFallback(intersectionActions),
    ...intersectionActionParams
  }}>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html rawSvg}
  {#if caption}
    <p class="animated-mermaid-diagram--caption">{caption}</p>
  {/if}
</div>

<style>
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
</style>
