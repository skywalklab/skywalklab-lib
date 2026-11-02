<script lang="ts">
  import type { Component } from "svelte";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import ArrowDown from "@lucide/svelte/icons/arrow-down";

  interface Props {
    /** Steps shown in order; each `icon` is a component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL; `iconProps` takes `lucide_icon` and `size` for `Icon`, and everything else is forwarded to the component or `<img>`. */
    steps: {
      /** Step label. */
      text: string;
      /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
      icon: Component<any, object, ""> | string;
      /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
      iconProps?: Record<string, any>;
    }[];
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { steps, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="how-we-work-1-{uid}" class="how-we-work-1" {style}>
  {#each steps as { icon: IconComponent, text, iconProps }, i (i)}
    <div class="how-we-work-1--inner-container">
      <div class="how-we-work-1--step-container">
        {#if typeof IconComponent === "string"}
          <img
            {...iconProps}
            src={IconComponent}
            alt={iconProps?.alt ?? text}
            width={iconProps?.width ?? iconProps?.size ?? "32"}
            height={iconProps?.height ?? iconProps?.size ?? "32"} />
        {:else}
          <IconComponent {...iconProps} />
        {/if}
        <p class="how-we-work-1--step-text">{text}</p>
      </div>
      <div class="how-we-work-1--arrow-container" class:last={i === steps.length - 1}>
        <ArrowRight />
        <ArrowDown />
      </div>
    </div>
  {/each}
</div>

<style>
  .how-we-work-1 {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;

    @media (min-width: 768px) {
      flex-direction: row;
    }

    .how-we-work-1--inner-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;

      @media (min-width: 768px) {
        flex-direction: row;
      }
    }

    .how-we-work-1--step-container {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0.5rem;
      box-shadow:
        0 0 10px 0 rgba(0, 0, 0, 0.025),
        0 1px 1px 0 rgba(0, 0, 0, 0.01),
        0 0 50px 0 rgba(0, 0, 0, 0.07);
      width: 120px;
      font-size: 15px;
    }

    .how-we-work-1--arrow-container {
      width: fit-content;

      &.last {
        display: none;
      }

      :global {
        .lucide-arrow-right {
          display: none;
        }

        @media (min-width: 768px) {
          .lucide-arrow-right {
            display: block;
          }

          .lucide-arrow-down {
            display: none;
          }
        }
      }
    }
  }
</style>
