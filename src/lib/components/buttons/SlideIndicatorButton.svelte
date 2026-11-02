<script lang="ts">
  import slide_indicator_ui from "../../css-modules/slide-indicator-ui.module.css";

  interface Props {
    /** Button text. */
    text: string;
    /** Underline color. Sets `--slide-indicator-ui-color`. */
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
  id="slide-indicator-button-{uid}"
  class={slide_indicator_ui["slide-indicator-ui"]}
  style:--slide-indicator-ui-color={color}
  {style}
  {onclick}>{text}</button>
