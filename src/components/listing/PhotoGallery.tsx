"use client";

import { GridDotsIcon } from "@/components/listing/icons";
import { HERO_PHOTOS, LISTING_TITLE, roomIndexForPhoto } from "@/components/listing/data";
import { useListingUI } from "@/components/listing/ListingUIProvider";

export function PhotoGallery() {
  const { openTour } = useListingUI();

  return (
    <section id="photo-gallery" aria-label="Photos of this place" className="relative mb-12">
      <div
        id="heroGrid"
        className="grid aspect-[1120/494] grid-cols-[35fr_17fr_17fr] grid-rows-[1fr_1fr] gap-2 overflow-hidden rounded-[12px] max-[743px]:h-[280px] max-[743px]:grid-cols-[1fr] max-[743px]:grid-rows-[280px]"
      >
        {HERO_PHOTOS.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`${LISTING_TITLE} image ${i + 1}`}
            onClick={() => openTour(roomIndexForPhoto(src))}
            className="relative block overflow-hidden border-none bg-[#eee] p-0 first:row-span-2 after:absolute after:inset-0 after:bg-[#0000] after:content-[''] after:[transition:background_.2s_ease] hover:after:bg-[#0000001a] active:[transform:scale(.997)] max-[743px]:not-first:hidden"
          >
            <img
              src={src}
              alt=""
              decoding="async"
              loading={i === 0 ? "eager" : "lazy"}
              className="block h-full w-full max-w-none object-cover [transition:filter_.2s_ease]"
            />
          </button>
        ))}
      </div>
      <button
        type="button"
        id="showAllPhotos"
        onClick={() => openTour()}
        className="absolute right-6 bottom-6 inline-flex items-center gap-2 rounded-[8px] border border-solid border-[#222] bg-white px-[15px] py-[7px] text-[12px] leading-4 font-medium shadow-[0_2px_8px_#00000026] [transition:transform_.1s,background_.15s] hover:bg-grey100 active:[transform:scale(.96)]"
      >
        <span className="inline-block h-[15px] w-[15px]">
          <GridDotsIcon />
        </span>{" "}
        Show all photos
      </button>
    </section>
  );
}
