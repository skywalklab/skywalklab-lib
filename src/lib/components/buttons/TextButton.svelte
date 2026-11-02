<script lang="ts">
  import text_ui from "../../css-modules/text-ui.module.css";

  interface Props {
    /** Button text. */
    text: string;
    /** Text color. Sets `--text-ui-color`. */
    color?: string;
    /** Text color on hover. Sets `--text-ui-hover-color`. */
    hoverColor?: string;
    /** Called when the button is clicked. */
    onclick?: (args: any) => void;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { text, color, hoverColor, onclick, style }: Props = $props();
  let uid: string = $props.id();
</script>

<button
  id="text-button-{uid}"
  class={text_ui["text-ui"]}
  style:--text-ui-color={color}
  style:--text-ui-hover-color={hoverColor}
  {style}
  {onclick}>{text}</button>
