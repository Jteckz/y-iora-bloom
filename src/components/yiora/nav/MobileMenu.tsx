import { motion, AnimatePresence } from "framer-motion";
import mark from "@/assets/gallery-8.png";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./nav-config";

const GLASS_SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
  mass: 0.7,
};

interface Props {
  open: boolean;
  onClose: () => void;
  scrolled: boolean;
  onToggle: () => void;
}

export function MobileNavBar({
  scrolled,
  open,
  onToggle,
}: Pick<Props, "scrolled" | "open" | "onToggle">) {
  return (
    <nav
      aria-label="Primary"
      className={cn(
        "relative mx-3 flex items-center justify-between sm:hidden",
        "rounded-full px-4 py-2.5",
        "bg-background/85 backdrop-blur-[12px] border border-cocoa/10",
        "shadow-[0_4px_24px_-12px_rgba(58,44,44,0.14)]",
        scrolled && "bg-background/90 shadow-[0_8px_32px_-14px_rgba(58,44,44,0.18)]",
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
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        onClick={onToggle}
        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-background/60 backdrop-blur-sm transition-colors hover:bg-background/80"
      >
        <span className="relative block h-4 w-5">
          <span
            className={cn(
              "absolute left-0 h-px w-full bg-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              open ? "top-2 rotate-45" : "top-0",
            )}
          />
          <span
            className={cn(
              "absolute left-0 h-px w-full bg-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              open ? "top-2 -rotate-45" : "top-4",
            )}
          />
        </span>
      </button>
    </nav>
  );
}

export function MobileMenu({ open, onClose }: Pick<Props, "open" | "onClose">) {
  return (
    <AnimatePresence>
      {open && (
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
          <div
            aria-hidden
            className="absolute inset-0 bg-background/70 backdrop-blur-2xl"
            onClick={onClose}
          />
          <motion.nav
            aria-label="Mobile navigation"
            initial={{ y: "-4%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-4%", opacity: 0 }}
            transition={GLASS_SPRING}
            className="relative flex h-full flex-col items-center justify-center px-6"
          >
            <p className="mb-6 font-mono text-[11px] tracking-[0.18em] uppercase text-cocoa/40">
              Navigate — Tanzania
            </p>
            <ul className="flex flex-col items-center gap-1" role="list">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ ...GLASS_SPRING, delay: 0.04 + i * 0.04 }}
                >
                  <a
                    href={link.href}
                    onClick={onClose}
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
              ))}
            </ul>
            <motion.div
              className="mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ ...GLASS_SPRING, delay: 0.04 + NAV_LINKS.length * 0.04 }}
            >
              <a
                href="#join"
                onClick={onClose}
                className={cn(
                  "inline-flex min-h-[52px] items-center justify-center rounded-full",
                  "bg-cocoa px-8 py-3.5 text-base font-semibold text-background",
                  "shadow-[0_18px_40px_-20px_color-mix(in_oklab,var(--rose)_55%,transparent)]",
                  "transition-all duration-300 hover:bg-berry",
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
  );
}
