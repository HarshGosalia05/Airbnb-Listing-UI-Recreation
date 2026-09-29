import { ChevronRightSmallIcon } from "@/components/listing/icons";

const strokeSvg = {
  viewBox: "0 0 32 32",
  "aria-hidden": true,
  role: "presentation",
  focusable: false,
  className: "block h-full w-full",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  overflow: "visible",
} as const;

function SearchIcon() {
  return (
    <svg {...strokeSvg}>
      <circle cx="14" cy="14" r="9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 21l7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg {...strokeSvg}>
      <path d="M16 6v20M6 16h20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg {...strokeSvg}>
      <path d="M6 16h20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HouseIcon() {
  return (
    <svg {...strokeSvg}>
      <path
        d="M6 29h20M9 29V15l7-6 7 6v14M13 29v-7h6v7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const zoomBtn =
  "flex h-10 w-10 cursor-pointer items-center justify-center rounded-[8px] border-none bg-white shadow-[0_2px_6px_#0003]";

export function LocationSection() {
  return (
    <>
      <h2 className="mb-6 text-[22px] leading-[26px] font-medium">Where you’ll be</h2>
      <div className="mb-6 text-[16px]">Candolim, Goa, India</div>
      <div className="relative h-[480px] overflow-hidden rounded-[12px] bg-[#e8eef0]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,#cfe3c8_0_6%,transparent_6%),radial-gradient(circle_at_70%_60%,#cfe3c8_0_8%,transparent_8%),linear-gradient(115deg,#acd3e6_0_34%,#e9f0e4_34%_100%)] before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgba(180,180,170,.5)_1px,transparent_1px),linear-gradient(0deg,rgba(180,180,170,.35)_1px,transparent_1px)] before:bg-[length:90px_90px,90px_90px] before:opacity-50 before:content-['']" />
        <button
          type="button"
          aria-label="Search"
          className="absolute top-3 left-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-white shadow-[0_2px_6px_#0003]"
        >
          <span className="h-4 w-4">
            <SearchIcon />
          </span>
        </button>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button type="button" aria-label="Zoom in" className={zoomBtn}>
            <span className="h-4 w-4">
              <PlusIcon />
            </span>
          </button>
          <button type="button" aria-label="Zoom out" className={zoomBtn}>
            <span className="h-4 w-4">
              <MinusIcon />
            </span>
          </button>
        </div>
        <div className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-white shadow-[0_4px_12px_#0000004d]">
          <HouseIcon />
        </div>
      </div>
      <div className="mt-[18px] text-[14px] text-ink">Exact location will be provided after booking.</div>
      <div className="mt-10 mb-3 text-[18px] font-medium">Neighbourhood highlights</div>
      <div className="text-[15px] leading-[1.5]">
        Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and
        popular attractions.
      </div>
      <button
        type="button"
        className="mt-[18px] inline-flex cursor-pointer items-center gap-1.5 border-none bg-transparent p-0 text-[16px] leading-[normal] font-medium text-ink underline underline-offset-[3px]"
      >
        Show more{" "}
        <span className="h-3.5 w-3.5">
          <ChevronRightSmallIcon />
        </span>
      </button>
    </>
  );
}
