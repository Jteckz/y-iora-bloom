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
    <section id="about" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div
        aria-hidden
        className="blob absolute -top-24 -left-40 h-[420px] w-[420px] bg-blush opacity-70 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-12 gap-10">
          <Reveal className="col-span-12 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs tracking-[0.28em] uppercase text-rose">Our story</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] font-bold text-cocoa">
              We believe life is
              <span className="italic text-gradient-warm"> better witnessed</span> together.
            </h2>
            <p className="mt-6 max-w-md text-foreground/75">
              Y&apos;IORA is a lifestyle organisation curating events dedicated to fun,
              affordable and meaningful experiences that bring people together — connecting,
              building friendships, staying active, and creating unforgettable memories.
            </p>

            <div className="relative mt-10 w-fit">
              <div aria-hidden className="blob absolute -inset-6 bg-linen" />
              <img
                src={duo}
                alt="Women from the Y'IORA community laughing and embracing"
                loading="lazy"
                width={1275}
                height={1452}
                className="relative w-[min(78vw,340px)] mix-blend-multiply"
              />
              <span className="absolute -right-3 bottom-8 rotate-[-6deg] rounded-full bg-honey px-4 py-2 font-display text-sm font-bold text-cocoa shadow-petal">
                since day one
              </span>
            </div>
          </Reveal>

          <ol className="col-span-12 lg:col-span-7 lg:pt-16">
            {TIMELINE.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 90}
                className="group relative grid grid-cols-[auto_1fr] gap-6 pb-12 last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <span className="mt-1.5 h-3.5 w-3.5 rounded-full bg-rose ring-4 ring-blush transition-all duration-500 group-hover:scale-125 group-hover:bg-berry" />
                  <span className="mt-2 w-px flex-1 bg-gradient-to-b from-petal to-transparent" />
                </div>
                <div
                  className="hover-lift -mt-2 rounded-3xl border border-border/70 bg-card p-6 sm:p-8"
                  style={{ marginLeft: `${(i % 2) * 1.5}rem` }}
                >
                  <p className="text-xs tracking-[0.22em] uppercase text-clay">{item.year}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-cocoa">{item.title}</h3>
                  <p className="mt-3 text-foreground/75">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
