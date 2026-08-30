/**
 * Navigation config seam — single source of truth for hash links.
 * Sections import ids from here so Nav and Section stay in sync.
 */
export const NAV_LINKS = [
  { href: "#about", label: "Our Story", id: "about" },
  { href: "#offerings", label: "Offerings", id: "offerings" },
  { href: "#events", label: "Events", id: "events" },
  { href: "#voices", label: "Voices", id: "voices" },
  { href: "#gallery", label: "Gallery", id: "gallery" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
