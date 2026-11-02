<script lang="ts">
  import underline_ui from "../../css-modules/underline-ui.module.css";

  interface Props {
    /** Button text. */
    text: string;
    /** Line height of the button. Sets `--underline-ui-line-height`. */
    lineHeight?: string;
    /** Text color. Sets `--underline-ui-color`. */
    color?: string;
    /** Background color. Sets `--underline-ui-bg-color`. */
    bgColor?: string;
    /** Text color on hover. Sets `--underline-ui-hover-color`. */
    hoverColor?: string;
    /** Background color on hover. Sets `--underline-ui-hover-bg-color`. */
    hoverBgColor?: string;
    /** Called when the button is clicked. */
    onclick?: (args: any) => void;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { text, lineHeight, color, bgColor, hoverColor, hoverBgColor, onclick, style }: Props = $props();
  let uid: string = $props.id();
</script>

<button
  id="underline-button-{uid}"
  class={underline_ui["underline-ui"]}
  style:--underline-ui-color={color}
  style:--underline-ui-bg-color={bgColor}
  style:--underline-ui-hover-color={hoverColor}
  style:--underline-ui-hover-bg-color={hoverBgColor}
  style:--underline-ui-line-height={lineHeight}
  {style}
  {onclick}>{text}</button>
