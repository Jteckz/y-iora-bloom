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
      className="living-gradient relative isolate min-h-[100svh] overflow-hidden"
    >
      <PetalField />

      {/* soft veil so text always clears contrast over the shifting gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background/28 via-background/8 to-background"
      />
      {/* subtle paper grain — tactile, not glassy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl grid-cols-12 items-start gap-6 px-4 pt-16 pb-10 sm:px-6 sm:pt-20 sm:pb-12 lg:items-center lg:pb-14 lg:px-8">
        <div className="col-span-12 lg:col-span-7">
          <p className="mb-5 inline-flex items-center gap-2.5 text-[0.68rem] tracking-[0.22em] uppercase text-cocoa/70">
            {greeting}
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-cocoa/15 bg-background/70 px-2.5 py-1 text-[0.62rem] tracking-[0.16em] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-honey flex-shrink-0" /> Tanzania
            </span>
          </p>

          <h1 className="font-display text-[clamp(2.6rem,9vw,5.6rem)] leading-[0.88] font-[650] tracking-[-0.05em] text-cocoa text-balance">
            Life is not
            <br />
            <span className="font-light tracking-[-0.05em]">about existing.</span>
            <span className="mt-1 block font-display text-gradient-warm italic font-normal tracking-[-0.03em]">
              It&apos;s about blooming.
            </span>
          </h1>

          <p className="mt-5 max-w-[46ch] text-[0.95rem] leading-[1.7] text-cocoa/70 sm:text-[1.02rem]">
            Y&apos;IORA curates lifestyle events for women who want more than a calendar invite —
            <em className="font-display italic text-cocoa">rooms full of warmth</em>, friendships
            that outlive the night, and experiences made to be remembered.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="#events"
              className="pressable group inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-cocoa px-7 py-3 text-[0.94rem] font-[550] tracking-[-0.01em] text-background shadow-soft transition-[transform,background-color,box-shadow] duration-200 ease-out hover:bg-berry hover:shadow-lift active:scale-[0.97] touch-target"
            >
              See what&apos;s coming
              <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
            <a
              href="#about"
              className="pressable inline-flex min-h-[48px] items-center justify-center rounded-full border border-cocoa/20 bg-background/50 px-6 py-3 text-[0.94rem] font-[550] text-cocoa backdrop-blur-sm transition-[transform,border-color,background-color] duration-200 ease-out hover:border-cocoa/35 hover:bg-background/80 active:scale-[0.97] touch-target"
            >
              Our story
            </a>
          </div>

          <dl
            className="mt-8 flex gap-0 divide-x divide-cocoa/10 border-y border-cocoa/10 py-4"
            role="list"
          >
            {[
              ["Founded", "2026"],
              ["Gatherings", "Monthly"],
              ["Women connected", "600+"],
            ].map(([k, v]) => (
              <div key={k} className="flex-1 px-4 first:pl-0 last:pr-0 sm:px-6">
                <dt className="text-[0.62rem] tracking-[0.18em] uppercase text-cocoa/50 font-medium">
                  {k}
                </dt>
                <dd className="mt-1 font-display text-[1.35rem] font-semibold tracking-[-0.02em] text-cocoa sm:text-[1.5rem]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[0.72rem] leading-relaxed text-cocoa/45">
            Small rooms, on purpose — every seat is curated.
          </p>
        </div>

        <div className="col-span-12 flex justify-center lg:col-span-5 lg:justify-end">
          <div className="relative w-full max-w-[380px] lg:-ml-8">
            <div
              className="bloom-mask overflow-hidden border border-cocoa/10 bg-background shadow-lift rotate-[-0.8deg]"
              style={{
                animation: reduced ? undefined : "float-soft 14s var(--ease-silk) infinite",
              }}
            >
              <img
                src={mark}
                alt="Y'IORA emblem: a serene crowned face"
                width={953}
                height={1261}
                fetchPriority="high"
                decoding="async"
                className="w-full max-w-[380px] object-cover aspect-[4/5]"
              />
            </div>
            <div
              aria-hidden
              className="absolute -z-10 -inset-4 bg-linen/60 -rotate-[1.2deg] hidden sm:block"
              style={{ borderRadius: "58% 42% 48% 52% / 44% 52% 48% 56%", filter: "blur(8px)" }}
            />
          </div>
        </div>
      </div>
      <div aria-hidden className="wavy-divider absolute bottom-0 inset-x-0" />
    </section>
  );
}
