import { IMG } from "@/components/listing/data";

const svgBase = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32",
  "aria-hidden": true,
  role: "presentation",
  focusable: false,
  className: "block h-full w-full",
  fill: "currentColor",
} as const;

function VerifiedIcon() {
  return (
    <svg {...svgBase}>
      <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm7 7.59L24.41 12 13.5 22.91 7.59 17 9 15.59l4.5 4.5z" />
    </svg>
  );
}

function BalloonIcon() {
  return (
    <svg {...svgBase}>
      <path d="M16 0c5.9 0 11 5.28 11 11 0 4.85-3.23 9.27-9.55 13.28l2.2 2.92a1.13 1.13 0 0 1-.9 1.8H17v3h-2v-3h-1.75a1.13 1.13 0 0 1-.9-1.8l2.14-2.86C8.2 20.92 5 16.46 5 11A11 11 0 0 1 16 0zm0 25.67L15 27h2zM16 2a9 9 0 0 0-9 9c0 4.6 2.72 8.43 8.3 11.5l.38.21.28.14.3-.19c5.62-3.53 8.48-7.24 8.72-11.12l.02-.27V11c0-4.64-4.21-9-9-9z" />
    </svg>
  );
}

function SchoolIcon() {
  return (
    <svg {...svgBase}>
      <path d="m31.47 10.12-15-8a1 1 0 0 0-.94 0l-15 8a1 1 0 0 0 0 1.76L4 13.73V23a1 1 0 0 0 .52.88l11 6a1 1 0 0 0 .96 0l11-6A1 1 0 0 0 28 23v-9.27l2-1.06V23h2V11a1 1 0 0 0-.53-.88zM26 22.4l-10 5.45-10-5.45V14.8l9.53 5.08a1 1 0 0 0 .94 0L26 14.8v7.6zm-10-4.54L3.12 11 16 4.13 28.88 11 16 17.87z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg {...svgBase}>
      <path d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm-1 3a22.2 22.2 0 0 1-9.65 3.15L5 6.97V17.5c0 6.56 4.35 11 10 11.46zm2 0v25.16c5.65-.47 10-4.9 10-11.46V6.97l-.35-.02A22.2 22.2 0 0 1 17 3.8z" />
    </svg>
  );
}

const STATS = [
  { value: "1,463", label: "Reviews" },
  { value: "4.68★", label: "Rating" },
  { value: "2", label: "Years hosting" },
];

type CoHost =
  | { name: string; img: string }
  | { name: string; initial: string; bg: string; color: string };

const CO_HOSTS: CoHost[] = [
  { name: "Sharath", img: "e6dee63f.jpg" },
  { name: "Aman Dev Pahwa", img: "802b1839.jpg" },
  { name: "Maria Karen Priyanka", img: "f22840f1.jpg" },
  { name: "Simran", img: "6349966d.jpg" },
  { name: "Pallavi", img: "0c540c00.jpg" },
  { name: "Sanyukta", img: "2b727a34.jpg" },
  { name: "Shruti", initial: "S", bg: "rgb(253,231,239)", color: "rgb(212,53,110)" },
  { name: "Amisha", initial: "A", bg: "rgb(231,240,253)", color: "rgb(58,110,204)" },
];

export function HostSection() {
  return (
    <>
      <h2 className="mb-6 text-[22px] leading-[26px] font-medium">Meet your host</h2>
      <div className="grid grid-cols-[340px_1fr] items-start gap-12 max-[1128px]:grid-cols-[1fr]">
        <div>
          <div className="grid grid-cols-[1fr_100px] items-center rounded-[20px] border border-card-border px-6 py-[30px] shadow-card">
            <div className="text-center">
              <div className="relative mx-auto mb-3 h-[88px] w-[88px]">
                <img src={`${IMG}/aa4e82a4.jpg`} alt="" className="h-[88px] w-[88px] rounded-full object-cover" />
                <span className="absolute right-0 bottom-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-rausch text-white">
                  <VerifiedIcon />
                </span>
              </div>
              <div className="text-[26px] font-medium">Mirashya Homes</div>
              <div className="mt-1 text-[13px]">Host</div>
            </div>
            <div className="border-l border-line-soft pl-5">
              {STATS.map((stat) => (
                <div key={stat.label} className="py-2.5 [&+&]:border-t [&+&]:border-line-soft">
                  <div className="text-[20px] font-medium">{stat.value}</div>
                  <div className="text-[12px]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[22px] flex flex-col gap-3.5">
            <div className="flex items-center gap-3.5 text-[15px]">
              <span className="h-6 w-6 text-ink">
                <BalloonIcon />
              </span>
              Born in the 80s
            </div>
            <div className="flex items-center gap-3.5 text-[15px]">
              <span className="h-6 w-6 text-ink">
                <SchoolIcon />
              </span>
              Where I went to school: NICMAR GOA
            </div>
          </div>
        </div>
        <div>
          <div className="mb-4 text-[18px] font-medium">Co-Hosts</div>
          <div className="mb-[30px] grid grid-cols-[1fr_1fr_1fr] gap-x-2 gap-y-4">
            {CO_HOSTS.map((host) => (
              <div key={host.name} className="flex items-center gap-2.5 text-[14px]">
                {"img" in host ? (
                  <img src={`${IMG}/${host.img}`} alt="" className="h-[34px] w-[34px] rounded-full object-cover" />
                ) : (
                  <div
                    className="flex h-[34px] w-[34px] items-center justify-center rounded-full object-cover text-[13px] font-medium"
                    style={{ background: host.bg, color: host.color }}
                  >
                    {host.initial}
                  </div>
                )}
                <span>{host.name}</span>
              </div>
            ))}
          </div>
          <div className="mb-4 text-[18px] font-medium">Host details</div>
          <div className="text-[15px] leading-[1.6]">
            Response rate: 100%
            <br />
            Responds within an hour
          </div>
          <button
            type="button"
            className="mt-[18px] cursor-pointer rounded-[8px] border-none bg-grey200 px-6 py-3.5 text-[15px] leading-[normal] font-medium hover:bg-grey300"
          >
            Message host
          </button>
          <div className="mt-[30px] flex items-start gap-2.5 text-[12px] text-muted2">
            <span className="h-6 w-6 shrink-0">
              <ShieldIcon />
            </span>
            <span>To help protect your payment, always use Airbnb to send money and communicate with hosts.</span>
          </div>
        </div>
      </div>
    </>
  );
}
