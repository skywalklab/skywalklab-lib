import type { IntersectionAction } from "./intersection-observer.svelte";

function delay(t: number, timeout?: NodeJS.Timeout, val?: number) {
  return new Promise((resolve) => {
    timeout = setTimeout(resolve, t, val);
    return timeout;
  });
}

function clearDotTimeout(timeout?: NodeJS.Timeout) {
  if (timeout) {
    clearTimeout(timeout);
  }
}

export const animatePaths = async (node: HTMLElement, selector: string, _delay: number) => {
  let timeout: NodeJS.Timeout | undefined;
  const targetPath = node.querySelector(selector);
  const targetPathD = targetPath?.getAttribute("d");
  targetPath?.removeAttribute("d");

  const pathItems = targetPathD?.replace(/(zM)/g, "z|M")?.split("|");
  for (const pathItem of pathItems ?? []) {
    await delay(_delay, timeout);
    const currentTargetPath = targetPath?.getAttribute("d") ?? "";
    targetPath?.setAttribute("d", currentTargetPath + pathItem);
  }

  return () => clearDotTimeout(timeout);
};

export const animateArrowPaths = (
  arrows: SVGPathElement[],
  arrowHeads: SVGMarkerElement[],
  loadCb?: () => void
): Record<IntersectionAction, () => void> => {
  return {
    onLoad: () => {
      arrows.forEach((arrow) => {
        arrow.style.stroke = "var(--accent, lightblue)";
        arrow.style.strokeDasharray = "1";
        arrow.style.strokeDashoffset = "1";
        arrow.setAttribute("pathLength", "1");
      });

      arrowHeads.forEach((arrowHead) => {
        arrowHead.style.fill = "var(--primary, black)";
        arrowHead.style.opacity = "0";
      });

      loadCb?.();
    },
    onEnter: () => {
      arrows.forEach((arrow) => {
        arrow.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
          duration: 2000,
          easing: "ease",
          fill: "forwards"
        });
      });

      arrowHeads.forEach((arrowHead) => {
        arrowHead?.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 250,
          delay: 1500,
          easing: "linear",
          fill: "forwards"
        });
      });
    },
    onLeave: () => {
      arrows.forEach((arrow) => {
        arrow.animate([{ strokeDashoffset: 0 }, { strokeDashoffset: 1 }], {
          duration: 2000,
          easing: "ease",
          fill: "forwards"
        });
      });

      arrowHeads.forEach((arrowHead) => {
        arrowHead?.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 250,
          delay: 0,
          easing: "linear",
          fill: "forwards"
        });
      });
    }
  };
};
