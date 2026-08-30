import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/yiora/Nav";
import { Hero } from "@/components/yiora/Hero";
import { About } from "@/components/yiora/About";
import { Offerings } from "@/components/yiora/Offerings";
import { Events } from "@/components/yiora/Events";
import { Testimonials } from "@/components/yiora/Testimonials";
import { Gallery } from "@/components/yiora/Gallery";
import { Footer } from "@/components/yiora/Footer";

const TITLE = "Y'IORA — Curated Lifestyle Events for Women";
const DESCRIPTION =
  "Y'IORA curates fun, affordable and meaningful lifestyle events for women — brunches, sunrise circles, workshops and supper clubs built for real connection.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Y'IORA",
          description: DESCRIPTION,
          foundingDate: "2026",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:bg-cocoa focus:px-5 focus:py-3 focus:text-background"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Offerings />
        <Events />
        <Testimonials />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
