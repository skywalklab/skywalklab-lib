import type { StorybookConfig } from "@storybook/sveltekit";
import { dirname } from "path";
import { fileURLToPath } from "url";
import remarkGfm from "remark-gfm";
import { BRAND_LAB } from "../src/lib/brand/data.js";
import { createSoftwareSourceCodeSchema, createWebsiteSchema } from "../src/lib/utils/page-schema.js";
import pkg from "../package.json" with { type: "json" };

const storybookLocale = process.env.STORYBOOK_LOCALE ?? "en";
const meta =
  storybookLocale === "fr"
    ? {
        site: BRAND_LAB.frSite!,
        locale: "fr_FR",
        company: BRAND_LAB.company,
        tagline: "Bibliothèque pour SkywalkLab",
        description:
          "Une bibliothèque de composants Svelte 5 pour les sites SkywalkLab, avec les actions, utilitaires, modules CSS et plugins Vite dont ils dépendent."
      }
    : {
        site: BRAND_LAB.site,
        locale: "en_US",
        company: BRAND_LAB.company,
        tagline: BRAND_LAB.tagline_1,
        description: pkg.description
      };

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    createWebsiteSchema(meta.company, meta.site),
    createSoftwareSourceCodeSchema({
      id: `${meta.site}/#library`,
      name: pkg.name,
      url: meta.site,
      description: meta.description,
      version: pkg.version,
      license: pkg.license,
      programmingLanguage: ["Svelte", "TypeScript"],
      runtimePlatform: "Svelte 5",
      image: BRAND_LAB.meta.ogImage,
      author: { "@type": "Person", "@id": "https://tommydoak.com/#person", name: "Tommy Doak" }
    })
  ]
}).replace(/</g, "\\u003c");

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const config: StorybookConfig = {
  stories: [
    storybookLocale === "fr" ? "../src/lib/stories/mdx/fr/*.mdx" : "../src/lib/stories/mdx/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte)"
  ],
  staticDirs: [
    { from: "../src/lib/assets", to: "/@skywalklib/assets" },
    { from: "../static", to: "/" }
  ],
  managerHead: (head) => `${head}
<script>window.STORYBOOK_LOCALE = "${storybookLocale}";</script>
<link rel="icon" type="image/png" href="${BRAND_LAB.favicon}" />
<meta name="robots" content="all" />
<link rel="canonical" href="${meta.site}" />
<link rel="alternate" hreflang="en" href="${BRAND_LAB.site}" />
<link rel="alternate" hreflang="fr" href="${BRAND_LAB.frSite}" />
<meta name="theme-color" content="${BRAND_LAB.brand.primary}" />
<meta name="description" content="${meta.tagline}" />
<link rel="apple-touch-icon" href="${BRAND_LAB.meta.appleTouchIcon}" />
<meta property="og:title" content="${meta.company}" />
<meta property="og:description" content="${meta.tagline}" />
<meta property="og:image" content="${BRAND_LAB.meta.ogImage}" />
<meta property="og:url" content="${meta.site}" />
<meta property="og:locale" content="${meta.locale}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="${meta.company}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${meta.company}" />
<meta name="twitter:description" content="${meta.tagline}" />
<meta name="twitter:image" content="${BRAND_LAB.meta.ogImage}" />
<script type="application/ld+json">${jsonLd}</script>`,
  addons: [
    getAbsolutePath("@storybook/addon-svelte-csf"),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-a11y"),
    {
      // Tables, strikethrough and task lists are GFM, which MDX doesn't parse on its own.
      name: getAbsolutePath("@storybook/addon-docs"),
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } }
    },
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("storybook-dark-mode")
  ],
  framework: getAbsolutePath("@storybook/sveltekit")
};
export default config;
