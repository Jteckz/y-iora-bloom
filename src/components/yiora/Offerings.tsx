import { useState } from "react";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { useIsMobile } from "@/hooks/use-viewport";
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
  const current = OFFERINGS[active] ?? OFFERINGS[0]!;
  const isMobile = useIsMobile();

  return (
    <Section id="offerings" tone="blush" divider="line" dividerPosition="top">
      <Reveal className="max-w-2xl">
        <p className="kicker">What we offer</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4.8vw,3.3rem)] leading-[0.97] font-[650] tracking-[-0.03em] text-cocoa text-balance">
          Four circles. <span className="italic font-normal text-cocoa/55">One community.</span>
        </h2>
        <p className="mt-4 max-w-[46ch] text-[0.92rem] leading-[1.6] text-cocoa/60">
          Pick a circle. The rest finds you — suppers, sunrises, studios and salons.
        </p>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
        {/* Interactive circles */}
        <Reveal className="lg:col-span-6">
          {isMobile ? (
            // Mobile: Horizontal scrollable tabs — editorial pills, not candy
            <div
              role="tablist"
              aria-label="Offering categories"
              className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory scroll-pl-4"
            >
              {OFFERINGS.map((o, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={o.key}
                    role="tab"
                    id={`tab-${o.key}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${o.key}`}
                    onClick={() => setActive(i)}
                    data-cursor="grow"
                    className={cn(
                      "pressable flex-shrink-0 snap-start min-h-[40px] items-center rounded-full font-display font-semibold tracking-[-0.01em] transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out touch-target px-5 py-2.5 text-[0.95rem] border",
                      isActive
                        ? "text-background shadow-soft border-transparent"
                        : "text-cocoa bg-background/60 border-cocoa/10 hover:border-cocoa/20 hover:bg-background",
                    )}
                    style={{
                      background: isActive
                        ? `color-mix(in oklab, ${o.tint} 78%, var(--cocoa))`
                        : undefined,
                    }}
                  >
                    <span className="whitespace-nowrap">{o.label}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            // Desktop: Circular layout — more human, less perfect geometry
            <div
              role="tablist"
              aria-label="Offering categories"
              className="relative mx-auto grid aspect-square w-[min(84vw,460px)] place-items-center"
            >
              <div
                aria-hidden
                className="absolute inset-8 rounded-full border border-dashed border-cocoa/15"
              />
              <div
                aria-hidden
                className="absolute inset-[22%] rounded-full bg-background/55 border border-cocoa/8"
              />
              {OFFERINGS.map((o, i) => {
                const angle = (i / OFFERINGS.length) * Math.PI * 2 - Math.PI / 2;
                const r = 37;
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
                      "pressable absolute grid aspect-square place-items-center rounded-full font-display font-semibold tracking-[-0.01em] transition-[transform,background-color,box-shadow,border-color] duration-300 ease-out touch-target border",
                      isActive
                        ? "w-[40%] text-background shadow-lift border-transparent scale-[1.02]"
                        : "w-[29%] text-cocoa bg-background/70 border-cocoa/10 shadow-soft hover:scale-[1.03] hover:border-cocoa/15",
                    )}
                    style={{
                      left: `${50 + Math.cos(angle) * r}%`,
                      top: `${50 + Math.sin(angle) * r}%`,
                      transform: "translate(-50%, -50%)",
                      background: isActive
                        ? `color-mix(in oklab, ${o.tint} 78%, var(--cocoa))`
                        : undefined,
                    }}
                  >
                    <span className="text-[clamp(0.92rem,2.2vw,1.2rem)]">{o.label}</span>
                  </button>
                );
              })}
              <div
                aria-hidden
                className="pointer-events-none grid h-[22%] w-[22%] place-items-center rounded-full bg-background text-center font-display text-[0.72rem] font-semibold tracking-[0.16em] text-cocoa/60 border border-cocoa/10 shadow-soft"
              >
                Y&apos;IORA
              </div>
            </div>
          )}
        </Reveal>

        {/* Panel — tactile paper, bolder */}
        <div className="lg:col-span-6">
          <div
            key={current.key}
            role="tabpanel"
            id={`panel-${current.key}`}
            aria-labelledby={`tab-${current.key}`}
            className="rounded-[1.5rem] border border-cocoa/10 bg-card p-6 shadow-soft sm:p-7"
            style={{ animation: "bloom 420ms var(--ease-out)" }}
          >
            <span
              className="inline-block h-1.5 w-12 rounded-full"
              style={{ background: current.tint }}
            />
            <h3 className="mt-4 font-display text-[1.7rem] font-semibold tracking-[-0.03em] text-cocoa sm:text-[1.9rem]">
              {current.label}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-[1.65] text-cocoa/65 max-w-[42ch]">
              {current.body}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {current.detail.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-cocoa/10 bg-background px-3.5 py-1.5 text-[0.82rem] font-medium text-cocoa/70 hover:border-cocoa/20 hover:bg-blush transition-colors"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
