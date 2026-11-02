<script module lang="ts">
  import { testLogo } from "../data/test-data.js";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import pop_up_ui from "../css-modules/pop-up-ui.module.css";
  import HalfUnderlineHeading from "../components/headings/HalfUnderlineHeading.svelte";
  import SquareCheckList from "../components/lists/SquareCheckList.svelte";
  import { headings_default_props } from "./headings.svelte";
  import LucideIcon from "../components/icons/LucideIcon.svelte";
  import { testDescription, testTitle, testIcon } from "../data/test-data.js";
  import { cards_static_props, infoCardList, pricingCard } from "./cards.js";
  import { withDynamicProps } from "./utils.js";
  import SkywalklabLogo from "../components/brand/SkywalklabLogo.svelte";

  export const cards_default_props = withDynamicProps(cards_static_props, {
    BubbleIcon: {
      props: {
        icon: LucideIcon
      }
    },
    BubbleIcon3: {
      props: {
        items: cards_static_props.get("BubbleIcon3").props.items.map((item: any) => ({ ...item, icon: SkywalklabLogo }))
      }
    },
    CircleNode: {
      props: {
        icon: LucideIcon
      }
    },
    CircleNode3: {
      props: {
        cards: cards_static_props.get("CircleNode3").props.cards.map((card: any) => ({ ...card, icon: SkywalklabLogo }))
      }
    },
    HelpCard: {
      props: {
        children: HelpCardChildren
      }
    },
    InfoCard1: {
      props: {
        children: InfoCard1Children
      }
    },
    PricingCard: {
      props: {
        includedSnippet: PricingCardIncludedSnippet,
        buttonSnippet: PricingCardButtonSnippet
      }
    },
    TopImageCard: {
      props: {
        children: TopImageCardChildren
      }
    }
  });
</script>

{#snippet HelpCardChildren()}
  <img width="60" height="96" src={testLogo} alt="" loading="lazy" />
  <h3>{testTitle}</h3>
{/snippet}

{#snippet InfoCard1Children()}
  <HalfUnderlineHeading
    text={testTitle}
    tag={headings_default_props.get("HalfUnderlineHeading").props.tag}
    style={headings_default_props.get("HalfUnderlineHeading").props.style} />
  <p>{testDescription}</p>
  <SquareCheckList items={infoCardList} style="margin-top: 2rem;" />
{/snippet}

{#snippet PricingCardButtonSnippet()}
  <button
    class="{pop_up_ui['pop-up-ui']} pricing--card-button"
    onclick={() => goto(resolve("/"))}
    style="border-color: {pricingCard.beforeColor}; --pop-up-ui-box-shadow: 0px 4px 8px 0px color-mix(in srgb, {pricingCard.beforeColor} 50%, transparent);">
    {pricingCard.price}€ <span class="pricing-card--price-label">{pricingCard.priceLabel}</span>
  </button>
{/snippet}

{#snippet PricingCardIncludedSnippet({ text, index }: { text: string; index: number })}
  <div>
    <LucideIcon lucide_icon={testIcon} color={pricingCard.beforeColor} size={22} />
    <span>{text}</span>
  </div>
{/snippet}

{#snippet TopImageCardChildren()}
  <img width="60" height="96" src={testLogo} alt="" loading="lazy" />
{/snippet}
