import type { ExportModuleType, FullVendorFolders, ImportModuleType } from "../types.js";

export const LINE_BREAK = String.raw`\n`;
export const INLINE_TYPE = String.raw`(^|\s+)type\s+`;
export const BRACKET = String.raw`\{|\}`;
export const DEFAULT_ALIAS = String.raw`default\s+as\s+`;
export const ALIAS = String.raw`\s+as\s+\w+`;
export const NAMESPACE = String.raw`\*`;

export const NAMED_SPECIFIER_START = String.raw`(?!\()(?:\s+type\s+)?\s*`;
export const NAMED_SPECIFIER = String.raw`${NAMED_SPECIFIER_START}([^'"]+?)\s*from\s+['"]`;
export const NAMED_SOURCE = String.raw`[^$]*?([^'"$]*)['"]`;

export const getImportRegex = (type: ImportModuleType, packageFolder: FullVendorFolders["packageFolder"]): string => {
  const bareImport = String.raw`import(?:\(|\s+)['"\`]`;
  const bareSourceEnd = String.raw`['"\`]\)?`;

  let importRegex = "";
  switch (type) {
    case "import-package":
      importRegex = String.raw`import${NAMED_SPECIFIER}(?:${packageFolder})${NAMED_SOURCE}`;
      break;
    case "import-package-bare":
      importRegex = String.raw`${bareImport}${packageFolder}([^'"\`$]*)${bareSourceEnd}`;
      break;
    case "import-relative":
      importRegex = String.raw`import${NAMED_SPECIFIER}(\.)${NAMED_SOURCE}`;
      break;
    case "import-relative-bare":
      importRegex = String.raw`${bareImport}(\.[^'"\`$]*)${bareSourceEnd}`;
      break;
    case "import-dependency":
      importRegex = String.raw`import${NAMED_SPECIFIER}(?!\.)${NAMED_SOURCE}`;
      break;
    case "import-dependency-bare":
      importRegex = String.raw`${bareImport}([\w@][^'"\`$]*)${bareSourceEnd}`;
      break;
  }

  return importRegex;
};

export const getExportRegex = (type: ExportModuleType, id: string): string => {
  let exportRegex = "";
  switch (type) {
    case "export-index":
      exportRegex = String.raw`(export${NAMED_SPECIFIER}(\.)(${id})['"])`;
      break;
    case "export-named-re":
      exportRegex = String.raw`export\s+[^\w]*[^'"]+?\b(${id})\b[^'"]+['"](\.)([^'"]*)['"]?`;
      break;
    case "export-named-direct":
      exportRegex = String.raw`export\s+(?:async\s+)?(?:function\*?|const|let|var|class)\s+\b(${id})\b`;
      break;
    case "export-named-binding":
      exportRegex = String.raw`(export\s*\{[^}]*\b(${id})\b[^}]*\})`;
      break;
    case "export-type":
      exportRegex = String.raw`(?:declare\s+)?(interface|type|enum|namespace)\s+(${id})`;
      break;
  }

  return exportRegex;
};

export const separatePaths = (source: string) => source.match(new RegExp(String.raw`(.+):(.*)`));

export const escapeRegexPath = (str: string): string => {
  return str.replace(/[\/\\.]/g, "\\$&");
};

export const escapeRegexExtensions = (extensions: string[]): string => {
  return extensions.map((end) => end.replace(/\./g, String.raw`\.`)).join("|");
};
