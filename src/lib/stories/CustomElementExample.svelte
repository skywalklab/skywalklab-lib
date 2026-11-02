<script lang="ts">
  import { getCustomElementExample } from "./custom-elements/custom-element-examples.js";
  import { fillExample } from "./custom-elements/example-values.js";
  import { SKYWALK_PACKAGE, SKYWALK_PREFIX } from "../brand/data.js";
  import { kebab } from "../utils/helpers.js";

  interface Props {
    /** Component to show the example for, e.g. `LanguageHeader`. */
    componentName: string;
    /** Default props, whose values replace the example's type placeholders. */
    props?: Record<string, any>;
  }

  let { componentName, props }: Props = $props();

  let example = $derived(getCustomElementExample(componentName));
  // Unfilled when no props are given, so the placeholder shape shows as generated.
  let { html, unfilled, js } = $derived(props ? fillExample(example, componentName, props) : example);

  // Built here rather than in the markup, where the closing tag would end this block early.
  const indent = (code: string) =>
    code
      .trim()
      .split("\n")
      .map((line) => (line ? `  ${line}` : line))
      .join("\n");

  // Assembled from parts so neither tag appears literally here, which would end this block.
  const tag = (name: string) => `<${name}>`;
  let script = $derived([tag(`script type="module"`), indent(js), tag("/script")].join("\n"));

  // A page with no bundler can't resolve the package name, so it loads the bundle by URL instead.
  const cdn = `https://cdn.jsdelivr.net/npm/${SKYWALK_PACKAGE}/dist/custom-elements-bundle`;
  let callbacks = $derived(
    js
      .trim()
      .split("\n")
      .filter((line) => !line.startsWith("import "))
      .join("\n")
      .trim()
  );
  let cdnScript = $derived(
    [
      tag(`script type="module" src="${cdn}/${SKYWALK_PREFIX}-${kebab(componentName)}.js"`) + tag("/script"),
      ...(callbacks ? [tag(`script type="module"`), indent(callbacks), tag("/script")] : [])
    ].join("\n")
  );
</script>

<div class="custom-element-example-container">
  <hr />
  <p class="custom-element-example-label">Custom element</p>
  <pre class="custom-element-example"><code>{html.trim()}</code></pre>
  {#if unfilled?.length}
    <p class="custom-element-example-label">Omitted attributes</p>
    <pre class="custom-element-example"><code>{unfilled.join("\n")}</code></pre>
  {/if}
  <p class="custom-element-example-label">Setup with a bundler</p>
  <pre class="custom-element-example"><code>{script}</code></pre>
  <p class="custom-element-example-label">Setup without a build step</p>
  <pre class="custom-element-example"><code>{cdnScript}</code></pre>
</div>

<style>
  .custom-element-example {
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background: #fafafa;
    overflow-x: auto;
    font-size: 13px;
    line-height: 1.6;
    white-space: pre;
  }
</style>
