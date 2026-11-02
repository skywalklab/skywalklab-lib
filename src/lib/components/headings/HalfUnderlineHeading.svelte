<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    /** Heading text. */
    text: string;
    /** HTML Element for the title. */
    tag?: string;
    /** Extend the underline across the full width. */
    includeFull?: boolean;
    /** Length of the short underline. Sets `--half-underline-heading-underline-length`. */
    underlineLength?: string;
    /** Color of the underline. Sets `--half-underline-heading-underline-color`. */
    underlineColor?: string;
    /** Color of the full-width track behind the underline. Sets `--half-underline-heading-track-color`. */
    trackColor?: string;
    /** Markup appended after `text`, for styling individual words, e.g. giving some a color or
     * text decoration that the plain-string `text` cannot express. */
    children?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    text,
    tag = "h2",
    includeFull = false,
    underlineLength,
    underlineColor,
    trackColor,
    children,
    style
  }: Props = $props();
  let uid: string = $props.id();
</script>

<svelte:element
  this={tag}
  id="half-underline-heading-{uid}"
  class="half-underline-heading"
  class:include-full={includeFull}
  style:--half-underline-heading-underline-color={underlineColor}
  style:--half-underline-heading-track-color={trackColor}
  style:--half-underline-heading-underline-length={underlineLength}
  {style}>
  {text}{@render children?.()}
</svelte:element>

<style>
  .half-underline-heading {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    position: relative;

    &::before,
    &::after {
      content: "";
      height: 0;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
    }

    &::after {
      border: 1.5px solid var(--half-underline-heading-underline-color, var(--primary, black));
      width: var(--half-underline-heading-underline-length, 3rem);
    }

    &.include-full {
      &::before {
        border: 1px solid var(--half-underline-heading-track-color, #e2e6e7);
        width: 100%;
      }
    }
  }
</style>
