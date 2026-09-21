import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/yiora/SiteShell";
import { Hero } from "@/components/yiora/Hero";

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
    <SiteShell>
      <Hero />
    </SiteShell>
  );
}
