<script lang="ts">
  import dot_indicator_ui from "../../css-modules/dot-indicator-ui.module.css";

  interface Props {
    /** Button text. */
    text: string;
    /** Dot color. Sets `--dot-indicator-ui-color`. */
    color?: string;
    /** Called when the button is clicked. */
    onclick?: (args: any) => void;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { text, color, onclick, style }: Props = $props();
  let uid: string = $props.id();
</script>

<button
  id="dot-indicator-button-{uid}"
  class={dot_indicator_ui["dot-indicator-ui"]}
  style:--dot-indicator-ui-color={color}
  {style}
  {onclick}>{text}</button>
