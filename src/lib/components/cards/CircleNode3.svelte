<script lang="ts">
  import CircleNode, { type Props as CircleNodeProps } from "./CircleNode.svelte";

  interface Props {
    /** Content for the three circle nodes. */
    cards: (CircleNodeProps & {
      /** Heading shown for this node. */
      title: string;
      /** Body copy shown under the heading. */
      description: string;
    })[];
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { cards, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div id="circle-node-3-{uid}" class="circle-node-3" {style}>
  {#each cards as card, i (i)}
    <div class="circle-node-3--inner-container">
      <CircleNode {...card} />
      <div class="circle-node-3--text-container">
        <h3 class="circle-node-3--title">{card.title}</h3>
        <p class="circle-node-3--description">{card.description}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .circle-node-3 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    .circle-node-3--inner-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      min-width: 280px;
    }
  }

  .circle-node-3--text-container {
    .circle-node-3--title {
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

    .circle-node-3--description {
      padding: 24px 25px 0;
      text-align: center;
      font-size: 16px;
      text-wrap: balance;
    }
  }
</style>
