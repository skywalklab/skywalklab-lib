<svelte:options
  customElement={{
    tag: "skywalk-device-frame",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      type: { type: "String", attribute: "sw-type" },
      src: { type: "String", attribute: "sw-src" },
      fallback: { type: "String", attribute: "sw-fallback" },
      alt: { type: "String", attribute: "sw-alt" },
      width: { type: "String", attribute: "sw-width" },
      height: { type: "String", attribute: "sw-height" },
      bezelColor: { type: "String", attribute: "sw-bezel-color" },
      keyboardColor: { type: "String", attribute: "sw-keyboard-color" },
      bezelRadius: { type: "String", attribute: "sw-bezel-radius" },
      bezelWidth: { type: "String", attribute: "sw-bezel-width" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "frames/DeviceFrame", false);
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
  import DeviceFrame from "../../components/frames/DeviceFrame.svelte";

  let { type, src, fallback, alt, width, height, bezelColor, keyboardColor, bezelRadius, bezelWidth, style }: any = $props();
</script>

<DeviceFrame {type} {src} {fallback} {alt} {width} {height} {bezelColor} {keyboardColor} {bezelRadius} {bezelWidth} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.device-frame {
    display: inline-block;
  }

  .device-frame--screen {
    background-color: var(--device-frame-bezel-color, #1a1a1a);
    padding: var(--device-frame-bezel-width, 6px);
    border-radius: var(--device-frame-bezel-radius, 8px);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--device-frame-width);
    height: var(--device-frame-height);

    img,
    video {
      display: block;
      max-width: 100%;
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: calc(var(--device-frame-bezel-radius, 8px) - 2px);
    }
  }

  .device-frame--laptop {
    --device-frame-bezel-radius: 8px;
    --device-frame-bezel-width: 8px;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;

    .device-frame--screen {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      img,
      video {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    .device-frame--keyboard {
      width: 106%;
      height: 16px;
      margin-top: -2px;
      background: linear-gradient(
        to bottom,
        var(--device-frame-keyboard-color, #2a2a2a),
        var(--device-frame-bezel-color, #1a1a1a)
      );
      border-radius: 0 0 14px 14px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 1px;
        left: 50%;
        transform: translateX(-50%);
        width: 88%;
        height: 11px;
        background: linear-gradient(
          to bottom,
          var(--device-frame-keyboard-color, #2a2a2a),
          color-mix(in srgb, var(--device-frame-keyboard-color, #2a2a2a) 70%, #000)
        );
        border-radius: 6px;
        box-shadow: inset 0 1px 2px #0000004d;
      }

      &::after {
        content: "";
        position: absolute;
        top: 3px;
        left: 50%;
        transform: translateX(-50%);
        width: 24%;
        height: 7px;
        background: var(--device-frame-bezel-color, #1a1a1a);
        border-radius: 3px;
        box-shadow: inset 0 1px 1px #00000066;
      }
    }
  }

  .device-frame--phone {
    --device-frame-bezel-radius: 12px;
    --device-frame-bezel-width: 8px;

    .device-frame--screen {
      position: relative;
      min-width: 60px;

      &::before {
        content: "";
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
        height: 5px;
        background-color: #000;
        border-radius: 3px;
        z-index: 1;
      }

      img,
      video {
        border-radius: calc(var(--device-frame-bezel-radius, 8px) - 4px);
      }
    }
  }
  }
</style>
      