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
    <section id="voices" className="relative scroll-mt-20 overflow-hidden bg-linen py-12 sm:py-16">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cocoa/8 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-petal/25 blur-[70px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">Voices</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[0.98] font-[650] tracking-[-0.03em] text-cocoa text-balance">
            What the room <span className="italic font-normal text-cocoa/60">sounds like</span> afterwards.
          </h2>
          <p className="mt-3 text-sm text-cocoa/55">Not testimonials. Just notes we kept.</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VOICES.map((v, i) => (
            <Reveal as="figure" key={v.name} delay={i * 70}>
              <div
                className="hover-lift group relative flex h-full flex-col rounded-[1.4rem] border border-cocoa/8 bg-card p-6 shadow-soft"
                style={{
                  transform: `rotate(${v.tilt * 0.35}deg)`,
                }}
              >
                <span
                  aria-hidden
                  className="font-display text-[2.2rem] leading-none text-rose/25"
                >
                  “
                </span>
                <blockquote className="-mt-1 font-display text-[0.98rem] leading-[1.6] tracking-[-0.01em] text-cocoa">
                  {v.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-cocoa/8 pt-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-cocoa font-display text-sm font-semibold text-background flex-shrink-0">
                    {v.name[0]}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.9rem] font-semibold tracking-[-0.01em] text-cocoa truncate">{v.name}</span>
                    <span className="block text-[0.72rem] leading-tight text-cocoa/55 truncate">{v.role}</span>
                  </span>
                </figcaption>
                {/* subtle corner fold hint */}
                <span aria-hidden className="pointer-events-none absolute right-4 top-4 h-6 w-6 rounded-full border border-cocoa/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
