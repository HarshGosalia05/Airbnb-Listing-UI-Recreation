"use client";

import { useEffect, useRef, useState } from "react";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import { cn } from "@/lib/utils";
import {
  ChevronLeftStrokeIcon,
  ChevronRightStrokeIcon,
  CloseIcon,
  GridDotsIcon,
} from "@/components/listing/icons";
import { ALL_TOUR_PHOTOS } from "./data";
import { useListingUI } from "./ListingUIProvider";

/** `._bNHEUf` — 40px round ghost icon button. */
const ghostButton =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border-none bg-transparent p-0 leading-[normal] [transition:background_.16s,transform_.08s] hover:bg-grey200 active:[transform:scale(.9)]";

/** `._KNOVTi._bNHEUf` — outlined prev/next arrow. */
const navButton =
  "absolute top-1/2 z-[3] inline-flex h-10 w-10 items-center justify-center rounded-full border border-solid border-ink bg-white p-0 leading-[normal] [transform:translateY(-50%)] [transition:background_.16s,transform_.08s] hover:bg-grey100 enabled:active:[transform:translateY(-50%)_scale(.92)] disabled:cursor-default disabled:border-[#ccc] disabled:opacity-[.28] disabled:hover:bg-white";

const iconSpan = "inline-block h-[18px] w-[18px]";

const TOTAL = ALL_TOUR_PHOTOS.length;

export function Lightbox() {
  const { lightboxIndex, openLightbox, closeLightbox } = useListingUI();
  const open = lightboxIndex !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialogFocus(dialogRef, open);

  // Keep the last photo on screen while the viewer fades out.
  const [lastIndex, setLastIndex] = useState<number>(0);
  if (lightboxIndex !== null && lightboxIndex !== lastIndex) setLastIndex(lightboxIndex);
  const index = lightboxIndex ?? lastIndex;
  const photo = ALL_TOUR_PHOTOS[index];

  const hasPrev = index > 0;
  const hasNext = index < TOTAL - 1;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && lightboxIndex > 0) openLightbox(lightboxIndex - 1);
      else if (e.key === "ArrowRight" && lightboxIndex < TOTAL - 1) openLightbox(lightboxIndex + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, openLightbox]);

  return (
    <div
      ref={dialogRef}
      aria-hidden={!open}
      inert={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className={cn(
        "fixed inset-0 z-[140] flex items-center justify-center bg-white",
        open
          ? "visible opacity-100 [transition:opacity_.25s_ease,visibility_0s]"
          : "invisible opacity-0 [transition:opacity_.25s_ease,visibility_0s_linear_.25s]",
      )}
    >
      <header className="absolute top-0 right-0 left-0 z-[3] flex h-[72px] items-center px-6">
        <button className={cn(ghostButton, "-ml-2")} type="button" aria-label="Show all photos" onClick={closeLightbox}>
          <span className={iconSpan}>
            <GridDotsIcon />
          </span>
        </button>
        <div className="absolute left-1/2 text-[16px] font-medium [transform:translate(-50%)]">{photo?.room}</div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-[14px]" aria-live="polite">
            {index + 1} / {TOTAL}
          </span>
          <button className={ghostButton} type="button" aria-label="Close" onClick={closeLightbox}>
            <span className={iconSpan}>
              <CloseIcon />
            </span>
          </button>
        </div>
      </header>
      <button
        className={cn(navButton, "left-5")}
        type="button"
        aria-label="Previous"
        disabled={!hasPrev}
        onClick={() => hasPrev && openLightbox(index - 1)}
      >
        <span className={iconSpan}>
          <ChevronLeftStrokeIcon strokeWidth={4} />
        </span>
      </button>
      <div className="flex h-full w-full items-center justify-center px-24 py-[88px] max-[743px]:px-3 max-[743px]:py-20">
        {photo ? (
          <img src={photo.src} alt={photo.room} className="max-h-full max-w-full object-contain" />
        ) : null}
      </div>
      <button
        className={cn(navButton, "right-5")}
        type="button"
        aria-label="Next"
        disabled={!hasNext}
        onClick={() => hasNext && openLightbox(index + 1)}
      >
        <span className={iconSpan}>
          <ChevronRightStrokeIcon strokeWidth={4} />
        </span>
      </button>
    </div>
  );
}
