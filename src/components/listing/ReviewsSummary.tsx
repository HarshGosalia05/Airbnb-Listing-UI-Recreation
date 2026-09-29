import type { ReactNode } from "react";
import { IMG } from "@/components/listing/data";

type RatingBar = { label: string; width: string };

const RATING_BARS: RatingBar[] = [
  { label: "5", width: "95%" },
  { label: "4", width: "5%" },
  { label: "3", width: "0%" },
  { label: "2", width: "0%" },
  { label: "1", width: "0%" },
];

const svgBase = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32",
  "aria-hidden": true,
  role: "presentation",
  focusable: false,
  className: "block h-full w-full",
} as const;

function CleanlinessIcon() {
  return (
    <svg {...svgBase} fill="currentColor">
      <path d="M24 0v6h-4.3c.13 1.4.67 2.72 1.52 3.78l.2.22-1.5 1.33a9.05 9.05 0 0 1-2.2-5.08c-.83.38-1.32 1.14-1.38 2.2v4.46l4.14 4.02a5 5 0 0 1 1.5 3.09l.01.25.01.25v8.63a3 3 0 0 1-2.64 2.98l-.18.01-.21.01-12-.13A3 3 0 0 1 4 29.2L4 29.02v-8.3a5 5 0 0 1 1.38-3.45l.19-.18L10 12.9V8.85l-4.01-3.4.02-.7A5 5 0 0 1 10.78 0H11zm-5.03 25.69a8.98 8.98 0 0 1-6.13-2.41l-.23-.23A6.97 6.97 0 0 0 6 21.2v7.82c0 .51.38.93.87 1H7l11.96.13h.13a1 1 0 0 0 .91-.88l.01-.12v-3.52c-.34.04-.69.06-1.03.06zM17.67 2H11a3 3 0 0 0-2.92 2.3l-.04.18-.01.08 3.67 3.1h2.72l.02-.1a4.29 4.29 0 0 1 3.23-3.4zM30 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 0h-2.33v2H22zm8-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM20 20.52a3 3 0 0 0-.77-2l-.14-.15-4.76-4.61v-4.1H12v4.1l-5.06 4.78a3 3 0 0 0-.45.53 9.03 9.03 0 0 1 7.3 2.34l.23.23A6.98 6.98 0 0 0 20 23.6z" />
    </svg>
  );
}

function AccuracyIcon() {
  return (
    <svg {...svgBase} fill="currentColor">
      <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm7 7.59L24.41 12 13.5 22.91 7.59 17 9 15.59l4.5 4.5z" />
    </svg>
  );
}

function CheckInIcon() {
  return (
    <svg {...svgBase} fill="currentColor">
      <path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z" />
    </svg>
  );
}

function CommunicationIcon() {
  return (
    <svg {...svgBase} fill="none" stroke="currentColor" strokeWidth={2} overflow="visible">
      <path
        d="m25.5 3.5c2.2091 0 4 1.79086 4 4v13.8333c0 2.2092-1.7909 4-4 4h-5.8192l-3.6808 4.5-3.6832-4.5h-5.8168c-2.20914 0-4-1.7908-4-4v-13.8333c0-2.20914 1.79086-4 4-4z"
        fill="none"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg {...svgBase} fill="currentColor">
      <path d="M30.95 3.81a2 2 0 0 0-2.38-1.52l-7.58 1.69-10-2-8.42 1.87A1.99 1.99 0 0 0 1 5.8v21.95a1.96 1.96 0 0 0 .05.44 2 2 0 0 0 2.38 1.52l7.58-1.69 10 2 8.42-1.87A1.99 1.99 0 0 0 31 26.2V4.25a1.99 1.99 0 0 0-.05-.44zM12 4.22l8 1.6v21.96l-8-1.6zM3 27.75V5.8l-.22-.97.22.97 7-1.55V26.2zm26-1.55-7 1.55V5.8l7-1.55z" />
    </svg>
  );
}

function ValueIcon() {
  return (
    <svg {...svgBase} fill="currentColor">
      <path d="M16.17 2a3 3 0 0 1 1.98.74l.14.14 11 11a3 3 0 0 1 .14 4.1l-.14.14L18.12 29.3a3 3 0 0 1-4.1.14l-.14-.14-11-11A3 3 0 0 1 2 16.37l-.01-.2V5a3 3 0 0 1 2.82-3h11.35zm0 2H5a1 1 0 0 0-1 .88v11.29a1 1 0 0 0 .2.61l.1.1 11 11a1 1 0 0 0 1.31.08l.1-.08L27.88 16.7a1 1 0 0 0 .08-1.32l-.08-.1-11-11a1 1 0 0 0-.58-.28L16.17 4zM9 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    </svg>
  );
}

type Category = { label: string; value: string; icon: ReactNode };

const CATEGORIES: Category[] = [
  { label: "Cleanliness", value: "5.0", icon: <CleanlinessIcon /> },
  { label: "Accuracy", value: "5.0", icon: <AccuracyIcon /> },
  { label: "Check-in", value: "5.0", icon: <CheckInIcon /> },
  { label: "Communication", value: "5.0", icon: <CommunicationIcon /> },
  { label: "Location", value: "4.8", icon: <LocationIcon /> },
  { label: "Value", value: "4.8", icon: <ValueIcon /> },
];

const colClass = "px-[24px] max-[1128px]:border-l-0 max-[1128px]:px-0 max-[1128px]:py-[10px]";

export function ReviewsSummary() {
  return (
    <>
      <div className="pt-[8px] pb-[40px] text-center">
        <div className="flex items-center justify-center gap-[8px]">
          <img src={`${IMG}/78b66008.png`} alt="" className="inline h-[110px] w-auto max-w-none" />
          <div className="text-[100px] font-medium tracking-[-.03em]">4.95</div>
          <img src={`${IMG}/b6c05494.png`} alt="" className="inline h-[110px] w-auto max-w-none" />
        </div>
        <div className="mt-[8px] text-[22px] font-medium">Guest favourite</div>
        <div className="mx-auto mt-[8px] max-w-[420px] text-[15px] leading-[1.35]">
          This home is a guest favourite based on ratings, reviews and reliability
        </div>
        <button
          type="button"
          className="mt-[14px] cursor-pointer border-none bg-transparent px-[6px] py-[1px] text-[14px] leading-[normal] font-medium text-inherit underline"
        >
          How reviews work
        </button>
      </div>
      <div className="grid grid-cols-[1.4fr_repeat(6,1fr)] gap-0 pt-[8px] pb-[40px] max-[1128px]:grid-cols-[1fr_1fr]">
        <div className={colClass}>
          <div className="mb-[12px] text-[14px] font-medium">Overall rating</div>
          <div className="flex flex-col gap-[3px]">
            {RATING_BARS.map((bar) => (
              <div key={bar.label} className="grid grid-cols-[8px_1fr] items-center gap-[10px]">
                <span className="text-[12px] text-ink">{bar.label}</span>
                <div
                  role="img"
                  aria-label={`${bar.label} stars: ${bar.width} of reviews`}
                  className="h-[4px] overflow-hidden rounded-[2px] bg-line-soft"
                >
                  <div className="h-full bg-ink" style={{ width: bar.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {CATEGORIES.map((cat) => (
          <div key={cat.label} className={`${colClass} border-l border-line`}>
            <div className="mb-[12px] text-[14px] font-medium">{cat.label}</div>
            <div className="mb-[8px] text-[18px] font-medium">{cat.value}</div>
            <div className="h-[32px] w-[32px] text-ink">{cat.icon}</div>
          </div>
        ))}
      </div>
    </>
  );
}
