/// <reference types="vitest/config" />
import { sentrySvelteKit } from "@sentry/sveltekit";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import { createLogger, defineConfig } from "vite";
import {
  skywalkConfigPlugin,
  skywalkConfigFilesPlugin,
  skywalkCustomElementsPlugin,
  skywalkLucidePlugin,
  skywalkSeoPlugin,
  skywalkVendorPlugin,
  skywalkStorybookPlugin
} from "./src/lib/server/plugins/index.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { SKYWALK_ATTR_PREFIX } from "./src/lib/brand/data.js";
import { component_descriptions } from "./src/lib/stories/component-descriptions.js";
const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const scanNoise = /No matching export in "html:|Failed to (run dependency scan|scan for dependencies)/;
const logger = createLogger();
const baseError = logger.error;
logger.error = (msg, options) => {
  if (scanNoise.test(msg)) return;
  baseError(msg, options);
};
const cwd = process.cwd();
const componentDirs = Object.keys(component_descriptions);

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ command }) => ({
  customLogger: logger,
  optimizeDeps: { exclude: ["fsevents"] },
  plugins: [
    sentrySvelteKit(),
    sveltekit(),
    skywalkConfigPlugin({ cwd, command, company: SKYWALK_ATTR_PREFIX, noCssHash: true }) as any,
    skywalkLucidePlugin({ cwd, useVendor: true, includeAll: process.env.STORYBOOK === "true" }),
    skywalkSeoPlugin({
      folder: "src/skywalklab/lib",
      sitemap: {
        routes: {
          include: [...componentDirs.map((dir) => ({ slug: `/(examples)/${dir}/` }))]
        }
      },
      robots: {
        siteUrl: "https://lab.skywalklab.com",
        routes: {
          include: [...componentDirs.map((dir) => `/${dir}`)],
          allowed: [],
          disallowed: [],
          exclude: []
        }
      },
      directInsert: false,
      execute: false
    }),
    skywalkStorybookPlugin(),
    skywalkCustomElementsPlugin({ cwd, execute: true }),
    skywalkVendorPlugin({
      cwd,
      folders: {
        useVendor: false,
        vendorFolder: "src/vendor/@lucide/svelte",
        packageFolder: "@lucide/svelte"
      },
      useNpmAlias: true,
      execute: false
    }),
    skywalkConfigFilesPlugin({
      configFiles: {
        tsconfig: "tsconfig.json",
        prettier: ".prettierrc.js"
      },
      baseFiles: {
        tsconfig: "tsconfig.base.json",
        prettier: ".prettierrc.json"
      },
      resolveConfigs: false,
      execute: false
    }),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/lib/paraglide"
    })
  ],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, ".storybook") })
        ],
        optimizeDeps: { exclude: ["svelte", "@lucide/svelte", "@storybook/addon-svelte-csf"] },
        resolve: { dedupe: ["svelte"] },
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }]
          }
        }
      }
    ]
  }
}));
