"use client";

import { useState } from "react";
import { StarIcon } from "@/components/listing/icons";
import { IMG } from "@/components/listing/data";

type TagPill = { icon: string; label: string; count: string };

const TAG_PILLS: TagPill[] = [
  { icon: "2db2d4a0.png", label: "Comfort", count: "6" },
  { icon: "3cabb880.png", label: "Accuracy", count: "5" },
  { icon: "0fa3419b.png", label: "Hot tub", count: "5" },
  { icon: "50456be1.png", label: "Condition", count: "4" },
  { icon: "47f52c81.png", label: "Hospitality", count: "8" },
  { icon: "e3f6bded.png", label: "Cleanliness", count: "4" },
  { icon: "fc465293.png", label: "Amenities", count: "2" },
  { icon: "f3636946.png", label: "Decor", count: "2" },
  { icon: "91a2c2aa.png", label: "Indoor spaces", count: "2" },
  { icon: "680f6918.png", label: "Location", count: "2" },
];

type ReviewAvatar =
  | { kind: "image"; src: string }
  | { kind: "initial"; letter: string; background: string; color: string };

type Review = {
  name: string;
  tenure: string;
  date: string;
  avatar: ReviewAvatar;
  text: string;
  /** Long reviews render clamped to 4 lines with a "Show more" button. */
  clamped: boolean;
};

const REVIEWS: Review[] = [
  {
    name: "Amit",
    tenure: "2 months on Airbnb",
    date: "1 week ago",
    avatar: { kind: "initial", letter: "A", background: "rgb(247,237,226)", color: "rgb(193,133,42)" },
    text: "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.",
    clamped: false,
  },
  {
    name: "Aheesh",
    tenure: "3 years on Airbnb",
    date: "2 weeks ago",
    avatar: { kind: "image", src: "0c540c00.jpg" },
    text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.",
    clamped: true,
  },
  {
    name: "Samiksha",
    tenure: "8 months on Airbnb",
    date: "May 2026",
    avatar: { kind: "image", src: "2b727a34.jpg" },
    text: "the host nitish was really great help",
    clamped: false,
  },
  {
    name: "Vedant",
    tenure: "4 years on Airbnb",
    date: "May 2026",
    avatar: { kind: "initial", letter: "V", background: "rgb(239,234,247)", color: "rgb(139,111,196)" },
    text: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine.\nThe highlight of our stay was definitely the jacuzzi. It was clean, well-kept, and the perfect place to relax after a day of exploring Goa. It added a luxurious touch to our vacation and made our experience even more memorable.\nThe property was exactly as described, well-equipped, and offered a peaceful atmosphere. We would highly recommend this place to anyone looking for a comfortable, clean, and relaxing stay in Goa. Looking forward to visiting again!",
    clamped: true,
  },
  {
    name: "Vaibhav S",
    tenure: "3 years on Airbnb",
    date: "May 2026",
    avatar: { kind: "image", src: "9f4d67c2.jpg" },
    text: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
    clamped: false,
  },
  {
    name: "Mohd",
    tenure: "5 years on Airbnb",
    date: "May 2026",
    avatar: { kind: "image", src: "2d6d0a52.jpg" },
    text: "Great place. Exactly as described in the listing.",
    clamped: false,
  },
];

const STAR_KEYS = [0, 1, 2, 3, 4];

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const clamped = review.clamped && !expanded;
  const { avatar } = review;

  return (
    <div>
      <div className="mb-[10px] flex items-center gap-[12px]">
        {avatar.kind === "image" ? (
          <img src={`${IMG}/${avatar.src}`} alt="" className="h-[42px] w-[42px] rounded-full object-cover" />
        ) : (
          <div
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full text-[17px] font-medium"
            style={{ background: avatar.background, color: avatar.color }}
          >
            {avatar.letter}
          </div>
        )}
        <div>
          <div className="text-[15px] font-medium">{review.name}</div>
          <div className="text-[13px] text-muted2">{review.tenure}</div>
        </div>
      </div>
      <div className="mb-[6px] flex items-center gap-[6px] text-[13px]">
        <span className="flex gap-[1px]">
          {STAR_KEYS.map((i) => (
            <span key={i} className="h-[10px] w-[10px]">
              <StarIcon />
            </span>
          ))}
        </span>
        <span>·</span>
        <span>{review.date}</span>
      </div>
      <div className={`text-[15px] leading-[1.4] whitespace-pre-line ${clamped ? "line-clamp-4" : ""}`}>
        {review.text}
      </div>
      {clamped && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-[8px] cursor-pointer border-none bg-transparent p-0 text-[15px] leading-[normal] font-medium text-inherit underline"
        >
          Show more
        </button>
      )}
    </div>
  );
}

export function ReviewsList() {
  return (
    <>
      <div className="no-scrollbar flex gap-[12px] overflow-x-auto pt-[4px] pb-[30px]">
        {TAG_PILLS.map((pill) => (
          <button
            key={pill.label}
            type="button"
            className="flex shrink-0 cursor-pointer items-center gap-[8px] rounded-[16px] border border-solid border-line bg-white pt-[13px] pr-[18px] pb-[13px] pl-[14px] text-[14px] leading-[normal] font-medium text-inherit"
          >
            <img
              src={`${IMG}/${pill.icon}`}
              alt=""
              aria-hidden="true"
              className="block h-[20px] w-[20px] shrink-0 object-contain"
            />
            {pill.label}
            <span className="font-normal text-muted2">{pill.count}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-x-[80px] gap-y-[48px] pb-[40px] max-[1128px]:grid-cols-[1fr] max-[1128px]:gap-[30px]">
        {REVIEWS.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>
      <button
        type="button"
        className="cursor-pointer rounded-[12px] border border-solid border-ink bg-white px-[23px] py-[13px] text-[16px] leading-[normal] font-medium text-inherit transition-[background,transform] duration-[.15s,.05s] ease-[ease] hover:bg-grey100 active:[transform:scale(.98)]"
      >
        Show all 19 reviews
      </button>
    </>
  );
}
