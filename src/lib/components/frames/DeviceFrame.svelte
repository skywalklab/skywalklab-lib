<script lang="ts">
  interface Props {
    /** Which device frame to draw. */
    type: "laptop" | "phone";
    /** Image or video source shown inside the screen. */
    src: string;
    /** Poster image used while a video source loads. */
    fallback?: string;
    /** Alt text for the screen content. */
    alt?: string;
    /** Screen width in pixels. Sets `--device-frame-width`. */
    width?: string;
    /** Screen height in pixels. Sets `--device-frame-height`. */
    height?: string;
    /** Color of the bezel surrounding the screen. Sets `--device-frame-bezel-color`. */
    bezelColor?: string;
    /** Color of the laptop keyboard deck. Sets `--device-frame-keyboard-color`. */
    keyboardColor?: string;
    /** Corner radius of the bezel. Sets `--device-frame-bezel-radius`. */
    bezelRadius?: string;
    /** Thickness of the bezel. Sets `--device-frame-bezel-width`. */
    bezelWidth?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    type,
    src,
    fallback,
    alt = "",
    width,
    height,
    bezelColor,
    keyboardColor,
    bezelRadius,
    bezelWidth,
    style
  }: Props = $props();
  let uid: string = $props.id();

  const isVideo = $derived<boolean>(src?.endsWith(".mp4") || src?.endsWith(".webm"));
  const isLaptop = $derived<boolean>(type === "laptop");
  const dimensions = $derived<{ width: string; height: string }>({
    width: width ?? (isLaptop ? "340" : "90"),
    height: height ?? "180"
  });
</script>

<div
  id="device-frame-{uid}"
  class="device-frame device-frame--{type}"
  style:--device-frame-width="{dimensions.width}px"
  style:--device-frame-height="{dimensions.height}px"
  style:--device-frame-bezel-color={bezelColor}
  style:--device-frame-keyboard-color={keyboardColor}
  style:--device-frame-bezel-radius={bezelRadius}
  style:--device-frame-bezel-width={bezelWidth}
  {style}>
  <div class="device-frame--screen {type}">
    {#if isVideo}
      <video
        {src}
        poster={fallback}
        width={dimensions.width}
        height={dimensions.height}
        autoplay
        loop
        muted
        playsinline
        preload="none"
        aria-label={alt}>
      </video>
    {:else}
      <img {src} {alt} loading="lazy" width={dimensions.width} height={dimensions.height} />
    {/if}
  </div>
  {#if isLaptop}
    <div class="device-frame--keyboard"></div>
  {/if}
</div>

<style>
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
</style>
