import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/yiora/SiteShell";
import { About } from "@/components/yiora/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Y'IORA" },
      {
        name: "description",
        content:
          "Y'IORA is a lifestyle organisation curating fun, affordable and meaningful experiences that bring women together.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <About />
    </SiteShell>
  );
}
