# @skywalklab/lib

A Svelte 5 component library for SkywalkLab sites — 127 exported components across 23 categories,
plus the actions, utilities, CSS modules and Vite plugins they depend on.

Built on Svelte 5 runes and snippets, packaged with `svelte-package`.

## Lucide icons: only the ones you use

Icon names are strings, so a bundler can't see which ones you use:

```svelte
<LucideIcon lucide_icon="clock" />
```

That compiles to a dynamic import over the whole icon set, and every icon ends up in your build.
`skywalkLucidePlugin` scans your source with ripgrep and rewrites the import to an explicit map of
only the icons it finds.

Measured on a Vite 7 library build of the full Lucide set (1,736 icons) against eight in use:

|                 | Chunks emitted | Raw    | Gzipped |
| --------------- | -------------- | ------ | ------- |
| Dynamic import  | 1,737          | 554 KB | 306 KB  |
| With the plugin | 9              | 2 KB   | 1 KB    |

Names built at runtime can't be found by the scan — list those in `whiteList` and they ship too.

## Install

```bash
pnpm add @skywalklab/lib
```

Peer dependencies: `svelte@^5` and `@sveltejs/kit@^2.22.0`.

## Use

Import from the root entry, or from a category subpath to keep the import graph narrow:

```svelte
<script>
  import { Header1, Footer1 } from "@skywalklab/lib/components/nav";
  import { Accordion } from "@skywalklab/lib/components/disclosure";
</script>
```

All 23 categories are available as subpaths: `animations`, `banners`, `brand`, `buttons`, `cards`,
`carousels`, `chatbots`, `diagrams`, `disclosure`, `frames`, `galleries`, `headings`, `heros`,
`icons`, `legal`, `lists`, `modals`, `nav`, `panels`, `patterns`, `search`, `seo`, `utilities`.

Global stylesheets ship under `@skywalklab/lib/styles/*` — `preflight.css`, `base.css`, `vars.css`,
`fonts.css` and `spinners.css`. `vars.css` holds the design tokens every component reads from.

## Custom elements

Every component is also published as a custom element, a plain HTML tag with props as `sw-`
attributes. The bundles are plain JavaScript with Svelte included, so they work on any page.

With a bundler, where the library is installed:

```html
<script type="module">
  import "@skywalklab/lib/custom-elements/skywalk-top-image-card.js";
</script>
```

Without a build step, load it by URL instead, since a browser can't resolve the package name:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@skywalklab/lib/dist/custom-elements-bundle/skywalk-top-image-card.js"></script>
```

Then use the tag anywhere on the page:

```html
<skywalk-top-image-card sw-title="A title" sw-text="Some copy."></skywalk-top-image-card>
```

Import a category, such as `@skywalklab/lib/custom-elements/cards.js`, to register all of its
elements, or `@skywalklab/lib/custom-elements` for every one. Attributes, callbacks and slots are
covered on the **Custom Elements** page in Storybook.

## Vite plugins

`@skywalklab/lib/server/plugins` ships the build-time plugins the sites run on. They're loaded
together through `getSkywalkPlugins`:

```ts
// vite.config.ts
import { getSkywalkPlugins } from "@skywalklab/lib/server/plugins";

const cwd = process.cwd();
const skywalkPlugins = await getSkywalkPlugins({ debug: process.env.DEBUG === "true", cwd });

export default defineConfig(({ command }) => ({
  plugins: [
    sveltekit(),
    skywalkPlugins.skywalkConfigPlugin({ cwd, lightningcss: true, company: "default", command }),
    skywalkPlugins.skywalkLucidePlugin({ cwd, useVendor: false }),
    skywalkPlugins.skywalkSeoPlugin({
      /* … */
    })
  ]
}));
```

- **`skywalkConfigPlugin`** — wires the library into the project: the `/@skywalklib` alias,
  `server.fs.allow`, and the CSS-module scoping the components expect.
- **`skywalkLucidePlugin`** — the icon tree-shaking above.
- **`skywalkSeoPlugin`** — generates `sitemap.xml` and `robots.txt` at build time, including
  dynamic routes.
- **`skywalkCustomElementsPlugin`** — writes a custom-element wrapper for every component, plus the
  example markup shown in each component's Custom Element story. `pnpm build:custom-elements`
  compiles the wrappers into the standalone bundles.
- **`skywalkVendorPlugin`** — copies a dependency's source into the project so it ships as
  first-party code. It matches source with regular expressions, so check the output after a run.
- **`skywalkLabAiPlugin`** — writes a map of every component's description, default props and props
  interface, for an AI assistant to answer questions about the library.
- **`skywalkStorybookPlugin`** — fills each story's snippet examples from the default props.
- **`skywalkConfigFilesPlugin`** — resolves a project's `tsconfig` and Prettier config against the
  monorepo's base files at build time.

Full options for each are on the **Vite Plugins** page in Storybook.

## Docs

```bash
pnpm storybook             # dev, port 6006
pnpm storybook:fr          # dev, in French
pnpm build-storybook       # static build to storybook-static/
pnpm build-storybook:fr    # static build to storybook-static-fr/
```

One docs page per component, driven by the same default props as the `(examples)` routes, so the two
stay in sync. The **Overviews** section renders every component in a category at once.

## Development

```bash
pnpm dev        # the showcase app
pnpm check      # svelte-check
pnpm test       # Vitest, in-browser via Playwright
pnpm build      # package to dist/ and run publint
```

Components live in `src/lib/components/<category>/`. Each one needs an entry in
`src/lib/default-props/<category>.svelte` and a `.stories.svelte` beside it; see
`.claude/resources/component-guidelines.md` at the monorepo root for the conventions.

## License

MIT
