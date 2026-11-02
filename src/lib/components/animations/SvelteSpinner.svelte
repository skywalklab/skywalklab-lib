<script lang="ts">
  import type { SpinnerTypes, Circle2Types, Circle3Types } from "svelte-loading-spinners/types/spinner.type";
  import * as spinners from "svelte-loading-spinners";
  import { kebab } from "../../utils/helpers.js";

  type SvelteSpinnerTypes = Partial<SpinnerTypes & Circle2Types & Circle3Types>;
  type SpinnerName = keyof typeof spinners;
  interface Props {
    /** Which spinner variant to render. */
    type?: SpinnerName;
    /** Config Options from the svelte-loading-spinners package */
    spinnerProps: SvelteSpinnerTypes;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { type = "Wave", spinnerProps, style }: Props = $props();
  let uid: string = $props.id();
  const entry = $derived(Object.entries(spinners).find(([key]) => key.toLowerCase() === type.toLowerCase()));
  const Spinner: any = $derived(entry?.[1] ?? spinners.Wave);
  const spinnerClass = $derived(`skywalk-spinner-${kebab(entry?.[0] ?? type)}`);
</script>

<div id="svelte-spinner-{uid}" class="svelte-spinner {spinnerClass}" {style}>
  <Spinner {...spinnerProps} />
</div>

<style>
  .svelte-spinner {
    color: inherit;
  }
</style>
