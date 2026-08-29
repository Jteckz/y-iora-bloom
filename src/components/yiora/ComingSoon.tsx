import { usePrefersReducedMotion } from "@/hooks/use-reveal";
import { Reveal } from "./Reveal";

/** Premium empty-state shown when no events are published. */
export function ComingSoon() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="events"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-cocoa py-24 text-background sm:py-32"
    >
      {/* Bronze radial glow */}
      <div aria-hidden className="bronze-glow absolute inset-0 opacity-80" />

      {/* Subtle smoke layers — candle haze / incense diffusion aesthetic */}
      {!reduced && (
        <>
          <div aria-hidden className="smoke-layer smoke-layer-1" />
          <div aria-hidden className="smoke-layer smoke-layer-2" />
          <div aria-hidden className="smoke-layer smoke-layer-3" />
        </>
      )}

      {/* Soft gradient veil for depth */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background/15 via-transparent to-background/20"
      />

      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs tracking-[0.28em] uppercase text-honey">The calendar</p>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.03] font-bold text-balance">
            Something beautiful is being prepared.
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-5 text-base leading-relaxed text-background/70 sm:text-lg">
            The next gathering will be announced soon.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <p className="mt-4 text-sm leading-relaxed text-background/55 sm:text-base">
            Curated moments. Meaningful conversations. A seat waiting for you.
          </p>
        </Reveal>

        <Reveal delay={480}>
          <a
            href="#join"
            className="group mt-10 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-background px-7 py-3 font-medium text-cocoa shadow-lift transition-all duration-500 hover:bg-blush touch-target"
          >
            Join the Circle
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
