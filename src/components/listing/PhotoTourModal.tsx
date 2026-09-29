"use client";

import { useEffect, useRef } from "react";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import { cn, scrollBehavior } from "@/lib/utils";
import {
  ChevronLeftStrokeIcon,
  HeartIcon,
  ShareIcon,
} from "@/components/listing/icons";
import { LISTING_TITLE, TOUR_ROOMS } from "./data";
import { useListingUI } from "./ListingUIProvider";

/** `._bNHEUf` — 40px round ghost icon button. */
const ghostButton =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border-none bg-transparent p-0 leading-[normal] [transition:background_.16s,transform_.08s] hover:bg-grey200 active:[transform:scale(.9)]";

const iconSpan = "inline-block h-[18px] w-[18px]";

/** Scrolls the tour's scroll area so the given room section sits at its top. */
function scrollSectionIntoView(scroller: HTMLElement | null, section: HTMLElement | null | undefined, behavior: ScrollBehavior) {
  if (!scroller || !section) return;
  const top = section.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
  scroller.scrollTo({ top, behavior });
}

export function PhotoTourModal() {
  const { tourOpen, tourTargetRoom, clearTourTarget, closeTour, share, toggleSaved, saved, openLightbox, lightboxIndex } =
    useListingUI();
  const lightboxOpen = lightboxIndex !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialogFocus(dialogRef, tourOpen, tourOpen && !lightboxOpen);
  const scrollRef = useRef<HTMLDivElement>(null);
  const roomRefs = useRef<(HTMLElement | null)[]>([]);
  const wasOpen = useRef(false);

  useEffect(() => {
    const justOpened = tourOpen && !wasOpen.current;
    wasOpen.current = tourOpen;
    if (!tourOpen) return;
    if (tourTargetRoom !== null) {
      scrollSectionIntoView(scrollRef.current, roomRefs.current[tourTargetRoom], "auto");
      clearTourTarget();
    } else if (justOpened && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [tourOpen, tourTargetRoom, clearTourTarget]);

  return (
    <div
      ref={dialogRef}
      aria-hidden={!tourOpen}
      inert={!tourOpen || lightboxOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      className={cn(
        "fixed inset-0 z-[120] flex flex-col bg-white",
        tourOpen
          ? "visible opacity-100 [transform:none] [transition:opacity_.3s_cubic-bezier(.2,0,0,1),transform_.3s_cubic-bezier(.2,0,0,1),visibility_0s]"
          : "invisible opacity-0 [transform:translateY(28px)] [transition:opacity_.3s_cubic-bezier(.2,0,0,1),transform_.3s_cubic-bezier(.2,0,0,1),visibility_0s_linear_.3s]",
      )}
    >
      <header className="z-[5] flex h-[88px] shrink-0 items-center bg-white px-8">
        <button className={cn(ghostButton, "-ml-2")} type="button" aria-label="Back" onClick={closeTour}>
          <span className={iconSpan}>
            <ChevronLeftStrokeIcon strokeWidth={2} />
          </span>
        </button>
        <h2 className="absolute left-1/2 m-0 text-[16px] font-medium [transform:translate(-50%)]">Photo tour</h2>
        <div className="ml-auto flex gap-0.5">
          <button className={ghostButton} type="button" aria-label="Share" onClick={share}>
            <span className={iconSpan}>
              <ShareIcon />
            </span>
          </button>
          <button className={ghostButton} type="button" aria-label="Save" aria-pressed={saved} onClick={toggleSaved}>
            <span className={iconSpan}>
              <HeartIcon filled={saved} />
            </span>
          </button>
        </div>
      </header>
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1024px] px-6 pb-24">
          <nav
            className="mb-10 grid grid-cols-[repeat(8,1fr)] gap-3 max-[1128px]:grid-cols-[repeat(4,1fr)] max-[743px]:grid-cols-[repeat(2,1fr)]"
            aria-label="Photo categories"
          >
            {TOUR_ROOMS.map((room, i) => (
              <button
                key={room.name}
                className="group flex flex-col gap-2 border-none bg-none p-0 text-left leading-[normal]"
                type="button"
                aria-label={room.name}
                onClick={() => scrollSectionIntoView(scrollRef.current, roomRefs.current[i], scrollBehavior())}
              >
                <img
                  loading="lazy"
                  alt=""
                  src={room.cover}
                  className="block aspect-[106/100] w-full rounded-lg object-cover [transition:transform_.25s_cubic-bezier(.2,0,0,1),filter_.2s] group-hover:[filter:brightness(.94)] group-hover:[transform:scale(1.04)] group-active:[transform:scale(.99)]"
                />
                <span className="text-[14px] text-muted2">{room.name}</span>
              </button>
            ))}
          </nav>
          <div className="tour-rooms">
            {TOUR_ROOMS.map((room, i) => (
              <section
                key={room.name}
                ref={(el) => {
                  roomRefs.current[i] = el;
                }}
                className="grid grid-cols-[1fr_1fr] items-start gap-x-[60px] gap-y-5 pt-4 pb-1 max-[1128px]:grid-cols-[1fr]"
              >
                <div className="sticky top-5 max-[1128px]:static">
                  <div className="text-[32px] leading-[1.1] font-medium tracking-[-.02em]">{room.name}</div>
                  {room.subtitle ? (
                    <div className="mt-2 text-[16px] leading-[1.4] text-muted2">{room.subtitle}</div>
                  ) : null}
                </div>
                <div className="flex flex-col gap-3">
                  {room.rows.map((row) => (
                    <div
                      key={row.photos[0].idx}
                      className={cn(
                        "grid gap-3",
                        row.layout === "single"
                          ? "grid-cols-[1fr]"
                          : "grid-cols-[1fr_1fr] max-[743px]:grid-cols-[1fr]",
                      )}
                    >
                      {row.photos.map((photo) => (
                        <button
                          key={photo.idx}
                          className="group relative block aspect-[3/2] w-full overflow-hidden rounded-lg border-none bg-[#eee] p-0 after:absolute after:inset-0 after:bg-[#0000] after:transition-[background] after:duration-200 after:content-[''] hover:after:bg-[#00000014]"
                          type="button"
                          aria-label={`${LISTING_TITLE} image ${photo.idx + 1}`}
                          onClick={() => openLightbox(photo.idx)}
                        >
                          <img
                            loading="lazy"
                            alt={room.name}
                            src={photo.src}
                            className="block h-full w-full object-cover [transition:transform_.4s_cubic-bezier(.2,0,0,1)] group-hover:[transform:scale(1.04)] group-active:[transform:scale(1)]"
                          />
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
