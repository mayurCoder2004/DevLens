/**
 * Centralized Framer Motion animation variants for the DevLens landing page.
 *
 * Design principles:
 * - Subtle, smooth, and premium — inspired by Vercel, Linear, Stripe, Sentry.
 * - Never over-animated. Motion should feel natural and purposeful.
 * - All viewport-triggered animations use `once: true` (animate only on entry).
 * - Durations are kept short (0.4–0.7s) with ease curves that feel spring-like.
 *
 * Accessibility:
 * - Exports `useMotionVariants()` hook that automatically returns instant
 *   (no-motion) variants when `prefers-reduced-motion: reduce` is active.
 *   Import this hook instead of individual variants when you need a11y support.
 */

import { useReducedMotion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  EASING CURVES                                                               */
/* -------------------------------------------------------------------------- */

/** Standard easing — feels natural for fades and slides. */
export const ease = [0.25, 0.1, 0.25, 1];

/** Slightly more expressive — good for scale and card reveals. */
export const easeOut = [0.0, 0.0, 0.2, 1];

/* -------------------------------------------------------------------------- */
/*  HOVER CONSTANTS — centralised so every card feels identical                */
/* -------------------------------------------------------------------------- */

/**
 * Standard card hover — subtle lift + stronger shadow + border brightening.
 * Applied via `whileHover` prop on motion elements.
 * Duration kept tight (0.2s) for immediate premium responsiveness.
 */
export const CARD_HOVER = {
  y: -4,
  boxShadow: "0 16px 40px -12px rgba(59, 130, 246, 0.14)",
  borderColor: "rgba(59, 130, 246, 0.35)",
  transition: { duration: 0.2, ease },
};

/**
 * Icon subtle scale on card hover. Pair with `group-hover` or whileHover.
 */
export const ICON_HOVER = {
  scale: 1.08,
  transition: { duration: 0.2, ease },
};

/* -------------------------------------------------------------------------- */
/*  BASE VARIANTS                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Fades up from a small y offset — the workhorse for most section reveals.
 * Use with whileInView + viewport={{ once: true }}.
 */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

/**
 * Simple opacity fade — for elements that should appear without movement.
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease },
  },
};

/**
 * Fades down from a small negative y offset — used for Navbar entry.
 */
export const fadeDown = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

/**
 * Scales in from 0.95 with opacity — for badges and hero elements.
 */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
};

/**
 * Stronger entrance for the Repository Preview — rises and scales into place.
 * Intended to be the most impactful entrance on the page.
 */
export const heroPreview = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: easeOut, delay: 0.3 },
  },
};

/**
 * Progress bar fill — animates width from 0 to target on reveal.
 * Apply as animate prop with custom width target.
 */
export const progressBar = {
  hidden: { width: "0%" },
  visible: (target) => ({
    width: target,
    transition: { duration: 0.8, ease: easeOut, delay: 0.15 },
  }),
};

/**
 * Ambient background glow — very slow opacity pulse, infinite reverse.
 * Opacity only. Duration 12s. Almost invisible. Adds life without distraction.
 */
export const glowPulse = {
  initial: { opacity: 0.7 },
  animate: {
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 12,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

/* -------------------------------------------------------------------------- */
/*  STAGGER CONTAINERS                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Container that staggers its children with a standard delay between each.
 * Use on the wrapping element and pair children with `staggerItem`.
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/**
 * Tighter stagger for hero sequence — items animate one after the other.
 */
export const heroStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/**
 * Refined stagger for preview card grids — tighter delay, sequenced reveal.
 */
export const previewStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.0,
    },
  },
};

/**
 * Workspace panel stagger — left panel first, content second, insight last.
 * Slightly longer delay for a deliberate, panel-by-panel feel.
 */
export const workspaceStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

/**
 * A single stagger child — fades up as part of a staggered sequence.
 * Pair with `staggerContainer` or `heroStagger`.
 */
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
};

/**
 * Workspace panel reveal — slides in from slight y with fade.
 * Slightly slower than staggerItem for more weight.
 */
export const workspacePanel = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

/* -------------------------------------------------------------------------- */
/*  VIEWPORT DEFAULTS                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Standard viewport config — fires once, starts when element enters viewport.
 * Use as: viewport={defaultViewport}
 */
export const defaultViewport = { once: true, margin: "0px 0px -80px 0px" };

/* -------------------------------------------------------------------------- */
/*  REDUCED MOTION — INSTANT VARIANTS                                           */
/* -------------------------------------------------------------------------- */

/**
 * Zero-duration versions of every variant.
 * Used automatically by useMotionVariants() when prefers-reduced-motion is on.
 */
const instant = { transition: { duration: 0 } };

const noMotionVariant = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, ...instant },
};

const noMotionContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

const noMotionProgress = {
  hidden: { width: "0%" },
  visible: (target) => ({ width: target, ...instant }),
};

const noMotionGlow = {
  initial: { opacity: 0.7 },
  animate: { opacity: 0.7 },
};

/**
 * React hook that returns all animation variants.
 * When the user has `prefers-reduced-motion: reduce` set in their OS,
 * every variant is replaced with an instant, opacity-only version —
 * effectively disabling motion while keeping the component structure intact.
 *
 * Usage:
 *   const { fadeUp, staggerContainer, staggerItem } = useMotionVariants();
 */
export function useMotionVariants() {
  const reduced = useReducedMotion();

  if (reduced) {
    return {
      fadeUp: noMotionVariant,
      fadeIn: noMotionVariant,
      fadeDown: noMotionVariant,
      scaleIn: noMotionVariant,
      heroPreview: noMotionVariant,
      staggerContainer: noMotionContainer,
      heroStagger: noMotionContainer,
      previewStagger: noMotionContainer,
      workspaceStagger: noMotionContainer,
      staggerItem: noMotionVariant,
      workspacePanel: noMotionVariant,
      progressBar: noMotionProgress,
      glowPulse: noMotionGlow,
      // Hover constants — return empty objects so whileHover is a no-op
      CARD_HOVER: {},
      ICON_HOVER: {},
    };
  }

  return {
    fadeUp,
    fadeIn,
    fadeDown,
    scaleIn,
    heroPreview,
    staggerContainer,
    heroStagger,
    previewStagger,
    workspaceStagger,
    staggerItem,
    workspacePanel,
    progressBar,
    glowPulse,
    CARD_HOVER,
    ICON_HOVER,
  };
}
