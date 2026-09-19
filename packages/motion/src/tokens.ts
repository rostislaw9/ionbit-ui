/**
 * Ionbit UI — Motion tokens
 *
 * The single source of truth for timing, easing, spring, and intensity.
 * Components and primitives reference these; they do not hardcode values.
 *
 * These mirror the CSS variables in @ionbit-ui/tokens so JS-driven
 * animations (Motion) and CSS-driven animations stay in sync.
 */

export const motionTokens = {
  duration: {
    fast: 140,
    normal: 220,
    slow: 420,
  },
  easing: {
    standard: [0.2, 0.8, 0.2, 1] as const,
    emphasized: [0.3, 0, 0, 1] as const,
    exit: [0.4, 0, 1, 1] as const,
  },
  spring: {
    magnetic: { stiffness: 200, damping: 15, mass: 0.3 },
    gentle: { stiffness: 120, damping: 20, mass: 0.4 },
  },
  intensity: {
    glow: 0.7,
    magnetic: 0.2,
    pulse: 0.65,
    ripple: 0.3,
    scramble: 0.6,
    spotlight: 0.4,
    tilt: 0.5,
    tiltReflection: 0.35,
  },
} as const;

export type MotionTokens = typeof motionTokens;
