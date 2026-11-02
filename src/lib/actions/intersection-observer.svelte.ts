/* eslint-disable svelte/prefer-svelte-reactivity */
import type { Action } from "svelte/action";
import { prefersReducedMotion } from "svelte/motion";

export type IntersectionAction = "onLoad" | "onEnter" | "onLeave";

interface ResolvedIntersectionActionParams {
  key: string;
  scrollContainer: string;
  thresholdRange: number[];
  threshold: number;
  rootMargin: string;
  noAnimate: boolean;
  callOnce: boolean;
  onLoad?: (node: HTMLElement) => void;
  onEnter?: (node: HTMLElement) => void;
  onLeave?: (node: HTMLElement) => void;
}

export type IntersectionActionParams = Partial<ResolvedIntersectionActionParams>;

type IntersectionEventParams = ResolvedIntersectionActionParams & { node: HTMLElement; root: HTMLElement | null };
type IntersectionEvent = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

const animationsRegistry = new Map<HTMLElement, Partial<Record<IntersectionAction, () => void>>>();

function handleCallback(
  cb: ((node: HTMLElement) => Promise<void> | void) | undefined,
  node: HTMLElement,
  event: IntersectionAction
) {
  requestAnimationFrame(async () => {
    const stopAnimation = await cb?.(node);
    if (stopAnimation) {
      const eventAnimations = animationsRegistry.get(node) ?? {};
      eventAnimations[event] ??= stopAnimation;
      animationsRegistry.set(node, eventAnimations);
    }
  });
}

const cleanUpObserver = ({ observer, node }: { observer?: IntersectionObserver; node: HTMLElement }) => {
  observer?.unobserve(node);
  observer?.disconnect();
};

const handleIntersection = (params: IntersectionEventParams): IntersectionEvent => {
  let wasIntersecting: boolean = false;
  let pageLoaded: boolean = false;
  let isVisibleOnPageLoad: boolean = false;
  let isAboveOnPageLoad: boolean = false;

  return (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
    const isIntersecting = entry.isIntersecting && entry.intersectionRatio >= params.threshold - 0.001;
    const isEntering = isIntersecting && !wasIntersecting;
    const isLeaving = !isIntersecting && wasIntersecting;

    if (!pageLoaded) {
      // const rootRect = params.root?.getBoundingClientRect() ?? new DOMRect(0, 0, window.innerWidth, window.innerHeight);
      isVisibleOnPageLoad = isIntersecting;
      isAboveOnPageLoad = entry.boundingClientRect.bottom < 0;
    }

    if (isEntering || (!pageLoaded && (isVisibleOnPageLoad || (isAboveOnPageLoad && !params.onLeave)))) {
      handleCallback(params.onEnter, params.node, "onEnter");
      wasIntersecting = isIntersecting;

      if (params.callOnce) {
        cleanUpObserver({ observer, node: params.node });
      }
    }

    if (isLeaving || (!pageLoaded && isAboveOnPageLoad)) {
      handleCallback(params.onLeave, params.node, "onLeave");
      wasIntersecting = false;
    }

    pageLoaded = true;
  };
};

function getObserver(
  callback: IntersectionEvent,
  observerOptions: IntersectionObserverInit,
  noAnimate: boolean
): IntersectionObserver | undefined {
  const notObserve = noAnimate === true || prefersReducedMotion.current;
  const notClient = typeof window === "undefined" && typeof document === "undefined";

  if (notObserve || notClient) return;

  return new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    for (const entry of entries) {
      callback(entry, observer);
    }
  }, observerOptions);
}

const defaultContext: ResolvedIntersectionActionParams = {
  key: "",
  scrollContainer: ".layout-container",
  thresholdRange: [],
  threshold: 0.25,
  rootMargin: "0px",
  onLoad: undefined,
  onEnter: undefined,
  onLeave: undefined,
  noAnimate: false,
  callOnce: false
};

export const handleIntersectionEvent: Action<HTMLElement, IntersectionActionParams> = (node, context): void => {
  const params = { ...defaultContext, ...context };
  const root = document.querySelector(params.scrollContainer) as HTMLElement | null;

  const observer: IntersectionObserver | undefined = getObserver(
    handleIntersection(Object.assign(params, { node, root })),
    {
      root,
      rootMargin: params.rootMargin,
      threshold: params.thresholdRange.length > 0 ? params.thresholdRange : [params.threshold]
    },
    params.noAnimate
  );

  if (params.onLoad) {
    handleCallback(params.onLoad, node, "onLoad");
  }

  $effect(() => {
    if (observer) {
      observer.observe(node);
    } else {
      handleCallback(params.onEnter ?? params.onLeave, node, params.onEnter ? "onEnter" : "onLeave");
    }

    return () => {
      Object.values(animationsRegistry.get(node) ?? {}).forEach((val) => val());
      animationsRegistry.delete(node);

      cleanUpObserver({ observer, node });
    };
  });
};
