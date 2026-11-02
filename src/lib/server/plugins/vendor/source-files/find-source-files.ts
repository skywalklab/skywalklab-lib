import path from "node:path";
import { getBundlePath, resolveFilePath } from "../utils/file-paths.js";
import type { FindEntrySourceFilesArgs, FindNestedSourceFilesArgs } from "../types.js";
import { normalizeSource } from "../utils/file-paths.js";
import { parseSourceFile, resolveSourceFile, trackSourceFile } from "../utils/source-files.js";

export const findNestedSourceFiles = ({
  folders,
  vendorMap,
  extensions,
  sourceFile,
  moduleRecords
}: FindNestedSourceFilesArgs): string[] => {
  return moduleRecords.flatMap((moduleRecord) => {
    const { source, systemPath: filePath } = parseSourceFile({
      folders,
      extensions,
      systemPath: path.resolve(path.dirname(sourceFile), moduleRecord.source)
    });

    return [
      ...new Set(
        moduleRecord.specifiers
          .map((specifier) => {
            const systemPath = resolveSourceFile({
              folders,
              filePath,
              specifier,
              resolvedPath: path.resolve(`${getBundlePath(folders)}/${source}`)
            });

            return trackSourceFile({
              folders,
              vendorMap,
              extensions,
              systemPath,
              specifier
            });
          })
          .filter((file) => file != undefined)
      )
    ];
  });
};

export const findEntrySourceFiles = ({
  folders,
  vendorMap,
  extensions,
  moduleRecords
}: FindEntrySourceFilesArgs): string[] => {
  return moduleRecords.flatMap(({ source, specifiers }) => {
    return [
      ...new Set(
        specifiers
          .map((specifier) => {
            const sourceFile = path.resolve(getBundlePath(folders), `${normalizeSource(source)}/${specifier}`);

            const filePath = resolveFilePath(extensions, sourceFile);
            const systemPath = resolveSourceFile({
              folders,
              filePath,
              specifier,
              resolvedPath: getBundlePath(folders)
            });

            return trackSourceFile({
              folders,
              vendorMap,
              extensions,
              systemPath,
              specifier
            });
          })
          .filter((file) => file != undefined)
      )
    ];
  });
};
