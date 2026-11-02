import { component_descriptions } from "../stories/component-descriptions.js";
import { testContactForm1, testContactForm2 } from "../data/test-data.js";
export const utilities_static_props = new Map<string, any>([
  [
    "BackToTop1",
    {
      storyDescription: component_descriptions.utilities.get("BackToTop1"),
      props: {
        scrollThreshold: -1,
        size: "3.5rem",
        bgColor: "rgba(38, 38, 40, 0.4)",
        hoverBgColor: "var(--primary, black)",
        iconColor: "#fff",
        style: "position: relative; inset: unset; margin: auto;"
      }
    }
  ],
  [
    "BackToTop2",
    {
      storyDescription: component_descriptions.utilities.get("BackToTop2"),
      props: {
        scrollThreshold: -1,
        size: "3.25rem",
        ringWidth: "3",
        trackColor: "color-mix(in srgb, var(--accent, lightblue), transparent 70%)",
        indicatorColor: "var(--accent, lightblue)",
        iconColor: "var(--accent, lightblue)",
        buttonBgColor: "var(--primary, black)",
        style: "position: relative; inset: unset;"
      }
    }
  ],
  [
    "ContactForm1",
    {
      storyDescription: component_descriptions.utilities.get("ContactForm1"),
      props: {
        action: "#",
        labels: testContactForm1.labels,
        buttonClass: "",
        errorColor: "var(--error, #e5484d)",
        messageColor: "var(--primary, #333)",
        style: "width: var(--full-width-min);"
      }
    }
  ],
  [
    "ContactForm2",
    {
      storyDescription: component_descriptions.utilities.get("ContactForm2"),
      props: {
        action: "/contact",
        labels: testContactForm2.labels,
        title: testContactForm2.title,
        centered: false,
        maxWidth: "760px",
        buttonClass: "",
        accentColor: "var(--accent, lightblue)",
        fieldBgColor: "rgba(255, 255, 255, 0.03)",
        fieldBorderColor: "rgba(255, 255, 255, 0.14)",
        fieldColor: "#fff",
        labelColor: "rgba(255, 255, 255, 0.72)",
        titleColor: "#fff",
        style: "width: var(--full-width-min); background-color: var(--primary, black); padding: 2rem;"
      }
    }
  ]
]);
