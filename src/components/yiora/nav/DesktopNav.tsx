import { motion, AnimatePresence } from "framer-motion";
import mark from "@/assets/gallery-8.png";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./nav-config";
import type { GlassRect } from "./useGlassPill";

const GLASS_SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
  mass: 0.7,
};

interface Props {
  scrolled: boolean;
  navRef: React.RefObject<HTMLDivElement | null>;
  linkRefs: React.RefObject<Map<string, HTMLAnchorElement>>;
  active: string | null;
  glass: GlassRect | null;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
}

export function DesktopNav({
  scrolled,
  navRef,
  linkRefs,
  active,
  glass,
  onActivate,
  onDeactivate,
}: Props) {
  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={cn(
        "relative mx-3 hidden items-center justify-between gap-4 sm:flex sm:px-6",
        "rounded-full px-4 py-2",
        "bg-background/80 backdrop-blur-[12px] border border-cocoa/10",
        "shadow-[0_4px_24px_-12px_rgba(58,44,44,0.14),0_1px_3px_rgba(58,44,44,0.06)]",
        scrolled && "bg-background/85 shadow-[0_8px_32px_-14px_rgba(58,44,44,0.18)]",
        "mx-auto max-w-6xl",
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

      <ul className="relative z-10 flex items-center gap-1" role="list">
        {NAV_LINKS.map((link) => {
          const isActive = active === link.id;
          return (
            <li key={link.href}>
              <a
                ref={(el) => {
                  if (el) linkRefs.current.set(link.id, el);
                  else linkRefs.current.delete(link.id);
                }}
                href={link.href}
                id={`nav-${link.id}`}
                onMouseEnter={() => onActivate(link.id)}
                onMouseLeave={onDeactivate}
                onFocus={() => onActivate(link.id)}
                onBlur={onDeactivate}
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

      <AnimatePresence>
        {glass && (
          <motion.div
            key="liquid-glass"
            aria-hidden
            initial={{ opacity: 0, x: glass.x, width: glass.width }}
            animate={{ opacity: 1, x: glass.x, width: glass.width }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={GLASS_SPRING}
            className="pointer-events-none absolute z-0"
            style={{
              top: "50%",
              height: "34px",
              borderRadius: "9999px",
              background: "color-mix(in oklab, var(--blush) 88%, white)",
              border: "1px solid color-mix(in oklab, var(--cocoa) 8%, transparent)",
              boxShadow: "0 1px 6px rgba(58,44,44,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
              translate: "0 -50%",
            }}
          />
        )}
      </AnimatePresence>

      <a
        href="#join"
        className={cn(
          "pressable relative z-10 ml-2 flex items-center rounded-full",
          "bg-cocoa px-5 py-2.5 text-[0.88rem] font-[600] tracking-[-0.01em] text-background",
          "min-h-[40px]",
          "shadow-[0_6px_20px_-10px_rgba(58,44,44,0.3)]",
          "transition-[transform,background-color,box-shadow] duration-200 ease-out",
          "hover:bg-berry hover:shadow-[0_10px_28px_-12px_rgba(114,43,93,0.35)]",
          "active:scale-[0.97]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        Join the Circle
      </a>
    </nav>
  );
}
