<script lang="ts">
  import { snippetWrap } from "../../utils/snippets.js";
  import { slide } from "svelte/transition";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import type { Links, LinkSnippet } from "./types.js";
  import { linear } from "svelte/easing";
  import Fr from "svelte-flag-icons/Fr.svelte";
  import It from "svelte-flag-icons/It.svelte";
  import Us from "svelte-flag-icons/Us.svelte";
  import Gb from "svelte-flag-icons/Gb.svelte";
  import type { Component } from "svelte";

  const FlagMap: Map<string, Component<any, object, "">> = new Map([
    ["en", Us],
    ["en-gb", Gb],
    ["fr", Fr],
    ["it", It]
  ]);

  interface Props {
    /** Text of the dropdown trigger, rendered through `linkSnippet`. */
    title: string;
    /** Links shown in the dropdown; each `cb` runs when that link is clicked, and `langFlag` takes the same values as `lang`. */
    items: (Links & { langFlag?: string; cb?: () => void })[];
    /** Flag shown beside the trigger for language menus. Currently `en`, `en-gb`, `fr` and `it`; more can be added on request. */
    lang?: string;
    /** What opens the dropdown. Omit to leave it closed. */
    interaction?: "click" | "hover";
    /** Snippet rendering the trigger and each dropdown link. */
    linkSnippet: LinkSnippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { title, items, lang, interaction, linkSnippet, style }: Props = $props();
  let uid: string = $props.id();
  let openDropdown = $state<boolean>(false);
  let Flag = $derived(!lang ? undefined : FlagMap.get(lang));

  const handleHoverDropdown = (open: boolean): void => {
    if (interaction !== "hover") return;
    openDropdown = open;
  };

  const handleClickDropdown = (e: Event): void => {
    e.preventDefault();
    if (interaction !== "click") return;
    openDropdown = !openDropdown;
  };
</script>

<li
  id="nav-item-dropdown-{uid}"
  class="nav-item-dropdown"
  {style}
  onmouseenter={() => handleHoverDropdown(true)}
  onmouseleave={() => handleHoverDropdown(false)}>
  <button
    class="nav-item-dropdown--button"
    class:selected={openDropdown}
    onclick={handleClickDropdown}
    id={`nav-item-dropdown--button-${uid}`}
    aria-controls={openDropdown ? `nav-item-dropdown--list-${uid}` : undefined}
    aria-expanded={openDropdown}>
    {@render snippetWrap(linkSnippet)({ text: title })}
    {#if lang}
      <Flag class="nav-item-dropdown--flag" />
    {:else}
      <span class="nav-item-dropdown--icon-container">
        <ChevronDown size={20} />
      </span>
    {/if}
  </button>

  {#if openDropdown}
    <ul
      class="nav-item-dropdown--list"
      transition:slide={{ duration: 300, easing: linear }}
      id={`nav-item-dropdown--list-${uid}`}
      aria-labelledby={`nav-item-dropdown--button-${uid}`}>
      {#each items as { langFlag, ...item } (item.text)}
        <li class="nav-item-dropdown--list-item">
          {@render snippetWrap(linkSnippet)({ ...item })}
          {#if langFlag}
            {@const DropDownFlag = FlagMap.get(langFlag)}
            <DropDownFlag class="nav-item-dropdown--flag" />
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</li>

<style>
  .nav-item-dropdown {
    position: relative;
    display: flex;
    flex-direction: column;

    &:has(.selected):hover {
      background-color: transparent;
    }

    .nav-item-dropdown--button {
      font-size: unset;
      font-family: unset;
      color: unset;
      border: unset;
      text-align: unset;
      padding: unset;
      display: flex;
      gap: 0.4rem;
      align-items: center;
      height: 100%;
      width: 100%;
      background-color: transparent;
      transition:
        background-color 0.15s linear,
        color 0.15s linear;
      cursor: pointer;

      @media (prefers-reduced-motion: reduce) {
        transition: all 0.75s ease;
      }

      :is(&:hover, &.selected) .nav-item-dropdown--icon-container {
        background-color: var(--language-header-color, black);
        color: var(--language-header-bg-color, white);
      }

      &.selected .nav-item-dropdown--icon-container {
        transform: rotate(180deg);
      }

      .nav-item-dropdown--icon-container {
        height: 1.25rem;
        width: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid var(--language-header-color, black);
        background-color: var(--language-header-bg-color, white);
        color: var(--language-header-color, black);
        transition: inherit;
      }

      > :global(:first-child) {
        width: fit-content;
      }
    }

    .nav-item-dropdown--list {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      background-color: var(--background, white);
      overflow: hidden;

      @media (min-width: 1024px) {
        box-shadow: var(--box-shadow, none);
        position: absolute;
        top: var(--dynamic-header-height, 56px);
        right: 0;
      }

      .nav-item-dropdown--list-item {
        border-bottom: 1px solid hsla(0, 0%, 47.1%, 0.83);
        padding-right: 0.25rem;
        justify-content: space-between;

        &:last-of-type {
          border-bottom-width: 0px;
        }
      }
    }
  }
</style>
