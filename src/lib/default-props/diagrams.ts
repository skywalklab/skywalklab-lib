import { component_descriptions } from "../stories/component-descriptions.js";
import { testAnimatedMermaidDiagram } from "../data/test-data.js";
export const diagrams_static_props = new Map<string, any>([
  [
    "AnimatedMermaidDiagram",
    {
      storyDescription: component_descriptions.diagrams.get("AnimatedMermaidDiagram"),
      props: {
        rawSvg: "",
        caption: testAnimatedMermaidDiagram.caption,
        nudgeNodes: ["#flowchart-trigger-0", "#flowchart-step_0-3", "#flowchart-video_ai-31"],
        nudgeBy: 5,
        clusterLabel: { width: "320px", height: "50px", fontSize: "20px" },
        clusterRadius: "8px",
        intersectionActions: ["onLoad", "onEnter", "onLeave"],
        intersectionActionParams: {
          threshold: 0.75
        },
        style: "padding: 2rem 0 0; width: var(--full-width-min);"
      }
    }
  ]
]);
