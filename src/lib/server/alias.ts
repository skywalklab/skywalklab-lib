import path from "node:path";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { getPkgRoot } from "./plugins/utils.js";

export const skywalkLibWorkspaceAlias = async ({
  packageFolder
}: {
  packageFolder: string;
}): Promise<Record<string, string>> => {
  const libPath = path.join(getPkgRoot(packageFolder).pkgRoot, "src/lib");
  if (!existsSync(libPath)) return {};

  const getPath = (filePath: string) => {
    return `${libPath}${filePath}`;
  };

  const getDirectoryExports = async () => {
    const directoryExports: Record<string, string> = { [packageFolder]: getPath("") };
    const libDirs = await fs.readdir(getPath(""), { withFileTypes: true });
    for (const libEntry of libDirs) {
      if (libEntry.isDirectory()) {
        const libDir = libEntry.name;
        directoryExports[`${packageFolder}/${libDir}`] = getPath(`/${libDir}`);

        const nestedDirs = await fs.readdir(getPath(`/${libDir}`), { withFileTypes: true });
        for (const nestedEntry of nestedDirs) {
          if (nestedEntry.isDirectory()) {
            const nestedDir = nestedEntry.name;
            directoryExports[`${packageFolder}/${libDir}/${nestedDir}`] = getPath(`/${libDir}/${nestedDir}`);
          }
        }
      }
    }

    return directoryExports;
  };

  const directoryExports = await getDirectoryExports();
  return directoryExports;
};
