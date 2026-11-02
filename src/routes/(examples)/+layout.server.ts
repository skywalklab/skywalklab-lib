import { getPackageRegistry, getRawPackageRegistry, type PackageRegistry } from "$lib/utils/package-registry.js";

export async function load() {
  const serverGlob = import.meta.glob("/src/lib/server/**/index.ts");
  const rawPackageRegistry = await getRawPackageRegistry(serverGlob);
  const serverPackageRegistry = await getPackageRegistry(rawPackageRegistry);

  return {
    serverPackageRegistry
  } as { serverPackageRegistry: PackageRegistry };
}
