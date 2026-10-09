"use client";

import { ChevronDownIcon } from "@/components/listing/icons";
import { IMG } from "@/components/listing/data";
import { useListingUI } from "@/components/listing/ListingUIProvider";

function FlagIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      fill="currentColor"
      className="block h-full w-full"
    >
      <path d="m7.5011 1c.5272 0 .9591.40794.99725.92537l.00275.07463v1h5.5c.31265 0 .5435.281645.4935.581075l-.01275.056285-.96125 3.36264.96125 3.36265c.08055.2818-.0967.5625-.36775.62465l-.0554.00945-.0576.00325h-5.5c-.5272 0-.9591-.40795-.99725-.92535l-.00275-.07465v-1h-5v6h-1v-14zm1 3h-1v4h1z" />
    </svg>
  );
}

const label = "text-[10px] font-bold tracking-[.04em]";
const value = "mt-[2px] text-[14px]";

export function BookingSidebar() {
  const { reserved, reserve } = useListingUI();
  return (
    <aside className="relative self-stretch max-[1128px]:hidden">
      <div className="sticky top-[100px]" id="bookingSticky">
        <div className="mb-6 flex items-center gap-3 rounded-[12px] border border-solid border-line bg-white p-4">
          <img className="block h-8 w-8 shrink-0 object-contain" src={`${IMG}/0395b027.svg`} alt="" aria-hidden="true" />
          <div className="flex-1 text-[14px] leading-[1.3]">
            Get 10% off your next stay.
            <br />
            <span className="font-medium underline">
              Terms apply
            </span>
          </div>
          <button
            type="button"
            className="rounded-[8px] border-none bg-[#f7f7f7] px-[14px] py-2 text-[14px] leading-[normal] font-medium hover:bg-grey200"
          >
            Claim
          </button>
        </div>
        <div className="rounded-[12px] border border-solid border-card-border px-6 pt-[22px] pb-6 shadow-card">
          <div className="mb-[18px] flex items-baseline gap-[6px]">
            <span className="text-[22px] font-medium underline underline-offset-2">₹28,499</span>
            <span className="text-[15px] text-[#222]">for 5 nights</span>
          </div>
          <div className="overflow-hidden rounded-[8px] border border-solid border-[#b0b0b0]">
            <div className="grid grid-cols-[1fr_1fr]">
              <div className="border border-solid border-transparent px-3 py-[10px]">
                <div className={label}>CHECK-IN</div>
                <div className={value}>10/18/2026</div>
              </div>
              <div className="border border-solid border-transparent border-l-[#b0b0b0] px-3 py-[10px]">
                <div className={label}>CHECKOUT</div>
                <div className={value}>10/23/2026</div>
              </div>
            </div>
            <div className="flex items-center justify-between border-0 border-t border-solid border-t-[#b0b0b0] px-3 py-[10px]">
              <div>
                <div className={label}>GUESTS</div>
                <div className={value}>2 guests</div>
              </div>
              <span className="h-4 w-4">
                <ChevronDownIcon />
              </span>
            </div>
          </div>
          <div className="my-4 rounded-[8px] bg-grey100 p-2 text-center text-[13px] text-muted2">
            Free cancellation before <b className="font-medium text-[#222]">17 October</b>
          </div>
          <button
            type="button"
            id="reserveBtn"
            onClick={reserve}
            className="mt-[2px] h-12 w-full rounded-[999px] border-none bg-reserve px-6 py-0 text-[16px] leading-[normal] font-medium text-white [transition:filter_.15s,transform_.05s] hover:bg-reserve-hover active:[transform:scale(.985)]"
          >
            Reserve
          </button>
          {reserved && (
            <div className="mt-4 text-center text-[14px] text-muted2">You won&apos;t be charged yet</div>
          )}
        </div>
        <div className="mt-[26px] flex items-center justify-center gap-2 text-[14px] text-muted2">
          <span className="h-4 w-4">
            <FlagIcon />
          </span>
          <span className="underline">
            Report this listing
          </span>
        </div>
      </div>
    </aside>
  );
}
