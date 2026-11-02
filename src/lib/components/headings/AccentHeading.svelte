<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    /** Heading text. */
    text: string;
    /** HTML Element for the title. */
    tag?: string;
    /** Length of the accent rule. Sets `--accent-heading-length`. */
    accentLength?: string;
    /** Color the accent rule fades into. Sets `--accent-heading-fade-out-color`. */
    fadeOutColor?: string;
    /** Color of the accent rule. Sets `--accent-heading-accent-color`. */
    accentColor?: string;
    /** Markup appended after `text`, for styling individual words, e.g. giving some a color or
     * text decoration that the plain-string `text` cannot express. */
    children?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    text,
    tag = "h2",
    accentLength = "65px",
    fadeOutColor = "var(--background, #fff)",
    accentColor,
    children,
    style
  }: Props = $props();
  let uid: string = $props.id();
</script>

<svelte:element
  this={tag}
  id="accent-heading-{uid}"
  class="accent-heading"
  style:--accent-heading-length={accentLength}
  style:--accent-heading-accent-color={accentColor}
  style:--accent-heading-fade-out-color={fadeOutColor}
  {style}>
  <span class="accent-heading--inner-container">{text}{@render children?.()}</span>
</svelte:element>

<style>
  .accent-heading {
    display: flex;
    justify-content: center;
    width: fit-content;

    .accent-heading--inner-container {
      margin: 0 var(--accent-heading-length);
      display: inline-block;
      position: relative;
      width: fit-content;
      text-align: center;
      text-wrap: balance;

      &::before,
      &::after {
        content: "";
        display: block;
        width: var(--accent-heading-length);
        height: 2px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
      }

      &::before {
        background: linear-gradient(
          270deg,
          var(--accent-heading-accent-color, currentColor) 0%,
          var(--accent-heading-fade-out-color) 100%
        );
        right: calc(100% + 15px);
      }

      &::after {
        background: linear-gradient(
          90deg,
          var(--accent-heading-accent-color, currentColor) 0%,
          var(--accent-heading-fade-out-color) 100%
        );
        left: calc(100% + 15px);
      }
    }
  }
</style>
