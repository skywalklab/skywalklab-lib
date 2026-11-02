<script lang="ts">
  import Scene from "../../motion-core/pixelated-image/PixelatedImageScene.svelte";

  interface Props {
    /**
     * The image source URL.
     */
    src: string;
    /**
     * Initial grid size for the pixelation effect.
     * @default 6.0
     */
    initialGridSize?: number;
    /**
     * Duration of each step in the depixelation animation, in milliseconds.
     * @default 150
     */
    stepDuration?: number;
    /**
     * Hold the depixelation at this step; set to `undefined` to resume.
     */
    pauseStep?: number;
    /**
     * Called when the depixelation finishes and the image is shown sharp.
     */
    oncomplete?: () => void;
    /** Inline CSS applied to the root element. */
    style?: string;
    [key: string]: unknown;
  }

  let { src, initialGridSize = 6.0, stepDuration = 150, pauseStep, oncomplete, style = "", ...rest }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="pixelated-image-{uid}" class="pixelated-image" {style} {...rest}>
  <div class="pixelated-image--inner-container">
    <Scene image={src} {initialGridSize} {stepDuration} {pauseStep} {oncomplete} />
  </div>
</div>

<style>
  .pixelated-image {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .pixelated-image--inner-container {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
  }
</style>
