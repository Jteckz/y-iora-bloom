import { useCallback, useState } from "react";

export interface GlassRect {
  x: number;
  width: number;
}

/**
 * Glass pill adapter — hides DOM measurement (getBoundingClientRect + computed padding)
 * behind a small interface. Testable by mocking refs.
 */
export function useGlassPill(
  navRef: React.RefObject<HTMLDivElement | null>,
  linkRefs: React.RefObject<Map<string, HTMLAnchorElement>>,
) {
  const [glass, setGlass] = useState<GlassRect | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const measureLink = useCallback(
    (id: string) => {
      const el = linkRefs.current.get(id);
      const navEl = navRef.current;
      if (!el || !navEl) return null;
      const navRect = navEl.getBoundingClientRect();
      const navStyle = getComputedStyle(navEl);
      const pl = parseFloat(navStyle.paddingLeft);
      const elRect = el.getBoundingClientRect();
      return {
        x: elRect.left - (navRect.left + pl),
        width: elRect.width,
      };
    },
    [navRef, linkRefs],
  );

  const activate = useCallback(
    (id: string) => {
      setActive(id);
      setGlass(measureLink(id));
    },
    [measureLink],
  );

  const deactivate = useCallback(() => {
    setActive(null);
    setGlass(null);
  }, []);

  return { active, glass, activate, deactivate };
}
