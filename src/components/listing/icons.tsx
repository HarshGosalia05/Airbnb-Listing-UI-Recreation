import type { SVGProps } from "react";

// Icons shared by several sections of the airbnb-clone-umber-two listing page.
// All render `display:block; width/height:100%` so the wrapping element sets the size,
// exactly like the original markup (`<span class="..."><svg style="height:100%;width:100%">`).

type IconProps = SVGProps<SVGSVGElement>;

const base = { "aria-hidden": true, focusable: false, role: "presentation", className: "block h-full w-full" } as const;

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...base} {...props}>
      <path
        fillRule="evenodd"
        d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
      />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} overflow="visible" {...base} {...props}>
      <path
        fill="none"
        d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289"
      />
    </svg>
  );
}

/** Heart outline; pass `filled` for the saved state (Airbnb rausch fill). */
export function HeartIcon({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill={filled ? "#ff385c" : "none"}
      stroke={filled ? "#ff385c" : "currentColor"}
      strokeWidth={2}
      overflow="visible"
      {...base}
      {...props}
    >
      <path d="m15.9998 28.6668c7.1667-4.8847 14.3334-10.8844 14.3334-18.1088 0-1.84951-.6993-3.69794-2.0988-5.10877-1.3996-1.4098-3.2332-2.11573-5.0679-2.11573-1.8336 0-3.6683.70593-5.0668 2.11573l-2.0999 2.11677-2.0988-2.11677c-1.3995-1.4098-3.2332-2.11573-5.06783-2.11573-1.83364 0-3.66831.70593-5.06683 2.11573-1.39955 1.41083-2.09984 3.25926-2.09984 5.10877 0 7.2244 7.16667 13.2241 14.3333 18.1088z" />
    </svg>
  );
}

/** 3x3 dot grid ("Show all photos"). */
export function GridDotsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...base} {...props}>
      <path
        fillRule="evenodd"
        d="M3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
      />
    </svg>
  );
}

/** Small filled chevron, 18x18 viewBox (calendar, "Show more", carousels). */
export function ChevronRightSmallIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="currentColor" {...base} {...props}>
      <path fillRule="evenodd" d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" />
    </svg>
  );
}

export function ChevronLeftSmallIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="currentColor" {...base} {...props}>
      <path fillRule="evenodd" d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" />
    </svg>
  );
}

/** Stroked chevron, 32x32 viewBox. strokeWidth 2 = "Back", 4 = lightbox prev/next. */
export function ChevronLeftStrokeIcon({ strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={strokeWidth} overflow="visible" {...base} {...props}>
      {/* The "Back" variant (stroke 2) uses round caps; the lightbox variant (stroke 4) does not. */}
      <path
        d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"
        fill="none"
        strokeLinecap={strokeWidth === 2 ? "round" : undefined}
        strokeLinejoin={strokeWidth === 2 ? "round" : undefined}
      />
    </svg>
  );
}

export function ChevronRightStrokeIcon({ strokeWidth = 4, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={strokeWidth} overflow="visible" {...base} {...props}>
      <path d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28" fill="none" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} overflow="visible" {...base} {...props}>
      <path d="M4 10l12 12 12-12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} overflow="visible" {...base} {...props}>
      <path d="M6 6l20 20M26 6 6 26" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
