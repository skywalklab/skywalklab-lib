<script lang="ts">
  import Scene from "../../motion-core/ascii-renderer/AsciiRendererScene.svelte";

  interface Props {
    /**
     * The image source URL.
     */
    src: string;
    /**
     * Grid density for the ASCII effect.
     * @default 25
     */
    density?: number;
    /**
     * Intensity of the ASCII character generation threshold.
     * @default 3
     */
    strength?: number;
    /**
     * Foreground color of the ASCII characters.
     * @default "#00ff00"
     */
    color?: string;
    /**
     * Background color.
     * @default "#17181A"
     */
    backgroundColor?: string;
    /**
     * Animated horizontal tear and flickering scanline.
     * @default true
     */
    glitch?: boolean;
    /**
     * Glitch animation speed; 1 is the original, lower is slower.
     * @default 1
     */
    glitchSpeed?: number;
    /**
     * Fill the space around a non-matching image with the background color, instead of leaving it transparent.
     * @default false
     */
    fillLetterbox?: boolean;
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
    density = 25,
    strength = 3,
    color = "#00ff00",
    backgroundColor = "#17181A",
    glitch = false,
    glitchSpeed = 1,
    fillLetterbox = false,
    fit = "contain",
    position = "center",
    style,
    ...rest
  }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="ascii-renderer-{uid}" class="ascii-renderer" {style} {...rest}>
  <div class="ascii-renderer--inner-container">
    <Scene
      image={src}
      {density}
      {strength}
      {color}
      {backgroundColor}
      {glitch}
      {glitchSpeed}
      {fillLetterbox}
      {fit}
      {position} />
  </div>
</div>

<style>
  .ascii-renderer {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

    .ascii-renderer--inner-container {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
  }
</style>
