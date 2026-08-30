/**
 * Events data seam — single source of truth for the Events module.
 * Adapter boundary: replace this array with a CMS/fetch call later;
 * the Events module's interface (events: Event[]) stays stable.
 */
export interface EventItem {
  title: string;
  date: string;
  place: string;
  seats: string;
  img: string;
  blurb: string;
}

// Empty today — renders <ComingSoon /> via the Events module's empty branch.
// Add entries here to activate the coverflow carousel (no component changes needed).
export const EVENTS: EventItem[] = [];
