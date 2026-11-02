<script lang="ts">
  import { snippetWrap } from "../../utils/snippets.js";
  import type { Snippet } from "svelte";

  interface Props {
    /** Name of the plan. */
    name: string;
    /** Features included in the plan. */
    included: string[];
    /** Features excluded from the plan. */
    notIncluded?: string[];
    /** Label shown inside the indicator. */
    indicatorText: string;
    /** Fill percentage of the indicator. Sets `--pricing-card-before-size`. */
    beforeSize?: number;
    /** Color of the filled portion of the indicator. Sets `--pricing-card-before-color`. */
    beforeColor?: string;
    /** Color of the unfilled portion of the indicator. Sets `--pricing-card-after-color`. */
    afterColor?: string;
    /** Rendered once per `included` entry; receives that entry and its index. */
    includedSnippet: Snippet<[{ text: string; index: number }]>;
    /** Rendered once per `notIncluded` entry; receives that entry and its index. */
    notIncludedSnippet?: Snippet<[{ text: string; index: number }]>;
    /** Call-to-action rendered at the foot of the card, e.g. a button showing the price. */
    buttonSnippet: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    name,
    included,
    notIncluded,
    indicatorText,
    beforeSize = 100,
    beforeColor,
    afterColor,
    includedSnippet,
    notIncludedSnippet,
    buttonSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();

  const pricingTabPath =
    "M8,0H226A18,18 0,0,1 244,18V18A18,18 0,0,0 262,36H352A18,18 0,0,1 370,54V448A8,8 0,0,1 362,456H8A8,8 0,0,1 0,448V8A8,8 0,0,1 8,0Z";

  function createMaskURL(path: string, width: number = 370, height: number = 456) {
    // https://corner-inverter.douiri.org/
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' preserveAspectRatio='none'%3E%3Cpath d='${path}'/%3E%3C/svg%3E")`;
  }
</script>

<div
  id="pricing-card-{uid}"
  class="pricing-card"
  style:--pricing-card-mask={createMaskURL(pricingTabPath)}
  style:--pricing-card-before-size={beforeSize + "%"}
  style:--pricing-card-before-color={beforeColor}
  style:--pricing-card-after-color={afterColor}
  {style}>
  <div class="pricing-card--indicator">
    <span class="pricing-card--indicator-text">{indicatorText}</span>
  </div>
  <h3 class="pricing-card--name">{name}</h3>
  <hr class="pricing-card--divider" />
  <ul class="pricing-card--detail-list">
    {#each included as text, index (index)}
      <li class="pricing-card--detail">
        {@render snippetWrap(includedSnippet)({ text, index })}
      </li>
    {/each}
    {#each notIncluded ?? [] as text, index (index)}
      <li class="pricing-card--detail not-included">
        {@render snippetWrap(notIncludedSnippet)?.({ text, index })}
      </li>
    {/each}
  </ul>
  <div class="pricing-card--price">
    {@render buttonSnippet()}
  </div>
</div>

<style>
  .pricing-card {
    /** Derived from the indicator size, so it stays declared rather than defaulted. */
    --pricing-card-after-size: calc(var(--pricing-card-before-size) - 0.75%);
    padding: 3rem clamp(1.5rem, 3vw, 3rem);
    border-radius: 8px;
    flex: 1;
    min-width: 280px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: transparent;
    position: relative;

    @media (min-width: 480px) {
      min-width: 350px;
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      display: block;
      height: 100%;
      width: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      -webkit-mask: var(--pricing-card-mask) no-repeat center / var(--pricing-card-before-size)
        var(--pricing-card-before-size);
      mask: var(--pricing-card-mask) no-repeat center / var(--pricing-card-before-size) var(--pricing-card-before-size);
      background-color: var(--pricing-card-before-color, var(--primary, black));
      z-index: 0;
    }

    &::after {
      background-color: var(--pricing-card-after-color, #fff);
      -webkit-mask-size: var(--pricing-card-after-size) var(--pricing-card-after-size);
      mask-size: var(--pricing-card-after-size) var(--pricing-card-after-size);
      z-index: 1;
    }

    .pricing-card--indicator {
      position: absolute;
      z-index: 2;
      top: calc((var(--pricing-card-before-size) - var(--pricing-card-after-size)));
      right: 1rem;
      width: 100px;
      height: 2.75rem;
      max-width: 25%;
      color: currentColor;
      white-space: nowrap;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .pricing-card--indicator-text {
        position: relative;
        width: fit-content;
        font-size: 14px;

        &::after {
          content: "";
          height: 6px;
          width: 6px;
          position: absolute;
          background-color: var(--pricing-card-before-color, var(--primary, black));
          border-radius: 50%;
          right: -0.75rem;
          top: 0;
          bottom: 0;
          margin: auto;
          transition:
            background-color 0.5s ease,
            transform 0.5s ease;
          transform-origin: center center;
        }
      }
    }

    .pricing-card--name {
      position: relative;
      z-index: 2;
      font-size: clamp(22px, 4vw, 30px);
      margin-bottom: 0.5rem;
    }

    .pricing-card--divider {
      position: relative;
      z-index: 2;
      margin-bottom: 1rem;
      background-color: color-mix(in srgb, var(--pricing-card-before-color, var(--primary, black)) 75%, #fff);
      height: 1px;
      border: 0;
    }

    .pricing-card--detail-list {
      position: relative;
      z-index: 2;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .pricing-card--detail {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 16px;

        &.not-included {
          color: #666;
        }
      }
    }

    .pricing-card--price {
      margin-top: 5rem;
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: center;
    }
  }
</style>
