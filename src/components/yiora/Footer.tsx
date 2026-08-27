import { useState } from "react";
import { toast } from "sonner";
import mark from "@/assets/gallery-8.png";
import { PetalField } from "./PetalField";
import { Reveal } from "./Reveal";

const FLOWERS = ["Gather", "Move", "Create", "Grow", "Belong", "Bloom", "Rest", "Celebrate"];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer
      id="join"
      className="relative isolate scroll-mt-20 overflow-hidden bg-gradient-to-b from-blush via-petal/60 to-linen pt-16 pb-8 sm:pt-24 sm:pb-10"
    >
      <PetalField density={0.6} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <img
            src={mark}
            alt=""
            width={953}
            height={1261}
            className="mx-auto h-14 w-auto rounded-full object-cover sm:h-16"
          />
          <h2 className="mt-5 font-display text-[clamp(2rem,5.5vw,3.8rem)] leading-[1.02] font-bold text-cocoa text-balance">
            Plant yourself in the garden.
          </h2>
          <p className="mt-3 text-sm text-foreground/78 sm:text-base">
            One warm letter a month: what&apos;s coming, who&apos;s hosting, and early seats before
            they go public.
          </p>

          <form
            className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Welcome to the circle", {
                description: `We'll write to ${email} before the next gathering.`,
              });
              setEmail("");
            }}
          >
            <label htmlFor="join-email" className="sr-only">
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="join-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourname.com"
                className="min-h-[48px] flex-1 rounded-full border border-cocoa/20 bg-background/85 px-6 text-foreground placeholder:text-muted-foreground touch-target"
              />
              <button
                type="submit"
                className="min-h-[48px] rounded-full bg-cocoa px-6 font-medium text-background shadow-lift transition-colors hover:bg-berry touch-target whitespace-nowrap"
              >
                Join us
              </button>
            </div>
          </form>
        </Reveal>

        {/* Community garden — each bloom is a woman in the circle */}
        <div className="mt-16 flex flex-wrap items-end justify-center gap-x-4 gap-y-8">
          {FLOWERS.map((f, i) => (
            <div key={f} className="group flex flex-col items-center" data-cursor="grow">
              <span
                className="mb-1.5 block h-3.5 w-3.5 rounded-full transition-all duration-700 group-hover:scale-[1.6]"
                style={{
                  background: [
                    "var(--rose)",
                    "var(--honey)",
                    "var(--berry)",
                    "var(--clay)",
                    "var(--olive)",
                  ][i % 5],
                  animation: `float-soft ${7 + (i % 5)}s ease-in-out ${i * 0.4}s infinite`,
                }}
              />
              <span
                aria-hidden
                className="block w-px bg-olive/50 transition-all duration-700 group-hover:bg-olive"
                style={{ height: 20 + ((i * 11) % 36) }}
              />
              <span className="mt-1.5 font-display text-xs text-cocoa/80 whitespace-nowrap">
                {f}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-cocoa/12 pt-6 text-center text-sm text-cocoa/75 sm:flex-row sm:justify-between sm:text-left">
          <p className="font-display tracking-[0.2em] text-xs">Y&apos;IORA &mdash; est. 2026</p>
          <nav aria-label="Social" className="flex items-center gap-2 flex-wrap justify-center">
            {["Instagram", "TikTok", "WhatsApp"].map((s) => (
              <a
                key={s}
                href="#join"
                className="inline-flex min-h-[44px] items-center rounded-full px-3 py-2 transition-colors hover:bg-background/60 hover:text-berry touch-target-sm text-xs"
              >
                {s}
              </a>
            ))}
          </nav>
          <p className="text-xs">Curated events for women who want more.</p>
        </div>
      </div>
    </footer>
  );
}
