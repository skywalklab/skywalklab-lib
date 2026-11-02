import gsap from "gsap";
import type { Action } from "svelte/action";
import { prefersReducedMotion } from "svelte/motion";

/** Parameters for `handleWordAnimation`, which folds one word out and the next in on a GSAP timeline. */
export interface WordAnimationParams {
  /** Seconds before the first word swaps; later swaps are fixed at 4. */
  firstDelay: number;
  /** How many words to cycle through before wrapping back to the first. */
  animationWordsLength: number;
  /** Skip the timeline, leaving the first word visible. */
  noAnimate?: boolean;
}

export const handleWordAnimation: Action<HTMLElement, WordAnimationParams> = (node, context): void => {
  $effect(() => {
    const { firstDelay, animationWordsLength, noAnimate } = context;
    if (noAnimate === true) return;
    const duration = prefersReducedMotion.current ? 4 : 1;
    const ctx: gsap.Context = gsap.context(() => {
      let currentIndex: number = 0;
      function runNextAnimation(delay: number) {
        const nextIndex = (currentIndex + 1) % animationWordsLength;

        const fadeOutPart = `#wordpart-${currentIndex}-1`;
        const foldOutPart = `#wordpart-${currentIndex}-2`;
        const revealPart = `#wordpart-${nextIndex}-1`;
        const nextPart = `#wordpart-${nextIndex}-2`;

        const timeline: gsap.core.Timeline = gsap.timeline({ repeat: 0 }).to(foldOutPart, {
          delay: delay,
          duration,
          rotateY: -90,
          transformOrigin: "left",
          ease: "linear",
          onStart: () => {
            gsap.to(fadeOutPart, {
              duration,
              opacity: 0,
              delay: 0.5,
              ease: "linear",
              onComplete: () => {
                gsap.set(fadeOutPart, { rotateY: 180 });
              }
            });
            gsap.to(foldOutPart, {
              duration,
              opacity: 0,
              delay: 0.5,
              ease: "linear",
              onComplete: () => {
                gsap.set(foldOutPart, { rotateY: 0 });
              }
            });
            gsap.to(revealPart, {
              duration: duration + duration / 2,
              rotateY: 0,
              opacity: 1,
              ease: "linear"
            });
            gsap.to(nextPart, {
              duration: duration + duration / 4,
              opacity: 1,
              delay: 0.75,
              ease: "linear"
            });
          },
          onComplete: () => {
            currentIndex = nextIndex;
            runNextAnimation(4);
          }
        });
      }

      runNextAnimation(firstDelay);
    });

    return () => ctx.kill(true);
  });
};
