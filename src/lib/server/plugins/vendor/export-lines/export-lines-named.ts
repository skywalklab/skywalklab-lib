import { LINE_END } from "../utils/consts.js";
import type { ModuleRecord } from "../types.js";
import { findModuleLines, normalizeModuleLines } from "../source-files/find-module-lines.js";
import { getExportRegex } from "../utils/regex.js";

/**
 * Finds re-exports in a file.
 *
 * @param filePath - Path to the file to search
 * @param id - Pattern of export names to match (regex with `|`)
 * @returns Array of module records for matching re-exports
 *
 * @remarks
 * Matches the pattern: `export { Foo } from './module'`
 */
export function findReExports(filePath: string, id: string): ModuleRecord[] {
  const reExports = normalizeModuleLines(
    findModuleLines({
      filePath,
      groups: `$2$3 | $1 ${LINE_END}`,
      rgFlags: ["-U", "--multiline-dotall"],
      moduleRegex: getExportRegex("export-named-re", id)
    }),
    "export-named-re"
  );

  return reExports;
}

/**
 * Finds direct declaration exports in a file.
 *
 * @param filePath - Path to the file to search
 * @param id - Pattern of export names to match (regex with `|`)
 * @returns Array of module records for matching exports
 *
 * @remarks
 * Matches patterns like:
 * - `export const Foo = ...`
 * - `export let Foo = ...`
 * - `export var Foo = ...`
 * - `export function Foo() { ... }`
 * - `export async function Foo() { ... }`
 * - `export function* Foo() { ... }` (generators)
 * - `export class Foo { ... }`
 */
export function findDirectExports(filePath: string, id: string): ModuleRecord[] {
  const directExports = normalizeModuleLines(
    findModuleLines({
      filePath,
      groups: `$1 | $1 ${LINE_END}`,
      moduleRegex: getExportRegex("export-named-direct", id)
    }),
    "export-named-direct"
  );

  return directExports;
}

/**
 * Finds binding exports in a file.
 *
 * @param filePath - Path to the file to search
 * @param id - Pattern of export names to match (regex with `|`)
 * @returns Array of module records for matching exports
 *
 * @remarks
 * Matches the pattern: `export { Foo }` (without `from`)
 *
 * This is for indirect re-exports where the import and export are separate:
 * ```ts
 * import Foo from './module';
 * export { Foo };
 * ```
 */
export function findBindingExport(filePath: string, id: string): ModuleRecord[] {
  const bindingExports = normalizeModuleLines(
    findModuleLines({
      filePath,
      groups: `$1 | $1 ${LINE_END}`,
      moduleRegex: getExportRegex("export-named-binding", id)
    }),
    "export-named-binding"
  );

  return bindingExports;
}
