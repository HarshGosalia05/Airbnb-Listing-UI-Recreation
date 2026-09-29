"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useListingUI } from "./ListingUIProvider";

export function Toast() {
  const { toast } = useListingUI();
  // Keep the last message rendered while the toast fades out.
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  if (toast !== null && toast !== lastMessage) setLastMessage(toast);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed bottom-8 left-1/2 z-[200] rounded-lg bg-ink px-[22px] py-[14px] text-[14px] font-medium text-white [transition:opacity_.2s,transform_.2s]",
        toast !== null ? "opacity-100 [transform:translate(-50%,0)]" : "opacity-0 [transform:translate(-50%,20px)]",
      )}
    >
      {lastMessage}
    </div>
  );
}
