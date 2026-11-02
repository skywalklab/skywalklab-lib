<script lang="ts">
  import type { Component } from "svelte";
  import { itemClass } from "../utils.js";

  interface Props {
    /** The imported CSS module: module class keys mapped to their hashed class names. */
    cssModule: Record<string, string>;
    /** Space-separated module class keys applied to the heading. */
    classNames: string;
    /** Heading text. */
    text: string;
    /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
    icon: Component<any, object, ""> | string;
    /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
    iconProps?: Record<string, any>;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { cssModule, classNames, text, icon, iconProps, style }: Props = $props();
  let uid: string = $props.id();

  const IconComponent = $derived(icon);
</script>

<h2 id="css-module-heading-{uid}" class={itemClass(classNames, cssModule)} {style}>
  {#if typeof IconComponent === "string"}
    <img
      {...iconProps}
      src={IconComponent}
      alt={iconProps?.alt ?? ""}
      width={iconProps?.width ?? iconProps?.size ?? "28"}
      height={iconProps?.height ?? iconProps?.size ?? "28"} />
  {:else}
    <IconComponent {...iconProps} />
  {/if}<span class="css-module-heading--text">{text}</span>
</h2>
