<script lang="ts">
  import { itemClass } from "../utils.js";

  interface Props {
    /** The imported CSS module: module class keys mapped to their hashed class names. */
    cssModule: Record<string, string>;
    /** Space-separated module class keys applied to the button. */
    classNames: string;
    /** Button text. */
    text: string;
    /** Called when the button is clicked. */
    onclick?: (args: any) => void;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { cssModule, classNames, text, onclick, style }: Props = $props();
  let uid: string = $props.id();
</script>

<button id="css-module-button-{uid}" class={itemClass(classNames, cssModule)} {style} {onclick}
  ><span class="css-module-button--text">{text}</span></button>
