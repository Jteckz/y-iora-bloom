import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";

const PETAL_COUNT = 16;

/** Drifting petals — decorative ambience, disabled under reduced motion. */
export function PetalField({ density = 1 }: { density?: number }) {
  const reduced = usePrefersReducedMotion();
  const petals = useMemo(
    () =>
      Array.from({ length: Math.round(PETAL_COUNT * density) }, (_, i) => ({
        id: i,
        left: (i * 97) % 100,
        delay: (i * 1.7) % 18,
        duration: 16 + ((i * 3.3) % 14),
        size: 8 + ((i * 5) % 16),
        sway: (i % 2 === 0 ? 1 : -1) * (30 + ((i * 13) % 90)),
        opacity: 0.25 + ((i * 7) % 40) / 100,
      })),
    [density],
  );

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 block bg-petal"
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
