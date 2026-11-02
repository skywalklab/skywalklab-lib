<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import { fly } from "svelte/transition";

  interface Props {
    /** Images shown in the paginated grid. */
    cards: { src: string; alt: string; width: string; height: string }[];
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { cards, style }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
  let selectedIndex = $state<number>(0);
  let cardWidth = $state<number>(165);
  let containerWidth = $state<number>(0);
  let cardContainers = $derived.by<Props["cards"][]>(() => {
    if (containerWidth < 1) return [];
    const gapWidth = 24;
    const adjustedCardWidth = cardWidth + gapWidth;
    const itemsPerSection = Math.max(1, Math.floor(containerWidth / adjustedCardWidth));
    const numberOfSections = Math.ceil(cards.length / itemsPerSection);

    const sections: Props["cards"][] = [];
    for (let i = 0; i < numberOfSections; i++) {
      const startIndex = i * itemsPerSection;
      const endIndex = itemsPerSection * (i + 1);
      sections.push(cards.slice(startIndex, endIndex));
    }

    return sections;
  });
  // Nothing to slide to when every card fits on one page, and a drag would move the only one.
  let isPaginated = $derived(cardContainers.length > 1);
  let isDragging = $state<boolean>(false);
  let isSliding = $state<boolean>(false);
  let startX = $state<number>(0);
  let flyObj = $derived({ in: containerWidth, out: -containerWidth });
  let flyDuration = $state<number>(1000);

  const slideleft = (i?: number) => {
    flyObj = { in: -containerWidth, out: containerWidth };
    selectedIndex = i ?? (selectedIndex === 0 ? cardContainers.length - 1 : selectedIndex - 1);
  };

  const slideright = (i?: number) => {
    flyObj = { in: containerWidth, out: -containerWidth };
    selectedIndex = i ?? (selectedIndex === cardContainers.length - 1 ? 0 : selectedIndex + 1);
  };

  const handleDotButton = (i: number) => {
    if (i > selectedIndex) {
      slideright(i);
    } else if (i < selectedIndex) {
      slideleft(i);
    }
  };

  const handleSlide = (e: PointerEvent | MouseEvent) => {
    const target = e.currentTarget as HTMLElement | null;
    if (!isDragging || !target) return;

    isSliding = true;
    isDragging = false;
    const deltaX = e.clientX - startX;
    const threshold = 150;

    if (deltaX > threshold) {
      slideleft();
      setTimeout(() => (isSliding = false), flyDuration);
    } else if (deltaX < -threshold) {
      slideright();
      setTimeout(() => (isSliding = false), flyDuration);
    } else {
      isSliding = false;
      target.style.left = "unset";
    }
  };
</script>

<div
  id="flex-cards-pagination-{uid}"
  class="flex-cards-pagination"
  style:--flex-cards-pagination-card-width={cardWidth + "px"}
  {style}>
  <div class="flex-cards-pagination--cards-viewport" bind:clientWidth={containerWidth}>
    {#each cardContainers as containers, i (i)}
      {#if i === selectedIndex}
        <div
          class="flex-cards-pagination--cards-container"
          class:is-paginated={isPaginated}
          role="presentation"
          onpointerdown={(e) => {
            if (isSliding || !isPaginated) return;
            isDragging = true;
            startX = e.clientX;
          }}
          onpointermove={(e) => {
            const deltaX = e.clientX - startX;
            const maxThreshold = containerWidth / 2;
            const isInRange = deltaX < maxThreshold && deltaX > -maxThreshold;

            if (isDragging && isInRange) {
              e.currentTarget.style.left = e.clientX - startX + "px";
            }
          }}
          onpointerup={handleSlide}
          onmouseleave={handleSlide}
          in:fly={{ x: flyObj.in, duration: flyDuration }}
          out:fly={{ x: flyObj.out, duration: flyDuration }}>
          {#each containers as card, index (index)}
            <div class="flex-cards-pagination--card">
              <img draggable="false" src={card.src} alt={card.alt} width={card.width} height={card.height} />
            </div>
          {/each}
        </div>
      {/if}
    {/each}
  </div>
  <div class="flex-cards-pagination--dots-container">
    {#each cardContainers as containers, i (i)}
      <button
        class="flex-cards-pagination--dot"
        class:selected={selectedIndex === i}
        aria-label={labels.showSlide(i + 1)}
        onclick={() => handleDotButton(i)}></button>
    {/each}
  </div>
</div>

<style>
  .flex-cards-pagination {
    overflow: hidden;
    width: 100%;

    .flex-cards-pagination--cards-viewport {
      display: grid;
      justify-content: center;
      position: relative;
      margin-bottom: 3rem;
      width: 100%;
    }

    .flex-cards-pagination--cards-container {
      position: relative;
      grid-area: 1 / 1;
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 1.5rem;

      &.is-paginated {
        cursor: grab;
      }

      .flex-cards-pagination--card {
        filter: grayscale();
        padding: 1rem;
        width: var(--flex-cards-pagination-card-width);
        min-width: 140px;
        height: 115px;
        background-color: #fff;
        user-select: none;

        &:hover {
          filter: grayscale(0);
        }

        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
    }

    .flex-cards-pagination--dots-container {
      display: flex;
      justify-content: center;
      gap: 1rem;

      .flex-cards-pagination--dot {
        width: 1px;
        height: 1px;
        border-radius: 50%;
        border: 5px solid #e2e6e7;
        background: #e2e6e7;

        &.selected {
          border-color: var(--primary, black);
          background: var(--primary, black);
        }
      }
    }
  }
</style>
