import { prefersReducedMotion } from "svelte/motion";

/** Parameters for `animateStaircase`, which fires a callback on an interval to advance the steps. */
export interface StaircaseAnimationParams {
  /** Milliseconds between steps. Forced to 6000 under `prefers-reduced-motion`. */
  transitionTiming: number;
  /** Skip the interval entirely, leaving the steps where they are. */
  noAnimate?: boolean;
  /** Runs once per interval; advance the step here. */
  callback: () => void;
}

export const animateStaircase = (context: StaircaseAnimationParams): NodeJS.Timeout | undefined => {
  const { transitionTiming, noAnimate, callback } = context;
  if (noAnimate === true) return;

  const timing = prefersReducedMotion.current ? 6000 : transitionTiming;
  const intervalId = setInterval(callback, timing);

  return intervalId;
};
