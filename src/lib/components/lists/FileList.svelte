<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import { untrack, type Snippet } from "svelte";
  import { cubicIn, cubicOut, quadIn, quadOut } from "svelte/easing";
  import { Tween } from "svelte/motion";
  import { snippetWrap } from "../../utils/snippets.js";

  interface Props {
    /** Items stacked as files, front to back; each is passed to `itemSnippet`. */
    items: any[];
    /** Bindable. Index in `items` of the front item; setting it rotates the stack to that item. Updated once a rotation settles. */
    activeItemKey?: number;
    /** Text and attributes for the previous (`left`) and next (`right`) buttons; `attrs.onclick` runs before the stack rotates. */
    navButtons: Record<
      "left" | "right",
      {
        text: string;
        attrs?: Record<string, any>;
      }
    >;
    /** Called when a file is clicked, with the item and its position in the stack, before the stack rotates. */
    onItemClick?: ({ item, index }: { item: any; index: number }) => void;
    /** Renders each file's content inside its button, always; `item` is the entry from `items` and `index` its current position in the stack, 0 being the front. */
    itemSnippet: Snippet<[{ item: any; index: number }]>;
    /** Renders between the arrow buttons and the stack, when provided. */
    children?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    items: listItems,
    activeItemKey = $bindable(0),
    navButtons,
    onItemClick,
    itemSnippet,
    children,
    style
  }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();

  let isReversing = $state<boolean>(false);
  let rotating = false;

  let items = $derived(listItems.map((item, i) => ({ ...item, key: i })));
  // svelte-ignore state_referenced_locally
  const drops = listItems.map(() => new Tween(0));

  let offset = $derived.by(() => (void items, untrack(() => activeItemKey)));
  const position = (key: number) => (key - offset + items.length) % items.length;

  async function sendToBack() {
    const y = drops[offset];
    await y.set(300, { duration: 200, easing: quadIn });
    offset = (offset + 1) % items.length;
    y.set(-300, { duration: 0 });
    y.set(0, { duration: 400, easing: cubicOut });
  }

  async function sendToFront() {
    isReversing = true;
    const y = drops[(offset - 1 + items.length) % items.length];
    await y.set(-300, { duration: 200, easing: quadOut });
    offset = (offset - 1 + items.length) % items.length;
    y.set(300, { duration: 0 });
    y.set(0, { duration: 400, easing: cubicIn }).then(() => {
      isReversing = false;
    });
  }

  async function handleItems(steps: number, isReverse: boolean = false) {
    if (rotating) return;
    rotating = true;
    for (let step = 0; step < steps; step++) await (isReverse ? sendToFront : sendToBack)();
    rotating = false;
    activeItemKey = offset;
  }

  $effect(() => {
    if (activeItemKey !== offset && !rotating) {
      const diff = Math.abs(activeItemKey - offset);
      const wraps = diff === items.length - 1;
      const isDecreasing = activeItemKey < offset;
      handleItems(wraps ? 1 : diff, (wraps && !isDecreasing) || (!wraps && isDecreasing));
    }
  });
</script>

<div class="file-list" id="file-list-{uid}" style:--file-list-count={listItems.length} {style}>
  <div class="file-list--nav-buttons-container">
    <button
      {...navButtons.left.attrs}
      onclick={async () => {
        navButtons.left.attrs?.onclick?.();
        await handleItems(1, true);
      }}>{navButtons.left.text}</button>
    <button
      {...navButtons.right.attrs}
      onclick={async () => {
        navButtons.right.attrs?.onclick?.();
        await handleItems(1);
      }}>{navButtons.right.text}</button>
  </div>

  {@render children?.()}

  <div class="file-list--list-wrapper">
    <article class="file-list--list">
      {#each items as item (item.key)}
        {@const index = position(item.key)}
        {@const drop = drops[item.key]}
        <article
          class="file-list--item"
          style:--file-list-index={index}
          style:transition={!isReversing && index === items.length - 1 ? "none" : undefined}
          style:translate="0 {drop.current}px"
          style:opacity={1 - Math.abs(drop.current) / 300}
          style:scale={1 + drop.current / 900}>
          <button
            class="file-list--item-button"
            aria-label={labels.openItem}
            onclick={async () => {
              onItemClick?.({ item, index });
              await handleItems(index);
            }}>
            {@render snippetWrap(itemSnippet)({ item, index })}
          </button>
        </article>
      {/each}
    </article>
  </div>
</div>

<style>
  .file-list {
    --file-list-top: 29px;
    --file-list-padding-top: calc(var(--file-list-top) * 2);
    --file-list-padding-bottom: 6rem;
    --file-list-item-width: clamp(280px, 80vw, 400px);
    --file-list-item-height: calc(var(--file-list-item-width) * 9 / 16);
    max-height: 100svh;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    position: relative;
    overflow: hidden;

    .file-list--nav-buttons-container {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      width: 100%;
      height: fit-content;
      margin-bottom: var(--file-list-top);
      z-index: calc(var(--file-list-count) + 2);

      button {
        cursor: pointer;
      }
    }

    .file-list--list-wrapper {
      width: var(--file-list-item-width);
      height: calc(
        var(--file-list-item-height) + ((var(--file-list-count) - 1) * var(--file-list-top)) +
          (var(--file-list-padding-bottom))
      );
      padding-bottom: var(--file-list-padding-bottom);
      contain: size;
      display: flex;
      align-items: flex-end;
      margin: 0 auto;
      position: relative;

      &::before {
        content: "";
        width: calc(var(--file-list-item-width) * 0.95);
        height: calc(
          var(--file-list-item-height) + ((var(--file-list-count) - 1) * var(--file-list-top)) +
            (var(--file-list-padding-top) + var(--file-list-padding-bottom))
        );
        max-height: 100svh;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background: radial-gradient(
          ellipse 50% var(--file-list-padding-top) at 50% 0,
          color-mix(in srgb, currentColor, transparent 80%),
          transparent
        );
        pointer-events: none;
        z-index: calc(var(--file-list-count) + 1);
      }

      .file-list--list {
        width: 100%;
        height: auto;
        aspect-ratio: 16 / 9;
        position: relative;
        margin: 0 auto;

        .file-list--item {
          height: 100%;
          width: 100%;
          position: absolute;
          inset: 0;
          transform: translateY(calc(var(--file-list-index) * var(--file-list-top) * -1))
            scale(calc(1 - var(--file-list-index) * 0.0225));
          margin: 0 auto;
          z-index: calc(var(--file-list-count) - var(--file-list-index));
          transition: transform 0.3s ease-in;

          .file-list--item-button {
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
      }
    }

    @media (min-width: 768px) {
      .file-list--nav-buttons-container {
        width: fit-content;
      }

      .file-list--list-wrapper {
        --file-list-padding-bottom: 4rem;
      }
    }
  }
</style>
