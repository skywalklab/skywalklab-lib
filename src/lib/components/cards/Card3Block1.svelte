<script lang="ts">
  interface Props {
    /** Images and copy for the three cards. */
    cards: { src: string; alt?: string; width: string; height: string; title: string; description: string }[];
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { cards, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="card-3-block-1-{uid}" class="card-3-block-1" {style}>
  {#each cards as card, i (i)}
    <div class="card-3-block-1--inner-container">
      <div class="card-3-block-1--image-container">
        <img
          class="card-3-block-1--image"
          src={card.src}
          alt={card.alt ?? card.title}
          width={card.width}
          height={card.height} />
      </div>
      <div class="card-3-block-1--text-container">
        <h3 class="card-3-block-1--title">{card.title}</h3>
        <p class="card-3-block-1--description">{card.description}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .card-3-block-1 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .card-3-block-1--inner-container {
    background-color: #fff;
    display: flex;
    flex-direction: column;

    .card-3-block-1--image-container {
      width: 100%;
      height: 260px;

      .card-3-block-1--image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.15s linear;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    .card-3-block-1--text-container {
      padding: 1rem 1rem 2rem;

      .card-3-block-1--title {
        margin-top: 22px;
        text-align: center;
        font-size: 18px;
        line-height: 28px;
        text-transform: uppercase;

        &::after {
          content: "";
          display: block;
          background: var(--primary, black);
          height: 2px;
          width: 40px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 23px;
        }
      }

      .card-3-block-1--description {
        padding: 24px 25px 0;
        text-align: center;
        font-size: 16px;
      }
    }
  }
</style>
