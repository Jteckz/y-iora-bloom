import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";

/**
 * Soft petal cursor. Purely decorative: hidden on touch devices and for
 * reduced-motion users. The native OS cursor is never hidden — the petal
 * dot and halo are an enhancement, so the pointer can never disappear.
 * Rendered above the header (z 1000) and overlay (z 2000) so it stays
 * visible in the navigation region.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setActive(true);
    document.documentElement.classList.add("yiora-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let hx = x;
    let hy = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a,button,[data-cursor='grow'],input,textarea");
      halo.current?.classList.toggle("is-grown", Boolean(interactive));
    };

    const loop = () => {
      hx += (x - hx) * 0.14;
      hy += (y - hy) * 0.14;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (halo.current) halo.current.style.transform = `translate3d(${hx}px, ${hy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("yiora-cursor");
    };
  }, [reduced]);

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[3000]">
      <style>{`
        html.yiora-cursor input, html.yiora-cursor textarea { cursor: text; }
        .yiora-halo { transition: width .4s var(--ease-silk), height .4s var(--ease-silk), background .4s var(--ease-silk); }
        .yiora-halo.is-grown { width: 68px; height: 68px; background: color-mix(in oklab, var(--petal) 34%, transparent); }
      `}</style>
      <div
        ref={halo}
        className="yiora-halo absolute -ml-[19px] -mt-[19px] h-[38px] w-[38px] rounded-full border border-rose/50 bg-petal/15"
      />
      <div
        ref={dot}
        className="absolute -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-rose"
      />
    </div>
  );
}
