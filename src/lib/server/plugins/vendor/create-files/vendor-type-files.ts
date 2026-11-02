import fsPromises from "node:fs/promises";
import path from "node:path";
import type { FullVendorFolders, ProcessedTypesFiles, VendorMap } from "../types.js";
import { NAMED_IMPORTS } from "../utils/consts.js";
import { findTypeExports } from "../export-lines/export-lines-type.js";
import { getBundlePath, resolveFilePath } from "../utils/file-paths.js";

function getTypesFromSourceFiles(folders: FullVendorFolders, vendorMap: VendorMap) {
  const typeExports = findTypeExports(
    path.resolve(process.cwd(), `${getBundlePath(folders)}`),
    (vendorMap.get(NAMED_IMPORTS) ?? []).join("|")
  );

  return [
    ...new Set(
      typeExports.map(
        ({ source }) =>
          source.match(new RegExp(String.raw`${folders.bundleRoot}\/${folders.bundleFolder}\/([^\.]+)`))?.[1]
      )
    )
  ];
}
export function createTypesFiles(
  folders: FullVendorFolders,
  vendorMap: VendorMap | null,
  extensions: string[],
  processedTypesFiles: ProcessedTypesFiles
) {
  if (!vendorMap) return;

  const sources = getTypesFromSourceFiles(folders, vendorMap);
  for (const source of sources) {
    if (source) {
      const bundlePath = getBundlePath(folders);
      const resolvedTypesPath = resolveFilePath(extensions, `${bundlePath}/${source}`);
      const resolvedTypesFile = resolvedTypesPath?.split(bundlePath)?.[1];

      if (resolvedTypesPath && resolvedTypesFile && !processedTypesFiles.includes(resolvedTypesPath)) {
        fsPromises.readFile(resolvedTypesPath, "utf8").then(async (code: string) => {
          const outputPath = path.resolve(process.cwd(), `${folders.vendorFolder}/${resolvedTypesFile}`);
          await fsPromises.mkdir(path.dirname(outputPath), { recursive: true });
          await fsPromises.writeFile(outputPath, code);
        });

        processedTypesFiles.push(resolvedTypesPath);
      }
    }
  }
}
