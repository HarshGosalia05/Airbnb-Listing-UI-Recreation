"use client";

import { HeartIcon, ShareIcon } from "@/components/listing/icons";
import { LISTING_TITLE } from "@/components/listing/data";
import { useListingUI } from "@/components/listing/ListingUIProvider";

const actionButton =
  "inline-flex items-center gap-2 rounded-[8px] border-none bg-transparent px-[10px] py-2 text-[14px] font-medium leading-[normal] [transition:background_.15s,transform_.05s] hover:bg-grey200 active:[transform:scale(.96)]";

export function ListingTitle() {
  const { share, saved, toggleSaved } = useListingUI();

  return (
    <section id="photos" className="flex items-start justify-between gap-4 pt-8 pb-[18px]">
      <h1 className="m-0 text-[26px] leading-[30px] font-medium tracking-normal">{LISTING_TITLE}</h1>
      <div className="flex shrink-0 gap-[2px]">
        <button className={actionButton} type="button" id="shareBtn" onClick={share}>
          <span className="inline-block h-4 w-4">
            <ShareIcon />
          </span>
          <span className="underline underline-offset-2">Share</span>
        </button>
        <button className={actionButton} type="button" id="saveBtn" onClick={toggleSaved} aria-pressed={saved} aria-label="Save">
          <span className="inline-block h-4 w-4">
            <HeartIcon filled={saved} />
          </span>
          <span className="underline underline-offset-2">{saved ? "Saved" : "Save"}</span>
        </button>
      </div>
    </section>
  );
}
