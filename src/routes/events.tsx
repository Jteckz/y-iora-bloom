import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/yiora/SiteShell";
import { Events } from "@/components/yiora/Events";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Y'IORA" },
      {
        name: "description",
        content: "The calendar: upcoming Y'IORA gatherings worth rearranging your weekend for.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <SiteShell>
      <Events />
    </SiteShell>
  );
}
