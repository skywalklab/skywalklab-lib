import { component_descriptions } from "../stories/component-descriptions.js";
import { testCallback } from "../data/test-data.js";

export const buttons_static_props = new Map<string, any>([
  [
    "DefaultButton",
    {
      storyDescription: component_descriptions.buttons.get("DefaultButton"),
      props: {
        text: "Default Button",
        color: "#fff",
        bgColor: "var(--primary, black)",
        disabledColor: "var(--accent-dark, slategray)"
      }
    }
  ],
  [
    "DefaultOutlineButton",
    {
      storyDescription: component_descriptions.buttons.get("DefaultOutlineButton"),
      props: {
        text: "Default Button Outline",
        color: "var(--primary, black)",
        bgColor: "#fff",
        disabledColor: "var(--accent-dark, slategray)"
      }
    }
  ],
  [
    "DotIndicatorButton",
    {
      storyDescription: component_descriptions.buttons.get("DotIndicatorButton"),
      props: {
        text: "Dot Indicator Button",
        color: "var(--primary, black)",
        style: "border: none; background-color: unset; cursor: pointer;"
      }
    }
  ],
  [
    "InsetButton",
    {
      storyDescription: component_descriptions.buttons.get("InsetButton"),
      props: {
        text: "Inset Button",
        bgColor: "oklab(0.960953 -0.000273854 -0.00286549 / 0.6)",
        borderColor: "oklab(0.903555 -0.000181317 -0.0071255 / 0.5)",
        hoverColor: "#000",
        hoverBgColor: "oklab(0.903555 -0.000181317 -0.0071255 / 0.5)"
      }
    }
  ],
  [
    "JumpButton",
    {
      storyDescription: component_descriptions.buttons.get("JumpButton"),
      props: {
        text: "Jump Button",
        style: "border: 1px solid;"
      }
    }
  ],
  [
    "LineButton",
    {
      storyDescription: component_descriptions.buttons.get("LineButton"),
      props: { text: "Line button", lineWidthMin: "32px", lineWidthMax: "64px", style: "cursor: pointer;" }
    }
  ],
  [
    "PopUpButton",
    {
      storyDescription: component_descriptions.buttons.get("PopUpButton"),
      props: {
        text: "Pop Up Button",
        color: "var(--primary, black)",
        bgColor: "#fff",
        boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.3)",
        activeBoxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
        style: "border: 1px solid;"
      }
    }
  ],
  [
    "Rolladex",
    {
      storyDescription: component_descriptions.buttons.get("Rolladex"),
      props: {
        attrs: { href: "#" },
        buttonClass: "",
        onclick: testCallback,
        style: "width: fit-content; height: fit-content; text-decoration: none; color: var(--primary, black);"
      }
    }
  ],
  [
    "SlideButton",
    {
      storyDescription: component_descriptions.buttons.get("SlideButton"),
      moduleDescription: "Wrap the text in an element, e.g. a span inside the button.",
      props: {
        text: "Slide Button",
        color: "var(--primary, black)",
        inverseColor: "#fff",
        style: "width: fit-content; height: fit-content; border: none; background-color: unset; cursor: pointer;"
      }
    }
  ],
  [
    "SlideIndicatorButton",
    {
      storyDescription: component_descriptions.buttons.get("SlideIndicatorButton"),
      props: {
        text: "Slide Indicator Button",
        color: "var(--primary, black)",
        style: "border: none; background-color: unset; cursor: pointer;"
      }
    }
  ],
  [
    "TextButton",
    {
      storyDescription: component_descriptions.buttons.get("TextButton"),
      props: {
        text: "Text Button",
        color: "var(--primary, black)",
        hoverColor: "var(--accent, lightblue)",
        style: "border: none; background-color: unset; cursor: pointer;"
      }
    }
  ],
  [
    "UnderlineButton",
    {
      storyDescription: component_descriptions.buttons.get("UnderlineButton"),
      props: {
        text: "Underline Button",
        lineHeight: "30px",
        color: "var(--primary, black)",
        bgColor: "#fff",
        hoverColor: "#fff",
        hoverBgColor: "var(--primary, black)",
        style: "border: none; background-color: unset; cursor: pointer;"
      }
    }
  ]
]);
