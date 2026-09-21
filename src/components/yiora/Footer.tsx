import { Link } from "@tanstack/react-router";

/**
 * Shared site footer chrome (bottom bar only).
 * The newsletter / Join the Circle section lives in JoinCircle.tsx on /join.
 */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-linen pt-6 pb-8 sm:pb-10">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 border-t border-cocoa/12 pt-6 text-center text-sm text-cocoa/75 sm:flex-row sm:justify-between sm:text-left">
          <p className="font-display tracking-[0.2em] text-xs">Y&apos;IORA &mdash; est. 2026</p>
          <nav aria-label="Social" className="flex items-center gap-2 flex-wrap justify-center">
            {["Instagram", "TikTok", "WhatsApp"].map((s) => (
              <Link
                key={s}
                to="/join"
                className="inline-flex min-h-[44px] items-center rounded-full px-3 py-2 transition-colors hover:bg-background/60 hover:text-berry touch-target-sm text-xs"
              >
                {s}
              </Link>
            ))}
          </nav>
          <p className="text-xs">Curated events for women who want more.</p>
        </div>

        <div className="mt-4 text-center">
          <Link
            to="/admin"
            className="inline-block text-[10px] tracking-widest uppercase text-cocoa/25 transition-colors hover:text-cocoa/50"
          >
            admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
