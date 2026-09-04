import { useEffect, useRef, useState } from "react";
import mark from "@/assets/gallery-8.png";
import { PetalField } from "./PetalField";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";

function greetingForHour(h: number) {
  if (h < 11) return "Good morning, beautiful";
  if (h < 17) return "Good afternoon, beautiful";
  if (h < 21) return "Good evening, beautiful";
  return "Still glowing, beautiful";
}

const STATS: Array<[string, string]> = [
  ["Founded", "2026"],
  ["Gatherings", "Monthly"],
  ["Women connected", "600+"],
];

export function Hero() {
  const wrap = useRef<HTMLElement>(null);
  const [greeting, setGreeting] = useState("Welcome, beautiful");
  const reduced = usePrefersReducedMotion();

  /* Living gradient: hue + warmth follow the pointer and the time of day. */
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const hour = new Date().getHours();
    setGreeting(greetingForHour(hour));

    // 0 at midnight → 1 at midday: shifts the gradient from berry-dusk to honey-noon.
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
          contrast veil + oversized editorial backdrop
          ═══════════════════════════════════════════ */}
      <div aria-hidden className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/15 to-background" />
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
            blooming
          </span>
        </div>
        {/* hairline frame */}
        <div className="absolute inset-x-4 top-20 bottom-28 hidden border border-cocoa/10 sm:block" />
      </div>

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
            className="mb-6 h-14 w-14 rounded-full object-cover shadow-petal ring-1 ring-cocoa/15"
          />

          <p className="flex min-h-[40px] items-center justify-center gap-4 text-[0.68rem] font-normal tracking-[0.32em] text-rose uppercase">
            <span aria-hidden className="hidden h-px w-10 bg-rose/50 sm:block" />
            {greeting}
            <span aria-hidden className="hidden h-px w-10 bg-rose/50 sm:block" />
          </p>

          <h1
            id="hero-heading"
            className="font-editorial mt-5 max-w-6xl font-light text-balance text-cocoa"
            style={{
              fontSize: "clamp(2.9rem, 8.5vw, 7.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              fontWeight: 300,
            }}
          >
            Life is not
            <br />
            about existing.
            <span
              className="text-gradient-warm block italic"
              style={{ fontWeight: 400, paddingBottom: "0.08em" }}
            >
              It&apos;s about blooming.
            </span>
          </h1>

          <div aria-hidden className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-cocoa/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-honey" />
            <span className="h-px w-12 bg-cocoa/20" />
          </div>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            Y&apos;IORA curates lifestyle events for women who want more than a calendar invite
            — rooms full of warmth, friendships that outlive the night, and experiences made to
            be remembered.
          </p>

          <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
            <a
              href="#events"
              className="group inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-cocoa px-7 py-3 text-sm font-medium text-background shadow-lift transition-all duration-500 hover:bg-berry"
            >
              See what&apos;s coming
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#about"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-cocoa/25 px-7 py-3 text-sm font-medium text-cocoa transition-all duration-500 hover:border-cocoa/60 hover:bg-background/60"
            >
              Our story
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          LAYER 4 — STATS BAR (z-30, front)
          full-bleed bottom bar, Inter 300/400
          ═══════════════════════════════════════════ */}
      <div className="absolute inset-x-0 bottom-0 z-30 border-t border-cocoa/10 bg-background/55 backdrop-blur-xl">
        <dl
          className="mx-auto grid w-full max-w-6xl grid-cols-3 divide-x divide-cocoa/10"
          role="list"
        >
          {STATS.map(([k, v], i) => (
            <div
              key={k}
              className="flex flex-col items-center gap-1 px-2 py-4 text-center sm:py-5"
            >
              <dt className="order-1 text-[0.62rem] font-light tracking-[0.22em] text-foreground/55 uppercase sm:text-[0.68rem]">
                {k}
              </dt>
              <dd
                className="order-2 text-lg font-light text-cocoa tabular-nums sm:text-2xl"
                style={{ fontWeight: i === 2 ? 400 : 300 }}
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
