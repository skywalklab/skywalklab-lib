<svelte:options
  customElement={{
    tag: "skywalk-press-quote",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      quote: { type: "String", attribute: "sw-quote" },
      publication: { type: "String", attribute: "sw-publication" },
      author: { type: "String", attribute: "sw-author" },
      body: { type: "String", attribute: "sw-body" },
      bgColor: { type: "String", attribute: "sw-bg-color" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "banners/PressQuote", false);
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
  import PressQuote from "../../components/banners/PressQuote.svelte";

  let { quote, publication, author, body, bgColor, style }: any = $props();
</script>

<PressQuote {quote} {publication} {author} {body} {bgColor} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.press-quote {
    --press-quote-accent: var(--accent, lightblue);

    position: relative;
    overflow: hidden;
    padding: clamp(2rem, 4vw, 3.5rem);
    background-color: var(--press-quote-bg-color, var(--primary, black));
    color: rgba(255, 255, 255, 0.78);
    border-radius: 20px;

    &::before {
      content: "";
      position: absolute;
      top: -50%;
      right: -20%;
      width: 380px;
      height: 380px;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        color-mix(in srgb, var(--press-quote-accent), transparent 60%),
        transparent 70%
      );
      pointer-events: none;
    }

    .press-quote--mark {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background-color: var(--press-quote-accent);
      color: var(--primary, black);
      margin-bottom: 1.75rem;
    }

    .press-quote--pull {
      position: relative;
      color: #fff;
      font-size: clamp(22px, 2.4vw, 30px);
      line-height: 1.35;
      font-weight: 700;
      letter-spacing: -0.01em;
      margin: 0;
      text-wrap: balance;
    }

    .press-quote--body {
      position: relative;
      margin-top: 1.5rem;
      font-size: 16px;
      line-height: 28px;
    }

    .press-quote--source {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 0.6rem;
      margin-top: 2rem;

      .press-quote--publication {
        color: var(--press-quote-accent);
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .press-quote--author {
        font-size: 15px;

        &::before {
          content: "—";
          margin-right: 0.4rem;
        }
      }
    }

    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 3.5rem;
      align-items: start;

      .press-quote--mark,
      .press-quote--pull,
      .press-quote--source {
        grid-column: 1;
      }

      .press-quote--body {
        grid-column: 2;
        grid-row: 1 / span 3;
        margin-top: 0;
      }
    }
  }
  }
</style>
      