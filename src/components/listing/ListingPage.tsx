import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AmenitiesModal } from "./AmenitiesModal";
import { AmenitiesPreview } from "./AmenitiesPreview";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import { BookingSidebar } from "./BookingSidebar";
import { DescriptionAndSleep } from "./DescriptionAndSleep";
import { HostSection } from "./HostSection";
import { Lightbox } from "./Lightbox";
import { ListingOverview } from "./ListingOverview";
import { ListingTitle } from "./ListingTitle";
import { ListingUIProvider } from "./ListingUIProvider";
import { LocationSection } from "./LocationSection";
import { MoreStaysNearby } from "./MoreStaysNearby";
import { PageContent } from "./PageContent";
import { PhotoGallery } from "./PhotoGallery";
import { PhotoTourModal } from "./PhotoTourModal";
import { ReviewsList } from "./ReviewsList";
import { ReviewsSummary } from "./ReviewsSummary";
import { SiteHeader } from "./SiteHeader";
import { StickyNav } from "./StickyNav";
import { ThingsToKnow } from "./ThingsToKnow";
import { Toast } from "./Toast";

/** Full-width listing section (original `._WNEjqG`): 48px vertical padding, top border except the first. */
function Section({ id, first = false, children }: { id?: string; first?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={cn("py-12", !first && "border-t border-line-soft")}>
      {children}
    </section>
  );
}

export function ListingPage() {
  return (
    <ListingUIProvider>
      <PageContent>
        <SiteHeader />
        <StickyNav />
        <main id="main">
          <div className="mx-auto max-w-[1280px] px-20 max-[1128px]:px-10 max-[743px]:px-6">
            <ListingTitle />
            <PhotoGallery />

            <div className="grid grid-cols-[minmax(0,1fr)_372px] items-stretch gap-x-24 max-[1128px]:grid-cols-1">
              <div className="min-w-0">
                <ListingOverview />
                <DescriptionAndSleep />
                <AmenitiesPreview />
                <AvailabilityCalendar />
              </div>
              <BookingSidebar />
            </div>

            <div className="border-t border-line-soft">
              <Section id="reviews" first>
                <ReviewsSummary />
                <ReviewsList />
              </Section>
              <Section id="location">
                <LocationSection />
              </Section>
              <Section>
                <HostSection />
              </Section>
              <Section>
                <ThingsToKnow />
              </Section>
              <Section>
                <MoreStaysNearby />
              </Section>
            </div>
          </div>
        </main>
      </PageContent>
      <PhotoTourModal />
      <Lightbox />
      <AmenitiesModal />
      <Toast />
    </ListingUIProvider>
  );
}
