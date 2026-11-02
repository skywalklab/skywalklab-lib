<script lang="ts">
  import type { Component } from "svelte";
  import SvelteSpinner from "./SvelteSpinner.svelte";

  interface Props {
    /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
    icon: Component<any, object, ""> | string;
    /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
    iconProps?: Record<string, any>;
    /** Color of the outer ring. Sets Circle2's `colorOuter`. */
    colorOuter?: string;
    /** Color of the middle ring. Sets Circle2's `colorCenter`. */
    colorCenter?: string;
    /** Color of the inner ring. Sets Circle2's `colorInner`. */
    colorInner?: string;
    /** Diameter of the spinner in pixels. */
    size?: number;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    icon: IconComponent,
    iconProps,
    colorOuter = "var(--accent, lightblue)",
    colorCenter = "var(--accent-analogous-1, cornflowerblue)",
    colorInner = "var(--accent-analogous-2, paleturquoise)",
    size = 40,
    style
  }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="brand-logo-spinner-{uid}" class="brand-logo-spinner" {style}>
  <SvelteSpinner type="Circle2" spinnerProps={{ colorOuter, colorCenter, colorInner, size: size * 2.25 }} />
  {#if typeof IconComponent === "string"}
    <img
      {...iconProps}
      class="brand-logo-spinner--img"
      src={IconComponent}
      alt={iconProps?.alt ?? "Brand logo"}
      width={iconProps?.width ?? iconProps?.size ?? size * 0.95}
      height={iconProps?.height ?? iconProps?.size ?? size * 0.95} />
  {:else}
    <span class="brand-logo-spinner--img">
      <IconComponent size={size * 0.95} {...iconProps} />
    </span>
  {/if}
</div>

<style>
  .brand-logo-spinner {
    background-color: transparent;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    pointer-events: none;

    .brand-logo-spinner--img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      display: grid;
      place-items: center;
    }
  }
</style>
