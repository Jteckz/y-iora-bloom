import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/yiora/SiteShell";
import { Testimonials } from "@/components/yiora/Testimonials";

export const Route = createFileRoute("/voices")({
  head: () => ({
    meta: [
      { title: "Voices — Y'IORA" },
      {
        name: "description",
        content:
          "Small notes from the table — voices from the Y'IORA community. Share what stayed with you after the room grew quiet.",
      },
    ],
  }),
  component: VoicesPage,
});

function VoicesPage() {
  return (
    <SiteShell>
      <Testimonials />
    </SiteShell>
  );
}
