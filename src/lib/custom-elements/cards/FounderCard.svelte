<svelte:options
  customElement={{
    tag: "skywalk-founder-card",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      name: { type: "String", attribute: "sw-name" },
      role: { type: "String", attribute: "sw-role" },
      bio: { type: "String", attribute: "sw-bio" },
      image: { type: "Object", attribute: "sw-image" },
      contact: { type: "Object", attribute: "sw-contact" },
      headingColor: { type: "String", attribute: "sw-heading-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "cards/FounderCard", false);
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
  import FounderCard from "../../components/cards/FounderCard.svelte";

  let { name, role, bio, image, contact, headingColor, style }: any = $props();
</script>

<FounderCard {name} {role} {bio} {image} {contact} {headingColor} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.founder-card {
    --founder-card-accent: var(--accent, lightblue);

    display: grid;
    gap: 2.5rem;
    align-items: start;

    .founder-card--portrait {
      display: grid;
      place-items: center;
      aspect-ratio: 1;
      max-width: 260px;
      border-radius: 24px;
      overflow: hidden;
      background: linear-gradient(
        150deg,
        color-mix(in srgb, var(--founder-card-accent), #fff 15%),
        var(--founder-card-accent)
      );

      .founder-card--image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .founder-card--initials {
        color: var(--primary, black);
        font-size: clamp(48px, 7vw, 76px);
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1;
      }
    }

    .founder-card--content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .founder-card--name {
        color: var(--founder-card-heading-color, var(--primary, black));
        font-size: clamp(28px, 3.2vw, 40px);
        line-height: 1.15;
        font-weight: 800;
        letter-spacing: -0.02em;
        text-transform: none;
      }

      .founder-card--role {
        color: var(--founder-card-accent);
        font-size: 16px;
        font-weight: 700;
        margin-top: 0.5rem;
      }

      .founder-card--bio {
        font-size: 16px;
        line-height: 28px;
        max-width: 62ch;
        margin-top: 1.5rem;
      }

      .founder-card--contact {
        color: var(--founder-card-accent);
        font-size: 15px;
        font-weight: 700;
        margin-top: 1.75rem;
        border-bottom: 1px solid currentColor;
      }
    }

    @media (min-width: 768px) {
      grid-template-columns: minmax(200px, 260px) 1fr;
      gap: 3.5rem;
    }
  }
  }
</style>
      