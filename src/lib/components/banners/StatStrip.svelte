<script lang="ts">
  interface Props {
    /** Stats shown across the strip. */
    items: {
      /** The figure itself, e.g. "120+", "2010", "24/7". */
      value: string;
      /** What the figure refers to. */
      label: string;
    }[];
    /** Color of the stat values. Sets `--stat-strip-heading-color`. */
    headingColor?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { items, headingColor, style }: Props = $props();
  let uid: string = $props.id();
</script>

<dl id="stat-strip-{uid}" class="stat-strip" style:--stat-strip-heading-color={headingColor} {style}>
  {#each items as item, i (i)}
    <div class="stat-strip--item">
      <dt class="stat-strip--value">{item.value}</dt>
      <dd class="stat-strip--label">{item.label}</dd>
    </div>
  {/each}
</dl>

<style>
  .stat-strip {
    --stat-strip-accent: var(--accent, lightblue);

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 2rem;

    .stat-strip--item {
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.35rem;
        bottom: 0.35rem;
        width: 3px;
        border-radius: 999px;
        background-color: var(--stat-strip-accent);
      }

      .stat-strip--value {
        color: var(--stat-strip-heading-color, var(--primary, black));
        font-size: clamp(34px, 4vw, 48px);
        line-height: 1.05;
        font-weight: 800;
        letter-spacing: -0.03em;
      }

      .stat-strip--label {
        margin-top: 0.5rem;
        font-size: 15px;
        line-height: 22px;
        text-wrap: balance;
      }
    }
  }
</style>
