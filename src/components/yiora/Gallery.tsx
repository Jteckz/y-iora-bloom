import { Reveal } from "./Reveal";
import ArchiveMosaic from "@/components/yiora/ArchiveMosaic";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export function Gallery() {
  const items = [
    {
      id: "1",
      img: g1,
      alt: "Women laughing over a rooftop brunch at golden hour",
      height: 560,
    },
    {
      id: "2",
      img: g2,
      alt: "A sunrise wellness circle in a garden",
      height: 420,
    },
    {
      id: "3",
      img: g6,
      alt: "Portrait of a smiling woman against a blush wall",
      height: 640,
    },
    {
      id: "4",
      img: g3,
      alt: "Hands raising glasses at a candlelit dinner",
      height: 380,
    },
    {
      id: "5",
      img: g4,
      alt: "A woman dancing at a beach gathering at sunset",
      height: 480,
    },
    {
      id: "6",
      img: g5,
      alt: "Overhead view of a creative workshop table",
      height: 400,
    },
  ];

  return (
    <section id="gallery" className="scroll-mt-20 bg-background py-12 sm:py-16 relative overflow-hidden">
      <div aria-hidden className="wavy-divider absolute top-0 inset-x-0 opacity-50" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5">
          <div>
            <p className="kicker">Archive</p>
            <h2 className="mt-3 max-w-xl font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[0.97] font-[650] tracking-[-0.03em] text-cocoa text-balance">
              The memories we
              <span className="italic font-normal text-gradient-warm"> keep making</span>.
            </h2>
          </div>
          <p className="max-w-[28ch] text-[0.9rem] leading-[1.6] text-cocoa/60">
            Fragments from past gatherings. Every face here walked in as a stranger.
          </p>
        </Reveal>

        <div className="mt-8">
          <ArchiveMosaic
            items={items}
            ease="power3.out"
            duration={0}
            stagger={0}
            animateFrom="bottom"
            scaleOnHover={false}
            hoverScale={1}
            blurToFocus={false}
            colorShiftOnHover={false}
          />
        </div>
      </div>
    </section>
  );
}
