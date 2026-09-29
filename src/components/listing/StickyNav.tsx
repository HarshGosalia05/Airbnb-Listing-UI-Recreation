"use client";

import { useEffect, useState, type MouseEvent } from "react";

import { StarIcon } from "@/components/listing/icons";
import { cn, scrollBehavior } from "@/lib/utils";

const SECTIONS = [
  { id: "photos", label: "Photos" },
  { id: "amenities", label: "Amenities" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const BAR_HEIGHT = 66;
const SPY_OFFSET = 80;

export function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<SectionId>("photos");

  useEffect(() => {
    const update = () => {
      const gallery = document.getElementById("photo-gallery");
      setVisible(gallery ? gallery.getBoundingClientRect().bottom < 0 : false);

      let current: SectionId = "photos";
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= SPY_OFFSET) current = section.id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    event.preventDefault();
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - BAR_HEIGHT, behavior: scrollBehavior() });
  };

  return (
    <div
      id="_JXzroy"
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "fixed top-0 right-0 left-0 z-[45] border-b border-line-soft bg-white transition-[transform,opacity] duration-[.25s] ease-[ease]",
        visible ? "pointer-events-auto [transform:translateY(0)] opacity-100" : "pointer-events-none [transform:translateY(-100%)] opacity-0",
      )}
    >
      <div className="mx-auto flex h-[66px] max-w-[1280px] items-center justify-between px-20">
        <nav className="flex gap-1" aria-label="Listing sections">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              data-target={section.id}
              aria-current={active === section.id ? "true" : undefined}
              onClick={(event) => handleLinkClick(event, section.id)}
              className={cn(
                "relative px-2 py-[22px] text-[14px] font-medium text-ink hover:text-black",
                active === section.id &&
                  "after:absolute after:right-2 after:bottom-3 after:left-2 after:h-[2px] after:bg-ink after:content-['']",
              )}
            >
              {section.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <div className="text-right text-[13px] leading-[1.2]">
            <div>
              <span className="text-[15px] font-medium">₹28,499</span> <span className="text-ink">for 5 nights</span>
            </div>
            <div className="mt-[2px] text-[13px] text-ink">
              <span className="inline-block h-[11px] w-[11px] align-[-1px]" aria-hidden="true">
                <StarIcon />
              </span>{" "}
              4.95 · <span className="sn-reviews">19 reviews</span>
            </div>
          </div>
          <button
            className="h-10 rounded-[999px] border-none bg-reserve px-5 text-[14px] leading-[normal] font-medium text-white transition-[filter,transform] duration-[.15s,.05s] hover:bg-reserve-hover active:[transform:scale(.985)]"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
