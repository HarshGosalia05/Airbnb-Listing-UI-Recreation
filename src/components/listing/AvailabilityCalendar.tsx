"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
} from "@/components/listing/icons";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

// Blocked dates keyed by `year-monthIndex-day` (month is 0-based): Nov 2026.
const BLOCKED = new Set(
  [18, 19, 20, 21, 22, 23, 24, 29, 30].map((d) => `2026-10-${d}`),
);

type DateKey = { y: number; m: number; d: number };

const toNum = ({ y, m, d }: DateKey) => y * 10000 + m * 100 + d;
const fmt = ({ y, m, d }: DateKey) => `${d} ${MONTH_SHORT[m]} ${y}`;
const nightsBetween = (a: DateKey, b: DateKey) =>
  Math.round((Date.UTC(b.y, b.m, b.d) - Date.UTC(a.y, a.m, a.d)) / 86400000);

const INITIAL_CHECK_IN: DateKey = { y: 2026, m: 9, d: 18 };
const INITIAL_CHECK_OUT: DateKey = { y: 2026, m: 9, d: 23 };

function KeyboardIcon() {
  return (
    <svg viewBox="0 0 32 22" width="20" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="1" y="1" width="30" height="20" rx="3" />
      <path d="M6 7h.01M11 7h.01M16 7h.01M21 7h.01M26 7h.01M6 12h.01M26 12h.01M9 16h14" />
    </svg>
  );
}

type MonthProps = {
  year: number;
  month: number;
  checkIn: DateKey | null;
  checkOut: DateKey | null;
  onSelect: (date: DateKey) => void;
};

function Month({ year, month, checkIn, checkOut, onSelect }: MonthProps) {
  const lead = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const inNum = checkIn ? toNum(checkIn) : null;
  const outNum = checkOut ? toNum(checkOut) : null;

  return (
    <div role="group" aria-label={`${MONTH_NAMES[month]} ${year}`}>
      <div className="mb-[18px] text-center text-[16px] font-medium">
        {MONTH_NAMES[month]} {year}
      </div>
      <div className="mb-[6px] grid grid-cols-[repeat(7,1fr)]">
        {WEEKDAYS.map((w, i) => (
          <span key={i} className="text-center text-[12px] font-medium text-[#222]">
            {w}
          </span>
        ))}
      </div>
      <div className="isolate grid grid-cols-[repeat(7,1fr)]">
        {Array.from({ length: lead }, (_, i) => (
          <div
            key={`e${i}`}
            className="invisible relative flex aspect-square items-center justify-center rounded-[50%] text-[14px]"
          />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const d = i + 1;
          const date = { y: year, m: month, d };
          const n = toNum(date);
          const blocked = BLOCKED.has(`${year}-${month}-${d}`);
          const isIn = inNum === n;
          const isOut = outNum === n;
          const inRange = inNum !== null && outNum !== null && n > inNum && n < outNum;
          const hasRange = inNum !== null && outNum !== null;
          return (
            <button
              key={d}
              type="button"
              disabled={blocked}
              aria-pressed={isIn || isOut}
              aria-label={`${d} ${MONTH_NAMES[month]} ${year}${blocked ? ", unavailable" : ""}${isIn ? ", check-in" : isOut ? ", checkout" : inRange ? ", selected" : ""}`}
              onClick={() => onSelect(date)}
              className={cn(
                // Reset button chrome so the cell renders exactly like the original plain div.
                "relative flex aspect-square w-full items-center justify-center rounded-[50%] border-none bg-transparent p-0 text-[14px] text-inherit disabled:cursor-default",
                blocked && "text-[#ddd] line-through",
                inRange && "rounded-none bg-grey200",
                (isIn || isOut) && "rounded-[50%] bg-[#222] text-white",
                hasRange &&
                  (isIn || isOut) &&
                  "before:absolute before:top-0 before:bottom-0 before:z-[-1] before:w-1/2 before:bg-grey200 before:content-['']",
                hasRange && isIn && "before:right-0",
                hasRange && isOut && "before:left-0",
              )}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AvailabilityCalendar() {
  const [view, setView] = useState({ y: 2026, m: 9 });
  const [checkIn, setCheckIn] = useState<DateKey | null>(INITIAL_CHECK_IN);
  const [checkOut, setCheckOut] = useState<DateKey | null>(INITIAL_CHECK_OUT);

  const next = view.m === 11 ? { y: view.y + 1, m: 0 } : { y: view.y, m: view.m + 1 };

  const shift = (delta: number) => {
    setView(({ y, m }) => {
      const total = y * 12 + m + delta;
      return { y: Math.floor(total / 12), m: total % 12 };
    });
  };

  const handleSelect = (date: DateKey) => {
    if (!checkIn || checkOut) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }
    if (toNum(date) > toNum(checkIn)) {
      setCheckOut(date);
    } else {
      setCheckIn(date);
    }
  };

  const clear = () => {
    setCheckIn(null);
    setCheckOut(null);
  };

  let heading = "Select check-in date";
  let sub = "Add your travel dates for exact pricing";
  if (checkIn && checkOut) {
    const nights = nightsBetween(checkIn, checkOut);
    heading = `${nights} ${nights === 1 ? "night" : "nights"} in Candolim`;
    sub = `${fmt(checkIn)} - ${fmt(checkOut)}`;
  } else if (checkIn) {
    heading = "Select checkout date";
  }

  return (
    <div className="border-t border-line-soft py-8">
      <div>
        <div>
          <div className="text-[22px] font-medium">{heading}</div>
          <div className="mt-[6px] mb-[22px] text-[14px] text-muted2">{sub}</div>
        </div>
        <div className="relative grid grid-cols-[1fr_1fr] gap-x-[56px] gap-y-0 max-[743px]:grid-cols-[1fr]">
          <div className="absolute top-[-4px] flex w-full justify-between">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => shift(-1)}
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[50%] border-none bg-transparent px-[6px] py-px leading-[normal] hover:bg-grey200"
            >
              <span className="h-3 w-3">
                <ChevronLeftSmallIcon />
              </span>
            </button>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => shift(1)}
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[50%] border-none bg-transparent px-[6px] py-px leading-[normal] hover:bg-grey200"
            >
              <span className="h-3 w-3">
                <ChevronRightSmallIcon />
              </span>
            </button>
          </div>
          <Month year={view.y} month={view.m} checkIn={checkIn} checkOut={checkOut} onSelect={handleSelect} />
          <Month year={next.y} month={next.m} checkIn={checkIn} checkOut={checkOut} onSelect={handleSelect} />
        </div>
        <div className="mt-[18px] flex items-center justify-between">
          <span
            aria-hidden="true"
            className="inline-flex h-[22px] w-[30px] items-center justify-center rounded-[4px] border border-[#b0b0b0]"
          >
            <KeyboardIcon />
          </span>
          <button
            type="button"
            onClick={clear}
            className="cursor-pointer border-none bg-transparent px-[6px] py-px text-[14px] leading-[normal] font-medium underline"
          >
            Clear dates
          </button>
        </div>
      </div>
    </div>
  );
}
