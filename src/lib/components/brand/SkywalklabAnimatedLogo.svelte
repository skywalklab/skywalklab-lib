<script lang="ts">
  import { prefersReducedMotion } from "svelte/motion";
  import SkywalklabLogo, { type Props as LogoProps } from "./SkywalklabLogo.svelte";

  interface Props {
    /** Index of the segment currently lit. Bindable; the component advances it on a timer. */
    itemIndex?: number;
    /** Number of segments to divide the sweep into. The gradient covers one segment at a time. */
    itemsLength: number;
    /** Component Props from SkywalklabLogo */
    logoProps: LogoProps;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { itemIndex = $bindable(0), itemsLength, logoProps, style }: Props = $props();

  let interval: NodeJS.Timeout | undefined;
  let animatedLogoStart = $derived<number>((100 / itemsLength) * itemIndex);
  let animatedLogoEnd = $derived<number>((100 / itemsLength) * (itemIndex + 1));

  function setLogoAnimationInterval(): NodeJS.Timeout | undefined {
    return prefersReducedMotion.current
      ? undefined
      : setInterval(function () {
          itemIndex = itemIndex < itemsLength - 1 ? itemIndex + 1 : 0;
        }, 1000);
  }

  $effect(() => {
    const length = itemsLength;
    interval = length > 0 ? setLogoAnimationInterval() : undefined;

    return () => clearInterval(interval);
  });
</script>

<SkywalklabLogo offset={{ start: animatedLogoStart, end: animatedLogoEnd }} {...logoProps} {style} />
