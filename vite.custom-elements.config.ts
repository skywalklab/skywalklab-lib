import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import fs from "node:fs";
import path from "node:path";
import { skywalkConfigPlugin } from "./src/lib/server/plugins/index.js";
import { SKYWALK_ATTR_PREFIX, SKYWALK_PREFIX } from "./src/lib/brand/data.js";
import { kebab } from "./src/lib/utils/helpers.js";

const cwd = process.cwd();
const root = path.join(cwd, "src/lib/custom-elements");

const entryName = (file: string) =>
  file === "index.ts"
    ? "index"
    : file.endsWith("/index.ts")
      ? path.dirname(file)
      : `${SKYWALK_PREFIX}-${kebab(path.basename(file, ".svelte"))}`;
const entries = Object.fromEntries(
  fs
    .readdirSync(root, { recursive: true, encoding: "utf-8" })
    .filter((file) => file.endsWith(".svelte") || file.endsWith("index.ts"))
    .map((file) => [entryName(file), path.join(root, file)])
);

export default defineConfig({
  plugins: [
    svelte({
      configFile: false,
      emitCss: false,
      preprocess: vitePreprocess(),
      dynamicCompileOptions: ({ filename }) =>
        filename.includes("/custom-elements/") ? { customElement: true } : undefined,
      onwarn: (warning, handler) => warning.code !== "options_missing_custom_element" && handler(warning)
    }),
    skywalkConfigPlugin({ cwd, command: "build", company: SKYWALK_ATTR_PREFIX, noCssHash: true }) as any
  ],
  resolve: { alias: { $lib: path.join(cwd, "src/lib") } },
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    outDir: "dist/custom-elements-bundle",
    emptyOutDir: true,
    lib: { entry: entries, formats: ["es"] },
    rollupOptions: { output: { chunkFileNames: "chunks/[name]-[hash].js" } }
  }
});
