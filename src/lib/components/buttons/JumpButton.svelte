<script lang="ts">
  import jump_ui from "../../css-modules/jump-ui.module.css";

  interface Props {
    /** Button text. */
    text: string;
    /** Called when the button is clicked. */
    onclick?: (args: any) => void;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { text, onclick, style }: Props = $props();
  let uid: string = $props.id();
</script>

<button id="jump-button-{uid}" class={jump_ui["jump-ui"]} {style} {onclick}>{text}</button>
