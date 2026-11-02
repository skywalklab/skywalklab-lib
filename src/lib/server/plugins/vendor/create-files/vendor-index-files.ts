import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { getBundlePath, parseSource } from "../utils/file-paths.js";
import type { FullVendorFolders, ProcessedFiles, ProcessedIndexFiles } from "../types.js";
import { findIndexExports } from "../export-lines/export-lines-index.js";
import { escapeRegexPath } from "../utils/regex.js";

async function findIndexFiles(dir: string): Promise<string[]> {
  const indexFiles = [];
  const assets = await fsPromises.readdir(dir, { withFileTypes: true });

  for (const asset of assets) {
    const fullPath = path.join(dir, asset.name);

    if (asset.isDirectory()) {
      const files = await findIndexFiles(fullPath);
      indexFiles.push(...files);
    } else if (asset.name === "index.js") {
      indexFiles.push(fullPath);
    }
  }

  return indexFiles;
}

/**
 * Generates regex patterns for matching export statements in index files.
 *
 * These patterns are used to identify which exports from the bundle's index files
 * should be included in the vendor output.
 *
 * @remarks
 * `activeIndexPaths` - Filters index paths to only those containing processed files.
 * This prevents empty directories (like `assets/`) from appearing in the output.
 *
 * `indexPatterns` - Generates patterns like `\/components\/index\.js` for matching
 * re-exports from subdirectory index files (e.g., `export * from "./components/index.js"`).
 * Without these, the root index file wouldn't include subdirectory barrel exports.
 *
 * The remaining patterns match individual file exports at various path depths
 * (e.g., `\/Icon\.svelte`, `\/components\/Icon\.svelte`).
 */
function getPossibleSources(
  indexFilePaths: string[],
  processedFiles: ProcessedFiles,
  folders: FullVendorFolders
): Record<"patterns" | "fileNames", string[]> {
  const patterns: Set<string> = new Set();
  const fileNames: Set<string> = new Set();

  const activeIndexPaths = indexFilePaths.filter((filePath) =>
    [...processedFiles.keys()].some((processedFile) => {
      const bundlePath = parseSource(processedFile).dirs?.split(folders.bundleFolder)[1];
      return bundlePath?.startsWith(filePath);
    })
  );

  for (const filePath of activeIndexPaths) {
    patterns.add(escapeRegexPath(`${filePath}/index.js`));

    for (const segment of filePath.split("/").filter(Boolean)) {
      patterns.add(escapeRegexPath(`/${segment}/index.js`));
    }
  }

  for (const processedFile of processedFiles.keys()) {
    const { dirs, fileName, ext } = parseSource(processedFile);
    const bundlePath = dirs?.split(folders.bundleFolder)[1];
    if (!bundlePath) continue;

    fileNames.add(fileName);
    patterns.add(escapeRegexPath(`/${fileName}${ext}`));
    for (const filePath of activeIndexPaths) {
      if (!bundlePath.startsWith(filePath)) continue;

      for (const fileDir of filePath.split("/").filter(Boolean)) {
        patterns.add(escapeRegexPath(`/${fileDir}/${fileName}${ext}`));
      }
    }
  }

  return {
    patterns: [...patterns],
    fileNames: [...fileNames]
  };
}

export async function createIndexFiles(
  folders: FullVendorFolders,
  processedFiles: ProcessedFiles,
  processedIndexFiles: ProcessedIndexFiles
) {
  if (fs.existsSync(folders.vendorFolder)) {
    const indexFiles = await findIndexFiles(getBundlePath(folders));

    const indexFilePaths = indexFiles.map((indexFile) => {
      const { dirs } = parseSource(indexFile);

      return dirs?.split(folders.bundleFolder)[1] ?? indexFile;
    });

    const { patterns, fileNames } = getPossibleSources(indexFilePaths, processedFiles, folders);

    for (const indexFile of indexFiles) {
      if (processedIndexFiles.has(indexFile)) continue;

      const indexExport = findIndexExports(indexFile, patterns.join("|"), fileNames);
      const indexFileContent = indexExport.join("\n");

      if (indexFileContent) {
        const resolvedIndexFile = path.resolve(
          process.cwd(),
          `${folders.vendorFolder}${indexFile.split(folders.bundleFolder)[1]}`
        );
        await fsPromises.mkdir(path.dirname(resolvedIndexFile), { recursive: true });
        await fsPromises.writeFile(resolvedIndexFile, indexFileContent);
        processedIndexFiles.add(indexFile);
      }
    }
  }
}
