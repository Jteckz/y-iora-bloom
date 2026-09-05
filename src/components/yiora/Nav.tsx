import { useCallback, useEffect, useRef, useState } from "react";
import "./Nav.css";

const LINKS = [
  { href: "#about", label: "Our Story" },
  { href: "#offerings", label: "Offerings" },
  { href: "#events", label: "Events" },
  { href: "#voices", label: "Voices" },
  { href: "#gallery", label: "Gallery" },
] as const;

const SCROLL_THRESHOLD = 80;
const CLOSE_DURATION = 300;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [overlayMounted, setOverlayMounted] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const closeTimer = useRef<number | null>(null);

  /* ── Scroll detection: STATE 2 at window.scrollY >= 80 ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Clear pending close timer on unmount ── */
  useEffect(() => {
    return () => {
      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current);
      }
    };
  }, []);

  const openOverlay = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOverlayMounted(true);
    /* Mount first, then flip the visible class on the next frame so the
       400ms ease-out entrance transition runs. */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOverlayVisible(true));
    });
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlayVisible(false);
    /* Wait out the 300ms ease-in exit transition before unmounting. */
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
    }
    closeTimer.current = window.setTimeout(() => {
      setOverlayMounted(false);
      closeTimer.current = null;
    }, CLOSE_DURATION);
  }, []);

  /* ── Scroll lock while the overlay is present ── */
  useEffect(() => {
    if (!overlayMounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [overlayMounted]);

  /* ── Escape closes the overlay ── */
  useEffect(() => {
    if (!overlayMounted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [overlayMounted, closeOverlay]);

  return (
    <>
      <header className={scrolled ? "yiora-header header--scrolled" : "yiora-header"}>
        <a href="#top" className="yiora-wordmark" aria-label="Y'IORA — back to top">
          Y&rsquo;IORA
        </a>
        <button
          type="button"
          className="yiora-hamburger"
          aria-label="Open navigation"
          aria-expanded={overlayMounted}
          aria-controls="yiora-overlay"
          onClick={openOverlay}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </header>

      {overlayMounted && (
        <div
          id="yiora-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={overlayVisible ? "yiora-overlay yiora-overlay--open" : "yiora-overlay"}
        >
          <button
            type="button"
            className="yiora-close"
            aria-label="Close navigation"
            onClick={closeOverlay}
          >
            <span className="yiora-close-box" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>

          <nav aria-label="Site" className="yiora-overlay-nav">
            <ul className="yiora-overlay-list">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="yiora-overlay-link" onClick={closeOverlay}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
