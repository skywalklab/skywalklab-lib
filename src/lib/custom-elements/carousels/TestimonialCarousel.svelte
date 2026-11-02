<svelte:options
  customElement={{
    tag: "skywalk-testimonial-carousel",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      title: { type: "String", attribute: "sw-title" },
      items: { type: "Array", attribute: "sw-items" },
      buttonClass: { type: "String", attribute: "sw-button-class" },
      headingColor: { type: "String", attribute: "sw-heading-color" },
      cardBgColor: { type: "String", attribute: "sw-card-bg-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "carousels/TestimonialCarousel", false);
        }

        connectedCallback() {
          this.#adopt();
          return (Base.prototype as any).connectedCallback.call(this);
        }

        attributeChangedCallback(...args: any[]) {
          const result = (Base.prototype as any).attributeChangedCallback.apply(this, args);
          if (this.shadowRoot) this.#adopt();
          return result;
        }
      }
  }} />

<script module lang="ts">
  import { shadowSheets } from "../../utils/shadow-styles.js";
</script>

<script lang="ts">
  import TestimonialCarousel from "../../components/carousels/TestimonialCarousel.svelte";

  let { title, items, buttonClass, headingColor, cardBgColor, style }: any = $props();
</script>

<TestimonialCarousel {title} {items} {buttonClass} {headingColor} {cardBgColor} {style} />


<style>
  :host {
    display: block;
  }

  :global {
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
  }
</style>
      