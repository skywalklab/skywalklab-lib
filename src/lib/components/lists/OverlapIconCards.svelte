<script lang="ts">
  import type { Component } from "svelte";

  interface Props {
    /** Cards shown in the overlapping row; each `icon` is a component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL; `iconProps` takes `lucide_icon` and `size` for `Icon`, and everything else is forwarded to the component or `<img>`. */
    items: {
      /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
      icon: Component<any, object, ""> | string;
      /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
      iconProps?: Record<string, any>;
      /** Card heading. */
      title: string;
      /** Body copy shown under the heading. */
      description: string;
    }[];
    /** Background color of each card. Sets `--overlap-icon-cards-card-bg-color`. */
    cardBgColor?: string;
    /** Background color of the icon badge. Sets `--overlap-icon-cards-badge-bg-color`. */
    badgeBgColor?: string;
    /** Icon color inside the badge. Sets `--overlap-icon-cards-badge-color`. */
    badgeColor?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { items, cardBgColor, badgeBgColor, badgeColor, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div
  id="overlap-icon-cards-{uid}"
  class="overlap-icon-cards"
  style:--overlap-icon-cards-card-bg-color={cardBgColor}
  style:--overlap-icon-cards-badge-bg-color={badgeBgColor}
  style:--overlap-icon-cards-badge-color={badgeColor}
  {style}>
  <ul class="overlap-icon-cards--inner-container">
    {#each items as item, i (i)}
      {@const IconComponent = item.icon}
      <li class="overlap-icon-cards--card">
        <div class="overlap-icon-cards--head">
          <span class="overlap-icon-cards--badge">
            {#if typeof IconComponent === "string"}
              <img
                {...item.iconProps}
                src={IconComponent}
                alt=""
                width={item.iconProps?.size ?? 28}
                height={item.iconProps?.size ?? 28} />
            {:else}
              <IconComponent {...item.iconProps} />
            {/if}
          </span>
          <h3 class="overlap-icon-cards--title">{item.title}</h3>
        </div>
        <p class="overlap-icon-cards--description">{item.description}</p>
      </li>
    {/each}
  </ul>
</div>

<style>
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
</style>
