type DefaultPropsEntry = { props?: Record<string, any>; [key: string]: any };

/**
 * Merges values that only the .svelte files can hold (components, snippets, SvelteKit runtime modules) into the
 * static entries from the matching .ts file. The .ts files stay importable outside the browser.
 */
export function withDynamicProps(
  staticProps: Map<string, DefaultPropsEntry>,
  dynamicProps: Record<string, DefaultPropsEntry>
): Map<string, any> {
  return new Map(
    [...staticProps].map(([name, entry]) => {
      const { props, ...rest } = dynamicProps[name] ?? {};
      return [name, { ...entry, ...rest, props: { ...entry.props, ...props } }];
    })
  );
}
