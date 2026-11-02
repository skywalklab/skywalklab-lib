<script lang="ts">
  import type { Component } from "svelte";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import { fly } from "svelte/transition";

  export interface Props {
    /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
    icon: Component<any, object, ""> | string;
    /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
    iconProps?: Record<string, any>;
    /** Label shown under the bubble. */
    title: string;
    /** Element the bubble renders as. Use `"button"` when it is clickable, which also sets its `aria-label`, `title` and pointer cursor. */
    tag: string;
    /** Render the bubble in its highlighted state. */
    highlight?: boolean;
    /** Background color of the bubble. Sets `--bubble-icon-bg-color`. */
    bgColor?: string;
    /** Color used for the highlighted state. Sets `--bubble-icon-highlight-color`. */
    highlightColor?: string;
    /** Called when the bubble is clicked. */
    onclick?: () => void;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { icon, iconProps, title, tag, highlight, bgColor, highlightColor, onclick, style }: Props = $props();
  let uid: string = $props.id();

  const IconComponent = $derived(icon);
</script>

<svelte:element
  this={tag}
  role={tag !== "button" && onclick != undefined ? "button" : undefined}
  tabindex={tag !== "button" && onclick != undefined ? 0 : undefined}
  id="bubble-icon-{uid}"
  class="bubble-icon"
  class:highlight
  {onclick}
  aria-label={tag === "button" || onclick != undefined ? title : undefined}
  title={tag === "button" || onclick != undefined ? title : undefined}
  style:--bubble-icon-bg-color={bgColor}
  style:--bubble-icon-highlight-color={highlightColor}
  style:cursor={tag === "button" || onclick != undefined ? "pointer" : "initial"}
  {style}>
  <div class="bubble-icon--icon-container">
    {#if typeof IconComponent === "string"}
      <img
        {...iconProps}
        src={IconComponent}
        alt={iconProps?.alt ?? title}
        width={iconProps?.width ?? iconProps?.size ?? "48"}
        height={iconProps?.height ?? iconProps?.size ?? "48"} />
    {:else}
      <IconComponent {...iconProps} />
    {/if}
  </div>
  <p class="bubble-icon--title">{title}</p>
  {#if highlight}
    <div class="bubble-icon--chevron-container" in:fly={{ y: -15 }}>
      <ChevronDown size={48} style="color: var(--bubble-icon-highlight-color, var(--primary, black))" />
    </div>
  {/if}
</svelte:element>

<style>
  .bubble-icon {
    appearance: none;
    border: none;
    font: inherit;
    color: inherit;
    text-align: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: clamp(92px, 20vw, 130px);
    height: clamp(120px, 20vw, 130px);
    padding: 0.5rem;
    position: relative;
    transition:
      background-color 0.15s linear,
      color 0.15s linear;
    background-color: var(--bubble-icon-bg-color, white);

    &.highlight,
    &:hover {
      color: #fff;
      background-color: var(--bubble-icon-highlight-color, var(--primary, black));

      .bubble-icon--icon-container {
        :global {
          svg {
            transition: color 0.15s linear;
            color: currentColor;
          }
        }
      }
    }

    .bubble-icon--icon-container {
      :global {
        svg {
          color: var(--bubble-icon-highlight-color, var(--primary, black));
        }
      }
    }

    .bubble-icon--title {
      font-size: clamp(12px, 3vw, 16px);
      text-align: center;
      line-height: 1.2;
      flex: 1;
      max-height: 40%;
    }

    .bubble-icon--chevron-container {
      position: absolute;
      left: 0;
      right: 0;
      margin-inline: auto;
      width: fit-content;
      bottom: -28px;

      :global(svg) {
        stroke-width: 0;
        fill: currentColor;
      }
    }
  }
</style>
