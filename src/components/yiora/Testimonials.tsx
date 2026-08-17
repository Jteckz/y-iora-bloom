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
    quote:
      "It's the only room where I don't perform. That's rarer than it should be.",
    name: "Leila",
    role: "Sunrise Circle",
    tilt: 3.5,
  },
];

export function Testimonials() {
  return (
    <section id="voices" className="relative overflow-hidden bg-linen py-24 sm:py-32">
      <div
        aria-hidden
        className="blob absolute -right-32 top-10 h-[380px] w-[380px] bg-petal/50 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.28em] uppercase text-berry">Voices</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.03] font-bold text-cocoa">
            What the room sounds like afterwards.
          </h2>
        </Reveal>

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {VOICES.map((v, i) => (
            <Reveal
              as="figure"
              key={v.name}
              delay={i * 110}
              className="break-inside-avoid"
            >
              <div
                className="hover-lift glass-card rounded-[1.9rem] p-7"
                style={{
                  transform: `rotate(${v.tilt}deg)`,
                  animation: `float-soft ${9 + i}s ease-in-out ${i * 0.6}s infinite`,
                }}
              >
                <span aria-hidden className="font-display text-5xl leading-none text-rose/50">
                  &ldquo;
                </span>
                <blockquote className="-mt-3 font-display text-lg leading-relaxed text-cocoa">
                  {v.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-rose font-display font-bold text-primary-foreground">
                    {v.name[0]}
                  </span>
                  <span>
                    <span className="block font-medium text-cocoa">{v.name}</span>
                    <span className="block text-xs text-foreground/65">{v.role}</span>
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
