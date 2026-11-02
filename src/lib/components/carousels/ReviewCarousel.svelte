<script lang="ts">
  import type { Component } from "svelte";
  import Carousel1 from "./Carousel1.svelte";
  import CircleNode from "../cards/CircleNode.svelte";

  export interface Review {
    /** Body of the review. */
    review: string;
    /** Name of the reviewer. */
    name: string;
    /** Reviewer's role or company. */
    title?: string;
  }

  interface Props {
    /** Reviews shown in the carousel. Each has a `review` body, the reviewer's `name`, and an optional `title` for their role or company. */
    reviews: Review[];
    /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
    icon: Component<any, object, ""> | string;
    /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
    iconProps?: Record<string, any>;
    /** Background image behind the reviews, as a CSS image value. Sets `--review-carousel-background-image`. */
    backgroundImage?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { reviews, icon, iconProps, backgroundImage, style }: Props = $props();
  let uid: string = $props.id();
  let activeIndex = $state<number>(0);
</script>

<div
  id="review-carousel-{uid}"
  class="review-carousel"
  style:--review-carousel-background-image={backgroundImage}
  {style}>
  <Carousel1 bind:activeIndex items={reviews} style="max-width: 1000px;">
    {#snippet itemSnippet({ item }: { item: Review })}
      <div class="review-carousel--container">
        <CircleNode {icon} {iconProps} animate={true} style="padding: clamp(1.5rem, 4vw, 2.5rem);" />
        <p class="review-carousel--review">{item.review}</p>
        <p class="review-carousel--name">{item.name}</p>
        {#if item.title}
          <p class="review-carousel--title">{item.title}</p>
        {/if}
      </div>
    {/snippet}
  </Carousel1>
</div>

<style>
  .review-carousel {
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    background-image: var(--review-carousel-background-image);
    background-color: rgba(0, 0, 0, 0.65);
    position: relative;
    padding: 3rem 0;
    color: #fff;

    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: inherit;
    }

    .review-carousel--container {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      text-align: center;
      min-width: 280px;

      .review-carousel--review {
        text-wrap: balance;
        padding: 2rem 0 0;
        font-size: clamp(15px, 4vw, 18px);

        &::after {
          display: block;
          content: "";
          background: var(--primary, black);
          width: 40px;
          height: 2px;
          margin: 30px auto 0;
        }
      }

      .review-carousel--title {
        font-size: 13px;
        text-transform: uppercase;
      }
    }

    :global {
      .carousel-1 {
        .carousel-1--button {
          transition:
            background-color 0.15s linear,
            border-color 0.15s linear;

          &:hover {
            background-color: var(--primary, black);
            border-color: var(--primary, black);
          }
        }
      }
    }
  }
</style>
