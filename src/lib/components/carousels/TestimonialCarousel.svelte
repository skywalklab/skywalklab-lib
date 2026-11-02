<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";

  interface Props {
    /** Heading above the carousel. */
    title: string;
    /** Testimonials shown in the carousel. */
    items: {
      /** Body of the testimonial. */
      review: string;
      /** Name of the person quoted. */
      name: string;
      /** Role, firm, or both. */
      title: string;
    }[];
    /** Class applied to the previous and next buttons. */
    buttonClass?: string;
    /** Color of the title and quote headings. Sets `--testimonial-carousel-heading-color`. */
    headingColor?: string;
    /** Background color of each testimonial card. Sets `--testimonial-carousel-card-bg-color`. */
    cardBgColor?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { title, items, buttonClass, headingColor, cardBgColor, style }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();
  let track = $state<HTMLUListElement | undefined>();

  const initials = (name: string) =>
    name
      .split(/[\s,]+/)
      .filter((part) => /^[A-Za-z]/.test(part))
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");

  function page(direction: -1 | 1) {
    track?.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  }
</script>

<div
  id="testimonial-carousel-{uid}"
  class="testimonial-carousel"
  style:--testimonial-carousel-heading-color={headingColor}
  style:--testimonial-carousel-card-bg-color={cardBgColor}
  {style}>
  <div class="testimonial-carousel--heading">
    <h2 class="testimonial-carousel--title">{title}</h2>
    {#if items.length > 1}
      <div class="testimonial-carousel--buttons">
        <button
          class="{buttonClass} testimonial-carousel--button"
          aria-label={labels.previousTestimonials}
          onclick={() => page(-1)}>
          <ChevronLeft size={22} />
        </button>
        <button
          class="{buttonClass} testimonial-carousel--button"
          aria-label={labels.nextTestimonials}
          onclick={() => page(1)}>
          <ChevronRight size={22} />
        </button>
      </div>
    {/if}
  </div>

  <ul class="testimonial-carousel--track" bind:this={track}>
    {#each items as item, i (i)}
      <li class="testimonial-carousel--card">
        <div class="testimonial-carousel--person">
          <span class="testimonial-carousel--avatar" aria-hidden="true">{initials(item.name)}</span>
          <div class="testimonial-carousel--person-text">
            <p class="testimonial-carousel--name">{item.name}</p>
            <p class="testimonial-carousel--role">{item.title}</p>
          </div>
        </div>
        <blockquote class="testimonial-carousel--quote">{item.review}</blockquote>
        <span class="testimonial-carousel--mark" aria-hidden="true">&rdquo;</span>
      </li>
    {/each}
  </ul>
</div>

<style>
  .testimonial-carousel {
    --testimonial-carousel-accent: var(--accent, lightblue);

    .testimonial-carousel--heading {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-end;
      gap: 1.5rem;
      margin-bottom: 3.5rem;

      .testimonial-carousel--title {
        color: var(--testimonial-carousel-heading-color, var(--primary, black));
        font-size: clamp(30px, 3.4vw, 46px);
        line-height: 1.15;
        font-weight: 800;
        letter-spacing: -0.02em;
        text-transform: none;
      }

      .testimonial-carousel--buttons {
        display: flex;
        gap: 0.75rem;

        .testimonial-carousel--button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
        }
      }
    }

    .testimonial-carousel--track {
      display: flex;
      gap: 2rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      padding-bottom: 0.5rem;

      &::-webkit-scrollbar {
        display: none;
      }

      .testimonial-carousel--card {
        position: relative;
        overflow: hidden;
        flex: 0 0 100%;
        scroll-snap-align: start;
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
        background-color: var(--testimonial-carousel-card-bg-color, var(--accent, lightblue));
        border-radius: 14px;
        padding: 2rem 1.75rem;

        .testimonial-carousel--person {
          display: flex;
          align-items: center;
          gap: 1rem;

          .testimonial-carousel--avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 58px;
            height: 58px;
            border-radius: 50%;
            background-color: color-mix(in srgb, var(--testimonial-carousel-accent), transparent 82%);
            color: var(--testimonial-carousel-accent);
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 0.02em;
          }

          .testimonial-carousel--person-text {
            .testimonial-carousel--name {
              color: var(--testimonial-carousel-heading-color, var(--primary, black));
              font-size: 20px;
              font-weight: 700;
              line-height: 1.3;
            }

            .testimonial-carousel--role {
              font-size: 15px;
              line-height: 24px;
            }
          }
        }

        .testimonial-carousel--quote {
          font-size: 15px;
          line-height: 28px;
          margin: 0;
        }

        .testimonial-carousel--mark {
          position: absolute;
          right: 1.5rem;
          bottom: -1.75rem;
          color: color-mix(in srgb, var(--testimonial-carousel-heading-color, var(--primary, black)), transparent 88%);
          font-size: 120px;
          line-height: 1;
          pointer-events: none;
        }

        @media (min-width: 768px) {
          flex-basis: calc((100% - 2rem) / 2);
        }

        @media (min-width: 1024px) {
          flex-basis: calc((100% - 4rem) / 3);
        }
      }
    }
  }
</style>
