import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";

/** Shared layout for all public pages: skip-link + cursor + header + footer. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:bg-cocoa focus:px-5 focus:py-3 focus:text-background"
      >
        Skip to content
      </a>
      <CustomCursor />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
