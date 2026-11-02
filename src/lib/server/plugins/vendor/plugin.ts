import path from "node:path";
import type { PluginOption } from "../types.js";
import { pathExists } from "../utils.js";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import { createVendorFile } from "./create-files/vendor-source-files.js";
import { createTypesFiles } from "./create-files/vendor-type-files.js";
import { createIndexFiles } from "./create-files/vendor-index-files.js";
import { DEP, DEV_DEP } from "./utils/consts.js";
import type {
  FullVendorFolders,
  ProcessedFiles,
  ProcessedIndexFiles,
  ProcessedTypesFiles,
  SkywalkVendorPluginProps,
  VendorFolders,
  VendorMap
} from "./types.js";
import { createVendorMap } from "./create-files/vendor-map.js";
import { createVendorConfig } from "./create-files/vendor-config.js";
import { realpathSync } from "node:fs";

declare global {
  var processedFiles: ProcessedFiles;
  var processedIndexFiles: ProcessedIndexFiles;
  var processedTypesFiles: ProcessedTypesFiles;
  var vendorMap: VendorMap | null;
}

globalThis.processedFiles ??= new Map();
globalThis.processedIndexFiles ??= new Set();
globalThis.processedTypesFiles ??= [];
globalThis.vendorMap ??= null;

// To do:
// use system paths === id?

const addFullVendorFolders = async (cwd: string, folders: VendorFolders): Promise<FullVendorFolders> => {
  folders.vendorFolder = folders.vendorFolder || `src/${folders.packageFolder}`;
  folders.bundleRoot = realpathSync(path.resolve(cwd, `node_modules/${folders.packageFolder}`));
  const packagePath = path.resolve(folders.bundleRoot, "package.json");
  folders.packageJSON = fs.existsSync(packagePath) ? JSON.parse(await fsPromises.readFile(packagePath, "utf-8")) : {};
  folders.bundleFolder = folders.bundleFolder ?? folders.packageJSON?.["files"]?.[0] ?? "";

  return folders as FullVendorFolders;
};

const createVendorFolder = async (vendorFolder: string): Promise<void> => {
  const resolvedFolderPath = path.resolve(process.cwd(), vendorFolder);
  const resolvedFolderExists = await pathExists(resolvedFolderPath);

  if (resolvedFolderExists && vendorMap === null) {
    await fsPromises.rm(resolvedFolderPath, { recursive: true, force: true });
  }

  if (!resolvedFolderExists) {
    await fsPromises.mkdir(resolvedFolderPath, { recursive: true });
  }
};

export async function skywalkVendorPlugin({
  cwd,
  folders,
  extensions = [".svelte", ".svelte.js", ".js", ".type.d.ts", ".d.ts", ".module.css", ".css"],
  useNpmAlias = false,
  includeAllDep = false,
  execute
}: SkywalkVendorPluginProps): Promise<PluginOption> {
  if (!execute) return {} as PluginOption;
  const fullFolders = await addFullVendorFolders(cwd, folders);

  return {
    name: "vite-plugin-svelte-skywalk-vendor",
    apply: "build",
    async buildStart() {
      await createVendorFolder(fullFolders.vendorFolder);

      if (!vendorMap) {
        await createVendorConfig(fullFolders);
        vendorMap = await createVendorMap({
          folders: fullFolders,
          extensions,
          useNpmAlias,
          includeAllDep
        });
      }
    },
    async load(id) {
      if (!vendorMap) return;

      await createVendorFile({
        folders: fullFolders,
        vendorMap,
        extensions,
        id,
        processedFiles,
        useNpmAlias
      });
    },
    async buildEnd() {
      createTypesFiles(fullFolders, vendorMap, extensions, processedTypesFiles);
      await createIndexFiles(fullFolders, processedFiles, processedIndexFiles);
    },
    async closeBundle() {
      console.log("Dependencies Needed: ", Object.values({ ...vendorMap?.get(DEV_DEP), ...vendorMap?.get(DEP) }));
    }
  };
}
