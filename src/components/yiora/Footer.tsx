import { useState } from "react";
import { toast } from "sonner";
import mark from "@/assets/yiora-mark.png.asset.json";
import { PetalField } from "./PetalField";
import { Reveal } from "./Reveal";

const FLOWERS = ["Gather", "Move", "Create", "Grow", "Belong", "Bloom", "Rest", "Celebrate"];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer
      id="join"
      className="relative isolate overflow-hidden bg-gradient-to-b from-blush via-petal/60 to-linen pt-24 pb-10"
    >
      <PetalField density={0.6} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <img src={mark.url} alt="" width={953} height={1261} className="mx-auto h-16 w-auto" />
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.02] font-bold text-cocoa">
            Plant yourself in the garden.
          </h2>
          <p className="mt-4 text-foreground/78">
            One warm letter a month: what&apos;s coming, who&apos;s hosting, and early seats
            before they go public.
          </p>

          <form
            className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
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
            <input
              id="join-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourname.com"
              className="min-h-12 flex-1 rounded-full border border-cocoa/20 bg-background/85 px-6 text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="min-h-12 rounded-full bg-cocoa px-7 font-medium text-background shadow-lift transition-colors hover:bg-berry"
            >
              Join us
            </button>
          </form>
        </Reveal>

        {/* Community garden — each bloom is a woman in the circle */}
        <div className="mt-20 flex flex-wrap items-end justify-center gap-x-6 gap-y-10">
          {FLOWERS.map((f, i) => (
            <div key={f} className="group flex flex-col items-center" data-cursor="grow">
              <span
                className="mb-2 block h-4 w-4 rounded-full transition-all duration-700 group-hover:scale-[1.7]"
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
                style={{ height: 28 + ((i * 11) % 46) }}
              />
              <span className="mt-2 font-display text-sm text-cocoa/80">{f}</span>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-6 border-t border-cocoa/12 pt-8 text-sm text-cocoa/75 sm:flex-row sm:justify-between">
          <p className="font-display tracking-[0.2em]">Y&apos;IORA &mdash; est. 2026</p>
          <nav aria-label="Social" className="flex gap-6">
            {["Instagram", "TikTok", "WhatsApp"].map((s) => (
              <a
                key={s}
                href="#join"
                className="transition-colors hover:text-berry"
              >
                {s}
              </a>
            ))}
          </nav>
          <p>Curated events for women who want more.</p>
        </div>
      </div>
    </footer>
  );
}
