import type { Links } from "./types.js";

export const scrollToTop: (
  dev: boolean,
  type: "form" | "leave" | "link" | "goto" | "popstate" | "btn",
  selector?: string
) => void = (dev, type, selector = ".layout-container") => {
  const isNav = !dev && !window.location.hash && ["link", "goto"].includes(type);
  const isBtn = type === "btn";
  if (isNav || isBtn) {
    document.querySelector(selector)?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
};

export const getLinksAttrs = (link: Links) =>
  Object.fromEntries(Object.entries(link).filter(([key]) => !["text", "key", "cb", "langFlag"].includes(key)));
