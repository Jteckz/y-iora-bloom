import { useEffect, useState } from "react";

const MOBILE_BP = 768;

function getIsMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < MOBILE_BP;
}

/**
 * Viewport + Motion seam — single source of truth for breakpoint & reduced-motion.
 * Replaces: inline window.innerWidth<768 checks in Offerings/Events,
 *           ArchiveMosaic useMedia, and standalone usePrefersReducedMotion.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BP - 1}px)`);
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BP);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

export function useMedia(queries: string[], values: number[], defaultValue: number) {
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    const idx = queries.findIndex((q) => window.matchMedia(q).matches);
    return values[idx] ?? defaultValue;
  };

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get());
    const mqls = queries.map((q) => window.matchMedia(q));
    mqls.forEach((mql) => mql.addEventListener("change", handler));
    return () => mqls.forEach((mql) => mql.removeEventListener("change", handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries.join(",")]);

  return value;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
