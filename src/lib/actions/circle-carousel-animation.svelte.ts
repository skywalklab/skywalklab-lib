/* eslint-disable svelte/prefer-svelte-reactivity */
import { prefersReducedMotion } from "svelte/motion";
import type { IntersectionAction } from "./intersection-observer.svelte.js";

/** Parameters for `handleCircleCarouselAnimations`, which orbits a list's children around its center. */
export interface CircleCarouselAnimationParams {
  /** Radians travelled per second. (0.25) */
  speed?: number;
  /** Multiplier on the smaller item dimension, giving the orbit radius. (1.25) */
  radiusAdjustment?: number;
  /** Revolutions per reorder: how often the last item is moved in front of the first, restacking the orbit. Omit to leave the order fixed. */
  moveToTop?: number;
  /** Lay the items out statically instead of orbiting them. */
  noAnimate?: boolean;
}

const carouselControls = new Map<HTMLElement, { start: () => void; pause: () => void }>();

export function handleCircleCarouselAnimations(
  container: HTMLElement,
  context: CircleCarouselAnimationParams,
  action: IntersectionAction
): (() => void) | void {
  const { speed = 0.25, radiusAdjustment = 1.25, moveToTop, noAnimate } = context;

  const circleSpeed = prefersReducedMotion.current ? 0.0125 : speed;
  const revolutionAdjustment: number = 0.92;
  let lastRevolution: number = 0;
  let angle: number = 0;
  let lastTime: number = 0;
  let rafId: number | null = null;
  let radius: number = 0;

  const icons = [...container.children] as HTMLElement[];

  if (action === "onLeave") {
    carouselControls.get(container)?.pause();
    return;
  }

  if (action === "onEnter") {
    carouselControls.get(container)?.start();
    return;
  }

  if (noAnimate === true) {
    icons.forEach((icon) => {
      icon.style.position = "static";
    });
    return;
  }

  const resizeObserver = new ResizeObserver(measure);

  function measure() {
    radius = Math.min(icons[0].clientWidth, icons[0].clientHeight) * radiusAdjustment;
  }

  function animate(time: number) {
    const delta: number = lastTime ? time - lastTime : 0;
    lastTime = time;

    angle += (circleSpeed * delta) / 1000;

    icons.forEach((icon, i) => {
      const theta: number = angle + i * ((2 * Math.PI) / icons.length);
      const x: number = radius * Math.cos(theta);
      const y: number = radius * Math.sin(theta);
      icon.style.transform = `translate(${x}px, ${y}px)`;
    });

    if (moveToTop) {
      const currentRev = Math.floor((angle / (2 * Math.PI)) * revolutionAdjustment * moveToTop);

      if (currentRev > lastRevolution) {
        const firstElement = container.firstElementChild as HTMLElement;
        const lastElement = container.lastElementChild as HTMLElement;
        lastElement.classList.remove("is-on-top");
        lastElement.previousElementSibling?.classList.add("is-on-top");
        container.insertBefore(lastElement, firstElement);

        lastRevolution = currentRev;
      }
    }

    rafId = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (rafId !== null) return;
    lastTime = 0;
    rafId = requestAnimationFrame(animate);
  }

  function pauseAnimation() {
    if (rafId === null) return;
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  function stopAnimation() {
    pauseAnimation();
    carouselControls.delete(container);
    resizeObserver.disconnect();
    container.removeEventListener("mouseenter", pauseAnimation);
    container.removeEventListener("mouseleave", startAnimation);
    window.removeEventListener("beforeunload", stopAnimation);
  }

  carouselControls.set(container, { start: startAnimation, pause: pauseAnimation });

  measure();
  resizeObserver.observe(icons[0]);

  container.addEventListener("mouseenter", pauseAnimation);
  container.addEventListener("mouseleave", startAnimation);
  window.addEventListener("beforeunload", stopAnimation);

  startAnimation();

  return () => stopAnimation();
}
