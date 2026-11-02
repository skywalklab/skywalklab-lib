<script module lang="ts">
  import { testSearchResults } from "../data/test-data.js";
  import { goto } from "$app/navigation";
  import default_ui from "../css-modules/default-ui.module.css";
  import { search_static_props } from "./search.js";
  import { withDynamicProps } from "./utils.js";
  import { kebab } from "../utils/helpers.js";
  import { component_descriptions } from "$lib/stories/component-descriptions.js";

  export const searchItems: Record<string, { group: string; level: string }> = Object.fromEntries(
    Object.entries(component_descriptions).flatMap(([componentDir, componentMap]) =>
      [...componentMap.keys()].map((componentName) => [
        componentName,
        { group: kebab(componentDir).toLowerCase(), level: kebab(componentName).toLowerCase() }
      ])
    )
  );

  export const search_default_props = withDynamicProps(search_static_props, {
    SearchModal: {
      props: {
        items: searchItems,
        suggestions: [
          ...Object.keys(searchItems).slice(0, 2),
          ...Object.keys(searchItems).slice(50, 52),
          ...Object.keys(searchItems).slice(67, 69)
        ],
        buttonClass: default_ui["default-ui"],
        onResultItemClick: (item: string) => {
          window.open(
            `/?path=/docs/components-${searchItems[item].group.replace("-", "")}-${item.toLowerCase()}--docs`,
            "_blank",
            "noopener"
          );

          return { keepOpen: true, resetValue: true };
        },
        searchResultsChildren: SearchModalSearchResultsChildren,
        footerSnippet: SearchModalFooterSnippet
      }
    }
  });
</script>

{#snippet SearchModalSearchResultsChildren({ result }: { result: "list" | "empty" | "suggestions" })}
  {#if result === "empty"}
    <p>{testSearchResults.empty}</p>
  {:else if result === "suggestions"}
    <p>{testSearchResults.suggestions}</p>
  {/if}
{/snippet}

{#snippet SearchModalFooterSnippet()}
  <p style="width: fit-content; margin: 2rem auto 0;">
    <button
      style="background-color: transparent; border: none; border-bottom: 1px dashed var(--search-outline-color); cursor: pointer;"
      onclick={(e) => {
        goto("/", { replaceState: false });
        const host = e.currentTarget.closest("[slot]")?.parentElement ?? e.currentTarget;
        const root = (host.shadowRoot ?? host.getRootNode()) as Document | ShadowRoot;

        (root?.querySelector(".modal--close-button") as HTMLButtonElement)?.click();
      }}>{testSearchResults.overviewsLink}</button>
  </p>
{/snippet}
