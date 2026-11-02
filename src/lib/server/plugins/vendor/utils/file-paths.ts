import path from "node:path";
import fs from "node:fs";
import type { ParsedSource, VendorFolders } from "../types.js";

export const normalizeSource = (p: string) => p.replace(/^\//, "").replace(/\/$/, "");

export const parseSource = (source: string): ParsedSource => {
  const parsed = path.parse(source);

  return {
    relativeDirs: source.startsWith(".") ? parsed.dir : undefined,
    dirs: parsed.dir.replace(/^\//, ""),
    fileName: parsed.name,
    ext: parsed.ext
  };
};

export const getBundlePath = (folders: VendorFolders) => `${folders.bundleRoot}/${folders.bundleFolder}`;

export function tryResolve(pathToResolve: string) {
  try {
    return require.resolve(pathToResolve);
  } catch {
    return;
  }
}

export function resolveFilePath(extensions: string[], filePath: string) {
  const { ext } = parseSource(filePath);

  if (ext) {
    return fs.existsSync(filePath) ? filePath : undefined;
  }

  return tryResolve(filePath) ?? extensions.map((_ext) => filePath + _ext).find(fs.existsSync);
}
