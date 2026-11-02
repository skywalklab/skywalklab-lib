<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import { onMount } from "svelte";
  import Search from "@lucide/svelte/icons/search";

  interface Props {
    /** Id applied to the input element. */
    id?: string;
    /** Current search term. Bindable; typing and the clear button set it, so a parent can read what was searched and filter its own results. */
    value?: string;
    /** Milliseconds to wait after typing before emitting input. */
    debounce?: number;
    /** Placeholder text shown in the empty input. */
    placeholder?: string;
    /** Focus the input on mount. */
    autofocus?: boolean;
    /** Background color of the bar. Sets `--search-bar-bg-color`. */
    bgColor?: string;
    /** Color of the clear button on hover. Sets `--search-bar-clear-hover-color`. */
    clearHoverColor?: string;
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
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    id = "search-input",
    value = $bindable(""),
    debounce = 0,
    placeholder = "Search...",
    autofocus = false,
    bgColor = "var(--background, #ffffff)",
    clearHoverColor = "var(--error, #dc3545)",
    oninput,
    onchange,
    onfocus,
    onblur,
    onkeydown,
    style
  }: Props = $props();
  let uid: string = $props.id();
  const labels = getLibraryLabels();

  let searchEvents = $derived<Record<string, () => void>>(
    Object.fromEntries(
      Object.entries([oninput, onchange, onfocus, onblur, onkeydown].filter((event) => event != undefined)).map(
        ([key, fn]) => [key, () => handleInput(fn)]
      )
    )
  );
  let timeout = $state<NodeJS.Timeout | undefined>(undefined);
  let inputRef = $state<HTMLInputElement | undefined>(undefined);

  function debounceFn(fn: () => void | Promise<void>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      void fn();
    }, debounce);
  }

  function handleInput(fn: () => void | Promise<void>): void {
    if (debounce > 0) {
      debounceFn(fn);
    } else {
      fn();
    }
  }

  onMount(() => {
    if (autofocus) window.requestAnimationFrame(() => inputRef?.focus({ preventScroll: true }));
    return () => clearTimeout(timeout);
  });
</script>

<form
  id="search-bar-{uid}"
  class="search-bar"
  style:--search-bar-bg-color={bgColor}
  style:--search-bar-clear-hover-color={clearHoverColor}
  {style}
  data-svelte-search
  role="search"
  aria-labelledby="label-{id}-{uid}"
  action=""
  onsubmit={(e) => e.preventDefault()}>
  <label id="label-{id}-{uid}" for="{id}-{uid}">
    <Search />
  </label>
  <input
    bind:this={inputRef}
    class="search-bar--input"
    name="search"
    type="search"
    {placeholder}
    autocomplete="off"
    spellcheck="false"
    {...searchEvents}
    id="{id}-{uid}"
    bind:value />
  <input onclick={() => (value = "")} class="search-bar--clear" type="reset" value="X" aria-label={labels.clearForm} />
</form>

<style>
  .search-bar {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 6px 1rem;
    background-color: var(--search-bar-bg-color);
    color: var(--search-color, var(--primary, black));
    border-radius: 6px;
    width: min(500px, 100%);
    margin: 0 auto 2rem;
    transition: outline-color 0.15s linear;
    outline: 2px solid var(--search-color, var(--primary, black));

    &:focus-within {
      outline: 2px solid var(--search-outline-color, var(--accent-dark, slategray));

      :global svg {
        stroke: var(--search-outline-color, var(--accent-dark, slategray));
      }
    }

    label {
      height: 2rem;

      :global svg {
        transition: stroke 0.15s linear;
        height: 100%;
        width: auto;
        color: var(--search-color, var(--primary, black));
      }
    }

    input.search-bar--input {
      flex: 1;
      font-size: 22px;
      height: 2rem;
      padding: 6px;
      border: none;
      background-color: transparent;
      color: inherit;

      &:focus,
      &:focus-visible {
        outline: none;
      }

      &::-webkit-search-cancel-button {
        display: none;
      }
    }

    input.search-bar--clear {
      background-color: transparent;
      padding: 0 6px;
      border-radius: 8px;
      border: none;
      transition: color 0.15s linear;
      color: var(--search-color, var(--primary, black));
      cursor: pointer;

      &:hover {
        color: var(--search-bar-clear-hover-color);
      }
    }
  }
</style>
