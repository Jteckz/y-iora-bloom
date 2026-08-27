import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g5 from "@/assets/gallery-5.jpg";

const EVENTS = [
  {
    title: "The Long Table",
    date: "12 Sep",
    place: "Rooftop, Masaki",
    seats: "24 seats",
    img: g1,
    blurb: "Sunset brunch, one very long table, and conversation cards that go somewhere real.",
  },
  {
    title: "Sunrise Circle",
    date: "27 Sep",
    place: "Botanical Garden",
    seats: "40 mats",
    img: g2,
    blurb: "Slow flow, breathwork and cold pressed everything — before the city wakes up.",
  },
  {
    title: "Candlelight Supper",
    date: "18 Oct",
    place: "The Old House",
    seats: "18 seats",
    img: g3,
    blurb: "A four-course evening with a storyteller between each course. Dress like you mean it.",
  },
  {
    title: "Makers' Sunday",
    date: "09 Nov",
    place: "Clay Studio",
    seats: "16 places",
    img: g5,
    blurb: "Throw a bowl, style a bouquet, write the letter you've been avoiding.",
  },
];

/** 3D coverflow carousel — swipe on touch, arrows and keyboard on desktop. */
export function Events() {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);
  const count = EVENTS.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const node = stageRef.current;
    node?.addEventListener("keydown", onKey as EventListener);
    return () => node?.removeEventListener("keydown", onKey as EventListener);
  }, [go]);

  return (
    <section
      id="events"
      className="relative scroll-mt-20 overflow-hidden bg-cocoa py-16 sm:py-24 text-background"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blush/25 to-transparent"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-honey">The calendar</p>
            <h2 className="mt-4 max-w-xl font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.03] font-bold text-balance">
              Rooms worth rearranging your weekend for.
            </h2>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => go(-1)}
              aria-label="Previous event"
              className="grid h-12 w-12 place-items-center rounded-full border border-background/30 transition-colors hover:bg-background/12 touch-target flex-1 sm:flex-none"
            >
              &larr;
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next event"
              className="grid h-12 w-12 place-items-center rounded-full border border-background/30 transition-colors hover:bg-background/12 touch-target flex-1 sm:flex-none"
            >
              &rarr;
            </button>
          </div>
        </Reveal>

        <div
          ref={stageRef}
          id="events-stage"
          tabIndex={0}
          role="group"
          aria-label="Upcoming events carousel. Use arrow keys to browse."
          onTouchStart={(e) => {
            touchX.current = e.touches[0]?.clientX ?? null;
            touchY.current = e.touches[0]?.clientY ?? null;
          }}
          onTouchMove={(e) => {
            // Allow vertical scrolling
            if (touchY.current !== null) {
              const deltaY = Math.abs(e.touches[0].clientY - touchY.current);
              const deltaX = Math.abs(e.touches[0].clientX - (touchX.current ?? 0));
              if (deltaY > deltaX) {
                touchX.current = null; // Cancel horizontal swipe detection
              }
            }
          }}
          onTouchEnd={(e) => {
            const start = touchX.current;
            const end = e.changedTouches[0]?.clientX;
            if (start == null || end == null) return;
            if (Math.abs(end - start) > 45) go(end < start ? 1 : -1);
            touchX.current = null;
            touchY.current = null;
          }}
          className="relative mt-10 touch-pan-y [perspective:1400px]"
          style={{ height: isMobile ? "auto" : "500px", minHeight: isMobile ? "400px" : "500px" }}
        >
          {EVENTS.map((ev, i) => {
            let offset = i - index;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;
            const abs = Math.abs(offset);
            const isActive = offset === 0;

            // On mobile, use a simpler stack layout instead of 3D coverflow
            if (isMobile) {
              return (
                <article
                  key={ev.title}
                  aria-hidden={!isActive}
                  style={{ display: isActive ? "block" : "none" }}
                  className="w-full max-w-[380px] mx-auto"
                >
                  <div className="relative h-56 sm:h-64 overflow-hidden rounded-[1.5rem]">
                    <img
                      src={ev.img}
                      alt={ev.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s]"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3.5 py-1.5 font-display text-sm font-bold text-cocoa">
                      {ev.date}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6 mt-4 bg-card rounded-[1.5rem] shadow-soft">
                    <h3 className="font-display text-xl font-bold text-cocoa sm:text-2xl">
                      {ev.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {ev.place} &middot; {ev.seats}
                    </p>
                    <p className="mt-4 text-sm text-foreground/78">{ev.blurb}</p>
                    <a
                      href="#join"
                      className="mt-6 inline-flex min-h-[48px] items-center rounded-full bg-rose px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-berry touch-target w-full justify-center"
                    >
                      Reserve a seat
                    </a>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={ev.title}
                aria-hidden={abs > 1}
                onClick={() => !isActive && setIndex(i)}
                className="absolute top-0 left-1/2 w-[min(84vw,380px)] overflow-hidden rounded-[2rem] bg-card text-card-foreground shadow-lift transition-all duration-700 [transition-timing-function:var(--ease-silk)]"
                style={{
                  transform: `translateX(calc(-50% + ${offset * 46}%)) translateZ(${-abs * 220}px) rotateY(${offset * -22}deg) scale(${isActive ? 1 : 0.9})`,
                  opacity: abs > 2 ? 0 : 1 - abs * 0.28,
                  zIndex: 10 - abs,
                  pointerEvents: abs > 1 ? "none" : "auto",
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <img
                    src={ev.img}
                    alt={ev.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3.5 py-1.5 font-display text-sm font-bold text-cocoa">
                    {ev.date}
                  </span>
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="font-display text-2xl font-bold text-cocoa">{ev.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {ev.place} &middot; {ev.seats}
                  </p>
                  <p className="mt-4 text-sm text-foreground/78">{ev.blurb}</p>
                  <a
                    href="#join"
                    className="mt-6 inline-flex min-h-[48px] items-center rounded-full bg-rose px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-berry touch-target"
                  >
                    Reserve a seat
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center" role="tablist" aria-label="Event indicators">
          {EVENTS.map((ev, i) => (
            <button
              key={ev.title}
              onClick={() => setIndex(i)}
              aria-label={`Show ${ev.title}`}
              aria-current={i === index ? "true" : "false"}
              role="tab"
              className="group flex h-11 w-10 items-center justify-center touch-target-sm"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-500 ${
                  i === index ? "w-7 bg-honey" : "w-2 bg-background/35 group-hover:bg-background/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
