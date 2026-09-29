"use client";

import { useState } from "react";
import { ChevronRightSmallIcon } from "@/components/listing/icons";
import { IMG } from "@/components/listing/data";
import { cn } from "@/lib/utils";

const DESCRIPTION =
  "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴";

const SLEEP = [
  { img: "967e6ad6.jpg", title: "Bedroom", sub: "1 double bed" },
  { img: "42cd77d9.jpg", title: "Living room", sub: "1 sofa" },
];

export function DescriptionAndSleep() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="border-t border-line-soft pt-[26px] pb-[32px]">
        <div className="mb-[8px] flex items-center gap-[10px] rounded-[12px] bg-grey100 px-[18px] py-[16px] text-[14px] text-ink">
          <span>
            Some info has been automatically translated.{" "}
            <a href="#" className="font-medium underline">
              Show original
            </a>
          </span>
        </div>
        <p
          id="descText"
          className={cn(
            "text-[16px] leading-[1.5] whitespace-pre-line",
            !expanded &&
              "max-h-[6.2em] overflow-hidden [mask-image:linear-gradient(#000_62%,transparent)]",
          )}
        >
          {DESCRIPTION}
        </p>
        <button
          id="descMore"
          aria-expanded={expanded}
          aria-controls="descText"
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-[14px] inline-flex cursor-pointer items-center gap-[6px] border-none bg-none p-0 text-[16px] leading-[normal] font-medium text-ink underline underline-offset-[3px]"
        >
          {expanded ? "Show less" : "Show more"}{" "}
          <span className="h-[14px] w-[14px]">
            <ChevronRightSmallIcon />
          </span>
        </button>
      </div>

      <div className="border-t border-line-soft py-[32px]">
        <h2 className="mb-[24px] text-[22px] leading-[26px] font-medium">Where you&apos;ll sleep</h2>
        <div className="grid grid-cols-2 gap-[16px] max-[743px]:grid-cols-1">
          {SLEEP.map((s) => (
            <div key={s.title}>
              <img
                src={`${IMG}/${s.img}`}
                alt=""
                className="block aspect-[3/2] w-full rounded-[8px] border border-card-border object-cover"
              />
              <div className="mt-[14px] text-[15px] font-medium">{s.title}</div>
              <div className="mt-[2px] text-[14px] text-muted2">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
