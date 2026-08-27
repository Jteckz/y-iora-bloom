import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";
import { useIsMobile } from "@/hooks/use-mobile";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const TILES = [
  {
    src: g1,
    alt: "Women laughing over a rooftop brunch at golden hour",
    aspect: "aspect-[4/5]",
    height: "h-[200px] sm:h-[280px]",
  },
  {
    src: g2,
    alt: "A sunrise wellness circle in a garden",
    aspect: "aspect-[4/3]",
    height: "h-[180px] sm:h-[220px]",
  },
  {
    src: g6,
    alt: "Portrait of a smiling woman against a blush wall",
    aspect: "aspect-[3/4]",
    height: "h-[220px] sm:h-[320px]",
  },
  {
    src: g3,
    alt: "Hands raising glasses at a candlelit dinner",
    aspect: "aspect-[16/9]",
    height: "h-[160px] sm:h-[200px]",
  },
  {
    src: g4,
    alt: "A woman dancing at a beach gathering at sunset",
    aspect: "aspect-[4/3]",
    height: "h-[180px] sm:h-[220px]",
  },
  {
    src: g5,
    alt: "Overhead view of a creative workshop table",
    aspect: "aspect-[3/2]",
    height: "h-[160px] sm:h-[200px]",
  },
];

export function Gallery() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  /* Gentle parallax: each tile drifts at its own depth as the section passes. */
  useEffect(() => {
    if (reduced || isMobile) return; // Disable parallax on mobile for performance
    const el = wrap.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const progress = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        el.querySelectorAll<HTMLElement>("[data-depth]").forEach((tile) => {
          const d = Number(tile.dataset["depth"] ?? 0);
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
  }, [reduced, isMobile]);

  return (
    <section id="gallery" className="scroll-mt-20 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <h2 className="max-w-xl font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.03] font-bold text-cocoa text-balance">
            The memories we
            <span className="italic text-gradient-warm"> keep making</span>.
          </h2>
          <p className="max-w-xs text-sm text-foreground/70 sm:text-base">
            Fragments from past gatherings. Every face here walked in as a stranger.
          </p>
        </Reveal>

        <div ref={wrap} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TILES.map((t, i) => (
            <figure
              key={t.alt}
              data-depth={i * 0.015}
              className={`group relative overflow-hidden rounded-[1.5rem] shadow-soft ${t.aspect} ${t.height}`}
            >
              <img
                src={t.src}
                alt={t.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1.4s] [transition-timing-function:var(--ease-silk)] group-hover:scale-[1.05]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-cocoa/85 to-transparent p-4 sm:p-5 text-sm text-background transition-transform duration-500 group-hover:translate-y-0">
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
