"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE = 'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keyboard focus management for a modal dialog.
 * - When `open` becomes true, focus moves to the first focusable element inside `ref`.
 * - While `trap` is true, Tab / Shift+Tab cycle within the dialog.
 * Returning focus to the trigger on close is handled by ListingUIProvider, which records the trigger
 * before the page behind the dialog is made inert.
 */
export function useDialogFocus(ref: RefObject<HTMLElement | null>, open: boolean, trap: boolean = open) {
  useEffect(() => {
    if (!open) return;
    ref.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true });
  }, [open, ref]);

  useEffect(() => {
    if (!trap) return;
    const onKey = (e: KeyboardEvent) => {
      const root = ref.current;
      if (e.key !== "Tab" || !root) return;
      const items = [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !root.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !root.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [trap, ref]);
}
