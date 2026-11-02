<script lang="ts">
  import { type Snippet } from "svelte";

  interface Props {
    /** A non-empty heading text. */
    text: string;
    /** HTML Element for the title. */
    tag?: string;
    /** Image used as the flair icon. Sets `--flair-heading-background-image`. */
    backgroundImage: string;
    /** Flair icon width. Sets `--flair-heading-icon-width`. */
    iconWidth?: string;
    /** Color of the flair icon. Sets `--flair-heading-icon-color`. */
    iconColor?: string;
    /** Markup appended after `text`, for styling individual words, e.g. giving some a color or
     * text decoration that the plain-string `text` cannot express. */
    children?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { text, tag = "h2", backgroundImage, iconWidth = "32px", iconColor, children, style }: Props = $props();
  let uid: string = $props.id();

  const trimmed = $derived<string>(text?.trim() ?? "");
  const firstWord = $derived<string>(trimmed.split(" ")[0]);
  const rest = $derived<string>(trimmed.slice(firstWord.length));
</script>

<svelte:element
  this={tag}
  id="flair-heading-{uid}"
  class="flair-heading"
  style:--flair-heading-icon-width={iconWidth}
  style:--flair-heading-icon-color={iconColor}
  style:--flair-heading-background-image="url('{backgroundImage.replaceAll("'", '%27')}')"
  {style}>
  <span class="flair-heading--first-word">
    <span class="flair-heading--first-letter">
      {firstWord.slice(0, 1)}
    </span><span>{firstWord.slice(1)}</span>
  </span>
  <span>{rest}</span>
  {@render children?.()}
</svelte:element>

<style>
  .flair-heading {
    width: fit-content;
    text-align: center;
    text-wrap: balance;

    .flair-heading--first-word {
      white-space: nowrap;
      position: relative;

      .flair-heading--first-letter {
        display: contents;

        &::before {
          content: "";
          position: absolute;
          height: calc(100% * 1.25);
          width: 100%;
          transform: translateY(-65%);
          background-color: var(--flair-heading-icon-color, currentColor);
          -webkit-mask: var(--flair-heading-background-image) no-repeat left / var(--flair-heading-icon-width)
            calc(var(--flair-heading-icon-width) * 1.5);
          mask: var(--flair-heading-background-image) no-repeat left / var(--flair-heading-icon-width)
            calc(var(--flair-heading-icon-width) * 1.5);
        }
      }
    }
  }
</style>
