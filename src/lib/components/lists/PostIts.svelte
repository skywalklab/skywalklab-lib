<script lang="ts">
  import { addEntryAnimateFallback } from "../../actions/entry-animate.js";
  import {
    handleIntersectionEvent,
    type IntersectionAction,
    type IntersectionActionParams
  } from "../../actions/intersection-observer.svelte.js";
  import type { Component } from "svelte";

  interface Props {
    /** Notes shown on the board; each `icon` is a component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL; `iconProps` takes `lucide_icon` and `size` for `Icon`, and everything else is forwarded to the component or `<img>`. */
    items: {
      /** Heading on the note. */
      title: string;
      /** Body copy on the note. */
      description: string;
      /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
      icon: Component<any, object, ""> | string;
      /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
      iconProps?: Record<string, any>;
    }[];
    /** Text color on each note. Sets `--post-its-color`. */
    color?: string;
    /** Start color of each note's background gradient. Sets `--post-its-bg-from`. */
    bgFromColor?: string;
    /** End color of each note's background gradient. Sets `--post-its-bg-to`. */
    bgToColor?: string;
    /** Color of the folded corner at the top of each note. Sets `--post-its-corner-color`. */
    cornerColor?: string;
    /** When the animation runs: `onLoad` starts it on page load, `onEnter` starts or resumes it when the component scrolls into view, `onLeave` stops it when it scrolls out. */
    intersectionActions?: IntersectionAction[];
    /** Settings for the intersection observer behind those events. `noAnimate` skips it entirely, as does `prefers-reduced-motion`. Passing `onLoad`, `onEnter` or `onLeave` here replaces the component's own handler for that event. */
    intersectionActionParams?: IntersectionActionParams;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    items,
    color = "var(--background, #ffffff)",
    bgFromColor = "var(--accent, lightblue)",
    bgToColor = "var(--primary, black)",
    cornerColor = "var(--accent-dark, slategray)",
    intersectionActions = [],
    intersectionActionParams,
    style
  }: Props = $props();
  let uid: string = $props.id();
</script>

<ul
  id="post-its-{uid}"
  class="post-its"
  class:entry-animate={intersectionActions.length > 0}
  style:--post-its-color={color}
  style:--post-its-bg-from={bgFromColor}
  style:--post-its-bg-to={bgToColor}
  style:--post-its-corner-color={cornerColor}
  {style}
  use:handleIntersectionEvent={{
    key: `post-its-${uid}`,
    ...addEntryAnimateFallback(intersectionActions),
    ...intersectionActionParams
  }}>
  {#each items as item, index (index)}
    {@const IconComponent = item.icon}
    <li class="post-its--item">
      <p class="post-its--title">{item.title}</p>
      <p class="post-its--body">
        {#if typeof IconComponent === "string"}
          <img
            {...item.iconProps}
            class="post-its--icon"
            src={IconComponent}
            alt={item.iconProps?.alt ?? item.title}
            width={item.iconProps?.width ?? item.iconProps?.size ?? "48"}
            height={item.iconProps?.height ?? item.iconProps?.size ?? "48"} />
        {:else}
          <IconComponent {...item.iconProps} />
        {/if}
        <span class="post-its--description">{item.description}</span>
      </p>
      <hr class="post-its--divider" />
    </li>
  {/each}
</ul>

<style>
  .post-its {
    width: 100%;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(205px, 1fr));
    justify-items: center;
    column-gap: 1rem;
    row-gap: 2.5rem;

    .post-its--item {
      position: relative;
      background: linear-gradient(145deg, var(--post-its-bg-from), var(--post-its-bg-to));
      color: var(--post-its-color);
      box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      padding: 2rem 1rem 1rem;
      transform: rotate(-2deg);
      max-width: 300px;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
      transition: transform 0.5s ease;
      overflow: hidden;

      @media (prefers-reduced-motion: reduce) {
        transition: all 1s ease;
      }

      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-top: 30px solid var(--post-its-corner-color);
        border-left: 30px solid transparent;
      }

      &:nth-of-type(even) {
        transform: rotate(2deg);

        &::after {
          border-left: unset;
          border-right: 30px solid transparent;
          right: unset;
          left: 0;
        }
      }

      .post-its--title {
        font-size: clamp(20px, 5vw, 28px);
        text-align: center;
      }

      .post-its--body {
        display: flex;
        gap: 0.5rem;

        .post-its--description {
          text-wrap: balance;
        }
      }

      .post-its--divider {
        width: 100%;
        margin-top: 0.5rem;
      }
    }

    &.entry-animate {
      .post-its--item {
        &:nth-of-type(even) {
          transform: rotate(-2deg);

          &::after {
            border-left: 30px solid transparent;
            border-right: unset;
            right: 0;
            left: unset;
          }
        }

        &:nth-of-type(odd) {
          transform: rotate(2deg);

          &::after {
            border-left: unset;
            border-right: 30px solid transparent;
            right: unset;
            left: 0;
          }
        }
      }
    }
  }
</style>
