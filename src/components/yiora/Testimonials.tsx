import { useState, useCallback, useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/* =====================================================================
   JAVASCRIPT — Block 0: Fragment data model
   ---------------------------------------------------------------------
   • Brand-voice table notes only — NOT fake testimonials, no fake names.
   • Each entry maps 1:1 to the future real-testimonial card format
     (quote + footer line), so real voices replace fragments one by one
     with zero layout change.
   • `tone` selects a paper tint derived ONLY from existing brand tokens
     (see CSS Block 4). No new hues.
   ===================================================================== */
type FragmentTone = "paper" | "blush" | "honey" | "petal";

const FRAGMENTS: { text: string; tag: string; tone: FragmentTone; depth: number }[] = [
  {
    text: "I came for brunch, stayed for the circle afterwards.",
    tag: "table note · nº 1",
    tone: "paper",
    depth: 0.6,
  },
  {
    text: "Nobody eats alone here. That's the whole rule.",
    tag: "table note · nº 2",
    tone: "blush",
    depth: 1,
  },
  {
    text: "Fun, affordable, meaningful — finally, all three.",
    tag: "table note · nº 3",
    tone: "honey",
    depth: 0.4,
  },
  {
    text: "I walked in a stranger, left inside a group chat.",
    tag: "table note · nº 4",
    tone: "paper",
    depth: 0.9,
  },
  { text: "Sunrise, stretch, laugh, repeat.", tag: "table note · nº 5", tone: "petal", depth: 0.5 },
  {
    text: "Women lifting women isn't a slogan. It's a seating plan.",
    tag: "table note · nº 6",
    tone: "blush",
    depth: 0.75,
  },
];

export function Testimonials() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const scatterRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  /* ===============================================================
     JAVASCRIPT — Block 1: Preserved voice-modal state logic
     (untouched behaviour from the original submission card)
     =============================================================== */
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
    }, 2400);
  }, []);

  /* ===============================================================
     JAVASCRIPT — Block 2: Fragment stagger reveal
     • One IntersectionObserver on the scatter container.
     • Adds `.is-in` to each `.fragment`; per-fragment delay comes
       from inline `--fd` (i * 90ms) consumed in CSS Block 8.
     • Respects prefers-reduced-motion: reveals instantly.
     =============================================================== */
  useEffect(() => {
    const root = scatterRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".fragment"));
    if (reduced) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  /* ===============================================================
     JAVASCRIPT — Block 3: Hover / pointer physics (table drift)
     • Desktop fine-pointer only; disabled for touch + reduced motion.
     • On mousemove over the section, each fragment drifts by
       `depth * 14px` max — shallow fragments barely move, deep ones
       float more, like paper shifting on a table.
     • Written via rAF + CSS var `--px/--py` so hover lift (CSS
       Block 6) composes without fighting the transform.
     =============================================================== */
  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const section = sectionRef.current;
    const scatter = scatterRef.current;
    if (!section || !scatter) return;
    const frags = Array.from(scatter.querySelectorAll<HTMLElement>(".fragment"));
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = section.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
        const ny = (e.clientY - r.top) / r.height - 0.5;
        frags.forEach((el) => {
          const d = Number(el.dataset["depth"] ?? 0.6);
          el.style.setProperty("--px", `${(nx * 14 * d).toFixed(2)}px`);
          el.style.setProperty("--py", `${(ny * 12 * d).toFixed(2)}px`);
        });
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        frags.forEach((el) => {
          el.style.setProperty("--px", "0px");
          el.style.setProperty("--py", "0px");
        });
      });
    };
    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    // ── HTML — Block 1: SECTION CONTAINER (dual-layer stack) ─────────────
    // Preserved id="voices" + linen wash. position:relative so the
    // fragments layer (z 10–30) floats above the ghost card (z 0).
    <section
      id="voices"
      ref={sectionRef}
      aria-labelledby="voices-heading"
      className="fragments-section relative scroll-mt-20 overflow-hidden bg-linen py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="blob absolute -right-32 top-10 h-[380px] w-[380px] bg-petal/50 blur-3xl"
      />
      <div
        aria-hidden
        className="blob absolute -left-24 bottom-10 h-[280px] w-[280px] bg-rose/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── HTML — Block 2: SECTION HEADER ─────────────────────────── */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.28em] uppercase text-berry">Fragments</p>
          <h2
            id="voices-heading"
            className="mt-4 font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.03] font-bold text-cocoa text-balance"
          >
            Small notes from the table.
          </h2>
          <p className="mt-4 font-display text-base sm:text-lg leading-relaxed text-foreground/60 italic">
            Torn corners, honey-tape, honest ink — until your words pin themselves here.
          </p>
        </Reveal>

        {/* ── HTML — Block 3: LAYER A — FRAGMENTS SCATTER (decorative) ──
            • <ul> of 6 paper notes, deliberately NOT a grid.
            • Position/rotation/z set per nth-child in CSS Blocks 1–3.
            • Hovered fragment rises to z-50 (CSS Block 6). */}
        <ul
          ref={scatterRef}
          aria-label="Brand-voice notes from the Y'IORA table"
          className="fragments-scatter"
        >
          {FRAGMENTS.map((f, i) => (
            <li
              key={f.tag}
              data-depth={f.depth}
              // --fr: rotation variance · --fd: stagger delay · --fz: stack order
              style={{ "--fd": `${i * 90}ms` } as React.CSSProperties}
              className={`fragment fragment--${i + 1} fragment-tone-${f.tone}`}
            >
              <figure className="fragment-paper">
                <span aria-hidden className="fragment-tape" />
                <blockquote className="fragment-quote">“{f.text}”</blockquote>
                <figcaption className="fragment-tag">{f.tag}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {/* ── HTML — Block 4: LAYER B — GHOST CARD (preserved) ──────────
            • The ORIGINAL "Add Your Voice / Tap to share" submission
              card, kept fully functional beneath the fragments.
            • Rendered via `.voice-ghost` (CSS Block 7): low opacity,
              desaturated, slightly shrunk — present but not demanding.
            • Hover / focus-within restores full presence. */}
        <Reveal delay={120} className="voice-ghost-wrap">
          <p className="voice-ghost-eyebrow">Your story pins itself here</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group voice-card voice-ghost glass-card relative mx-auto w-full max-w-md cursor-pointer rounded-[1.5rem] p-8 sm:p-10 text-center transition-all duration-500 ease-[var(--ease-silk)] hover:-translate-y-2 hover:shadow-[var(--shadow-lift)] focus-visible:outline-3 focus-visible:outline-rose focus-visible:outline-offset-4"
          >
            {/* Decorative glow ring */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-[1.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, oklch(0.756 0.043 17 / 0.18), transparent 70%)",
              }}
            />

            {/* Plus icon */}
            <div className="relative mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-rose/10 transition-all duration-500 group-hover:bg-rose/20 group-hover:scale-105">
              <svg
                aria-hidden
                className="h-7 w-7 text-rose transition-transform duration-500 group-hover:rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>

            {/* Heading */}
            <h3 className="relative font-display text-2xl sm:text-3xl font-semibold text-cocoa">
              Add Your Voice
            </h3>

            {/* Supporting text */}
            <p className="relative mt-4 font-display text-base sm:text-lg leading-relaxed text-foreground/65 italic">
              Every gathering leaves a story. Share what stayed with you after the room grew quiet.
            </p>

            {/* Subtle CTA hint */}
            <span className="relative mt-6 inline-block text-xs tracking-[0.22em] uppercase text-berry/70 transition-colors duration-300 group-hover:text-berry">
              Tap to share
            </span>
          </button>
        </Reveal>
      </div>

      {/* ── HTML — Block 5: VOICE SUBMISSION MODAL (preserved) ────────── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="voice-modal max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-[1.5rem] border-petal/40 bg-background/95 backdrop-blur-xl shadow-[var(--shadow-petal)] p-0 overflow-hidden data-[state=open]:duration-400 data-[state=closed]:duration-300">
          <div className="px-7 pt-8 pb-2 sm:px-9 sm:pt-10">
            {/* Decorative top accent */}
            <div
              aria-hidden
              className="mx-auto mb-6 h-1 w-12 rounded-full bg-gradient-to-r from-petal via-rose to-petal"
            />

            <DialogHeader className="text-center">
              <DialogTitle className="font-display text-2xl sm:text-3xl font-semibold text-cocoa tracking-tight">
                Share Your Voice
              </DialogTitle>
              <DialogDescription className="mt-3 font-display text-sm sm:text-base leading-relaxed text-foreground/60 italic max-w-sm mx-auto">
                Your words become part of something larger. Tell us what resonated, what shifted, or
                what you carry with you.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleSubmit} className="px-7 pb-8 pt-4 sm:px-9 sm:pb-10">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-olive/10">
                  <svg
                    aria-hidden
                    className="h-7 w-7 text-olive"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="font-display text-lg font-medium text-cocoa text-center">
                  Thank you for sharing
                </p>
                <p className="text-sm text-foreground/55 text-center">
                  Community sharing is coming soon.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="voice-name"
                      className="block text-sm font-medium text-cocoa mb-1.5"
                    >
                      Your name
                    </label>
                    <input
                      id="voice-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      autoComplete="name"
                      className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-cocoa placeholder:text-foreground/30 focus:border-rose focus:ring-2 focus:ring-rose/20 focus:outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="voice-story"
                      className="block text-sm font-medium text-cocoa mb-1.5"
                    >
                      Your voice
                    </label>
                    <textarea
                      id="voice-story"
                      name="story"
                      rows={4}
                      required
                      placeholder="Tell us what stayed with you..."
                      className="w-full resize-none rounded-xl border border-border bg-background/80 px-4 py-3 text-cocoa placeholder:text-foreground/30 focus:border-rose focus:ring-2 focus:ring-rose/20 focus:outline-none transition-all duration-200 min-h-[120px]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled
                  aria-disabled="true"
                  className="mt-6 w-full rounded-xl bg-rose/20 px-6 py-3.5 font-display font-semibold text-rose/50 cursor-not-allowed select-none transition-all duration-300"
                  title="Voice submissions will open soon"
                >
                  Submit Your Voice
                </button>

                <p className="mt-3 text-center text-xs text-foreground/45">
                  Voice submissions will open soon.
                </p>
              </>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
