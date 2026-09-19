import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/yiora/SiteShell";
import { Gallery } from "@/components/yiora/Gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Y'IORA" },
      {
        name: "description",
        content:
          "Fragments from past gatherings — memories from the Y'IORA community. Every face here walked in as a stranger.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <SiteShell>
      <Gallery />
    </SiteShell>
  );
}
