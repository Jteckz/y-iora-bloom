import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import mark from "@/assets/gallery-8.png";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#about", label: "Our Story" },
  { href: "#offerings", label: "Offerings" },
  { href: "#events", label: "Events" },
  { href: "#voices", label: "Voices" },
  { href: "#gallery", label: "Gallery" },
] as const;

interface GlassRect {
  x: number;
  y: number;
  width: number;
}

const GLASS_SPRING = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [glass, setGlass] = useState<GlassRect | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Body scroll lock when mobile menu open ── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  /* ── Escape key closes mobile menu ── */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  /* ── Position measurement for the glass pill ── */
  const measureLink = useCallback((id: string) => {
    const el = linkRefs.current.get(id);
    const navEl = navRef.current;
    if (!el || !navEl) return null;
    const navRect = navEl.getBoundingClientRect();
    const navStyle = getComputedStyle(navEl);
    const pl = parseFloat(navStyle.paddingLeft);
    const pt = parseFloat(navStyle.paddingTop);
    const elRect = el.getBoundingClientRect();
    return {
      x: elRect.left - (navRect.left + pl),
      y: elRect.top - (navRect.top + pt) + elRect.height / 2,
      width: elRect.width,
    };
  }, []);

  const activateLink = useCallback(
    (id: string) => {
      setActive(id);
      setGlass(measureLink(id));
    },
    [measureLink],
  );

  const deactivateLink = useCallback(() => {
    setActive(null);
    setGlass(null);
  }, []);

  const linkId = (href: string) => href.replace("#", "");
  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[120] transition-all duration-500",
        scrolled ? "pt-3" : "pt-4",
      )}
    >
      {/* ═══════════════════════════════════════════
          Desktop / Tablet Navigation
          ═══════════════════════════════════════════ */}
      <nav
        ref={navRef}
        aria-label="Primary"
        className={cn(
          "relative mx-3 hidden items-center justify-between gap-4 sm:flex sm:px-6",
          "rounded-full px-4 py-2.5",
          "bg-background/50 backdrop-blur-xl border border-border/40",
          "shadow-[0_8px_32px_-8px_rgba(58,44,44,0.12)]",
          scrolled && "bg-background/70 shadow-[0_12px_40px_-10px_rgba(58,44,44,0.18)]",
          "mx-auto max-w-6xl",
        )}
      >
        {/* ── Logo ── */}
        <a href="#top" className="relative z-10 flex items-center gap-2.5" aria-label="Y'IORA home">
          <img
            src={mark}
            alt=""
            className="h-8 w-8 rounded-full object-cover flex-shrink-0"
            width={32}
            height={32}
          />
          <span className="font-display text-lg font-bold tracking-[0.18em] text-foreground">
            Y&apos;IORA
          </span>
        </a>

        {/* ── Links ── */}
        <ul className="relative z-10 flex items-center gap-1" role="list">
          {LINKS.map((link) => {
            const id = linkId(link.href);
            const isActive = active === id;
            return (
              <li key={link.href}>
                <a
                  ref={(el) => {
                    if (el) linkRefs.current.set(id, el);
                    else linkRefs.current.delete(id);
                  }}
                  href={link.href}
                  id={`nav-${id}`}
                  onMouseEnter={() => activateLink(id)}
                  onMouseLeave={deactivateLink}
                  onFocus={() => activateLink(id)}
                  onBlur={deactivateLink}
                  className={cn(
                    "relative z-10 block rounded-full px-4 py-2 text-sm font-medium",
                    "min-h-[44px] min-w-[44px] flex items-center justify-center",
                    "transition-colors duration-200",
                    isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground",
                    "focus-visible:outline-none",
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Liquid Glass Indicator (desktop only) ── */}
        <AnimatePresence>
          {glass && (
            <motion.div
              key="liquid-glass"
              aria-hidden
              initial={{ opacity: 0, x: glass.x, y: glass.y, width: glass.width }}
              animate={{ opacity: 1, x: glass.x, y: glass.y, width: glass.width }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={GLASS_SPRING}
              className="pointer-events-none absolute z-0"
              style={{
                height: "36px",
                borderRadius: "9999px",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.28) 100%)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                boxShadow: [
                  "inset 0 1px 1px rgba(255,255,255,0.5)",
                  "inset 0 -1px 1px rgba(255,255,255,0.15)",
                  "inset 0 0 20px rgba(255,255,255,0.08)",
                  "0 4px 24px -4px rgba(181,131,141,0.2)",
                  "0 0 0 1px rgba(255,255,255,0.3)",
                ].join(", "),
                translate: "0 -50%",
              }}
            />
          )}
        </AnimatePresence>

        {/* ── CTA ── */}
        <a
          href="#join"
          className={cn(
            "relative z-10 ml-2 flex items-center rounded-full",
            "bg-cocoa px-5 py-2.5 text-sm font-medium text-background",
            "min-h-[44px]",
            "shadow-[0_18px_40px_-20px_color-mix(in_oklab,var(--rose)_55%,transparent)]",
            "transition-all duration-300",
            "hover:bg-berry",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          Join the Circle
        </a>
      </nav>

      {/* ═══════════════════════════════════════════
          Mobile Navigation Bar
          ═══════════════════════════════════════════ */}
      <nav
        aria-label="Primary"
        className={cn(
          "relative mx-3 flex items-center justify-between sm:hidden",
          "rounded-full px-4 py-2.5",
          "bg-background/50 backdrop-blur-xl border border-border/40",
          "shadow-[0_8px_32px_-8px_rgba(58,44,44,0.12)]",
          scrolled && "bg-background/70 shadow-[0_12px_40px_-10px_rgba(58,44,44,0.18)]",
        )}
      >
        <a href="#top" className="relative z-10 flex items-center gap-2.5" aria-label="Y'IORA home">
          <img
            src={mark}
            alt=""
            className="h-8 w-8 rounded-full object-cover flex-shrink-0"
            width={32}
            height={32}
          />
          <span className="font-display text-lg font-bold tracking-[0.18em] text-foreground">
            Y&apos;IORA
          </span>
        </a>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-background/60 backdrop-blur-sm transition-colors hover:bg-background/80"
        >
          <span className="relative block h-4 w-5">
            <span
              className={cn(
                "absolute left-0 h-px w-full bg-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                mobileOpen ? "top-2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-px w-full bg-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                mobileOpen ? "top-2 -rotate-45" : "top-4",
              )}
            />
          </span>
        </button>
      </nav>

      {/* ═══════════════════════════════════════════
          Mobile Full-Screen Menu
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[119] sm:hidden"
          >
            {/* Backdrop */}
            <div
              aria-hidden
              className="absolute inset-0 bg-background/70 backdrop-blur-2xl"
              onClick={closeMobile}
            />

            {/* Menu content */}
            <motion.nav
              aria-label="Mobile navigation"
              initial={{ y: "-4%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-4%", opacity: 0 }}
              transition={GLASS_SPRING}
              className="relative flex h-full flex-col items-center justify-center px-6"
            >
              <ul className="flex flex-col items-center gap-2" role="list">
                {LINKS.map((link, i) => {
                  const id = linkId(link.href);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{
                        ...GLASS_SPRING,
                        delay: 0.04 + i * 0.04,
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={closeMobile}
                        className={cn(
                          "flex min-h-[48px] items-center justify-center rounded-2xl px-6 py-4",
                          "font-display text-2xl font-semibold text-foreground",
                          "transition-colors duration-200",
                          "hover:bg-white/20 hover:backdrop-blur-md active:bg-white/25",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2",
                        )}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Mobile CTA */}
              <motion.div
                className="mt-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{
                  ...GLASS_SPRING,
                  delay: 0.04 + LINKS.length * 0.04,
                }}
              >
                <a
                  href="#join"
                  onClick={closeMobile}
                  className={cn(
                    "inline-flex min-h-[52px] items-center justify-center rounded-full",
                    "bg-cocoa px-8 py-3.5 text-base font-semibold text-background",
                    "shadow-[0_18px_40px_-20px_color-mix(in_oklab,var(--rose)_55%,transparent)]",
                    "transition-all duration-300",
                    "hover:bg-berry",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2",
                  )}
                >
                  Join the Circle
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
