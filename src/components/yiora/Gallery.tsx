import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const TILES = [
  { src: g1, alt: "Women laughing over a rooftop brunch at golden hour", span: "sm:col-span-4 sm:row-span-2", depth: 0.06 },
  { src: g2, alt: "A sunrise wellness circle in a garden", span: "sm:col-span-5", depth: 0.03 },
  { src: g6, alt: "Portrait of a smiling woman against a blush wall", span: "sm:col-span-3 sm:row-span-2", depth: 0.09 },
  { src: g3, alt: "Hands raising glasses at a candlelit dinner", span: "sm:col-span-5", depth: 0.045 },
  { src: g4, alt: "A woman dancing at a beach gathering at sunset", span: "sm:col-span-4", depth: 0.07 },
  { src: g5, alt: "Overhead view of a creative workshop table", span: "sm:col-span-8", depth: 0.035 },
];

export function Gallery() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  /* Gentle parallax: each tile drifts at its own depth as the section passes. */
  useEffect(() => {
    if (reduced) return;
    const el = wrap.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const progress = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        el.querySelectorAll<HTMLElement>("[data-depth]").forEach((tile) => {
          const d = Number(tile.dataset['depth'] ?? 0);
          tile.style.transform = `translate3d(0, ${(progress - 0.5) * -160 * d * 10}px, 0)`;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section id="gallery" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.03] font-bold text-cocoa">
            The memories we
            <span className="italic text-gradient-warm"> keep making</span>.
          </h2>
          <p className="max-w-xs text-sm text-foreground/70">
            Fragments from past gatherings. Every face here walked in as a stranger.
          </p>
        </Reveal>

        <div
          ref={wrap}
          className="mt-14 grid grid-cols-1 gap-4 sm:auto-rows-[190px] sm:grid-cols-12"
        >
          {TILES.map((t, i) => (
            <figure
              key={t.alt}
              data-depth={t.depth}
              className={`group relative overflow-hidden rounded-[1.75rem] shadow-soft transition-transform duration-300 ${t.span}`}
            >
              <img
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className="h-full max-h-[420px] w-full object-cover transition-transform duration-[1.4s] [transition-timing-function:var(--ease-silk)] group-hover:scale-[1.07] sm:max-h-none"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-cocoa/85 to-transparent p-5 text-sm text-background transition-transform duration-500 group-hover:translate-y-0">
                {t.alt}
              </figcaption>
              <span className="sr-only">{`Gallery image ${i + 1}`}</span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
