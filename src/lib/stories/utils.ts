import { kebab } from "../utils/helpers.js";
import { useEffect, useRef } from "storybook/internal/preview-api";
import type { HamburgerType } from "../components/nav/HamburgerBase.svelte";

interface ModuleStoryProps {
  componentName: string;
  cssModule: Record<string, string>;
  label: string;
  items: any[];
  style: string;
}

export const getFileName = (componentName: string): string => {
  return kebab(componentName).replace("button", "ui").replace("header-1", "header1");
};

export const getStoryProps = async ({
  defaultProps,
  nonCssVarProps
}: {
  defaultProps: Map<string, any>;
  nonCssVarProps: string[];
}): Promise<{ storyProps: Record<string, ModuleStoryProps>; cssModules: Record<string, Record<string, string>> }> => {
  const cssModules: Record<string, Record<string, string>> = Object.fromEntries(
    await Promise.all(
      Object.entries(import.meta.glob(["/src/lib/css-modules/**/*.module.css"])).map(async ([path, module]) => [
        path.replace("/src/lib/css-modules/", "").replace(".module.css", ""),
        ((await module()) as any).default
      ])
    )
  );

  const getModuleProps = (
    componentName: string,
    cssModule: Record<string, string>,
    fileName: string
  ): ModuleStoryProps => {
    const props = defaultProps.get(componentName).props;
    const propNames = Object.entries(props).filter(
      ([key, val]) => !nonCssVarProps.includes(key) && typeof val !== "function"
    );
    const inlineVars = propNames.map(([key, val]) => `--${fileName}-${kebab(key)}: ${val}`).join("; ");
    return {
      componentName,
      cssModule,
      label: props.text ?? componentName,
      items: props.items ?? [],
      style: [inlineVars, props.style].filter(Boolean).join("; ")
    };
  };

  const storyProps: Record<string, ModuleStoryProps> = Object.fromEntries(
    [...defaultProps.keys()]
      .map((componentName) => [componentName, getFileName(componentName)] as const)
      .filter(([, fileName]) => cssModules[fileName]?.[fileName])
      .map(([componentName, fileName]): [string, ModuleStoryProps] => [
        fileName,
        getModuleProps(componentName, cssModules[fileName], fileName)
      ])
  );

  return {
    storyProps,
    cssModules
  };
};

export const itemClass = (classNames: string | undefined, cssModule: Record<string, string>) =>
  (classNames?.split(" ") ?? [])
    .map((className) => cssModule[className])
    .filter(Boolean)
    .join(" ");

export const handleStoryBindables = <T>({
  name,
  value,
  setValue,
  args,
  updateArgs
}: {
  name: string;
  value: T;
  setValue: (next: T) => void;
  args: Record<string, any>;
  updateArgs: (newArgs: Partial<any>) => void;
}) => {
  const controlValue = args[name] as T;
  const prev = useRef(controlValue);

  if (value != controlValue && prev.current == controlValue) {
    updateArgs({ [name]: value });
    prev.current = value;
  }

  useEffect(() => {
    if (value !== controlValue) {
      queueMicrotask(() => setValue(controlValue));
      updateArgs({ [name]: controlValue });
      prev.current = controlValue;
    }
  }, [controlValue]);
};

export const hamburger_modules = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: CSSModuleClasses }>("/src/lib/css-modules/hamburgers/*-hamburger.module.css", {
      eager: true
    })
  ).map(([, module]) => {
    const cssModule = module.default;
    const type = Object.keys(cssModule)
      .find((className) => className.startsWith("hamburger--"))
      ?.replace("hamburger--", "");
    return [type, cssModule];
  })
) as Record<HamburgerType, CSSModuleClasses>;

export const hamburger_types = Object.keys(hamburger_modules) as HamburgerType[];
