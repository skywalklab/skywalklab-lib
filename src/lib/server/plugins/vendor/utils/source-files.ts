import path from "node:path";
import { normalizeSource, parseSource, resolveFilePath } from "../utils/file-paths.js";
import type {
  FindSourceFileArgs,
  ParseSourceFileArgs,
  TrackSourceFileArgs,
  ResolveSourceFileArgs,
  ExportSource
} from "../types.js";
import { findBindingExport, findDirectExports, findReExports } from "../export-lines/export-lines-named.js";
import { separatePaths } from "../utils/regex.js";
import { updateVendorMap } from "../utils/vendor-map.js";
import { findRelativeImports } from "../import-lines/import-lines-rel.js";

const findSourceFile = ({ folders, specifier, resolvedPath }: FindSourceFileArgs): ExportSource | undefined => {
  const directExports = findDirectExports(resolvedPath, specifier);
  if (directExports.length > 0) {
    return directExports
      .map(({ source: _source }) => {
        const matches = separatePaths(_source);
        const sourceFile = matches?.[1];

        return { sourceFile: sourceFile, relativePath: sourceFile };
      })
      .find(({ sourceFile, relativePath }) => sourceFile || relativePath);
  }

  const reExports = findReExports(resolvedPath, specifier);
  if (reExports.length > 0) {
    return reExports
      .map(({ source: _source }) => {
        const matches = separatePaths(_source);
        const sourceFile = matches?.[1];
        const relativePath = matches?.[2];

        return { sourceFile, relativePath };
      })
      .find(({ sourceFile, relativePath }) => sourceFile || relativePath);
  }

  const bindingExports = findBindingExport(resolvedPath, specifier);
  return bindingExports
    .flatMap(({ source: _source }) => {
      const matches = separatePaths(_source);
      const sourceFile = matches?.[1];
      const relativePath = matches?.[2];

      if (sourceFile || relativePath) {
        const relativeImports = sourceFile ? findRelativeImports(sourceFile, folders.packageFolder) : [];
        return relativeImports.map(({ source }) => ({ sourceFile, relativePath: source }));
      }

      return { sourceFile, relativePath };
    })
    .find(({ sourceFile, relativePath }) => sourceFile || relativePath);
};

/**
 * Resolves the actual source file path for a named import.
 *
 * If `filePath` exists and is not an index file, returns it directly.
 * Otherwise, searches for the source file by following re-exports.
 *
 * The index file check (`/\/index\./`) is necessary because imports
 * often resolve initially to an index file (e.g., `components/index.js`),
 * but we need to find the actual source file that defines the export
 * (e.g., `components/icons/LucideIcon.svelte`). Without this check, index files
 * would be tracked as source files instead of the real implementations.
 */
export const resolveSourceFile = ({ folders, filePath, specifier, resolvedPath }: ResolveSourceFileArgs): string => {
  if (filePath && !/\/index\./.test(filePath)) return filePath;

  const exportSource = findSourceFile({
    folders,
    specifier,
    resolvedPath
  });

  return exportSource ? path.resolve(path.dirname(exportSource.sourceFile ?? ""), exportSource.relativePath ?? "") : "";
};

export const parseSourceFile = ({ folders, extensions, systemPath }: ParseSourceFileArgs) => {
  const { dirs, fileName } = parseSource(systemPath);
  const normalizedsource = normalizeSource(dirs?.split(folders.bundleFolder)[1] ?? "");

  return {
    systemPath: resolveFilePath(extensions, systemPath),
    fileName,
    source: normalizedsource
  };
};

export const trackSourceFile = ({
  folders,
  vendorMap,
  extensions,
  systemPath,
  specifier
}: TrackSourceFileArgs): string | undefined => {
  const {
    fileName,
    source,
    systemPath: normalizedSystemPath
  } = parseSourceFile({
    folders,
    extensions,
    systemPath
  });

  updateVendorMap({
    vendorMap,
    source,
    specifier,
    fileName,
    isStatic: fileName === specifier
  });

  return systemPath ?? normalizedSystemPath;
};
