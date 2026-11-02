export const kebab = (camelCase: string) => {
  return camelCase.replace(/([a-z])([A-Z]|\d)/g, "$1-$2").toLowerCase();
};

export const title = (kebab: string) => {
  return kebab.replace("-", " ").replace(/(^[a-z])|(\s[a-z])/, (_, group) => group.toUpperCase());
};

export const parseComponentPath = (metaUrl: string, split: "/components/" | "/(examples)/" = "/components/") => {
  const [componentDir, componentName] = metaUrl.replace(/\.[^/]*$/, "").split(split)[1].split("/");

  return { componentDir, componentName };
};

/** Escapes regex metacharacters so a user-typed search term can be used in `new RegExp`. */
export const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
