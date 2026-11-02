<script module lang="ts">
  import aiVideoAutomation from "../assets/ai-video-automation.svg?raw";
  import { diagrams_static_props } from "./diagrams.js";
  import { withDynamicProps } from "./utils.js";

  export const diagrams_default_props = withDynamicProps(diagrams_static_props, {
    AnimatedMermaidDiagram: {
      props: {
        rawSvg: aiVideoAutomation
      }
    }
  });
</script>
