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
        className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/10 to-background"
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl grid-cols-12 items-end gap-6 px-5 pt-32 pb-16 sm:px-8 lg:items-center lg:pb-24">
        <div className="col-span-12 lg:col-span-7">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose/30 bg-background/60 px-4 py-1.5 text-xs tracking-[0.22em] uppercase text-rose backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-honey" />
            {greeting}
          </p>

          <h1 className="font-display text-[clamp(2.9rem,9vw,6.5rem)] leading-[0.94] font-bold tracking-[-0.02em] text-cocoa">
            Life is not <br />
            about existing.
            <span className="block text-gradient-warm italic">It&apos;s about blooming.</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-relaxed text-foreground/80 sm:text-lg">
            Y&apos;IORA curates lifestyle events for women who want more than a calendar
            invite — rooms full of warmth, friendships that outlive the night, and
            experiences made to be remembered.
          </p>
    
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#events"
              className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-cocoa px-7 py-3.5 font-medium text-background shadow-lift transition-all duration-500 hover:bg-berry"
            >
              See what&apos;s coming
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#about"
              className="inline-flex min-h-11 items-center rounded-full border border-cocoa/25 px-7 py-3.5 font-medium text-cocoa transition-all duration-500 hover:border-cocoa/60 hover:bg-background/60"
            >
              Our story
            </a>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {[
              ["Founded", "2026"],
              ["Gatherings", "Monthly"],
              ["Women connected", "600+"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[0.7rem] tracking-[0.2em] uppercase text-foreground/55">{k}</dt>
                <dd className="font-display text-2xl font-bold text-cocoa">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="col-span-12 flex justify-center lg:col-span-5 lg:justify-end">
          <div className="relative">
            <div
              aria-hidden
              className="blob absolute -inset-10 bg-background/45 backdrop-blur-md"
              style={{ animation: "float-soft 12s ease-in-out infinite" }}
            />
            <img
              src={mark}
              alt="Y'IORA emblem: a serene crowned face"
              width={953}
              height={1261}
              className="animate-float-soft relative w-[min(58vw,340px)] drop-shadow-[0_30px_50px_rgba(58,44,44,0.25)]"
            />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[0.65rem] tracking-[0.3em] uppercase text-foreground/50">scroll</span>
        <span className="h-12 w-px bg-gradient-to-b from-rose to-transparent" />
      </div>
    </section>
  );
}
