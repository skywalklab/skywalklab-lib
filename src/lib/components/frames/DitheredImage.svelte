<script lang="ts">
  import Scene from "../../motion-core/dithered-image/DitheredImageScene.svelte";

  interface Props {
    /**
     * The image source URL.
     */
    src: string;
    /**
     * Type of dithering map to use.
     * @default "bayer4x4"
     */
    ditherMap?: "bayer4x4" | "bayer8x8" | "halftone" | "voidAndCluster";
    /**
     * Pixel size of the dithering effect.
     * @default 1
     */
    pixelSize?: number;
    /**
     * Foreground color (dots).
     * @default "#ff6900"
     */
    color?: string | number | readonly [number, number, number] | { r: number; g: number; b: number };
    /**
     * Background color.
     * @default "#17181A"
     */
    backgroundColor?: string | number | readonly [number, number, number] | { r: number; g: number; b: number };
    /**
     * Threshold for the dithering effect.
     * @default 0.0
     */
    threshold?: number;
    /**
     * How the image fits the canvas: `contain` shows all of it, `cover` fills the canvas and crops the overflow.
     * @default "contain"
     */
    fit?: "contain" | "cover";
    /**
     * Vertical alignment when the image doesn't fill the canvas height (`contain`) or overflows it (`cover`).
     * @default "center"
     */
    position?: "top" | "center" | "bottom";
    /** Inline CSS applied to the root element. */
    style?: string;
    [key: string]: unknown;
  }

  let {
    src,
    ditherMap = "bayer4x4",
    pixelSize = 1,
    color = "#ff6900",
    backgroundColor = "#17181A",
    threshold = 0.0,
    fit = "contain",
    position = "center",
    style,
    ...rest
  }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="dithered-image-{uid}" class="dithered-image" {style} {...rest}>
  <div class="dithered-image--inner-container">
    <Scene image={src} {ditherMap} {pixelSize} {color} {backgroundColor} {threshold} {fit} {position} />
  </div>
</div>

<style>
  .dithered-image {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

    .dithered-image--inner-container {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
  }
</style>
