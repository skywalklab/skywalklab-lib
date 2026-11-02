<script lang="ts">
  import logo_list from "../../css-modules/logo-list.module.css";

  type ItemProps = { text: string; classNames: string };
  type SubItemProps = Partial<ItemProps>;

  interface Props {
    /** Marker background at the top level. Sets `--logo-list-marker-bg-color`. */
    markerBgColor?: string;
    /** Marker background for nested lists. Sets `--logo-list-nested-marker-bg-color`. */
    nestedMarkerBgColor?: string;
    /** Marker border and arrow color in outline mode. Sets `--logo-list-outline-marker-color`. */
    outlineMarkerColor?: string;
    /** Glyph shown in ul markers, as a `url(...)` value. Sets `--logo-list-marker-image`. */
    markerImage?: string;
    /** Width and height of that glyph. Sets `--logo-list-marker-size`. */
    markerSize?: string;
    /** Minimum height of a row and its marker. Sets `--logo-list-marker-min-height`. */
    markerMinHeight?: string;
    /** Gap between the marker and the item content. Sets `--logo-list-gap`. */
    gap?: string;
    /** Arrow scale in outline mode; also feeds the min height. Sets `--logo-list-arrow-scale`. */
    arrowScale?: string;
    /** List items, each with a space-separated `classNames` string of module class keys and an optional nested list. */
    items: Partial<ItemProps & { subItems: SubItemProps[] }>[];
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    markerBgColor,
    nestedMarkerBgColor,
    outlineMarkerColor,
    markerImage,
    markerSize,
    markerMinHeight,
    gap,
    arrowScale,
    items,
    style
  }: Props = $props();
  let uid: string = $props.id();

  const itemClass = (classNames: string | undefined, cssModule: Record<string, string> = logo_list) =>
    (classNames?.split(" ") ?? [])
      ?.map((className) => cssModule[className])
      .filter(Boolean)
      .join(" ");
</script>

<ul
  id="logo-list-{uid}"
  class="{logo_list['logo-list']} logo-list-custom"
  style:--logo-list-marker-bg-color={markerBgColor}
  style:--logo-list-nested-marker-bg-color={nestedMarkerBgColor}
  style:--logo-list-outline-marker-color={outlineMarkerColor}
  style:--logo-list-marker-image={markerImage}
  style:--logo-list-marker-size={markerSize}
  style:--logo-list-marker-min-height={markerMinHeight}
  style:--logo-list-gap={gap}
  style:--logo-list-arrow-scale={arrowScale}
  {style}>
  {#each items as item, i (i)}
    <li class={itemClass(item.classNames)}>
      <span>{item.text}</span>
      {#if item.subItems?.length}
        <ul class="{logo_list['logo-list']} logo-list-nested-custom">
          {#each item.subItems as subItem, j (j)}
            <li class={itemClass(subItem.classNames)}><span>{subItem.text}</span></li>
          {/each}
        </ul>
      {/if}
    </li>
  {/each}
</ul>
