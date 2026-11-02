import type { Action } from "svelte/action";
import { mount, unmount, type SvelteComponent } from "svelte";

export async function iconToDataUrl(
  IconComponent: typeof SvelteComponent,
  props: Record<string, any> = {}
): Promise<string> {
  const temp = document.createElement("div");

  const component = mount(IconComponent, {
    target: temp,
    props
  });

  await new Promise<void>((resolve) => {
    if (temp.querySelector("svg")) {
      resolve();
    } else {
      const observer = new MutationObserver((mutationList, observer) => {
        if (temp.querySelector("svg")) {
          observer.disconnect();
          resolve();
        }
      });

      observer.observe(temp, { childList: true, subtree: true });
    }
  });

  const encoded = encodeURIComponent(temp.querySelector("svg")?.outerHTML ?? "<svg></svg>")
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  unmount(component);
  temp.remove();
  return `data:image/svg+xml,${encoded}`;
}

export const applyIconToLogoList: Action<HTMLElement, { IconComponent: any; props?: Record<string, any> }> = (
  node,
  { IconComponent, props }
) => {
  $effect(() => {
    iconToDataUrl(IconComponent, {
      color: getComputedStyle(node).getPropertyValue("--logo-list-outline-marker-color").trim(),
      ...props
    }).then((icon) => {
      node.setAttribute("style", `--logo-list-marker-image: url('${icon}')`);
    });
  });
};
