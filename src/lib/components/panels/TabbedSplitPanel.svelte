<script lang="ts">
  import Check from "@lucide/svelte/icons/check";
  import type { Component, Snippet } from "svelte";

  interface Props {
    /** Static heading. Omit and the selected tab's own title is used instead. */
    title?: string;
    /** Body copy shown under the title. */
    description: string;
    /** Tabs shown in the panel; each `icon` is a component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL; `iconProps` takes `lucide_icon` and `size` for `Icon`, and everything else is forwarded to the component or `<img>`. */
    items: {
      /** Label shown on the tab. */
      title: string;
      /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
      icon: Component<any, object, ""> | string;
      /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
      iconProps?: Record<string, any>;
      /** Body copy for the left column; blank lines start a new paragraph. */
      overview?: string;
      /** Price or tier table for the right column. */
      plans?: { text: string; price: string; description?: string }[];
      /** Plain list for the right column, for tabs that have no pricing. */
      items?: string[];
      /** Product shot shown beside the panel title. */
      image?: { src: string; alt: string; width?: string; height?: string };
    }[];
    /** Show only this many of a tab's items, with a toggle for the rest. Omit to show all. */
    maxItems?: number;
    /** Toggle labels, required when maxItems is set. Pass a function to name the hidden item count. */
    showMoreText?: string | ((count: number) => string);
    /** Label for the collapse control, or a function receiving the count. */
    showLessText?: string | ((count: number) => string);
    /** Class applied to the show more/less toggle button. */
    buttonClass?: string;
    /** Color of the title and tab headings. Sets `--tabbed-split-panel-heading-color`. */
    headingColor?: string;
    /** Background color of the tabs card. Sets `--tabbed-split-panel-tabs-bg-color`. */
    tabsBgColor?: string;
    /** Call-to-action rendered under the copy; takes no parameters. */
    buttonSnippet?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    title,
    description,
    items,
    maxItems,
    showMoreText,
    showLessText,
    buttonClass,
    headingColor,
    tabsBgColor,
    buttonSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();
  let active = $state<number>(0);
  let expanded = $state<boolean>(false);
  const heading = $derived(title ?? items[active]?.title);

  const tabItems = $derived(items[active]?.items ?? []);
  const hiddenCount = $derived(maxItems ? Math.max(tabItems.length - maxItems, 0) : 0);
  const visibleItems = $derived(maxItems && !expanded ? tabItems.slice(0, maxItems) : tabItems);
  const toggleText = $derived.by(() => {
    const label = expanded ? showLessText : showMoreText;
    return typeof label === "function" ? label(hiddenCount) : label;
  });

  function select(index: number) {
    active = index;
    expanded = false;
  }

  const paragraphs = (overview?: string) => (overview ?? "").split("\n\n").filter(Boolean);

  function onKeydown(event: KeyboardEvent & { currentTarget: HTMLButtonElement }) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    select((active + step + items.length) % items.length);
    (event.currentTarget.parentElement?.children[active] as HTMLButtonElement | undefined)?.focus();
  }
</script>

<div
  id="tabbed-split-panel-{uid}"
  class="tabbed-split-panel"
  style:--tabbed-split-panel-heading-color={headingColor}
  style:--tabbed-split-panel-tabs-bg-color={tabsBgColor}
  {style}>
  <div class="tabbed-split-panel--content">
    {#if heading}
      <h2 class="tabbed-split-panel--title">{heading}</h2>
    {/if}
    <p class="tabbed-split-panel--description">{description}</p>

    {#if items[active]?.overview}
      <div class="tabbed-split-panel--overview">
        {#each paragraphs(items[active].overview) as paragraph, p (p)}
          <p class="tabbed-split-panel--overview-paragraph">{paragraph}</p>
        {/each}
      </div>
    {/if}

    {#if buttonSnippet}
      <div class="tabbed-split-panel--button-container">
        {@render buttonSnippet()}
      </div>
    {/if}
  </div>

  <div class="tabbed-split-panel--tabs">
    <div class="tabbed-split-panel--tablist" role="tablist" aria-label={heading}>
      {#each items as item, i (i)}
        {@const IconComponent = item.icon}
        <button
          class="tabbed-split-panel--tab"
          role="tab"
          id="tabbed-split-panel--tab-{uid}-{i}"
          aria-selected={active === i}
          aria-controls="tabbed-split-panel--panel-{uid}-{i}"
          tabindex={active === i ? 0 : -1}
          class:active={active === i}
          onclick={() => select(i)}
          onkeydown={onKeydown}>
          <span class="tabbed-split-panel--tab-icon">
            {#if typeof IconComponent === "string"}
              <img
                {...item.iconProps}
                src={IconComponent}
                alt=""
                width={item.iconProps?.size ?? 20}
                height={item.iconProps?.size ?? 20} />
            {:else}
              <IconComponent {...item.iconProps} />
            {/if}
          </span>
          {item.title}
        </button>
      {/each}
    </div>

    {#each items as item, i (i)}
      {#if active === i}
        <div
          class="tabbed-split-panel--panel"
          role="tabpanel"
          id="tabbed-split-panel--panel-{uid}-{i}"
          aria-labelledby="tabbed-split-panel--tab-{uid}-{i}">
          <div class="tabbed-split-panel--panel-head">
            {#if item.image}
              <img
                class="tabbed-split-panel--panel-image"
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                loading="lazy"
                decoding="async" />
            {/if}
            <h3 class="tabbed-split-panel--panel-title">{item.title}</h3>
          </div>
          {#if item.plans?.length}
            <dl class="tabbed-split-panel--plans">
              {#each item.plans as plan, j (j)}
                <div class="tabbed-split-panel--plan">
                  <dt class="tabbed-split-panel--plan-name">{plan.text}</dt>
                  <dd class="tabbed-split-panel--plan-price">{plan.price}</dd>
                </div>
              {/each}
            </dl>
          {/if}
          {#if tabItems.length}
            <ul class="tabbed-split-panel--items" class:expanded>
              {#each visibleItems as entry, j (j)}
                <li class="tabbed-split-panel--item">
                  <span class="tabbed-split-panel--item-icon"><Check size={17} /></span>{entry}
                </li>
              {/each}
            </ul>
            {#if hiddenCount > 0 && toggleText}
              <button
                class="{buttonClass} tabbed-split-panel--toggle"
                aria-expanded={expanded}
                onclick={() => (expanded = !expanded)}>{toggleText}</button>
            {/if}
          {/if}
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .tabbed-split-panel {
    display: grid;
    gap: 3rem;
    align-items: center;

    .tabbed-split-panel--content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .tabbed-split-panel--title {
        color: var(--tabbed-split-panel-heading-color, var(--primary, black));
        font-size: clamp(30px, 3.4vw, 46px);
        line-height: 1.15;
        font-weight: 800;
        letter-spacing: -0.02em;
        text-transform: none;
        margin: 0 0 1.5rem;
        max-width: 16ch;
      }

      .tabbed-split-panel--description {
        font-size: 16px;
        line-height: 28px;
        max-width: 54ch;
      }

      .tabbed-split-panel--overview {
        margin-top: 1.5rem;
        max-width: 54ch;

        .tabbed-split-panel--overview-paragraph {
          font-size: 15px;
          line-height: 27px;
          color: color-mix(in srgb, var(--tabbed-split-panel-heading-color, var(--primary, black)), transparent 25%);

          & + .tabbed-split-panel--overview-paragraph {
            margin-top: 1rem;
          }
        }
      }

      .tabbed-split-panel--button-container {
        margin-top: 2.5rem;
      }
    }

    .tabbed-split-panel--tabs {
      border-radius: 16px;
      overflow: hidden;
      background-color: var(--tabbed-split-panel-tabs-bg-color, var(--accent, lightblue));
      box-shadow: 0 14px 34px rgba(15, 25, 34, 0.08);

      .tabbed-split-panel--tablist {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(max-content, 1fr);
        overflow-x: auto;
        scrollbar-width: none;
        border-bottom: 1px solid
          color-mix(in srgb, var(--tabbed-split-panel-heading-color, var(--primary, black)), transparent 90%);

        &::-webkit-scrollbar {
          display: none;
        }

        .tabbed-split-panel--tab {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          white-space: nowrap;
          background-color: transparent;
          border: 0;
          border-bottom: 3px solid transparent;
          color: color-mix(in srgb, var(--tabbed-split-panel-heading-color, var(--primary, black)), transparent 35%);
          font: inherit;
          font-size: 15px;
          font-weight: 600;
          padding: 1.1rem 1.25rem;
          cursor: pointer;
          transition:
            background-color 0.15s linear,
            color 0.15s linear,
            border-bottom-color 0.15s linear;

          .tabbed-split-panel--tab-icon {
            display: flex;
          }

          &:hover {
            color: var(--tabbed-split-panel-heading-color, var(--primary, black));
            background-color: color-mix(
              in srgb,
              var(--tabbed-split-panel-heading-color, var(--primary, black)),
              transparent 96%
            );
          }

          &.active {
            color: var(--tabbed-split-panel-heading-color, var(--primary, black));
            border-bottom-color: var(--tabbed-split-panel-heading-color, var(--primary, black));
          }
        }
      }

      .tabbed-split-panel--panel {
        padding: 1.5rem 1.75rem 2rem;

        .tabbed-split-panel--panel-head {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;

          .tabbed-split-panel--panel-image {
            flex: none;
            width: 64px;
            height: 76px;
            object-fit: contain;
            object-position: center bottom;
          }

          .tabbed-split-panel--panel-title {
            color: var(--tabbed-split-panel-heading-color, var(--primary, black));
            font-size: 20px;
            line-height: 1.3;
            font-weight: 800;
            letter-spacing: -0.01em;
            text-transform: none;
          }
        }

        .tabbed-split-panel--plans {
          .tabbed-split-panel--plan {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 1rem;
            padding: 0.7rem 0;
            border-bottom: 1px solid
              color-mix(in srgb, var(--tabbed-split-panel-heading-color, var(--primary, black)), transparent 92%);

            .tabbed-split-panel--plan-name {
              font-size: 15px;
            }

            .tabbed-split-panel--plan-price {
              color: var(--tabbed-split-panel-heading-color, var(--primary, black));
              font-size: 15px;
              font-weight: 700;
              white-space: nowrap;
            }
          }
        }

        .tabbed-split-panel--items {
          display: grid;

          .tabbed-split-panel--item {
            display: flex;
            align-items: center;
            gap: 0.65rem;
            font-size: 15px;
            line-height: 1.4;
            padding: 0.8rem 0;
            border-bottom: 1px solid
              color-mix(in srgb, var(--tabbed-split-panel-heading-color, var(--primary, black)), transparent 92%);

            &:last-child {
              border-bottom: 0;
            }

            .tabbed-split-panel--item-icon {
              display: flex;
              flex-shrink: 0;
              color: var(--tabbed-split-panel-heading-color, var(--primary, black));
            }
          }

          &.expanded {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            column-gap: 2rem;

            .tabbed-split-panel--item {
              padding: 0.45rem 0;
              border-bottom: 0;
              align-items: flex-start;

              .tabbed-split-panel--item-icon {
                margin-top: 0.2rem;
              }
            }
          }
        }

        .tabbed-split-panel--toggle {
          margin-top: 1rem;
        }
      }
    }

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr;
      gap: 4.5rem;
    }
  }
</style>
