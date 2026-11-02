<script lang="ts">
  import slide_ui from "../../css-modules/slide-ui.module.css";

  interface Props {
    /** Button text. */
    text: string;
    /** Text color. Sets `--slide-ui-color`. */
    color?: string;
    /** Color revealed on hover. Sets `--slide-ui-inverse-color`. */
    inverseColor?: string;
    /** Called when the button is clicked. */
    onclick?: (args: any) => void;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { text, color, inverseColor, onclick, style }: Props = $props();
  let uid: string = $props.id();
</script>

<button
  id="slide-button-{uid}"
  class={slide_ui["slide-ui"]}
  style:--slide-ui-color={color}
  style:--slide-ui-inverse-color={inverseColor}
  {style}
  {onclick}><span>{text}</span></button>
