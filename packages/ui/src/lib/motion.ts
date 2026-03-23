import type { Transition } from "motion/react";

type SpringTransition = {
  type: "spring";
  stiffness: number;
  damping: number;
  mass: number;
};

/**
 * Shared spring configurations for consistent animations across the app.
 */
export const springs: Record<string, SpringTransition> = {
  /** Snappy, responsive spring for UI interactions */
  snappy: {
    type: "spring",
    stiffness: 500,
    damping: 30,
    mass: 1,
  },
  /** Bouncy spring with overshoot for playful interactions */
  bouncy: {
    type: "spring",
    stiffness: 600,
    damping: 20,
    mass: 1,
  },
  /** Smooth spring for layout animations */
  smooth: {
    type: "spring",
    stiffness: 350,
    damping: 35,
    mass: 1,
  },
  /** Quick spring for micro-interactions */
  quick: {
    type: "spring",
    stiffness: 700,
    damping: 35,
    mass: 0.8,
  },
};

/**
 * Common transition presets combining spring with other settings.
 */
export const transitions: Record<string, Transition> = {
  /** Default layout transition */
  layout: springs.snappy,
  /** Fade transition for overlays */
  fade: {
    duration: 0.15,
    ease: "easeOut",
  },
};
