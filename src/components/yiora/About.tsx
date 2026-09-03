import duo from "@/assets/gallery-1.jpg";
import { Reveal } from "./Reveal";

const TIMELINE = [
  {
    year: "2026",
    title: "A single table",
    body: "Y'IORA began as one long table, one Sunday, and a handful of women who wanted somewhere honest to land.",
  },
  {
    year: "The idea",
    title: "Fun, affordable, meaningful",
    body: "We refused the choice between beautiful and reachable. Every gathering is designed to feel rare — and still be within reach.",
  },
  {
    year: "The belief",
    title: "Women lifting women",
    body: "When women empower one another we build a rooted, supportive network that accelerates growth and celebrates shared experience.",
  },
  {
    year: "Now",
    title: "A living community",
    body: "Brunches, retreats, movement mornings and late candlelit dinners — a rhythm of belonging you can plan your year around.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden bg-background py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="blob absolute -top-24 -left-40 h-[420px] w-[420px] bg-blush opacity-70 blur-3xl sm:-top-32 sm:-left-48"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs tracking-[0.28em] uppercase text-rose">Our story</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] font-bold text-cocoa text-balance">
              We believe life is
              <span className="italic text-gradient-warm"> better witnessed</span> together.
            </h2>
            <p className="mt-5 max-w-md text-foreground/75 sm:text-base">
              Y&apos;IORA is a lifestyle organisation curating events dedicated to fun, affordable
              and meaningful experiences that bring people together — connecting, building
              friendships, staying active, and creating unforgettable memories.
            </p>

            <div className="relative mt-8 w-full max-w-[340px]">
              <img
                src={duo}
                alt="Women from the Y'IORA community laughing and embracing"
                loading="lazy"
                width={1275}
                height={1452}
                className="relative w-full aspect-[7:8] object-cover rounded-[1rem]"
              />
              <span className="absolute -right-2 bottom-6 rotate-[-6deg] rounded-full bg-honey px-3 py-1.5 font-display text-sm font-bold text-cocoa shadow-petal whitespace-nowrap">
                since day one
              </span>
            </div>
          </Reveal>

          <ol className="lg:col-span-7 space-y-6 lg:pt-8">
            {TIMELINE.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 90}
                className="group relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 pb-8 last:pb-0 sm:gap-x-6 sm:pb-10"
              >
                <div className="flex flex-col items-center pt-2">
                  <span className="h-3.5 w-3.5 rounded-full bg-rose ring-4 ring-blush transition-all duration-500 group-hover:scale-125 group-hover:bg-berry flex-shrink-0" />
                  <span className="mt-2 w-px flex-1 bg-gradient-to-b from-petal to-transparent min-h-[40px]" />
                </div>
                <div
                  className={`hover-lift min-w-0 rounded-2xl border border-border/70 bg-card p-4 sm:p-6 ${
                    i % 2 === 1 ? "lg:ml-6" : ""
                  }`}
                >
                  <p className="text-xs tracking-[0.22em] uppercase text-clay">{item.year}</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-cocoa sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75 sm:text-base">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
