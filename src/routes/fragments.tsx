import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy route — /fragments used to render Voices + Gallery combined.
 * Kept as a redirect so old links/bookmarks land on /voices.
 */
export const Route = createFileRoute("/fragments")({
  beforeLoad: () => {
    throw redirect({ to: "/voices" });
  },
});
