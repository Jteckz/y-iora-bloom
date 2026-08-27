import { Reveal } from "./Reveal";

const VOICES = [
  {
    quote:
      "I arrived alone and left with four numbers in my phone and a standing Sunday plan. I hadn't laughed like that in a year.",
    name: "Amina",
    role: "Came for the brunch, stayed for the women",
    tilt: -3,
  },
  {
    quote:
      "Y'IORA made luxury feel reachable. Nothing about it was cheap, and nothing about it was out of reach.",
    name: "Nasra",
    role: "Supper club regular",
    tilt: 2.5,
  },
  {
    quote:
      "The money circle changed how I talk about my worth. I negotiated my first raise three weeks later.",
    name: "Zawadi",
    role: "Grow circle, cohort two",
    tilt: -1.5,
  },
  {
    quote: "It's the only room where I don't perform. That's rarer than it should be.",
    name: "Leila",
    role: "Sunrise Circle",
    tilt: 3.5,
  },
];

export function Testimonials() {
  return (
    <section id="voices" className="relative scroll-mt-20 overflow-hidden bg-linen py-16 sm:py-24">
      <div
        aria-hidden
        className="blob absolute -right-32 top-10 h-[380px] w-[380px] bg-petal/50 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.28em] uppercase text-berry">Voices</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.03] font-bold text-cocoa text-balance">
            What the room sounds like afterwards.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VOICES.map((v, i) => (
            <Reveal as="figure" key={v.name} delay={i * 110}>
              <div
                className="hover-lift glass-card rounded-[1.5rem] p-6 sm:p-7 h-full"
                style={{
                  transform: `rotate(${v.tilt}deg)`,
                  animation: `float-soft ${9 + i}s ease-in-out ${i * 0.6}s infinite`,
                }}
              >
                <span
                  aria-hidden
                  className="font-display text-4xl sm:text-5xl leading-none text-rose/50"
                >
                  &ldquo;
                </span>
                <blockquote className="-mt-2 font-display text-base sm:text-lg leading-relaxed text-cocoa">
                  {v.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-rose font-display font-bold text-primary-foreground flex-shrink-0">
                    {v.name[0]}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-cocoa truncate">{v.name}</span>
                    <span className="block text-xs text-foreground/65 truncate">{v.role}</span>
                  </span>
                </figcaption>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
