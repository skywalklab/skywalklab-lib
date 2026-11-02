<script lang="ts">
  import line_ui from "../../css-modules/line-ui.module.css";

  interface Props {
    /** Button text. */
    text: string;
    /** Min line width. Sets `--line-ui-width-min`. */
    lineWidthMin?: string;
    /** Max line width, reached on hover. Sets `--line-ui-width-max`. */
    lineWidthMax?: string;
    /** Called when the button is clicked. */
    onclick?: (args: any) => void;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { text, lineWidthMin, lineWidthMax, onclick, style }: Props = $props();
  let uid: string = $props.id();
</script>

<button
  id="line-button-{uid}"
  class={line_ui["line-ui"]}
  style:--line-ui-width-min={lineWidthMin}
  style:--line-ui-width-max={lineWidthMax}
  {style}
  {onclick}>
  {text}
</button>
