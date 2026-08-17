import { useState } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const OFFERINGS = [
  {
    key: "gather",
    label: "Gather",
    tint: "var(--petal)",
    body: "Long-table brunches, candlelit dinners and rooftop sundowners. Seats are limited on purpose — small rooms make real friendships.",
    detail: ["Monthly supper club", "Curated seating", "No-phone first hour"],
  },
  {
    key: "move",
    label: "Move",
    tint: "var(--olive)",
    body: "Sunrise yoga, hikes and dance socials. Movement as celebration, never punishment — come exactly as fit as you are.",
    detail: ["Sunrise flow", "City trail walks", "Afrobeat dance socials"],
  },
  {
    key: "create",
    label: "Create",
    tint: "var(--honey)",
    body: "Pottery, floral styling, journaling and photography workshops led by women who make their living making things.",
    detail: ["Hands-on studios", "Take your work home", "Small-group tutoring"],
  },
  {
    key: "grow",
    label: "Grow",
    tint: "var(--berry)",
    body: "Money circles, career salons and mentorship evenings. The unglamorous conversations that quietly change everything.",
    detail: ["Mentor pairing", "Money literacy circles", "Founder salons"],
  },
];

export function Offerings() {
  const [active, setActive] = useState(0);
  const current = OFFERINGS[active];

  return (
    <section id="offerings" className="relative overflow-hidden bg-blush py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs tracking-[0.28em] uppercase text-rose">What we offer</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.03] font-bold text-cocoa">
            Four circles. One community.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-12 items-center gap-10">
          {/* Interactive circles */}
          <Reveal className="col-span-12 lg:col-span-6">
            <div
              role="tablist"
              aria-label="Offering categories"
              className="relative mx-auto grid aspect-square w-[min(88vw,460px)] place-items-center"
            >
              <div
                aria-hidden
                className="absolute inset-6 rounded-full border border-dashed border-rose/35"
              />
              {OFFERINGS.map((o, i) => {
                const angle = (i / OFFERINGS.length) * Math.PI * 2 - Math.PI / 2;
                const r = 38;
                const isActive = i === active;
                return (
                  <button
                    key={o.key}
                    role="tab"
                    id={`tab-${o.key}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${o.key}`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    data-cursor="grow"
                    className={cn(
                      "absolute grid aspect-square place-items-center rounded-full font-display font-bold transition-all duration-700 [transition-timing-function:var(--ease-silk)]",
                      isActive
                        ? "w-[42%] text-background shadow-lift"
                        : "w-[30%] text-cocoa shadow-petal hover:scale-105",
                    )}
                    style={{
                      left: `${50 + Math.cos(angle) * r}%`,
                      top: `${50 + Math.sin(angle) * r}%`,
                      transform: "translate(-50%, -50%)",
                      background: isActive
                        ? `color-mix(in oklab, ${o.tint} 88%, var(--cocoa))`
                        : `color-mix(in oklab, ${o.tint} 30%, var(--background))`,
                    }}
                  >
                    <span className="text-[clamp(0.9rem,2.4vw,1.35rem)] tracking-wide">
                      {o.label}
                    </span>
                  </button>
                );
              })}
              <div
                aria-hidden
                className="pointer-events-none grid h-[26%] w-[26%] place-items-center rounded-full bg-background/80 text-center font-display text-sm font-bold text-rose backdrop-blur"
              >
                Y&apos;IORA
              </div>
            </div>
          </Reveal>

          {/* Panel */}
          <div className="col-span-12 lg:col-span-6">
            <div
              key={current.key}
              role="tabpanel"
              id={`panel-${current.key}`}
              aria-labelledby={`tab-${current.key}`}
              className="rounded-[2rem] border border-border bg-background p-8 shadow-soft sm:p-10"
              style={{ animation: "bloom .6s var(--ease-silk)" }}
            >
              <span
                className="inline-block h-2 w-14 rounded-full"
                style={{ background: current.tint }}
              />
              <h3 className="mt-5 font-display text-3xl font-bold text-cocoa sm:text-4xl">
                {current.label}
              </h3>
              <p className="mt-4 text-foreground/78">{current.body}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {current.detail.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-border bg-secondary px-4 py-2 text-sm text-secondary-foreground"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
