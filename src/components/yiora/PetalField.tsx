import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";

const PETAL_COUNT = 10;

/** Drifting petals — decorative ambience, disabled under reduced motion. Fewer, slower, more imperfect. */
export function PetalField({ density = 1 }: { density?: number }) {
  const reduced = usePrefersReducedMotion();
  const petals = useMemo(
    () =>
      Array.from({ length: Math.round(PETAL_COUNT * density) }, (_, i) => ({
        id: i,
        left: (i * 97) % 100,
        delay: (i * 2.4) % 22,
        duration: 22 + ((i * 3.3) % 16),
        size: 6 + ((i * 5) % 10),
        sway: (i % 2 === 0 ? 1 : -1) * (18 + ((i * 13) % 44)),
        opacity: 0.14 + ((i * 7) % 22) / 100,
      })),
    [density],
  );

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal absolute top-0 block bg-petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.4,
              opacity: p.opacity,
              borderRadius: "60% 0 60% 0",
              filter: "blur(0.3px)",
              "--sway": `${p.sway}px`,
              animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
