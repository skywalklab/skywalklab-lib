import fsPromises from "node:fs/promises";
import path from "node:path";
import { createSourceFilesMap } from "../source-files/create-source-files-map.js";
import { EXTERNAL_DEP, SOURCE_FILES, ROOT_FILES } from "../utils/consts.js";
import type { VendorMap, CreateVendorMapArgs } from "../types.js";
import { findPackageImports } from "../import-lines/import-lines-pkg.js";
import { findEntrySourceFiles } from "../source-files/find-source-files.js";
import { addDependencyModules } from "../source-files/find-dependencies.js";

export async function createVendorMap({
  folders,
  extensions,
  useNpmAlias,
  includeAllDep
}: CreateVendorMapArgs): Promise<VendorMap | null> {
  const vendorMap: VendorMap = new Map();

  const packageImports = findPackageImports(process.cwd(), folders.packageFolder);
  const entrySourceFiles = findEntrySourceFiles({
    folders,
    vendorMap,
    extensions,
    moduleRecords: packageImports
  });
  const sourceFilesMap = await createSourceFilesMap({
    folders,
    vendorMap,
    extensions,
    sourceFiles: entrySourceFiles,
    sourceFilesMap: new Map([[SOURCE_FILES, new Set(entrySourceFiles)]])
  });
  vendorMap.set(
    `${SOURCE_FILES}`,
    [...(sourceFilesMap.get(SOURCE_FILES) ?? [])]
      .map((sourceFile) => sourceFile.split(`${folders.bundleFolder}`)[1])
      .filter(Boolean)
  );

  await addDependencyModules({
    vendorMap,
    packageJSON: folders.packageJSON,
    specifiers: [...(sourceFilesMap.get(EXTERNAL_DEP) ?? [])],
    useNpmAlias,
    includeAllDep
  });

  const rootFiles = vendorMap.get("");
  if (rootFiles) {
    vendorMap.set(ROOT_FILES, rootFiles);
    vendorMap.delete("");
  }

  const sortedVendorMap = Object.fromEntries(
    [...vendorMap.entries()]
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, value]) => [key, value.sort()])
  );
  const outputPath = path.resolve(process.cwd(), `${folders.vendorFolder}/vendor-map.ts`);
  await fsPromises.mkdir(path.dirname(outputPath), { recursive: true });
  await fsPromises.writeFile(
    outputPath,
    `export const vendorMap: Record<string, string[]> = ${JSON.stringify(sortedVendorMap, null, 2)};`
  );

  return vendorMap;
}
