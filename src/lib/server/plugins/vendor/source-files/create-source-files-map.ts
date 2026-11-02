import { findNestedSourceFiles } from "./find-source-files.js";
import { EXTERNAL_DEP, SOURCE_FILES } from "../utils/consts.js";
import type { SourceFilesMapArgs, SourceFilesMap } from "../types.js";
import { findRelativeImports } from "../import-lines/import-lines-rel.js";
import { findDependencyImports } from "../import-lines/import-lines-dep.js";

export async function createSourceFilesMap({
  folders,
  vendorMap,
  extensions,
  sourceFiles,
  sourceFilesMap
}: SourceFilesMapArgs): Promise<SourceFilesMap> {
  const sourceMap = sourceFiles.reduce((_sourceMap, sourceFile) => {
    const relativeImports = findRelativeImports(sourceFile, folders.packageFolder);

    if (relativeImports.length > 0) {
      const nestedsourceFiles = findNestedSourceFiles({
        folders,
        vendorMap,
        extensions,
        sourceFile: sourceFile,
        moduleRecords: relativeImports
      });

      const existing = _sourceMap.get(SOURCE_FILES) ?? [];
      const newFiles = nestedsourceFiles.filter((file) => !sourceFilesMap.get(SOURCE_FILES)?.has(file));
      _sourceMap.set(SOURCE_FILES, [...existing, ...newFiles]);
    }

    const externalDeps = sourceFilesMap.get(EXTERNAL_DEP) ?? new Set();
    findDependencyImports(sourceFile, folders.packageFolder).forEach(({ source }) => {
      externalDeps.add(source);
    });
    sourceFilesMap.set(EXTERNAL_DEP, externalDeps);

    return _sourceMap;
  }, new Map());

  if (sourceMap.get(SOURCE_FILES)?.length > 0) {
    const existingsourceFiles = sourceFilesMap.get(SOURCE_FILES) ?? new Set();
    sourceMap.get(SOURCE_FILES).forEach((file: string) => {
      existingsourceFiles.add(file);
    });
    sourceFilesMap.set(SOURCE_FILES, existingsourceFiles);

    return createSourceFilesMap({
      folders,
      vendorMap,
      sourceFiles: sourceMap.get(SOURCE_FILES),
      extensions,
      sourceFilesMap
    });
  }

  return sourceFilesMap;
}
