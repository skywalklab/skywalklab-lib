<script lang="ts">
  import type { Component } from "svelte";
  import type { SVGAttributes } from "svelte/elements";

  interface Props extends SVGAttributes<SVGSVGElement> {
    /** Name of the Lucide icon to render. */
    lucide_icon: string;
    /** Icon color. */
    color?: string;
    /** Icon size in pixels. */
    size?: number;
    /** Inline CSS applied to the `<svg>`, not the container, so it can set SVG properties like `stroke-width`. */
    lucide_style?: string;
    /** Inline CSS applied to the container around the `<svg>` */
    style?: string;
  }

  let { lucide_icon, color = "currentColor", size = 48, lucide_style, style, ...rest }: Props = $props();
  let uid: string = $props.id();

  const icons: Record<string, { default: Component }> = {};

  let loaded = $state<{ default: Component }>();
  const IconComponent = $derived(icons[lucide_icon] ?? loaded);

  $effect.pre(() => {
    if (icons[lucide_icon]) return;
    import(`$skywalk_lib_node_modules/@lucide/svelte/dist/icons/${lucide_icon}.js`).then((m) => (loaded = m));
  });
</script>

<span id="lucide-icon-{uid}" class="lucide-icon" {style}>
  {#if !IconComponent}
    <span
      style:width={typeof rest?.width == "number" ? rest?.width + "px" : (rest?.width ?? size + "px")}
      style:height={typeof rest?.height == "number" ? rest?.height + "px" : (rest?.height ?? size + "px")}></span>
  {:else}
    <span><IconComponent.default {...rest} {color} {size} style={lucide_style} /></span>
  {/if}
</span>

<style>
  .lucide-icon {
    display: inline-flex;
    align-items: center;
    vertical-align: bottom;

    :global(svg) {
      width: auto;
      color: inherit;
      transition: inherit;
    }
  }
</style>
