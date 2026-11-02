import { findModuleLines, normalizeModuleLines } from "../source-files/find-module-lines.js";
import type { ModuleRecord } from "../types.js";
import { LINE_END } from "../utils/consts.js";
import { getImportRegex } from "../utils/regex.js";

export function findPackageImports(filePath: string, packageFolder: string): ModuleRecord[] {
  const packageImports = normalizeModuleLines(
    findModuleLines({
      filePath,
      groups: `$2$3 | $1 ${LINE_END}`,
      rgFlags: ["--no-filename", "-U", "--multiline-dotall", "--pcre2"],
      moduleRegex: getImportRegex("import-package", packageFolder)
    }),
    "import-package"
  );

  const packageBareImports = normalizeModuleLines(
    findModuleLines({
      filePath,
      groups: `$1 | $1 ${LINE_END}`,
      rgFlags: ["--no-filename"],
      moduleRegex: getImportRegex("import-package-bare", packageFolder)
    }),
    "import-package-bare"
  );

  return [...packageImports, ...packageBareImports];
}
