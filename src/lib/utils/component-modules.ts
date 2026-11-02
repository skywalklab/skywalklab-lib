import { uncataloged, uncatalogued_internals } from "$lib/stories/uncatalogued.js";

export const component_modules = {
  animations: import.meta.glob(["../components/animations/*.svelte", "!**.stories.svelte"]),
  banners: import.meta.glob(["../components/banners/*.svelte", "!**.stories.svelte"]),
  brand: import.meta.glob(["../components/brand/*.svelte", "!**.stories.svelte"]),
  buttons: import.meta.glob(["../components/buttons/*.svelte", "!**.stories.svelte"]),
  cards: import.meta.glob(["../components/cards/*.svelte", "!**.stories.svelte"]),
  carousels: import.meta.glob(["../components/carousels/*.svelte", "!**.stories.svelte"]),
  chatbots: import.meta.glob(["../components/chatbots/*.svelte", "!**.stories.svelte"]),
  diagrams: import.meta.glob(["../components/diagrams/*.svelte", "!**.stories.svelte"]),
  disclosure: import.meta.glob(["../components/disclosure/*.svelte", "!**.stories.svelte"]),
  frames: import.meta.glob(["../components/frames/*.svelte", "!**.stories.svelte"]),
  galleries: import.meta.glob(["../components/galleries/*.svelte", "!**.stories.svelte"]),
  headings: import.meta.glob(["../components/headings/*.svelte", "!**.stories.svelte"]),
  heros: import.meta.glob(["../components/heros/*.svelte", "!**.stories.svelte"]),
  icons: import.meta.glob(["../components/icons/*.svelte", "!**.stories.svelte"]),
  legal: import.meta.glob(["../components/legal/*.svelte", "!**.stories.svelte"]),
  lists: import.meta.glob(["../components/lists/*.svelte", "!**.stories.svelte"]),
  modals: import.meta.glob(["../components/modals/*.svelte", "!**.stories.svelte"]),
  nav: import.meta.glob(["../components/nav/*.svelte", "!**.stories.svelte"]),
  panels: import.meta.glob(["../components/panels/*.svelte", "!**.stories.svelte"]),
  patterns: import.meta.glob(["../components/patterns/*.svelte", "!**.stories.svelte"]),
  search: import.meta.glob(["../components/search/*.svelte", "!**.stories.svelte"]),
  seo: import.meta.glob(["../components/seo/*.svelte", "!**.stories.svelte"]),
  utilities: import.meta.glob(["../components/utilities/*.svelte", "!**.stories.svelte"])
};

export const getComponentModules = (
  componentDir: string,
  filterUncatalogued: boolean = false
): [string, () => Promise<unknown>][] => {
  const modules = Object.entries(component_modules[componentDir as keyof typeof component_modules]);

  return modules.filter(
    ([filePath, module]) =>
      ![...uncatalogued_internals, ...(filterUncatalogued ? uncataloged : [])].some((_uncatalogued) =>
        new RegExp(String.raw`${componentDir}\/${_uncatalogued}\.svelte$`).test(filePath)
      )
  );
};

export const findComponentModule = (
  componentDir: string,
  componentName: string
): [filePath: string, module: any] | [] =>
  getComponentModules(componentDir).find(([filePath, module]) =>
    filePath.includes(`${componentDir}/${componentName}`)
  ) ?? [];
