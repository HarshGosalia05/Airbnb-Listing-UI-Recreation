// Content contracts for the Airbnb listing page UI.

export interface TourPhoto {
  /** Global index across the whole photo tour (used by the lightbox). */
  idx: number;
  src: string;
}

export interface TourRow {
  /** "single" = one full-width 3:2 photo, "double" = two side-by-side 3:2 photos. */
  layout: "single" | "double";
  photos: TourPhoto[];
}

export interface TourRoom {
  name: string;
  /** Amenity summary under the room name; empty string when the room has none. */
  subtitle: string;
  /** Thumbnail shown in the tour's category nav. */
  cover: string;
  rows: TourRow[];
}
