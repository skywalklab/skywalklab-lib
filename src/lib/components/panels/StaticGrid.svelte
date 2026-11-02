<script lang="ts">
  import { SvelteMap } from "svelte/reactivity";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  interface Props {
    /** Images and titles shown in the grid. */
    cards: {
      /** Image source. */
      src: string;
      /** Alt text for the image. */
      alt?: string;
      /** Intrinsic image width. */
      width: string;
      /** Intrinsic image height. */
      height: string;
      /** Label revealed over the image on hover. */
      title: string;
      /** Called with the click event and the card's index. */
      cb?: (e: Event, i: number) => void;
    }[];
    /** Label of the button revealed over each image on hover. */
    buttonText?: string;
    /** Class applied to the button alongside its own, e.g. a button CSS module from `@skywalklab/lib/css-modules`. */
    buttonClass?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { cards, buttonText, buttonClass, style }: Props = $props();
  let uid: string = $props.id();
  let cardMap = $derived(new SvelteMap(cards.map((card, i) => [i, false])));
</script>

<div id="static-grid-{uid}" class="static-grid" {style}>
  {#each cards as card, i (i)}
    <div
      class="static-grid--card"
      role="presentation"
      onmouseenter={() => cardMap.set(i, true)}
      onmouseleave={() => cardMap.set(i, false)}>
      <img
        class="static-grid--image"
        src={card.src}
        alt={card.alt ?? card.title}
        width={card.width}
        height={card.height} />
      {#if cardMap.get(i)}
        <p class="static-grid--title" in:fly={{ y: -20, duration: 300, easing: cubicOut }}>{card.title}</p>
        <button
          class="{buttonClass} static-grid--button"
          onclick={(e) => card.cb?.(e, i)}
          in:fly={{ y: 20, duration: 300, easing: cubicOut }}>{buttonText}</button>
      {/if}
    </div>
  {/each}
</div>

<style>
  .static-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }

    .static-grid--card {
      padding-inline: var(--side-padding, 12px);
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      justify-content: center;
      height: clamp(10rem, 20vw, 20rem);

      &::before {
        content: "";
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(38, 38, 40, 0.75);
        transition: opacity 0.15s linear;
        opacity: 0;
      }

      &:hover {
        &::before {
          opacity: 1;
        }
      }

      .static-grid--image {
        object-fit: cover;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }

      .static-grid--title {
        position: relative;
        z-index: 2;
        color: #fff;
        text-wrap: balance;
        text-align: center;
      }

      .static-grid--button {
        text-transform: uppercase;
        font-size: 14px;
        padding: 0.75rem 1.25rem;
        border-radius: 999px;
        position: relative;
        z-index: 3;

        &:hover {
          border-color: var(--primary, black);
        }
      }
    }
  }
</style>
