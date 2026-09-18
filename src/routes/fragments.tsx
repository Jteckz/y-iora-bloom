import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/yiora/SiteShell";
import { Testimonials } from "@/components/yiora/Testimonials";
import { Gallery } from "@/components/yiora/Gallery";

export const Route = createFileRoute("/fragments")({
  head: () => ({
    meta: [
      { title: "Fragments — Y'IORA" },
      {
        name: "description",
        content:
          "Small notes from the table and fragments from past gatherings — voices and memories from the Y'IORA community.",
      },
    ],
  }),
  component: FragmentsPage,
});

function FragmentsPage() {
  return (
    <SiteShell>
      <Testimonials />
      <Gallery />
    </SiteShell>
  );
}
