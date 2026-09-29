"use client";

import type { ReactNode } from "react";
import { useListingUI } from "./ListingUIProvider";

/** Page content behind the overlays; inert while any overlay is open so focus and screen readers stay in the dialog. */
export function PageContent({ children }: { children: ReactNode }) {
  const { tourOpen, lightboxIndex, amenitiesOpen } = useListingUI();
  return <div inert={tourOpen || lightboxIndex !== null || amenitiesOpen}>{children}</div>;
}
