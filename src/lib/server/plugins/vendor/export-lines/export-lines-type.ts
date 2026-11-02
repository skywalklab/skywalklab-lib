import { LINE_END } from "../utils/consts.js";
import type { ModuleRecord } from "../types.js";
import { findModuleLines, normalizeModuleLines } from "../source-files/find-module-lines.js";
import { getExportRegex, separatePaths } from "../utils/regex.js";

/**
 * Finds exported types/interfaces in a file.
 *
 * @param filePath - Path to the file to search
 * @param id - Type name(s) to search for (can be regex pattern with `|`)
 * @returns Array of module records for matching exports
 *
 * @remarks
 * Searches for type declarations including:
 * - `interface Foo` / `export interface Foo`
 * - `type Foo` / `export type Foo`
 * - `enum Foo` / `export enum Foo`
 * - `namespace Foo` / `export namespace Foo`
 * - `declare interface Foo` / `declare type Foo` (ambient declarations)
 *
 * Also finds types exported via binding: `type Foo = ...; export { Foo }`
 */
export function findTypeExports(filePath: string, id: string): ModuleRecord[] {
  const declarations = normalizeModuleLines(
    findModuleLines({
      filePath,
      groups: `$2 | $1 ${LINE_END}`,
      moduleRegex: getExportRegex("export-type", id)
    }),
    "export-type"
  );

  if (declarations.length < 1) return declarations;

  const declarationNames = declarations
    .map(({ source }) => separatePaths(source)?.[2] ?? "")
    .filter(Boolean)
    .join("|");

  const directExports = normalizeModuleLines(
    findModuleLines({
      filePath,
      groups: `$2 | $1 ${LINE_END}`,
      moduleRegex: String.raw`export\s+${getExportRegex("export-type", declarationNames)}`
    }),
    "export-type"
  );

  const bindingExports = normalizeModuleLines(
    findModuleLines({
      filePath,
      groups: `$2 | $1 ${LINE_END}`,
      moduleRegex: getExportRegex("export-named-binding", declarationNames)
    }),
    "export-named-binding"
  );

  return [...directExports, ...bindingExports];
}
