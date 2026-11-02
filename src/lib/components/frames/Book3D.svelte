<script lang="ts">
  import type { Snippet } from "svelte";

  // https://scastiel.dev/3dbook

  interface Props {
    /** Cover width. Sets `--book-3d-width`. */
    width?: string;
    /** Cover height. Sets `--book-3d-height`. */
    height?: string;
    /** Spine depth. Sets `--book-3d-spine`. */
    spine?: string;
    /** Resting Y rotation of the book. Sets `--book-3d-rotation`. */
    rotation?: string;
    /** Straighten the book on hover. */
    hoverable?: boolean;
    /** Color of the spine and page edges. Sets `--book-3d-dominant-color`. */
    dominantColor?: string;
    /** Rendered as the front cover of the book, e.g. an `<img>`. */
    children: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    width = "200px",
    height = "300px",
    spine = "184px",
    rotation = "-30deg",
    hoverable = false,
    dominantColor = "#01060f",
    children,
    style
  }: Props = $props();
  let uid: string = $props.id();
</script>

<div
  id="book-3d-{uid}"
  class="book-3d"
  class:hoverable
  style:--book-3d-dominant-color={dominantColor}
  style:--book-3d-width={width}
  style:--book-3d-height={height}
  style:--book-3d-spine={spine}
  style:--book-3d-rotation={rotation}
  {style}>
  <div class="book-3d--cover">
    {@render children()}
  </div>
</div>

<style>
  .book-3d {
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 600px;

    &.hoverable:hover,
    &.hoverable:focus-visible,
    &.hoverable:focus {
      .book-3d--cover {
        transform: rotateY(0deg);
      }
    }
  }

  @keyframes initAnimation {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(var(--book-3d-rotation));
    }
  }

  .book-3d--cover {
    width: var(--book-3d-width);
    height: var(--book-3d-height);
    position: relative;
    transform-style: preserve-3d;
    transform: rotateY(var(--book-3d-rotation));
    transition: transform 1s ease;
    animation: 1s ease 0s 1 initAnimation;

    &::before {
      position: absolute;
      content: " ";
      background-color: #fff;
      left: 0;
      top: 1px;
      width: 28px;
      height: calc(var(--book-3d-height) - 2px);
      transform: translateX(var(--book-3d-spine)) rotateY(90deg);
      background: linear-gradient(
        90deg,
        #fff 0%,
        #f9f9f9 5%,
        #fff 10%,
        #f9f9f9 15%,
        #fff 20%,
        #f9f9f9 25%,
        #fff 30%,
        #f9f9f9 35%,
        #fff 40%,
        #f9f9f9 45%,
        #fff 50%,
        #f9f9f9 55%,
        #fff 60%,
        #f9f9f9 65%,
        #fff 70%,
        #f9f9f9 75%,
        #fff 80%,
        #f9f9f9 85%,
        #fff 90%,
        #f9f9f9 95%,
        #fff 100%
      );
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: " ";
      width: var(--book-3d-width);
      height: var(--book-3d-height);
      transform: translateZ(-15px);
      background-color: var(--book-3d-dominant-color);
      border-radius: 0 2px 2px 0;
      box-shadow: 0px 0 5px 0px #666;
    }

    :global {
      picture,
      ::slotted(picture) {
        display: contents;
      }

      img,
      ::slotted(img) {
        position: absolute;
        top: 0;
        left: 0;
        width: var(--book-3d-width) !important;
        height: var(--book-3d-height) !important;
        background-color: var(--book-3d-dominant-color) !important;
        transform: translateZ(15px) !important;
        border-radius: 0 2px 2px 0;
        box-shadow: 5px 5px 20px #666;
      }
    }
  }
</style>
