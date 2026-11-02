<script lang="ts">
  import { onMount } from "svelte";

  /** Marks the custom element's prototype as already render-throttled by this component. */
  const PATCHED = Symbol.for("skywalklab.device-mockup.patched");

  interface Props {
    /** Device frame attributes and screen content. */
    attrs: {
      /** Image or video source shown in the screen. */
      src: string;
      /** Which device frame to draw. */
      type: string;
      /** Poster image used while a video source loads. */
      fallback?: string;
      /** Alt text for the screen content. */
      alt?: string;
      /** Destination the mockup links to. */
      href?: string;
      /** Object-fit applied to the screen content. */
      fit?: string;
      /** Object-fit applied to the screen content on hover. */
      "hover-fit"?: string;
      /** Color of the drop shadow under the device. */
      "shadow-color"?: string;
      /** Height of the screen. */
      height?: string;
      /** Color of the bezel surrounding the screen. */
      "bezel-color"?: string;
      /** Color of the laptop keyboard deck. */
      "keyboard-color"?: string;
    };
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { attrs, style }: Props = $props();
  let uid: string = $props.id();

  onMount(async () => {
    // @ts-expect-error - no types available
    await import("@devmansam/device-mockup");

    const DeviceMockup = customElements.get("device-mockup");
    if (!DeviceMockup) return;

    // Guarded: every mount would otherwise wrap the previous wrapper, compounding per instance.
    if (DeviceMockup.prototype[PATCHED]) return;
    DeviceMockup.prototype[PATCHED] = true;

    const originalRender = DeviceMockup.prototype.render;
    DeviceMockup.prototype.render = function () {
      cancelAnimationFrame(this._renderFrame);
      this._renderFrame = requestAnimationFrame(() => {
        originalRender.call(this);
      });
    };
  });
</script>

<device-mockup
  id="device-mockup-{uid}"
  {style}
  src={attrs.src}
  class="device-mockup--{attrs.type}"
  type={attrs.type}
  fallback={attrs.fallback}
  alt={attrs.alt}
  fit={attrs.fit}
  href={attrs.href}
  hover-fit={attrs["hover-fit"]}
  shadow-color={attrs["shadow-color"]}
  height={attrs.height}
  bezel-color={attrs["bezel-color"]}
  keyboard-color={attrs["keyboard-color"]}>
</device-mockup>

<style>
  :global(.device-mockup--phone) {
    margin-bottom: 1.25rem;
    overflow: hidden;
    box-sizing: content-box;
    padding: 0 3px 3px 0;
  }
</style>
