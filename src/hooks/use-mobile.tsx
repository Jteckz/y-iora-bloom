// Re-export canonical viewport seam — keeps shadcn import path stable.
// Actual implementation lives in use-viewport.ts (single source of truth).
export { useIsMobile } from "./use-viewport";
export { useMedia, usePrefersReducedMotion } from "./use-viewport";
