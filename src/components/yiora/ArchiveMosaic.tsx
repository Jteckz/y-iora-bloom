import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

import "./ArchiveMosaic.css";

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    const idx = queries.findIndex((q) => window.matchMedia(q).matches);
    return values[idx] ?? defaultValue;
  };

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get());
    queries.forEach((q) => window.matchMedia(q).addEventListener("change", handler));
    return () => queries.forEach((q) => window.matchMedia(q).removeEventListener("change", handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries.join(",")]);

  return value;
};

const useMeasure = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }),
    ),
  );
};

interface MasonryItem {
  id: string;
  img: string;
  url?: string;
  height: number;
  // allow extra props
  [key: string]: unknown;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ArchiveMosaicProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "top" | "bottom" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const ArchiveMosaic = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}: ArchiveMosaicProps) => {
  const columns = useMedia(
    ["(min-width:1500px)", "(min-width:1000px)", "(min-width:600px)", "(min-width:400px)"],
    [4, 3, 3, 2],
    1,
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === "random") {
      const directions: Array<"top" | "bottom" | "left" | "right"> = ["top", "bottom", "left", "right"];
      direction = directions[Math.floor(Math.random() * directions.length)] as typeof animateFrom;
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height } as GridItem;
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);
  const maxHeight = useMemo(() => {
    if (!grid.length) return 0;
    return Math.max(...grid.map((g) => g.y + g.h));
  }, [grid]);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    const isStatic = !blurToFocus && stagger === 0;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!hasMounted.current) {
        // Pinterest look: no fade-in, just place static — requested by user
        if (isStatic) {
          gsap.set(selector, {
            opacity: 1,
            ...animationProps,
            filter: "blur(0px)",
          });
        } else {
          const initialPos = getInitialPosition(item);
          const initialState: Record<string, unknown> = {
            opacity: 0,
            x: initialPos.x,
            y: initialPos.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(10px)" }),
          };

          gsap.fromTo(
            selector,
            initialState,
            {
              opacity: 1,
              ...animationProps,
              ...(blurToFocus && { filter: "blur(0px)" }),
              duration: 0.8,
              ease: "power3.out",
              delay: index * stagger,
            },
          );
        }
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, item: GridItem) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement | null;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3,
        });
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, item: GridItem) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement | null;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }
  };

  return (
    <div ref={containerRef} className="list" style={{ height: maxHeight ? `${maxHeight}px` : undefined, minHeight: maxHeight ? `${maxHeight}px` : "400px" }}>
      {grid.map((item) => {
        const alt = (item as unknown as { alt?: string }).alt as string | undefined;
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="item-wrapper group/masonry"
            onClick={() => item.url && window.open(item.url, "_blank", "noopener")}
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onMouseLeave={(e) => handleMouseLeave(e, item)}
            role={item.url ? "link" : undefined}
            tabIndex={item.url ? 0 : undefined}
            aria-label={alt}
          >
            <div className="item-img" style={{ backgroundImage: `url(${item.img})` }}>
              {colorShiftOnHover && (
                <div
                  className="color-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))",
                    opacity: 0,
                    pointerEvents: "none",
                    borderRadius: "12px",
                  }}
                />
              )}
              {alt && (
                <div className="masonry-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/80 via-cocoa/40 to-transparent p-3 pt-8 opacity-0 transition-opacity duration-300 group-hover/masonry:opacity-100">
                  <p className="text-[0.78rem] leading-snug text-white line-clamp-2">{alt}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArchiveMosaic;
export { ArchiveMosaic };
