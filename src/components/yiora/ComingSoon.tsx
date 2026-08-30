import { usePrefersReducedMotion } from "@/hooks/use-reveal";
import { Reveal } from "./Reveal";

/** Premium empty-state shown when no events are published — id owned by Events module. */
export function ComingSoon() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden bg-cocoa py-16 text-background sm:py-20">
      {/* Bronze radial glow — muted, editorial */}
      <div aria-hidden className="bronze-glow absolute inset-0 opacity-60" />

      {/* Subtle smoke layers — keep but lighter */}
      {!reduced && (
        <>
          <div aria-hidden className="smoke-layer smoke-layer-1 opacity-60" />
          <div aria-hidden className="smoke-layer smoke-layer-2 opacity-50" />
        </>
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-cocoa/20 via-transparent to-cocoa/30"
      />

      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[0.68rem] tracking-[0.22em] uppercase font-semibold text-honey/90">
            The calendar
          </p>
        </Reveal>

        <Reveal delay={90}>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.8vw,3.3rem)] leading-[0.98] font-[650] tracking-[-0.03em] text-balance">
            Something beautiful{" "}
            <span className="italic font-normal text-blush">is being prepared.</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 text-[0.98rem] leading-relaxed text-background/70">
            The next gathering will be announced soon — we open a few seats at a time, on purpose.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-3 text-sm leading-relaxed text-background/45">
            Curated moments. Meaningful conversations. A seat waiting for you.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <a
            href="#join"
            className="pressable group mt-8 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-background px-7 py-3 text-[0.94rem] font-[600] tracking-[-0.01em] text-cocoa shadow-soft transition-[transform,background-color] duration-200 ease-out hover:bg-blush active:scale-[0.97] touch-target"
          >
            Join the Circle
            <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
              &rarr;
            </span>
          </a>
        </Reveal>
        <p className="mt-4 text-xs text-background/35">
          Be first to know — no spam, one letter a month.
        </p>
      </div>
    </section>
  );
}
