import { getRawPackageRegistry, type PackageRegistry, type RawPackageRegistry } from "$lib/utils/package-registry.js";

export async function load({ data }) {
  const clientGlob = import.meta.glob(["/src/lib/**/index.ts", "/src/lib/styles/**/*", "!/src/lib/server/**/index.ts"]);
  const rawPackageRegistry = await getRawPackageRegistry(clientGlob);

  return {
    rawPackageRegistry,
    serverPackageRegistry: data.serverPackageRegistry
  } as { rawPackageRegistry: RawPackageRegistry; serverPackageRegistry: PackageRegistry };
}
