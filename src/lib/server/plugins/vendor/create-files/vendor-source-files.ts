import fsPromises from "node:fs/promises";
import path from "node:path";
import { DEP, DEV_DEP, SOURCE_FILES } from "../utils/consts.js";
import type { VendorFileArgs, VendorMap } from "../types.js";
import { escapeRegexExtensions } from "../utils/regex.js";

const addNpmAlias = (vendorMap: VendorMap, code: string): string => {
  let aliasedCode = code;
  const dependencies = [...(vendorMap.get(DEV_DEP) ?? []), ...(vendorMap.get(DEP) ?? [])];
  dependencies.forEach((dependency) => {
    const dep = dependency.split("-vnd@npm")[0];
    const alias = dep + "-vnd";

    aliasedCode = aliasedCode
      .replace(new RegExp(String.raw`from\s+(['"])${dep}`, "g"), `from $1${alias}`)
      .replace(new RegExp(String.raw`import(?:\(|\s+)(['"])${dep}`, "g"), `import($1${alias}`);
  });

  return aliasedCode;
};

export async function createVendorFile({
  folders,
  vendorMap,
  extensions,
  id,
  processedFiles,
  useNpmAlias
}: VendorFileArgs): Promise<void> {
  const isTypesFile = /types\.js/.test(id); // Handle type files in buildEnd
  const isVirtualModule = id.includes("?");
  const isProcessed = processedFiles.has(id);
  const isPackageFile = new RegExp(
    String.raw`(?:${folders.monorepoPackageFolder ?? folders.packageFolder}\/${folders.bundleFolder})[^\.]+(${escapeRegexExtensions(extensions)})$`
  ).test(id);
  const isSourceFile = vendorMap.get(SOURCE_FILES)?.some((file) => id.endsWith(file));

  if (isTypesFile || isVirtualModule || isProcessed || !isPackageFile || !isSourceFile) return;

  return fsPromises.readFile(id, "utf8").then(async (code: string) => {
    const outputPath = path.resolve(process.cwd(), `${folders.vendorFolder}/${id.split(folders.bundleFolder)[1]}`);

    if (outputPath) {
      await fsPromises.mkdir(path.dirname(outputPath), { recursive: true });
      await fsPromises.writeFile(outputPath, useNpmAlias ? addNpmAlias(vendorMap, code) : code);
      processedFiles.set(id, outputPath);
    }
  });
}
