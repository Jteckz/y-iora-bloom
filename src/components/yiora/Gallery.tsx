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
          <div>
            <p className="kicker">Archive</p>
            <h2 className="mt-3 max-w-xl font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[0.97] font-[650] tracking-[-0.03em] text-cocoa text-balance">
              The memories we
              <span className="italic font-normal text-gradient-warm"> keep making</span>.
            </h2>
          </div>
          <p className="max-w-[28ch] text-[0.9rem] leading-[1.6] text-cocoa/60">
            Fragments from past gatherings. Every face here walked in as a stranger.
          </p>
        </Reveal>

        <div ref={wrap} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[1fr]">
          {TILES.map((t, i) => (
            <figure
              key={t.alt}
              data-depth={i * 0.01}
              className={`group relative overflow-hidden rounded-[1.4rem] border border-cocoa/8 bg-card shadow-soft hover-lift ${t.aspect} ${t.height}`}
            >
              <img
                src={t.src}
                alt={t.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 bg-gradient-to-t from-cocoa/55 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-[100%] bg-gradient-to-t from-cocoa/80 to-transparent p-4 sm:p-5 text-[0.84rem] leading-snug text-background transition-transform duration-300 ease-out group-hover:translate-y-0">
                {t.alt}
              </figcaption>
              <span className="sr-only">{`Gallery image ${i + 1}`}</span>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-center text-xs tracking-wide text-cocoa/35">Hover to read — tap on mobile. No filters, just film.</p>
      </div>
    </section>
  );
}
