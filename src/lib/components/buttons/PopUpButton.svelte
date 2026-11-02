<script lang="ts">
  import pop_up_ui from "../../css-modules/pop-up-ui.module.css";

  interface Props {
    /** Button text. */
    text: string;
    /** Text color. Sets `--pop-up-ui-color`. */
    color?: string;
    /** Background color. Sets `--pop-up-ui-bg-color`. */
    bgColor?: string;
    /** Resting drop shadow. Sets `--pop-up-ui-box-shadow`. */
    boxShadow?: string;
    /** Drop shadow while active. Sets `--pop-up-ui-active-box-shadow`. */
    activeBoxShadow?: string;
    /** Called when the button is clicked. */
    onclick?: (args: any) => void;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { text, color, bgColor, boxShadow, activeBoxShadow, onclick, style }: Props = $props();
  let uid: string = $props.id();
</script>

<button
  id="pop-up-button-{uid}"
  class={pop_up_ui["pop-up-ui"]}
  style:--pop-up-ui-color={color}
  style:--pop-up-ui-bg-color={bgColor}
  style:--pop-up-ui-box-shadow={boxShadow}
  style:--pop-up-ui-active-box-shadow={activeBoxShadow}
  {style}
  {onclick}>{text}</button>
