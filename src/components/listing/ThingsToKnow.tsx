import type { ReactNode } from "react";

const svgBase = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32",
  "aria-hidden": true,
  role: "presentation",
  focusable: false,
  className: "block h-full w-full",
  fill: "currentColor",
} as const;

function CalendarXIcon() {
  return (
    <svg {...svgBase}>
      <path d="m12 0v2h8v-2h2v2h6c1.1045695 0 2 .8954305 2 2v21c0 2.7614237-2.2385763 5-5 5h-18c-2.76142375 0-5-2.2385763-5-5v-21c0-1.1045695.8954305-2 2-2h6v-2zm16 12h-24v13c0 1.6568542 1.34314575 3 3 3h18c1.6568542 0 3-1.3431458 3-3zm-8.2071068 2.2928932 1.4142136 1.4142136-3.7921068 3.7928932 3.7921068 3.7928932-1.4142136 1.4142136-3.7928932-3.7921068-3.7928932 3.7921068-1.4142136-1.4142136 3.7921068-3.7928932-3.7921068-3.7928932 1.4142136-1.4142136 3.7928932 3.7921068zm-9.7928932-10.2928932h-6v6h24v-6h-6v2h-2v-2h-8v2h-2z" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg {...svgBase}>
      <path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z" />
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

type Column = { icon: ReactNode; title: string; lines: string[] };

const COLUMNS: Column[] = [
  {
    icon: <CalendarXIcon />,
    title: "Cancellation policy",
    lines: [
      "Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.",
      "Review this host’s full policy for details.",
    ],
  },
  {
    icon: <KeyIcon />,
    title: "House rules",
    lines: ["Check-in after 2:00 pm", "Checkout before 11:00 am", "3 guests maximum"],
  },
  {
    icon: <ShieldIcon />,
    title: "Safety & property",
    lines: ["Carbon monoxide alarm not reported", "Smoke alarm not reported", "Exterior security cameras on property"],
  },
];

export function ThingsToKnow() {
  return (
    <>
      <h2 className="mb-6 text-[22px] leading-[26px] font-medium">Things to know</h2>
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-8 max-[1128px]:grid-cols-[1fr] max-[1128px]:gap-6">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="mb-[18px] h-6 w-6 text-ink">{col.icon}</div>
            <div className="mb-3.5 text-[16px] font-medium">{col.title}</div>
            {col.lines.map((line) => (
              <p key={line} className="mb-2 text-[14px] leading-[1.5]">
                {line}
              </p>
            ))}
            <a href="#" className="text-[14px] font-medium underline">
              Learn more
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
