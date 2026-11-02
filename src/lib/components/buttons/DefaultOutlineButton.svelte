<script lang="ts">
  import default_outline_ui from "../../css-modules/default-outline-ui.module.css";

  interface Props {
    /** Button text. */
    text: string;
    /** Text and border color. Sets `--default-outline-ui-color`. */
    color?: string;
    /** Background color. Sets `--default-outline-ui-bg-color`. Swaps with `color` on hover, focus and active. */
    bgColor?: string;
    /** Border color for the disabled state. Sets `--default-outline-ui-disabled-color`. */
    disabledColor?: string;
    /** Called when the button is clicked. */
    onclick?: (args: any) => void;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { text, color, bgColor, disabledColor, onclick, style }: Props = $props();
  let uid: string = $props.id();
</script>

<button
  id="default-outline-button-{uid}"
  class={default_outline_ui["default-outline-ui"]}
  style:--default-outline-ui-color={color}
  style:--default-outline-ui-bg-color={bgColor}
  style:--default-outline-ui-disabled-color={disabledColor}
  {style}
  {onclick}>{text}</button>
