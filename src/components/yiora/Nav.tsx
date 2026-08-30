import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileNavBar, MobileMenu } from "./nav/MobileMenu";
import { useGlassPill } from "./nav/useGlassPill";

/**
 * Navigation module — deep seam that owns LINKS via nav-config,
 * glass-pill physics via useGlassPill adapter, and mobile a11y via MobileMenu.
 * Interface: none (fixed header). Depth is high: consumers just <Nav />.
 */
export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const { active, glass, activate, deactivate } = useGlassPill(navRef, linkRefs);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[120] transition-all duration-500",
        scrolled ? "pt-3" : "pt-4",
      )}
    >
      <DesktopNav
        scrolled={scrolled}
        navRef={navRef}
        linkRefs={linkRefs}
        active={active}
        glass={glass}
        onActivate={activate}
        onDeactivate={deactivate}
      />
      <MobileNavBar
        scrolled={scrolled}
        open={mobileOpen}
        onToggle={() => setMobileOpen((v) => !v)}
      />
      <MobileMenu open={mobileOpen} onClose={closeMobile} />
    </header>
  );
}
