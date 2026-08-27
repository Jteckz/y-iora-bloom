import { useEffect, useState } from "react";
import mark from "@/assets/gallery-8.png";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#about", label: "Our Story" },
  { href: "#offerings", label: "Offerings" },
  { href: "#events", label: "Events" },
  { href: "#voices", label: "Voices" },
  { href: "#gallery", label: "Gallery" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6",
          scrolled ? "glass-card mx-3 sm:mx-auto" : "bg-transparent",
        )}
      >
        <a href="#top" className="flex items-center gap-2.5 min-h-[44px]" aria-label="Y'IORA home">
          <img
            src={mark}
            alt=""
            width={34}
            height={45}
            className="h-9 w-auto rounded-full object-cover"
          />
          <span className="font-display text-xl font-bold tracking-[0.18em] text-foreground">
            Y&apos;IORA
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground min-h-[44px] flex items-center"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-rose transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#join"
            className="hidden min-h-[44px] items-center rounded-full bg-cocoa px-5 py-2.5 text-sm font-medium text-background shadow-petal transition-all duration-500 hover:bg-berry sm:inline-flex touch-target"
          >
            Join the circle
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/70 md:hidden touch-target"
          >
            <span className="relative block h-4 w-6">
              <span
                className={cn(
                  "absolute left-0 h-px w-6 bg-foreground transition-all duration-300",
                  open ? "top-2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-6 bg-foreground transition-all duration-300",
                  open ? "top-2 -rotate-45" : "top-4",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="glass-card mx-3 mt-2 max-h-[calc(100svh-6rem)] overflow-y-auto overscroll-contain rounded-3xl p-3 md:hidden safe-bottom"
        >
          <ul className="flex flex-col gap-1">
            {LINKS.concat({ href: "#join", label: "Join the circle" }).map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center rounded-2xl px-4 py-4 font-display text-lg text-foreground transition-colors hover:bg-blush active:bg-blush touch-target-lg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
