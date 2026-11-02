<svelte:options
  customElement={{
    tag: "skywalk-search-list-item-text",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      value: { type: "String", attribute: "sw-value" },
      label: { type: "String", attribute: "sw-label" },
      groupLabel: { type: "String", attribute: "sw-group-label" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "search/SearchListItemText", false);
        }

        connectedCallback() {
          this.#adopt();
          return (Base.prototype as any).connectedCallback.call(this);
        }

        attributeChangedCallback(...args: any[]) {
          const result = (Base.prototype as any).attributeChangedCallback.apply(this, args);
          if (this.shadowRoot) this.#adopt();
          return result;
        }
      }
  }} />

<script module lang="ts">
  import { shadowSheets } from "../../utils/shadow-styles.js";
</script>

<script lang="ts">
  import SearchListItemText from "../../components/search/SearchListItemText.svelte";

  let { value, label, groupLabel, style }: any = $props();
</script>

<SearchListItemText {value} {label} {groupLabel} {style} />


<style>
  :host {
    display: block;
  }

  :global {
.search-list-item-text {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: color 0.15s linear;

    @media (prefers-reduced-motion: reduce) {
      transition: color 0.75s linear;
    }

    .search-list-item-text--parent {
      margin: 1px 0 0;
      display: flex;
      gap: 0.25rem;
      align-items: center;
      font-size: 12px;
      width: 100%;
      color: inherit;
      transition: inherit;

      :global svg {
        flex: 0 0 16px;
        transition: inherit;
      }

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        transition: inherit;
      }
    }

    :global mark {
      padding: 0 1px;
      color: var(--search-outline-color, var(--accent-dark, slategray));
      background-color: transparent;
      transition: inherit;
    }
  }
  }
</style>
      