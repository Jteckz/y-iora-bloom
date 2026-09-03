import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";
import { useIsMobile } from "@/hooks/use-mobile";

const STORAGE_KEY = "yiora-gallery";

export function Gallery() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [images, setImages] = useState<string[]>([]);

  /* Load images from localStorage on mount */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setImages(parsed);
        }
      }
    } catch {
      /* ignore malformed data */
    }
  }, []);

  /* Gentle parallax: each tile drifts at its own depth as the section passes. */
  useEffect(() => {
    if (reduced || isMobile) return;
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
  }, [reduced, isMobile, images]);

  const hasImages = images.length > 0;

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

        {hasImages ? (
          <div ref={wrap} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((src, i) => (
              <figure
                key={`${src.slice(-20)}-${i}`}
                data-depth={i * 0.015}
                className="group relative overflow-hidden rounded-[1.5rem] shadow-soft aspect-[4/3] h-[180px] sm:h-[220px]"
              >
                <img
                  src={src}
                  alt={`Gallery photo ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] [transition-timing-function:var(--ease-silk)] group-hover:scale-[1.05]"
                />
                <span className="sr-only">{`Gallery image ${i + 1}`}</span>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-[2rem] border border-cocoa/10 bg-blush/40 px-6 py-16 text-center sm:mt-14 sm:py-20">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-petal/20">
              <svg
                className="h-7 w-7 text-rose/70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z"
                />
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold text-cocoa sm:text-2xl">
              Our gallery is being curated
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground/55 sm:text-base">
              New memories will be displayed here soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
