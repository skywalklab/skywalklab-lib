import type { Action } from "svelte/action";

export const handleHeaderHeight: Action<HTMLElement, { className: string; cb?: (isTop: boolean) => void }> = (
  node,
  options
): void => {
  $effect(() => {
    const container = (document.querySelector(".layout-container") as HTMLElement | undefined) ?? document.body;
    const header = node;
    let prev: "top" | "scrolled";
    let ticking = false;

    const AT_TOP_BELOW = 30;
    const SCROLLED_ABOVE = 80;

    function toggleHeaderSize() {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = container?.scrollTop ?? 0;
        const isTop = !prev
          ? scrollTop <= AT_TOP_BELOW
          : prev === "top"
            ? scrollTop < SCROLLED_ABOVE
            : scrollTop <= AT_TOP_BELOW;

        if (!prev || (isTop && prev === "scrolled") || (!isTop && prev === "top")) {
          const height = isTop ? "var(--landing-header-height, 86px)" : "var(--header-height, 56px)";
          container?.style.setProperty("--dynamic-header-height", height);
          header?.classList[isTop ? "add" : "remove"](options.className);
          options.cb?.(isTop);
          prev = isTop ? "top" : "scrolled";
        }

        ticking = false;
      });
    }

    toggleHeaderSize();
    container?.addEventListener("scroll", toggleHeaderSize, { passive: true });
    (window as any).navigation?.addEventListener("navigate", toggleHeaderSize);

    return () => {
      container?.removeEventListener("scroll", toggleHeaderSize);
      (window as any).navigation?.removeEventListener("navigate", toggleHeaderSize);
    };
  });
};
