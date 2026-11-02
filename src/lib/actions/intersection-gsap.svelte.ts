import type { Action } from "svelte/action";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "svelte/motion";

// eslint-disable-next-line svelte/prefer-svelte-reactivity
const animationsRegistry = new Map<HTMLElement, () => void>();
gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerParams {
  onLoad?: (node: HTMLElement) => void;
  onEnter?: (node: HTMLElement) => (() => void) | void | null;
  onLeave?: (node: HTMLElement) => void;
  onEnterBack?: (node: HTMLElement) => void;
  onLeaveBack?: (node: HTMLElement) => void;
  threshold?: number;
  noAnimate?: boolean;
  callOnce?: boolean;
  scrollContainer?: string;
}

export const onScrollEnter: Action<HTMLElement, ScrollTriggerParams> = (node, params) => {
  const {
    onLoad,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    threshold = 0.25,
    noAnimate = false,
    callOnce = true,
    scrollContainer = ".layout-container"
  } = params!;

  onLoad?.(node);

  if (prefersReducedMotion.current || window.innerWidth < 480 || noAnimate) {
    onEnter?.(node);
    return;
  }

  let hasFired = false;

  const fireOnEnter = () => {
    if (callOnce && hasFired) return;
    hasFired = true;

    const stopAnimation = onEnter?.(node);
    if (stopAnimation != null) {
      animationsRegistry.set(node, stopAnimation);
    }
  };

  const scroller = document.querySelector(scrollContainer) ?? undefined;

  const trigger = ScrollTrigger.create({
    trigger: node,
    scroller,
    start: `top ${100 - threshold * 100}%`,
    onEnter: () => {
      fireOnEnter();
    },
    onLeave: () => onLeave?.(node),
    onEnterBack: () => onEnterBack?.(node),
    onLeaveBack: () => onLeaveBack?.(node),
    onRefresh: (self) => {
      if (self.isActive) {
        fireOnEnter();
      } else {
        onLeave?.(node);
      }
    }
  });

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return {
    destroy() {
      animationsRegistry.get(node)?.();
      animationsRegistry.delete(node);
      trigger.kill();
    }
  };
};
