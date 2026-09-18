import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/yiora/SiteShell";
import { JoinCircle } from "@/components/yiora/JoinCircle";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join the Circle — Y'IORA" },
      {
        name: "description",
        content:
          "Plant yourself in the garden: one warm letter a month with what's coming, who's hosting, and early seats before they go public.",
      },
    ],
  }),
  component: JoinPage,
});

function JoinPage() {
  return (
    <SiteShell>
      <JoinCircle />
    </SiteShell>
  );
}
