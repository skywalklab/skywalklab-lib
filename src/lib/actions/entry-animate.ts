import type { IntersectionAction, IntersectionActionParams } from "./intersection-observer.svelte";

export function hasEntryAnimation(context?: IntersectionActionParams) {
  return ["onLoad", "onEnter", "onLeave"].some(
    (action) => action in (context ?? {}) && (context ?? {})[action as keyof IntersectionActionParams]
  );
}

export function handleEntryAnimate(context: { container: HTMLElement; action: IntersectionAction }): null {
  context.container.classList[context.action === "onLeave" ? "add" : "remove"]("entry-animate");
  return null;
}

export const addEntryAnimateFallback = (intersectionActions: IntersectionAction[]) => {
  return Object.fromEntries(
    intersectionActions.map((action) => [
      action,
      (node: HTMLElement) => handleEntryAnimate({ container: node, action })
    ])
  );
};
