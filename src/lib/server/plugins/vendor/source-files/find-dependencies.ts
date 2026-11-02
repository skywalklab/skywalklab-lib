import { readFile } from "node:fs/promises";
import { findUp } from "find-up";
import { DEP, DEV_DEP } from "../utils/consts.js";
import type { DependencyModules } from "../types.js";
import { escapeRegExp } from "../../../../utils/helpers.js";

export async function addDependencyModules({
  vendorMap,
  packageJSON,
  specifiers,
  useNpmAlias,
  includeAllDep
}: DependencyModules): Promise<void> {
  const pkgDependencies = { ...packageJSON["devDependencies"], ...packageJSON["dependencies"] };
  const usesPNPMCatalog = Object.values(pkgDependencies).some((dep) => /catalog:/.test(dep));
  const pnpmWorkspaceYAML = usesPNPMCatalog ? await findUp("pnpm-workspace.yaml", { type: "file" }) : null;
  const pnpmCatalog = pnpmWorkspaceYAML ? await readFile(pnpmWorkspaceYAML, "utf-8") : null;

  const normalizeDependencies = (dependencyType: string): string[] => {
    const dependencies = Object.entries(packageJSON[dependencyType as keyof typeof packageJSON] ?? {});
    const filteredDependencies = includeAllDep
      ? dependencies
      : dependencies.filter(
          ([dependency]) =>
            includeAllDep ?? specifiers.find((specifier) => new RegExp(`^${dependency}`).test(specifier))
        );
    return filteredDependencies.map(([dependency, version]) => {
      const _version = /catalog:/.test(version)
        ? (pnpmCatalog
            ?.match(new RegExp(String.raw`^\s*['"]?${escapeRegExp(dependency)}['"]?\s*:\s*(.*)`, "m"))?.[1]
            ?.trim() ?? version)
        : version;
      const pkg = `${dependency}@${_version}`;
      const npmAlias = `${dependency}-vnd@npm:${pkg}`;

      return useNpmAlias ? npmAlias : pkg;
    });
  };

  vendorMap.set(DEV_DEP, normalizeDependencies("devDependencies"));
  vendorMap.set(DEP, normalizeDependencies("dependencies"));
}
