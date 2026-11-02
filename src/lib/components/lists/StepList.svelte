<script lang="ts">
  import { snippetWrap } from "../../utils/snippets.js";
  import type { Component, Snippet } from "svelte";

  interface Props {
    /** Steps shown in order; each `icon` is a component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL; `iconProps` takes `lucide_icon` and `size` for `Icon`, and everything else is forwarded to the component or `<img>`. Steps without an icon show their number. */
    items: {
      /** Step heading. */
      title: string;
      /** Body copy under the heading. */
      description: string;
      /** Optional; replaces the step number. A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
      icon?: Component<any, object, ""> | string;
      /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
      iconProps?: Record<string, any>;
      /** Extra classes applied to that step's wrapper. */
      classNames?: string;
    }[];
    /** Balance the steps across two columns. */
    breakEven?: boolean;
    /** Body text color of each step. Sets `--step-list-color`. */
    color?: string;
    /** Background color of each step. Sets `--step-list-bg-color`. */
    bgColor?: string;
    /** Color of the step numbers. Sets `--step-list-step-num-color`. */
    stepNumColor?: string;
    /** Color of the dividers between steps. Sets `--step-list-border-color`. */
    borderColor?: string;
    /** Rendered at the end of each step, under its description; receives that step's item and index. */
    stepSnippet?: Snippet<[{ item: any; index: number }]>;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    items,
    breakEven = false,
    color = "var(--primary, #000000)",
    bgColor = "var(--background, #ffffff)",
    stepNumColor,
    borderColor,
    stepSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();

  const incrementNumber: (arg: number) => string = (number) => {
    return (parseInt(number + "", 10) + 101).toString().slice(1);
  };
</script>

<div
  id="step-list-{uid}"
  class="step-list"
  style:--step-list-color={color}
  style:--step-list-bg-color={bgColor}
  style:--step-list-step-num-color={stepNumColor}
  style:--step-list-border-color={borderColor}
  {style}>
  <div class="step-list--inner-container" class:break-even={breakEven} role="list">
    {#each items as item, index (index)}
      <div class="step-list--step-wrapper {item.classNames ?? ''}">
        <div class="step-list--step" role="listitem" id={item.title.toLowerCase().replace(/\s/g, "-")}>
          <p class="step-list--step-heading" role="heading" aria-level="3">
            {#if item.icon}
              {#if typeof item.icon === "string"}
                <img
                  {...item.iconProps}
                  class="step-list--step-img"
                  src={item.icon}
                  alt={item.iconProps?.alt ?? ""}
                  width={item.iconProps?.width ?? item.iconProps?.size ?? "42"}
                  height={item.iconProps?.height ?? item.iconProps?.size ?? "42"} />
              {:else}
                <item.icon class="step-list--step-img" {...item.iconProps} />
              {/if}
            {:else}
              <span class="step-list--step-num">{incrementNumber(index) + "."}</span>
            {/if}
            <span class="step-list--step-title">{item.title}</span>
          </p>
          <p class="step-list--step-description">{item.description}</p>
          {@render snippetWrap(stepSnippet)?.({ item, index })}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .step-list {
    container: step-list / inline-size;

    .step-list--inner-container {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

      &.break-even {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr) minmax(250px, 1fr));
      }
    }

    .step-list--step-wrapper {
      height: 100%;
    }

    .step-list--step {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      border: 1px solid var(--step-list-border-color, #e0e0e0);
      border-radius: 12px;
      padding: 20px;
      color: inherit;
      background-color: var(--step-list-bg-color);

      .step-list--step-heading {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        color: inherit;

        :global(.step-list--step-img) {
          height: 50px;
          width: auto;
        }

        .step-list--step-num {
          color: var(--step-list-step-num-color, var(--primary, black));
          font-size: 50px;
          margin-bottom: 0.5rem;
        }

        .step-list--step-title {
          font-size: 24px;
        }
      }

      .step-list--step-description {
        color: var(--step-list-color);
      }
    }
  }

  @container step-list (width < 516px) {
    .step-list--inner-container,
    .step-list--inner-container.break-even {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }
</style>
