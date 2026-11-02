<script lang="ts">
  import { brandLogoProps } from "../../brand/data.js";

  export interface Props {
    /** Color the mark is filled with, and the start color of the gradient when `endFill` is set. Sets `--skywalklab-logo-fill`. */
    fill?: string;
    /** End color of the gradient. Defaults to `fill`, giving a flat color. Sets `--skywalklab-logo-end-fill`. */
    endFill?: string;
    /** Where the gradient starts and stops, as percentages. Animate these to sweep color through the mark. */
    offset?: { start: number; end: number };
    /** Outline color of each stroke. Sets `--skywalklab-logo-stroke`. */
    stroke?: string;
    /** Opacity of the fill. Sets `--skywalklab-logo-opacity`. */
    opacity?: number;
    /** Horizontal placement of the mark inside its square viewBox. */
    position?: "right" | "left" | "middle";
    /** Rendered width. Defaults to `height`, keeping the mark square. */
    width?: string;
    /** Rendered height in pixels. */
    height?: string;
    /** Render just the middle curve, rotated — the compact mark used where the full three-curve logo is too tall. */
    singleCurve?: boolean;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    fill = "var(--primary, black)",
    endFill,
    offset = {
      start: 0,
      end: 100
    },
    stroke = "var(--background, #ffffff)",
    opacity = 1,
    position = "middle",
    width,
    height = "100",
    singleCurve = false,
    style
  }: Props = $props();
  let uid: string = $props.id();

  const originalWidth = 34;
  const originalHeight = 62;
  const targetSize = 100;
  const scale = targetSize / originalHeight;
  const scaledWidth = originalWidth * scale;

  const spareWidth = targetSize - scaledWidth;
  const xOffset = { left: 0, middle: spareWidth / 2, right: spareWidth };
  const topPadding = 0.75;
  const outlineWidth = 0.5;
</script>

<svg
  id="skywalklab-logo-{uid}"
  class="skywalklab-logo"
  class:single-curve={singleCurve}
  width={width ?? height}
  {height}
  style:--skywalklab-logo-fill={fill}
  style:--skywalklab-logo-end-fill={endFill ?? fill}
  style:--skywalklab-logo-stroke={stroke}
  style:--skywalklab-logo-opacity={opacity}
  {style}
  viewBox="0 0 {targetSize} {targetSize}"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="skywalklab-logo--gradient-{uid}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="{offset.start}%" stop-color="var(--skywalklab-logo-fill)" />
      <stop offset="{offset.end}%" stop-color="var(--skywalklab-logo-end-fill)" />
    </linearGradient>
  </defs>
  <g
    fill="url(#skywalklab-logo--gradient-{uid})"
    stroke-width={outlineWidth}
    transform="translate({xOffset[position]}, {topPadding}) scale({scale})">
    {#each Array(brandLogoProps.numLines).fill(brandLogoProps.line1StartY) as startY, i (i)}
      <path
        class="curve-{i + 1}"
        d="M{brandLogoProps.curveStartX} {startY + i * brandLogoProps.lineSpacing}{brandLogoProps.curvePath}" />
    {/each}
  </g>
</svg>

<style>
  .skywalklab-logo {
    fill-opacity: var(--skywalklab-logo-opacity);
    stroke: var(--skywalklab-logo-stroke);

    &.single-curve {
      transform: rotate(50deg);

      .curve-1,
      .curve-3 {
        display: none;
      }
    }
  }
</style>
