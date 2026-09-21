import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/yiora/SiteShell";
import { Offerings } from "@/components/yiora/Offerings";

export const Route = createFileRoute("/offerings")({
  head: () => ({
    meta: [
      { title: "Offerings — Y'IORA" },
      {
        name: "description",
        content:
          "What we offer: gatherings, movement, workshops and growth circles — four circles, one community.",
      },
    ],
  }),
  component: OfferingsPage,
});

function OfferingsPage() {
  return (
    <SiteShell>
      <Offerings />
    </SiteShell>
  );
}
