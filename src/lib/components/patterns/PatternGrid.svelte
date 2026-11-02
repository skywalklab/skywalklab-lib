<script lang="ts">
  interface Props {
    /** Color filling the element behind the pattern. Sets `--pattern-grid-bg-color`. */
    bgColor?: string;
    /** Where the pattern is still fully opaque, as a percentage across the element. */
    fadeStart?: string;
    /** Where the pattern begins fading out. */
    fadeMid?: string;
    /** Where the pattern has faded out completely. */
    fadeEnd?: string;
    /** Color of the diagonal lines making up the pattern. */
    patternFillColor?: string;
    /** Opacity of the diagonal lines, from 0 to 1. */
    patternFillOpacity?: number;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    bgColor = "var(--primary, black)",
    fadeStart = "0%",
    fadeMid = "30%",
    fadeEnd = "80%",
    patternFillColor = "var(--secondary, #9C92AC)",
    patternFillOpacity = 0.4,
    style
  }: Props = $props();
  let uid: string = $props.id();
</script>

<svg
  class="pattern-grid"
  id="pattern-grid-{uid}"
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  preserveAspectRatio="none"
  style:--pattern-grid-bg-color={bgColor}
  {style}>
  <defs>
    <pattern id="pattern-grid--tile-{uid}" width="6" height="6" patternUnits="userSpaceOnUse">
      <g class="pattern-grid--lines" fill={patternFillColor} fill-opacity={patternFillOpacity} fill-rule="evenodd">
        <path d="M5 0h1L0 6V5zM6 5v1H5z"></path>
      </g>
    </pattern>
    <linearGradient id="pattern-grid--fade-{uid}" x1="0" y1="0" x2="1" y2="0">
      <stop offset={fadeStart} stop-color="#fff" />
      <stop offset={fadeMid} stop-color="#fff" />
      <stop offset={fadeEnd} stop-color="#000" />
    </linearGradient>
    <mask id="pattern-grid--mask-{uid}">
      <rect width="100%" height="100%" fill="url(#pattern-grid--fade-{uid})"></rect>
    </mask>
  </defs>
  <rect class="pattern-grid--bg" width="100%" height="100%"></rect>
  <rect
    class="pattern-grid--pattern"
    width="100%"
    height="100%"
    fill="url(#pattern-grid--tile-{uid})"
    mask="url(#pattern-grid--mask-{uid})"></rect>
</svg>

<style>
  .pattern-grid {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    transition: opacity 0.15s linear;

    .pattern-grid--bg {
      fill: var(--pattern-grid-bg-color);
    }

    .pattern-grid--pattern {
      opacity: 0.5;
      transition: inherit;
    }
  }
</style>
