import { component_descriptions } from "../stories/component-descriptions.js";
import { testImg, testImgChatbot, testImgPath } from "../data/test-data.js";

export const frames_static_props = new Map<string, any>([
  [
    "AsciiRenderer",
    {
      storyDescription: component_descriptions.frames.get("AsciiRenderer"),
      props: {
        src: testImgPath,
        density: 25,
        strength: 3,
        color: "#00ff00",
        backgroundColor: "#17181A",
        glitch: false,
        glitchSpeed: 1,
        fillLetterbox: false,
        fit: "contain",
        position: "center",
        style: "width: var(--full-width-min); height: auto; aspect-ratio: 40 / 21;"
      }
    }
  ],
  [
    "Book3D",
    {
      storyDescription: component_descriptions.frames.get("Book3D"),
      props: {
        width: "200px",
        height: "300px",
        spine: "184px",
        rotation: "-30deg",
        hoverable: true,
        dominantColor: "#01060f",
        style: "padding: 1rem;"
      }
    }
  ],
  [
    "DeviceFrame",
    {
      storyDescription: component_descriptions.frames.get("DeviceFrame"),
      props: {
        type: "laptop",
        src: testImgChatbot,
        fallback: testImg,
        alt: "The chatbot widget open on a page",
        width: "340",
        height: "180",
        bezelColor: "var(--primary, black)",
        keyboardColor: "var(--accent-dark, slategray)",
        bezelRadius: "8px",
        bezelWidth: "6px"
      }
    }
  ],
  [
    "DeviceMockup",
    {
      storyDescription: component_descriptions.frames.get("DeviceMockup"),
      props: {
        attrs: {
          src: testImg,
          type: "laptop",
          fit: "contain",
          "hover-fit": "contain",
          height: "140",
          "bezel-color": "var(--primary, black)",
          "keyboard-color": "var(--accent-dark, slategray)"
        }
      }
    }
  ],
  [
    "DitheredImage",
    {
      storyDescription: component_descriptions.frames.get("DitheredImage"),
      props: {
        src: testImgPath,
        ditherMap: "bayer4x4",
        pixelSize: 1,
        color: "#ff6900",
        backgroundColor: "#17181A",
        threshold: 0,
        fit: "contain",
        position: "center",
        style: "width: var(--full-width-min); height: auto; aspect-ratio: 40 / 21;"
      }
    }
  ],
  [
    "PictureMat",
    {
      storyDescription: component_descriptions.frames.get("PictureMat"),
      props: {
        top: "-1rem",
        left: "-1rem",
        right: "unset",
        bottom: "unset",
        innerMat: true,
        matColor: "var(--primary, black)",
        intersectionActions: ["onEnter", "onLeave"],
        intersectionActionParams: {
          threshold: 0.75
        },
        style: "max-width: 500px; margin: 2rem 1rem;"
      }
    }
  ],
  [
    "PixelatedImage",
    {
      storyDescription: component_descriptions.frames.get("PixelatedImage"),
      props: {
        src: testImgPath,
        initialGridSize: 6,
        stepDuration: 150,
        pauseStep: 2,
        style: "width: var(--full-width-min); height: auto; aspect-ratio: 40 / 21;"
      }
    }
  ],
  [
    "TraceBox",
    {
      storyDescription: component_descriptions.frames.get("TraceBox"),
      props: {
        traceLength: "30px",
        traceColor: "var(--primary, black)",
        tracePlus: {
          topLeft: true,
          bottomLeft: false,
          topRight: false,
          bottomRight: false
        },
        tracePlusColor: "var(--accent-dark, slategray)",
        intersectionActions: ["onEnter", "onLeave"],
        intersectionActionParams: { threshold: 0.75 },
        style: "color: #fff"
      }
    }
  ]
]);
