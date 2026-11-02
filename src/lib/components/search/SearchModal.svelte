<script lang="ts">
  import SearchBar from "./SearchBar.svelte";
  import Search from "@lucide/svelte/icons/search";
  import SearchResults from "./SearchResults.svelte";
  import SearchListItemText from "./SearchListItemText.svelte";
  import Modal, { type Props as ModalProps } from "../modals/Modal.svelte";
  import { escapeRegExp } from "../../utils/helpers.js";
  import type { Snippet } from "svelte";

  interface Props {
    /** Items available to search. */
    items: Record<string, { group: string; level: string }>;
    /** Terms offered when the search is empty. */
    suggestions: any;
    /** Label on the button that opens the modal. */
    searchButtonTitle: string;
    /** Text color across the search UI. Sets `--search-color`, inherited by the bar, list and results. */
    searchColor?: string;
    /** Outline and marker color across the search UI. Sets `--search-outline-color`. */
    searchOutlineColor?: string;
    /** Placeholder text shown in the empty search input. Defaults to `"Search..."`. */
    placeholder?: string;
    /** Class applied to the button that opens the modal alongside its own, e.g. a button CSS module from `@skywalklab/lib/css-modules`. */
    buttonClass?: string;
    /** Props forwarded to the underlying `Modal`; Snippets not included here. */
    modalProps: Omit<ModalProps, "headerSnippet" | "bodySnippet" | "footerSnippet">;
    /** Called when the input value changes. */
    oninput?: () => void;
    /** Called when the input fires a change event. */
    onchange?: () => void;
    /** Called when the input gains focus. */
    onfocus?: () => void;
    /** Called when the input loses focus. */
    onblur?: () => void;
    /** Called when a key is pressed in the input. */
    onkeydown?: () => void;
    /** Rendered above the results, the empty-state term or the suggestions; `result` says which is showing, e.g. a heading or an empty-state message. */
    searchResultsChildren?: Snippet<[{ result: "list" | "empty" | "suggestions" }]>;
    /** Called when a result is clicked. Return `keepOpen` to leave the modal open, and `resetValue` to clear the search input rather than fill it with the clicked item. */
    onResultItemClick: (text: string) => { keepOpen?: boolean; resetValue?: boolean } | void;
    /** Rendered in the header after the title and before the close control, e.g. a logo, an icon or a status badge. Use it in place of `title` for a header of the caller's own. */
    headerSnippet?: Snippet;
    /** Rendered in the modal footer, under the body. */
    footerSnippet?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    items,
    suggestions,
    searchButtonTitle,
    searchColor,
    searchOutlineColor,
    placeholder,
    buttonClass,
    modalProps,
    oninput,
    onchange,
    onfocus,
    onblur,
    onkeydown,
    onResultItemClick,
    searchResultsChildren,
    headerSnippet,
    footerSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();
  let showModal = $derived<boolean>(modalProps.showModal ?? false);
  let value = $state<string>("");
  let filteredItems = $derived<string[]>(
    Object.keys(items).filter(
      (item) =>
        (value !== "" && new RegExp(escapeRegExp(value), "i").test(item)) ||
        (value === "" && suggestions.includes(item))
    )
  );

  const onItemClick: (arg: string) => void = (item) => {
    const clickOptions = onResultItemClick(item);
    showModal = clickOptions?.keepOpen ? true : false;
    value = clickOptions?.resetValue ? "" : item;
  };

  const getGroupLabel = (label: string): string | undefined => {
    const item = items[label];
    if (!item) return;

    return !new RegExp(escapeRegExp(label.toLowerCase().replaceAll(" ", "-"))).test(item.group)
      ? item.group.replace(/(^[a-z]|-[a-z])/g, (_, group) => group.replace("-", " ").toUpperCase())
      : undefined;
  };
</script>

<div
  id="search-modal-{uid}"
  class="search-modal"
  style:--search-color={searchColor}
  style:--search-outline-color={searchOutlineColor}
  {style}>
  <button class="{buttonClass} search-modal--toggle-button" onclick={() => (showModal = true)}
    ><Search /> {searchButtonTitle}</button>

  <Modal bind:showModal {headerSnippet} {footerSnippet} {...modalProps}>
    {#snippet bodySnippet()}
      <SearchBar bind:value {placeholder} {oninput} {onchange} {onfocus} {onblur} {onkeydown} autofocus={true} />
      <SearchResults bind:value items={filteredItems} {suggestions} {onItemClick}>
        {#snippet children({ result }: { result: "list" | "empty" | "suggestions" })}
          {@render searchResultsChildren?.({ result })}
        {/snippet}
        {#snippet itemTextSnippet({ text }: { text: string })}
          <SearchListItemText {value} label={text} groupLabel={getGroupLabel(text)} />
        {/snippet}
      </SearchResults>
    {/snippet}
  </Modal>
</div>

<style>
  .search-modal {
    --search-color: var(--primary-dark, #000);
    --search-outline-color: var(--primary-light, #333);
    margin: 0 auto;
    position: relative;

    .search-modal--toggle-button {
      border: 1px solid transparent;
      border-radius: 8px;
      color: var(--search-color);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 6px 16px;
      font-size: 15px;
      background-color: #e9e9e9;
      transition: border-color 0.15s linear;

      @media (prefers-reduced-motion: reduce) {
        transition: border-color 0.75s linear;
      }

      &:hover {
        border-color: var(--search-outline-color);
      }
    }
  }

  :global .modal--content {
    background-color: #f6f6f7;
    box-shadow:
      rgba(255, 255, 255, 0.5) 1px 1px 0px 0px inset,
      rgb(85, 90, 100) 0px 3px 8px 0px;

    ul.search-list {
      max-height: 55vh;
    }
  }
</style>
