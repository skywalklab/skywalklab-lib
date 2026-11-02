import { spawnSync, type SpawnSyncReturns } from "node:child_process";
import { rgPath } from "@vscode/ripgrep";
import { LINE_END } from "../utils/consts.js";
import type { ModuleRecord, ModuleLine, ModuleLinesArgs, ModuleType } from "../types.js";
import { parseSource } from "../utils/file-paths.js";
import { ALIAS, BRACKET, DEFAULT_ALIAS, INLINE_TYPE, LINE_BREAK, NAMESPACE } from "../utils/regex.js";

export const findModuleLines = ({ filePath, groups, rgFlags, moduleRegex }: ModuleLinesArgs): ModuleLine[] => {
  const moduleLines: SpawnSyncReturns<string> = spawnSync(
    rgPath,
    [
      moduleRegex,
      "--no-line-number",
      "-g",
      "!node_modules",
      ...(rgFlags ?? []),
      "-r",
      groups,
      "-o",
      filePath.split("?")[0]
    ],
    {
      stdio: ["ignore", "pipe", "pipe"],
      encoding: "utf8"
    }
  );

  if (moduleLines.status === 2) {
    console.warn(`[module-lines] ripgrep error for ${filePath}: `, moduleLines.stderr);
  }

  return moduleLines.status === 0
    ? moduleLines.stdout
        .replace(new RegExp(LINE_BREAK, "g"), "")
        .split(LINE_END)
        .filter((line) => line.length > 0)
    : [];
};

export const normalizeModuleLines = (moduleLines: ModuleLine[], type: ModuleType): ModuleRecord[] => {
  return moduleLines.map((line) => {
    const [source, specifiers] = line.split(" | ");

    const normalizedSpecifiers = specifiers.split(", ").map((specifier) => {
      const isNamespace = new RegExp(NAMESPACE).test(specifier);
      const normalizedSpecifier = specifier
        .replace(new RegExp(INLINE_TYPE, "g"), "")
        .replace(new RegExp(BRACKET, "g"), "")
        .replace(new RegExp(DEFAULT_ALIAS, "g"), "")
        .replace(new RegExp(ALIAS, "g"), "")
        .replace(new RegExp(NAMESPACE), source)
        .trim();

      return /-bare/.test(type) || isNamespace ? (parseSource(specifier)?.fileName ?? specifier) : normalizedSpecifier;
    });

    return {
      specifiers: normalizedSpecifiers,
      source: /-bare/.test(type) ? (parseSource(source)?.dirs ?? source) : source
    };
  });
};
