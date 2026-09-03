import { useState, useCallback } from "react";
import { Reveal } from "./Reveal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function Testimonials() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setOpen(false);
      }, 2400);
    },
    [],
  );

  return (
    <section
      id="voices"
      className="relative scroll-mt-20 overflow-hidden bg-linen py-16 sm:py-24"
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
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.28em] uppercase text-berry">
            Voices
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.03] font-bold text-cocoa text-balance">
            What the room sounds like afterwards.
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group voice-card glass-card relative w-full max-w-md cursor-pointer rounded-[1.5rem] p-8 sm:p-10 text-center transition-all duration-500 ease-[var(--ease-silk)] hover:-translate-y-2 hover:shadow-[var(--shadow-lift)] focus-visible:outline-3 focus-visible:outline-rose focus-visible:outline-offset-4"
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
              Every gathering leaves a story. Share what stayed with you after the
              room grew quiet.
            </p>

            {/* Subtle CTA hint */}
            <span className="relative mt-6 inline-block text-xs tracking-[0.22em] uppercase text-berry/70 transition-colors duration-300 group-hover:text-berry">
              Tap to share
            </span>
          </button>
        </Reveal>
      </div>

      {/* Voice Submission Modal */}
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
                Your words become part of something larger. Tell us what resonated,
                what shifted, or what you carry with you.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form
            onSubmit={handleSubmit}
            className="px-7 pb-8 pt-4 sm:px-9 sm:pb-10"
          >
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
