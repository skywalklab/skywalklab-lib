import { component_descriptions } from "../stories/component-descriptions.js";
export const patterns_static_props = new Map<string, any>([
  [
    "PatternGrid",
    {
      storyDescription: component_descriptions.patterns.get("PatternGrid"),
      props: {
        bgColor: "var(--primary, black)",
        fadeStart: "0%",
        fadeMid: "50%",
        fadeEnd: "90%",
        patternFillColor: "#fff",
        patternFillOpacity: 0.4,
        style: "width: var(--full-width-min); position: relative;"
      }
    }
  ],
  [
    "PatternHexagon",
    {
      storyDescription: component_descriptions.patterns.get("PatternHexagon"),
      props: {
        bgColor: "var(--primary, black)",
        outlineColor: "var(--accent, lightblue)",
        dotColor: "#fff",
        backOutlineColor: "var(--accent, lightblue)",
        opacity: 0.25,
        style: "width: var(--full-width-min);"
      }
    }
  ],
  [
    "PatternSoundwave",
    {
      storyDescription: component_descriptions.patterns.get("PatternSoundwave"),
      props: {
        bgColor: "transparent",
        barOpacity: 1,
        barWidth: 9,
        barCap: "round",
        barColor1: "var(--accent-analogous-1, cornflowerblue)",
        barColor2: "var(--accent, lightblue)",
        barColor3: "var(--accent-analogous-2, paleturquoise)",
        style: "width: var(--full-width-min);"
      }
    }
  ],
  [
    "PatternWorldMap",
    {
      storyDescription: component_descriptions.patterns.get("PatternWorldMap"),
      props: {
        bgColor: "transparent",
        activeColor: "var(--accent-analogous-1, cornflowerblue)",
        inactiveColor: "var(--primary-analogous-1, black)",
        style: "width: var(--full-width-min);"
      }
    }
  ]
]);
