import { LINE_END } from "../utils/consts.js";
import type { ModuleLine } from "../types.js";
import { findModuleLines } from "../source-files/find-module-lines.js";
import { getExportRegex, NAMED_SOURCE, NAMED_SPECIFIER_START } from "../utils/regex.js";

/**
 * Finds exports in an index/barrel file.
 *
 * @param filePath - Path to the index file to search
 * @param id - Pattern of source paths to match (regex with `|`)
 * @param fileNames - List of file names to match for binding exports
 * @returns Array of export lines to include in vendor output
 *
 * @remarks
 * Handles three export patterns:
 * - Direct re-exports: `export { Foo } from './module'`
 * - Import statements: `import Foo from './module'` (for indirect re-exports)
 * - Binding exports: `export { Foo }` (paired with imports above)
 */
export function findIndexExports(filePath: string, id: string, fileNames: string[]): ModuleLine[] {
  const indexExports = findModuleLines({
    filePath,
    groups: `$1 ${LINE_END}`,
    rgFlags: ["--no-filename", "-U", "--multiline-dotall", "--pcre2"],
    moduleRegex: getExportRegex("export-index", id)
  });

  const indexImports = findModuleLines({
    filePath,
    groups: `$1 ${LINE_END}`,
    rgFlags: ["--no-filename", "-U", "--multiline-dotall", "--pcre2"],
    moduleRegex: String.raw`(import${NAMED_SPECIFIER_START}(?:${fileNames.join("|")})\s*from\s+['"](?:\.)${NAMED_SOURCE})`
  });

  if (indexImports.length < 1) return indexExports;

  const normalizedIndexImports = indexImports.map((line) => line.split("import ")[1].split("from")[0].trim());
  const filteredFileNames = fileNames.filter((fileName) => normalizedIndexImports.includes(fileName));
  const bindingExports = findIndexBindingExports(filePath, filteredFileNames.join("|")).map((importLine) =>
    removeUnusedExports(importLine, filteredFileNames)
  );

  return [...indexExports, ...indexImports, ...bindingExports];
}

/**
 * Filters an export clause to only include used exports.
 *
 * @param importLine - The full `export { ... }` line
 * @param fileNames - List of file names that are actually used
 * @returns The export line with unused exports removed
 *
 * @example
 * // If fileNames is ['Foo'] and importLine is 'export { Foo, Bar, Baz }'
 * // Returns 'export { Foo }'
 */
function removeUnusedExports(importLine: string, fileNames: string[]) {
  const splitLine1 = importLine.split("{");
  const splitLine2 = importLine.split("}");
  const usedImports = splitLine1[1]
    .split("}")[0]
    .split(",")
    .map((name) => name.trim())
    .filter((name) => fileNames.some((fileName) => new RegExp(`\\b${fileName}\\b`).test(name)))
    .join(", ");

  return splitLine1[0] + "{ " + usedImports + " }" + splitLine2[1];
}

/**
 * Finds binding exports (`export { Foo }`) in a file.
 *
 * @param filePath - Path to the file to search
 * @param id - Pattern of export names to match (regex with `|`)
 * @returns Array of matching export lines
 */
export function findIndexBindingExports(filePath: string, id: string) {
  const bindingExports = findModuleLines({
    filePath,
    groups: `$1 ${LINE_END}`,
    rgFlags: ["--no-filename", "-U", "--multiline-dotall", "--pcre2"],
    moduleRegex: getExportRegex("export-named-binding", id)
  });

  return bindingExports;
}
