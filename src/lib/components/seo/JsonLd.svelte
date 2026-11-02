<script lang="ts">
  interface Props {
    /** Structured-data object, serialized into a JSON-LD script tag. */
    schema: unknown;
    /** Also render the script tag as visible, indented text, e.g. for previewing the output. */
    showSchema?: boolean;
  }

  let { schema, showSchema = false }: Props = $props();
  let uid: string = $props.id();
  const jsonLd = $derived<string>(
    `<script id="json-ld-${uid}" type="application/ld+json" >${JSON.stringify(schema, null, showSchema ? 2 : 0).replace(/</g, "\\u003c")}<` +
      `/script>`
  );
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html jsonLd}
{#if showSchema}
  <pre>{jsonLd}</pre>
{/if}
