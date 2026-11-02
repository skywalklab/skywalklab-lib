<script lang="ts">
  import Quote from "@lucide/svelte/icons/quote";

  interface Props {
    /** The pull quote, verbatim. */
    quote: string;
    /** Name of the publication the quote is from. */
    publication: string;
    /** Person credited with the quote. */
    author?: string;
    /** Longer excerpt shown under the pull quote. */
    body?: string;
    /** Background color of the quote panel. Sets `--press-quote-bg-color`. */
    bgColor?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { quote, publication, author, body, bgColor, style }: Props = $props();
  let uid: string = $props.id();
</script>

<figure id="press-quote-{uid}" class="press-quote" style:--press-quote-bg-color={bgColor} {style}>
  <span class="press-quote--mark" aria-hidden="true"><Quote size={26} /></span>
  <blockquote class="press-quote--pull">{quote}</blockquote>
  {#if body}
    <p class="press-quote--body">{body}</p>
  {/if}
  <figcaption class="press-quote--source">
    <span class="press-quote--publication">{publication}</span>
    {#if author}<span class="press-quote--author">{author}</span>{/if}
  </figcaption>
</figure>

<style>
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
</style>
