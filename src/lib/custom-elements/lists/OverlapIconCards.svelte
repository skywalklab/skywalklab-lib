<svelte:options
  customElement={{
    tag: "skywalk-overlap-icon-cards",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      items: { type: "Array", attribute: "sw-items" },
      cardBgColor: { type: "String", attribute: "sw-card-bg-color" },
      badgeBgColor: { type: "String", attribute: "sw-badge-bg-color" },
      badgeColor: { type: "String", attribute: "sw-badge-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "lists/OverlapIconCards", false);
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
  import OverlapIconCards from "../../components/lists/OverlapIconCards.svelte";

  let { items, cardBgColor, badgeBgColor, badgeColor, style }: any = $props();
</script>

<OverlapIconCards {items} {cardBgColor} {badgeBgColor} {badgeColor} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.overlap-icon-cards {
    .overlap-icon-cards--inner-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.75rem;

      .overlap-icon-cards--card {
        display: flex;
        flex-direction: column;
        gap: 1.15rem;
        background-color: var(--overlap-icon-cards-card-bg-color, var(--accent, lightblue));
        border-radius: 14px;
        padding: 2rem 1.75rem;
        box-shadow: 0 18px 40px rgba(15, 25, 34, 0.12);

        .overlap-icon-cards--head {
          display: flex;
          align-items: center;
          gap: 1.15rem;

          .overlap-icon-cards--badge {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 62px;
            height: 62px;
            border-radius: 50%;
            background: linear-gradient(
              145deg,
              color-mix(in srgb, var(--overlap-icon-cards-badge-bg-color, var(--primary, black)), #fff 18%),
              var(--overlap-icon-cards-badge-bg-color, var(--primary, black))
            );
            color: var(--overlap-icon-cards-badge-color, var(--accent, lightblue));
            box-shadow: 0 10px 20px
              color-mix(in srgb, var(--overlap-icon-cards-badge-bg-color, var(--primary, black)), transparent 62%);
          }

          .overlap-icon-cards--title {
            color: var(--primary, black);
            font-size: 26px;
            line-height: 1.2;
            font-weight: 800;
            letter-spacing: -0.02em;
            text-transform: none;
            text-wrap: balance;

            &::after {
              content: "";
              display: block;
              width: 34px;
              height: 3px;
              border-radius: 999px;
              background-color: var(--overlap-icon-cards-badge-bg-color, var(--primary, black));
              margin-top: 0.65rem;
            }
          }
        }

        .overlap-icon-cards--description {
          font-size: 15px;
          line-height: 26px;
        }
      }
    }
  }
  }
</style>
      