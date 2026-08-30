import duo from "@/assets/gallery-1.jpg";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

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
    <Section id="about" tone="background">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-40 h-[520px] w-[520px] rounded-full bg-blush/40 blur-[80px] sm:-top-32 sm:-left-48"
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <p className="kicker">Our story</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.8vw,3.4rem)] leading-[0.98] font-[650] tracking-[-0.03em] text-cocoa text-balance">
            We believe life is
            <span className="italic font-normal text-gradient-warm"> better witnessed</span>{" "}
            together.
          </h2>
          <p className="mt-5 max-w-[36ch] text-[0.94rem] leading-[1.7] text-cocoa/65">
            Y&apos;IORA is a lifestyle organisation curating events dedicated to fun, affordable and
            meaningful experiences that bring people together — connecting, building friendships,
            staying active, and creating unforgettable memories.
          </p>

          <div className="relative mt-8 w-full max-w-[340px]">
            <img
              src={duo}
              alt="Women from the Y'IORA community laughing and embracing"
              loading="lazy"
              width={1275}
              height={1452}
              className="w-full aspect-[4/5] object-cover rounded-[1.5rem] border border-cocoa/10 shadow-soft"
            />
          </div>
        </Reveal>

        <ol className="lg:col-span-7 space-y-4 lg:pt-2">
          {TIMELINE.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 70}
              className="group relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 sm:gap-x-5"
            >
              <div className="flex flex-col items-center pt-5">
                <span className="h-[9px] w-[9px] rounded-full bg-cocoa ring-4 ring-blush transition-[transform,background-color] duration-200 ease-out group-hover:scale-125 group-hover:bg-berry flex-shrink-0" />
              </div>
              <div className="min-w-0 rounded-2xl border border-cocoa/10 bg-card p-5 sm:p-6 shadow-soft transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out lg:border-transparent lg:bg-transparent lg:shadow-none lg:group-hover:border-cocoa/10 lg:group-hover:bg-card lg:group-hover:shadow-soft lg:group-hover:-translate-y-0.5">
                <p className="text-[0.68rem] tracking-[0.18em] uppercase font-semibold text-clay/80">
                  {item.year}
                </p>
                <h3 className="mt-2 font-display text-[1.18rem] font-semibold tracking-[-0.02em] text-cocoa sm:text-[1.32rem]">
                  {item.title}
                </h3>
                <p className="mt-2.5 max-w-[48ch] text-[0.92rem] leading-[1.65] text-cocoa/65">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
