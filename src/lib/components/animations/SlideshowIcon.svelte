<script lang="ts">
  import type { Component } from "svelte";
  import type { Action } from "svelte/action";
  import { Tween } from "svelte/motion";

  interface Props {
    /** Icons, titles and descriptions shown in sequence; each `icon` is a component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL; `iconProps` takes `lucide_icon` and `size` for `Icon`, and everything else is forwarded to the component or `<img>`. An optional `onclick` is called with the item's index once it becomes selected. */
    items: {
      /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
      icon: Component<any, object, ""> | string;
      /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
      iconProps?: Record<string, any>;
      /** Color applied to this item when active. */
      color: string;
      /** Heading shown for this item. */
      title: string;
      /** Body copy shown under the heading. */
      description: string;
      /** Called with the item's index when its button is clicked, after it becomes the selected item. */
      onclick?: (index: number) => void;
    }[];
    /** Milliseconds each item stays on screen. */
    duration?: number;
    /** Height of each icon tile. Sets `--slideshow-icon-height`. */
    height?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { items, duration = 5000, height, style }: Props = $props();

  let uid: string = $props.id();
  let selected = $state<number>(0);
  let progress = $derived<Tween<number>>(new Tween(0, { duration }));

  const resetProgress: () => void = () => {
    progress.set(0, { duration: 0 });
  };

  const startProgress: (resume?: boolean) => void = (resume) => {
    const remaining = resume === true ? duration - (progress.current / 100) * duration : duration;
    progress.set(100, { duration: remaining }).then(() => {
      resetProgress();
      selected = selected < items.length - 1 ? selected + 1 : 0;
    });
  };

  const setProgress: Action<HTMLElement> = () => {
    $effect(() => {
      startProgress();
    });
  };

  const handleIconBtn: (index: number, onclick?: (index: number) => void) => void = (index, onclick) => {
    selected = index;
    onclick?.(index);
    resetProgress();
    startProgress();
  };
</script>

<div id="slideshow-icon-{uid}" class="slideshow-icon" {style}>
  <ul class="slideshow-icon--buttons-container" role="tablist">
    {#each items as item, i (i)}
      {@const IconComponent = item.icon}
      <li
        role="presentation"
        class="slideshow-icon--button-container"
        class:selected={i === selected}
        style:--slideshow-icon-color={item.color}
        style:--slideshow-icon-height={height}
        style:--slideshow-icon-progress={i === selected ? progress.current + "%" : "0%"}>
        <button
          class="slideshow-icon--button"
          role="tab"
          id="icon-tab-{uid}-{i}"
          aria-label={item.title}
          aria-selected={i === selected}
          aria-controls={i === selected ? `icon-description-${uid}-${i}` : undefined}
          onclick={() => handleIconBtn(i, item.onclick)}>
          {#if typeof IconComponent === "string"}
            <img
              {...item.iconProps}
              src={IconComponent}
              alt={item.iconProps?.alt ?? item.title}
              width={item.iconProps?.width ?? item.iconProps?.size ?? "34"}
              height={item.iconProps?.height ?? item.iconProps?.size ?? "34"} />
          {:else}
            <IconComponent {...item.iconProps} />
          {/if}
        </button>
      </li>
    {/each}
  </ul>
  {#each items as icon, i (i)}
    {#if i === selected}
      <div
        id="icon-description-{uid}-{i}"
        class="slideshow-icon--text-container"
        role="tabpanel"
        aria-labelledby="icon-tab-{uid}-{i}">
        <dl>
          <dt class="slideshow-icon--title" use:setProgress>{icon.title}</dt>
          <dd class="slideshow-icon--description">{icon.description}</dd>
        </dl>
      </div>
    {/if}
  {/each}
</div>

<style>
  .slideshow-icon {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;

    .slideshow-icon--buttons-container {
      display: flex;
      gap: 1rem;

      .slideshow-icon--button-container {
        border-radius: calc(var(--slideshow-icon-height, 5rem) * var(--slideshow-icon-radius-ratio, 0.25));
        position: relative;
        overflow: hidden;
        height: var(--slideshow-icon-height, 5rem);
        width: var(--slideshow-icon-height, 5rem);
        display: flex;
        justify-content: center;
        align-items: center;
        --slideshow-icon-current-color: #e0dfdd;

        &.selected {
          --slideshow-icon-current-color: var(--slideshow-icon-color);

          .slideshow-icon--button > :first-child {
            filter: unset;
          }
        }

        &::before {
          content: "";
          background: conic-gradient(
            from -45deg,
            var(--slideshow-icon-current-color) var(--slideshow-icon-progress),
            var(--background, white) var(--slideshow-icon-progress)
          );
          height: var(--slideshow-icon-height, 5rem);
          width: var(--slideshow-icon-height, 5rem);
          position: absolute;
          z-index: 0;
        }

        &::after {
          content: "";
          --slideshow-icon-height: 90%;
          height: var(--slideshow-icon-height, 5rem);
          width: var(--slideshow-icon-height, 5rem);
          border-radius: calc(var(--slideshow-icon-height, 5rem) * var(--slideshow-icon-radius-ratio, 0.25));
          background-color: var(--background, white);
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          z-index: 1;
        }

        .slideshow-icon--button {
          --slideshow-icon-height: 75%;
          cursor: pointer;
          height: var(--slideshow-icon-height, 5rem);
          width: var(--slideshow-icon-height, 5rem);
          border-radius: calc(var(--slideshow-icon-height, 5rem) * var(--slideshow-icon-radius-ratio, 0.25));
          background-color: var(--slideshow-icon-current-color);
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background-color 0.3s linear;

          :global {
            img,
            svg {
              height: var(--slideshow-icon-height, 5rem);
              width: auto;
              filter: brightness(0) invert(1);
            }
          }
        }
      }
    }

    .slideshow-icon--text-container {
      width: 200px;

      dl {
        margin: 0;
      }

      .slideshow-icon--title {
        font-weight: bold;
        font-size: 20px;
        text-wrap: balance;
      }

      .slideshow-icon--description {
        color: rgb(119 113 105 / var(--tw-text-opacity, 1));
        text-wrap: balance;
      }
    }
  }
</style>
