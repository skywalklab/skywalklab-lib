<script lang="ts">
  import default_ui from "../../css-modules/default-ui.module.css";

  interface Props {
    /** Button text. */
    text: string;
    /** Text and border color. Sets `--default-ui-color`. */
    color?: string;
    /** Background color. Sets `--default-ui-bg-color`. Swaps with `color` on hover, focus and active. */
    bgColor?: string;
    /** Border color for the disabled state. Sets `--default-ui-disabled-color`. */
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
  id="default-button-{uid}"
  class={default_ui["default-ui"]}
  style:--default-ui-color={color}
  style:--default-ui-bg-color={bgColor}
  style:--default-ui-disabled-color={disabledColor}
  {style}
  {onclick}>{text}</button>
