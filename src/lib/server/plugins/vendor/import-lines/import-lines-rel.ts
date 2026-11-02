import { LINE_END } from "../utils/consts.js";
import type { ModuleRecord } from "../types.js";
import { findModuleLines, normalizeModuleLines } from "../source-files/find-module-lines.js";
import { getImportRegex } from "../utils/regex.js";

export function findRelativeImports(filePath: string, packageFolder: string): ModuleRecord[] {
  const relativeImports = normalizeModuleLines(
    findModuleLines({
      filePath,
      groups: `$2$3 | $1 ${LINE_END}`,
      rgFlags: ["--no-filename", "-U", "--multiline-dotall", "--pcre2"],
      moduleRegex: getImportRegex("import-relative", packageFolder)
    }),
    "import-relative"
  );

  const relativeBareImports = normalizeModuleLines(
    findModuleLines({
      filePath,
      groups: `$1 | $1 ${LINE_END}`,
      rgFlags: ["--no-filename"],
      moduleRegex: getImportRegex("import-relative-bare", packageFolder)
    }),
    "import-relative-bare"
  );

  return [...relativeImports, ...relativeBareImports];
}
