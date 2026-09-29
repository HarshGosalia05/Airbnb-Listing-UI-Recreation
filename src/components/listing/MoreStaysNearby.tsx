"use client";

import { useRef, useState } from "react";
import {
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
  StarIcon,
} from "@/components/listing/icons";
import { IMG } from "@/components/listing/data";

type Stay = { img: string; title: string; price: string; rating: string };

const STAYS: Stay[] = [
  { img: "8abfcd86.jpg", title: "Beautiful Studio with a view to die for", price: "₹23,600", rating: "4.91" },
  { img: "06aec3c1.jpg", title: "NAQAB - 1bhk with private pool", price: "₹42,218", rating: "4.95" },
  { img: "349c67b4.jpg", title: "Greentique Luxury Flat with plunge pool, Calangute", price: "₹44,506", rating: "4.94" },
  { img: "d1e34b27.jpg", title: "The Tropical Studio | 5 mins to Beach", price: "₹22,824", rating: "4.96" },
  { img: "4f067ab6.jpg", title: "Luxury Casa Bella 1BHK with plunge pool, Calangute", price: "₹39,942", rating: "4.95" },
  { img: "eb203049.jpg", title: "Kanso by Earthen Window | Jacuzzi | Terrace | Pool", price: "₹45,648", rating: "5.0" },
  { img: "06aec3c1.jpg", title: "Luxury Apt | Private Pool | 6 Mins from Beach", price: "₹48,786", rating: "4.93" },
  { img: "d1e34b27.jpg", title: "Serendipity Cottage - Calm Stay in Calangute-Baga.", price: "₹22,824", rating: "4.92" },
];

const GAP = 20;

const pagerButton =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-[50%] border border-solid border-[#b0b0b0] bg-white px-[6px] py-px leading-[normal] disabled:opacity-30";

export function MoreStaysNearby() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Captured initial state: "1 / 2", prev disabled. Only updated on the rail's scroll event.
  const [pager, setPager] = useState({ page: 1, total: 2, atStart: true, atEnd: false });

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const step = el.clientWidth + GAP;
    setPager({
      page: Math.round(el.scrollLeft / step) + 1,
      total: Math.ceil(el.scrollWidth / step),
      atStart: el.scrollLeft <= 1,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth + GAP) });
  };

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="m-0 text-[22px] leading-[26px] font-medium">More stays nearby</h2>
        <div className="flex items-center gap-2">
          <span className="mr-[6px] text-[14px] text-muted2">
            {pager.page} / {pager.total}
          </span>
          <button
            type="button"
            aria-label="Previous"
            className={pagerButton}
            disabled={pager.atStart}
            onClick={() => scrollBy(-1)}
          >
            <span className="h-3 w-3">
              <ChevronLeftSmallIcon />
            </span>
          </button>
          <button
            type="button"
            aria-label="Next"
            className={pagerButton}
            disabled={pager.atEnd}
            onClick={() => scrollBy(1)}
          >
            <span className="h-3 w-3">
              <ChevronRightSmallIcon />
            </span>
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-1"
      >
        {STAYS.map((stay, i) => (
          <div
            key={i}
            className="min-w-0 shrink-0 grow-0 basis-[calc((100%-80px)/5)] max-[1128px]:basis-[calc((100%-40px)/3)] max-[743px]:basis-[calc((100%-20px)/2)]"
          >
            <img
              src={`${IMG}/${stay.img}`}
              alt=""
              loading="lazy"
              className="block aspect-square w-full rounded-xl object-cover"
            />
            <div className="mt-2 line-clamp-2 text-[14px] font-medium text-ellipsis">{stay.title}</div>
            <div className="mt-1 text-[13px]">
              {`${stay.price}   `}
              <span className="inline-block h-[10px] w-[10px] align-[-1px]">
                <StarIcon />
              </span>
              {` ${stay.rating}`}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
