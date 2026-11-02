export type RawPackageRegistry = Map<string, () => Promise<unknown>>;
export type PackageRegistry = Map<string, string[]>;

export async function getRawPackageRegistry(
  packageModule: Record<string, () => Promise<unknown>>
): Promise<RawPackageRegistry> {
  const rawRegistry: RawPackageRegistry = new Map();

  for (const [_path, module] of Object.entries(packageModule)) {
    const dir = _path.replace(/^\/src\/lib\/|\/index|\.ts/g, "").replace(/-/g, "_");

    rawRegistry.set(dir, module);
  }

  return rawRegistry;
}

function getPackageRegistryFiles(context: { dir: string[]; content: string }): string[] {
  const { dir, content } = context;
  const registryDir = dir[0];
  let registryFiles: string[] = [];

  if (registryDir === "components" || (registryDir === "server" && dir[1] === "plugins")) {
    if (!dir[1]) return registryFiles;
    registryFiles = Object.keys(content).map((component) => dir[1] + "__" + component);
  } else if (registryDir === "styles") {
    registryFiles = [dir[1]];
  } else {
    registryFiles = Object.keys(content);
  }

  return registryFiles;
}

export async function getPackageRegistry(rawPackageRegistry: RawPackageRegistry): Promise<PackageRegistry> {
  const packageRegistry: PackageRegistry = new Map();
  const setRegistry: (registryKey: string, registryFiles: string[]) => void = (registryKey, registryFiles) => {
    if (packageRegistry.has(registryKey)) {
      packageRegistry.get(registryKey)?.push(...registryFiles);
    } else {
      packageRegistry.set(registryKey, [...registryFiles]);
    }
  };

  for (const [_path, module] of rawPackageRegistry.entries()) {
    const dir = _path.split("/");
    const registryFiles: string[] = getPackageRegistryFiles({
      dir,
      content: (await module()) as string
    });

    setRegistry(dir[0], registryFiles);
  }

  return packageRegistry;
}

export function getPackageRegistrySets(registry: PackageRegistry, serverRegistry: PackageRegistry) {
  const packageRegistry = new Map([...registry, ...serverRegistry]);
  const componentSet = new Set(
    Object.values(packageRegistry.get("components")!).map((value) => (value as string).split("__")[0])
  );
  const pluginSet = new Set([...serverRegistry.values()].flat().filter((file) => /plugins/.test(file)));

  return {
    packageRegistry,
    componentSet,
    pluginSet
  };
}
