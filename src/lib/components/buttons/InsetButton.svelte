<script lang="ts">
  import inset_ui from "../../css-modules/inset-ui.module.css";

  interface Props {
    /** Button text. */
    text: string;
    /** Background color. Sets `--inset-ui-bg-color`. */
    bgColor?: string;
    /** Border color. Sets `--inset-ui-border-color`. */
    borderColor?: string;
    /** Text color on hover. Sets `--inset-ui-hover-color`. */
    hoverColor?: string;
    /** Background color on hover. Sets `--inset-ui-hover-bg-color`. */
    hoverBgColor?: string;
    /** Called when the button is clicked. */
    onclick?: (args: any) => void;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { text, bgColor, borderColor, hoverColor, hoverBgColor, onclick, style }: Props = $props();
  let uid: string = $props.id();
</script>

<button
  id="inset-button-{uid}"
  class={inset_ui["inset-ui"]}
  style:--inset-ui-bg-color={bgColor}
  style:--inset-ui-border-color={borderColor}
  style:--inset-ui-hover-color={hoverColor}
  style:--inset-ui-hover-bg-color={hoverBgColor}
  {style}
  {onclick}><span>{text}</span></button>
