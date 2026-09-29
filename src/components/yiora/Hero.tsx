import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import mark from "@/assets/gallery-8.png";
import { PetalField } from "./PetalField";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";

const STATS: Array<[string, string]> = [
  ["Women connected", "600+"],
  ["Gatherings", "Monthly"],
  ["One table", "For women"],
];

/* Paper-grain texture: fractal-noise SVG, blended multiply at low opacity. */
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")`;

export function Hero() {
  const wrap = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  /* Living gradient: warmth follows the time of day and the pointer. */
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    // 0 at midnight → 1 at midday: shifts the gradient from berry-dusk to honey-noon.
    const hour = new Date().getHours();
    const daylight = 1 - Math.abs(hour - 13) / 13;
    el.style.setProperty("--daylight", daylight.toFixed(2));
    el.style.setProperty("--my", `${28 + daylight * 26}%`);

    if (reduced) return;
    let raf = 0;
    let tx = 50;
    let ty = 40;
    let cx = 50;
    let cy = 40;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--mx", `${cx.toFixed(2)}%`);
      el.style.setProperty("--my", `${cy.toFixed(2)}%`);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section
      ref={wrap}
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <style>{`
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-rise { animation: hero-rise 1.05s var(--ease-silk) both; }
      `}</style>

      {/* ═══════════════════════════════════════════
          LAYER 1 — BACKGROUND (z-0, back)
          living gradient + petals + warm blobs
          ═══════════════════════════════════════════ */}
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="living-gradient absolute inset-0" />
        <PetalField />
        <div className="bronze-glow absolute top-1/2 left-1/2 h-[70vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2" />
        <div className="blob absolute -top-24 -left-24 h-[46vmin] w-[46vmin] bg-petal/25 blur-3xl" />
        <div className="blob absolute -right-28 -bottom-28 h-[52vmin] w-[52vmin] bg-honey/20 blur-3xl" />
      </div>

      {/* ═══════════════════════════════════════════
          LAYER 2 — VEIL + GHOST TYPE (z-10)
          soft scrim behind text + oversized editorial backdrop
          ═══════════════════════════════════════════ */}
      <div aria-hidden className="absolute inset-0 z-10">
        {/* radial scrim: light pool behind the text, photo warmth stays at the edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_50%_at_50%_46%,color-mix(in_oklab,var(--background)_90%,transparent)_0%,transparent_74%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-transparent to-background/75" />
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <span
            className="font-editorial block text-center leading-none font-light text-cocoa italic select-none"
            style={{
              fontSize: "clamp(6rem, 24vw, 22rem)",
              opacity: 0.07,
              letterSpacing: "-0.04em",
              transform: "translateY(-6%)",
              whiteSpace: "nowrap",
            }}
          >
            gather
          </span>
        </div>
        {/* hairline frame */}
        <div className="absolute inset-x-4 top-20 bottom-28 hidden border border-cocoa/10 sm:block" />
      </div>

      {/* paper grain over the background — promises the torn-paper tactility of later sections */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[15] opacity-[0.07] mix-blend-multiply"
        style={{ backgroundImage: GRAIN }}
      />

      {/* ═══════════════════════════════════════════
          LAYER 3 — STATEMENT (z-20, front content)
          full-bleed centered typographic editorial
          ═══════════════════════════════════════════ */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="flex max-h-full w-full flex-col items-center overflow-y-auto px-4 pt-28 pb-40 text-center sm:px-6 sm:pt-32 lg:px-8">
          <img
            src={mark}
            alt=""
            width={56}
            height={56}
            decoding="async"
            className="hero-rise mb-6 h-14 w-14 rounded-full object-cover shadow-petal ring-1 ring-cocoa/15"
            style={{ animationDelay: "0ms" }}
          />

          <p
            className="hero-rise flex items-center justify-center gap-4 text-[0.68rem] font-normal tracking-[0.32em] text-rose uppercase"
            style={{ animationDelay: "100ms" }}
          >
            <span aria-hidden className="hidden h-px w-10 bg-rose/50 sm:block" />
            A gathering place for women
            <span aria-hidden className="hidden h-px w-10 bg-rose/50 sm:block" />
          </p>

          <h1
            id="hero-heading"
            className="hero-rise font-editorial mt-5 max-w-6xl font-light text-balance text-cocoa"
            style={{
              fontSize: "clamp(2.9rem, 8.5vw, 7.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              fontWeight: 300,
              animationDelay: "200ms",
            }}
          >
            Life is not
            <br />
            about existing.
            <span
              className="relative block italic text-gradient-warm"
              style={{ fontWeight: 400, paddingBottom: "0.12em" }}
            >
              It&apos;s about blooming.
              {/* hand-drawn underline — an editor&apos;s stroke, not a design-system rule */}
              <svg
                aria-hidden
                className="absolute -bottom-0.5 left-0 h-[0.32em] w-full"
                viewBox="0 0 320 24"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M4 16 C 70 6, 130 20, 190 10 S 290 8, 316 14"
                  stroke="var(--rose)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>
          </h1>

          <div
            aria-hidden
            className="hero-rise mt-6 flex items-center justify-center gap-3"
            style={{ animationDelay: "320ms" }}
          >
            <span className="h-px w-12 bg-cocoa/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-honey" />
            <span className="h-px w-12 bg-cocoa/20" />
          </div>

          <p
            className="hero-rise mt-6 max-w-xl text-sm leading-relaxed text-foreground/75 sm:text-base"
            style={{ animationDelay: "420ms" }}
          >
            Brunches, sunrise circles, and supper clubs — where strangers become friends.
          </p>

          <div
            className="hero-rise mt-9 flex w-full max-w-md flex-col items-center justify-center gap-4 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-6"
            style={{ animationDelay: "540ms" }}
          >
            <Link
              to="/events"
              className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-cocoa px-9 py-3.5 text-base font-medium text-background shadow-lift transition-all duration-500 hover:bg-berry"
            >
              See upcoming gatherings
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
            <Link
              to="/about"
              className="inline-flex min-h-[44px] items-center justify-center text-sm font-medium text-cocoa/70 underline decoration-cocoa/25 underline-offset-8 transition-colors duration-300 hover:text-cocoa hover:decoration-cocoa/60"
            >
              Our story
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          LAYER 4 — STATS BAR (z-30, front)
          full-bleed bottom bar, Inter 300/400
          ═══════════════════════════════════════════ */}
      <div
        className="hero-rise absolute inset-x-0 bottom-0 z-30 border-t border-cocoa/10 bg-background/55 backdrop-blur-xl"
        style={{ animationDelay: "650ms" }}
      >
        <dl
          className="mx-auto grid w-full max-w-6xl grid-cols-3 divide-x divide-cocoa/10"
          role="list"
        >
          {STATS.map(([k, v], i) => (
            <div
              key={k}
              className="flex flex-col items-center gap-1 px-2 py-4 text-center sm:py-5"
            >
              <dt className="order-1 text-[0.5rem] font-light tracking-[0.14em] text-foreground/55 uppercase sm:text-[0.68rem] sm:tracking-[0.22em]">
                {k}
              </dt>
              <dd
                className="order-2 text-lg font-light text-cocoa tabular-nums sm:text-2xl"
                style={{ fontWeight: i === 0 ? 400 : 300 }}
              >
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
