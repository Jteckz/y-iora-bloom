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
      className="relative isolate scroll-mt-20 overflow-hidden bg-blush pt-12 pb-8 sm:pt-16 sm:pb-8"
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cocoa/10 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background/0 via-transparent to-linen/60" />
      <PetalField density={0.35} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <img
            src={mark}
            alt=""
            width={953}
            height={1261}
            className="mx-auto h-14 w-auto rounded-full object-cover border border-cocoa/10 shadow-soft sm:h-[52px]"
          />
          <h2 className="mt-5 font-display text-[clamp(2rem,4.8vw,3.4rem)] leading-[0.98] font-[650] tracking-[-0.03em] text-cocoa text-balance">
            Plant yourself <span className="italic font-normal text-cocoa/60">in the garden.</span>
          </h2>
          <p className="mt-3 text-[0.94rem] leading-relaxed text-cocoa/60">
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
                className="min-h-[48px] flex-1 rounded-full border border-cocoa/15 bg-background px-6 text-[0.94rem] text-foreground placeholder:text-cocoa/40 shadow-soft focus:border-rose focus:ring-2 focus:ring-rose/15 focus:outline-none transition-[border-color,box-shadow] duration-200 ease-out touch-target"
              />
              <button
                type="submit"
                className="pressable min-h-[48px] rounded-full bg-cocoa px-7 text-[0.94rem] font-[600] tracking-[-0.01em] text-background shadow-soft transition-[transform,background-color,box-shadow] duration-200 ease-out hover:bg-berry hover:shadow-lift active:scale-[0.97] touch-target whitespace-nowrap"
              >
                Join us
              </button>
            </div>
            <p className="text-xs text-cocoa/40">No spam. Unsubscribe anytime. We write like humans.</p>
          </form>
        </Reveal>

        {/* Community garden — quieter, less toy-like */}
        <div className="mt-10 flex flex-wrap items-end justify-center gap-x-5 gap-y-6 border-y border-cocoa/8 py-6">
          {FLOWERS.map((f, i) => (
            <div key={f} className="group flex flex-col items-center" data-cursor="grow">
              <span
                className="mb-1.5 block h-2.5 w-2.5 rounded-full border border-white/40 shadow-sm transition-transform duration-300 ease-out group-hover:scale-125"
                style={{
                  background: [
                    "var(--rose)",
                    "var(--honey)",
                    "var(--berry)",
                    "var(--clay)",
                    "var(--olive)",
                  ][i % 5],
                }}
              />
              <span
                aria-hidden
                className="block w-px bg-cocoa/15 transition-colors duration-300 group-hover:bg-cocoa/25"
                style={{ height: 18 + ((i * 11) % 28) }}
              />
              <span className="mt-2 font-display text-[0.68rem] tracking-wide text-cocoa/55 whitespace-nowrap">
                {f}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 text-center text-sm text-cocoa/60 sm:flex-row sm:justify-between sm:text-left">
          <p className="font-display text-[0.72rem] tracking-[0.16em] font-semibold text-cocoa">Y&apos;IORA &mdash; SINCE 2026 · TANZANIA</p>
          <nav aria-label="Social" className="flex items-center gap-1.5 flex-wrap justify-center">
            {["Instagram", "TikTok", "WhatsApp"].map((s) => (
              <a
                key={s}
                href="#join"
                className="inline-flex min-h-[36px] items-center rounded-full border border-transparent px-3 py-1.5 text-[0.78rem] font-medium tracking-wide transition-[border-color,background-color,color] duration-200 ease-out hover:border-cocoa/10 hover:bg-background hover:text-cocoa"
              >
                {s}
              </a>
            ))}
          </nav>
          <p className="text-xs text-cocoa/45">Curated events for women who want more.</p>
        </div>
      </div>
    </footer>
  );
}
