import { findModuleLines, normalizeModuleLines } from "../source-files/find-module-lines.js";
import { LINE_END } from "../utils/consts.js";
import type { ModuleRecord } from "../types.js";
import { getImportRegex } from "../utils/regex.js";

export function findDependencyImports(filePath: string, packageFolder: string): ModuleRecord[] {
  const dependencyImports = normalizeModuleLines(
    findModuleLines({
      filePath,
      groups: `$2 | $1 ${LINE_END}`,
      rgFlags: ["--no-filename", "-U", "--multiline-dotall", "--pcre2"],
      moduleRegex: getImportRegex("import-dependency", packageFolder)
    }),
    "import-dependency"
  );
  const dependencyBareImports = normalizeModuleLines(
    findModuleLines({
      filePath,
      groups: `$1 | $1 ${LINE_END}`,
      rgFlags: ["--no-filename"],
      moduleRegex: getImportRegex("import-dependency-bare", packageFolder)
    }),
    "import-dependency-bare"
  );

  return [...dependencyImports, ...dependencyBareImports];
}
