import { useEffect, useRef, useState } from "react";

/** Reveals an element once it scrolls into view. Respects reduced motion. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, shown };
}

// Reduced-motion now lives in the unified viewport seam — re-export for backwards compat.
export { usePrefersReducedMotion } from "./use-viewport";
