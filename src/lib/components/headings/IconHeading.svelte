<script lang="ts">
  import type { Component, Snippet } from "svelte";
  import icon_heading from "../../css-modules/icon-heading.module.css";

  interface Props {
    /** Heading text. */
    text: string;
    /** HTML Element for the title. */
    tag?: string;
    /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
    icon: Component<any, object, ""> | string;
    /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
    iconProps?: Record<string, any>;
    /** Markup appended after `text`, for styling individual words, e.g. giving some a color or
     * text decoration that the plain-string `text` cannot express. */
    children?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { text, tag = "h2", icon, iconProps, children, style }: Props = $props();
  let uid: string = $props.id();

  const IconComponent = $derived(icon);
</script>

<svelte:element this={tag} id="icon-heading-{uid}" class={icon_heading["icon-heading"]} {style}>
  {#if typeof IconComponent === "string"}
    <img
      {...iconProps}
      src={IconComponent}
      alt={iconProps?.alt ?? ""}
      width={iconProps?.width ?? iconProps?.size ?? "28"}
      height={iconProps?.height ?? iconProps?.size ?? "28"} />
  {:else}
    <IconComponent {...iconProps} />
  {/if}<span>{text}{@render children?.()}</span>
</svelte:element>
