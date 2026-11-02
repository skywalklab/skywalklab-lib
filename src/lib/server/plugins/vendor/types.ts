export interface VendorConfig {
  useVendor: boolean;
  vendorFolder?: string;
}

export type VendorFolders = VendorConfig & {
  packageFolder: string;
  bundleFolder?: string;
  bundleRoot?: string;
  monorepoPackageFolder?: string;
  packageJSON?: { files: string[]; devDependencies: Record<string, string>; dependencies: Record<string, string> };
};

export type FullVendorFolders = Required<VendorFolders>;

export interface SkywalkVendorPluginProps {
  cwd: string;
  folders: VendorFolders;
  extensions?: string[];
  useNpmAlias?: boolean;
  includeAllDep?: boolean;
  execute: boolean;
}

export type ProcessedFiles = Map<string, string>;
export type ProcessedIndexFiles = Set<string>;
export type ProcessedTypesFiles = string[];
export type VendorMap = Map<ModuleRecord["source"], ModuleRecord["specifiers"]>;

export interface CreateVendorMapArgs {
  folders: FullVendorFolders;
  extensions: string[];
  useNpmAlias: boolean;
  includeAllDep?: boolean;
}

export interface UpdateVendorMapArgs {
  vendorMap: VendorMap;
  source: string;
  specifier: string;
  fileName: string;
  isStatic: boolean;
}

export interface VendorFileArgs {
  folders: FullVendorFolders;
  vendorMap: VendorMap;
  extensions: string[];
  id: string;
  processedFiles: ProcessedFiles;
  useNpmAlias: boolean;
}

export type ImportModuleType =
  | "import-dependency"
  | "import-dependency-bare"
  | "import-package"
  | "import-package-bare"
  | "import-relative"
  | "import-relative-bare";

export type ExportModuleType =
  | "export-index"
  | "export-named-direct"
  | "export-named-re"
  | "export-named-binding"
  | "export-type";

export type ModuleType = ImportModuleType | ExportModuleType;

export interface ModuleLinesArgs {
  filePath: string;
  groups: string;
  rgFlags?: string[];
  moduleRegex: string;
}

export type ModuleLine = string;

export interface ModuleRecord {
  specifiers: string[];
  source: string;
}

export type SourceFilesMap = Map<string, Set<string>>;

export interface SourceFilesMapArgs {
  folders: FullVendorFolders;
  vendorMap: VendorMap;
  extensions: string[];
  sourceFiles: string[];
  sourceFilesMap: SourceFilesMap;
}

export interface FindSourceFileArgs {
  folders: FullVendorFolders;
  specifier: string;
  resolvedPath: string;
}

export interface FindNestedSourceFilesArgs {
  folders: FullVendorFolders;
  vendorMap: VendorMap;
  extensions: string[];
  sourceFile: string;
  moduleRecords: ModuleRecord[];
}

export interface FindEntrySourceFilesArgs {
  folders: FullVendorFolders;
  vendorMap: VendorMap;
  extensions: string[];
  moduleRecords: ModuleRecord[];
}

export interface ParseSourceFileArgs {
  folders: FullVendorFolders;
  extensions: string[];
  systemPath: string;
}

export interface DependencyModules {
  vendorMap: VendorMap;
  packageJSON: FullVendorFolders["packageJSON"];
  specifiers: ModuleRecord["specifiers"];
  useNpmAlias: boolean;
  includeAllDep?: boolean;
}

export interface ParsedSource {
  relativeDirs?: string;
  dirs: string;
  fileName: string;
  ext: string;
}

export interface TrackSourceFileArgs {
  folders: FullVendorFolders;
  vendorMap: VendorMap;
  extensions: string[];
  systemPath: string;
  specifier: string;
}

export interface ResolveSourceFileArgs {
  folders: FullVendorFolders;
  filePath?: string;
  specifier: string;
  resolvedPath: string;
}

export type ExportSource = {
  sourceFile?: string;
  relativePath?: string;
};
