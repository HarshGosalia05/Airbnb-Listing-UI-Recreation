"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { PHOTO_TOUR_MODAL } from "./data";

interface ListingUI {
  /** Photo tour overlay (`?modal=PHOTO_TOUR_SCROLLABLE`). */
  tourOpen: boolean;
  /** Room index the tour should scroll to after opening (null = top). */
  tourTargetRoom: number | null;
  openTour: (roomIndex?: number) => void;
  closeTour: () => void;
  clearTourTarget: () => void;

  /** Full-screen photo viewer; value is the global tour photo idx, null when closed. */
  lightboxIndex: number | null;
  openLightbox: (idx: number) => void;
  closeLightbox: () => void;

  amenitiesOpen: boolean;
  openAmenities: () => void;
  closeAmenities: () => void;

  /** Bottom-centre toast message; null when hidden. */
  toast: string | null;
  showToast: (message: string) => void;

  saved: boolean;
  toggleSaved: () => void;
  share: () => void;

  /** Reserve confirmation: shows the "You won't be charged yet" note and toast. */
  reserved: boolean;
  reserve: () => void;
}

const ListingUIContext = createContext<ListingUI | null>(null);

export function useListingUI(): ListingUI {
  const ctx = useContext(ListingUIContext);
  if (!ctx) throw new Error("useListingUI must be used inside <ListingUIProvider>");
  return ctx;
}

function setModalParam(open: boolean) {
  const url = new URL(window.location.href);
  if (open) url.searchParams.set("modal", PHOTO_TOUR_MODAL);
  else url.searchParams.delete("modal");
  window.history.replaceState(window.history.state, "", url);
}

export function ListingUIProvider({ children }: { children: ReactNode }) {
  const [tourOpen, setTourOpen] = useState(false);
  const [tourTargetRoom, setTourTargetRoom] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [reserved, setReserved] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Elements that opened each overlay (LIFO), so focus can return to them on close. They are captured in
  // the open handlers, before the background is made inert (which would blur them).
  const returnFocus = useRef<(HTMLElement | null)[]>([]);

  const rememberTrigger = useCallback(() => {
    const el = document.activeElement;
    returnFocus.current.push(el instanceof HTMLElement && el !== document.body ? el : null);
  }, []);

  const restoreTrigger = useCallback(() => {
    const el = returnFocus.current.pop();
    // Wait a frame so the element is no longer inside an inert subtree.
    if (el) requestAnimationFrame(() => el.focus({ preventScroll: true }));
  }, []);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  // Deep link: the original opens the tour when loaded with ?modal=PHOTO_TOUR_SCROLLABLE.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("modal") === PHOTO_TOUR_MODAL) {
      // Syncing from an external source (the URL) on mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTourOpen(true);
    }
  }, []);

  const openTour = useCallback(
    (roomIndex?: number) => {
      if (!tourOpen) rememberTrigger();
      setTourTargetRoom(roomIndex ?? null);
      setTourOpen(true);
      setModalParam(true);
    },
    [tourOpen, rememberTrigger],
  );

  const closeTour = useCallback(() => {
    setTourOpen(false);
    setModalParam(false);
    restoreTrigger();
  }, [restoreTrigger]);

  const openLightbox = useCallback(
    (idx: number) => {
      if (lightboxIndex === null) rememberTrigger();
      setLightboxIndex(idx);
    },
    [lightboxIndex, rememberTrigger],
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    restoreTrigger();
  }, [restoreTrigger]);

  const openAmenities = useCallback(() => {
    rememberTrigger();
    setAmenitiesOpen(true);
  }, [rememberTrigger]);

  const closeAmenities = useCallback(() => {
    setAmenitiesOpen(false);
    restoreTrigger();
  }, [restoreTrigger]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const toggleSaved = useCallback(() => {
    showToast(saved ? "Removed from wishlist" : "Saved to wishlist");
    setSaved(!saved);
  }, [saved, showToast]);

  const share = useCallback(() => {
    const failed = () => showToast("Couldn't copy link");
    if (navigator.clipboard) navigator.clipboard.writeText(window.location.href).then(() => showToast("Share options"), failed);
    else failed();
  }, [showToast]);

  const reserve = useCallback(() => {
    setReserved(true);
    showToast("You won't be charged yet");
  }, [showToast]);

  // Lock page scroll while any overlay is open.
  const anyOverlay = tourOpen || lightboxIndex !== null || amenitiesOpen;
  useEffect(() => {
    if (!anyOverlay) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [anyOverlay]);

  // Escape closes the top-most overlay.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (lightboxIndex !== null) closeLightbox();
      else if (amenitiesOpen) closeAmenities();
      else if (tourOpen) closeTour();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, amenitiesOpen, tourOpen, closeTour, closeLightbox, closeAmenities]);

  const value = useMemo<ListingUI>(
    () => ({
      tourOpen,
      tourTargetRoom,
      openTour,
      closeTour,
      clearTourTarget: () => setTourTargetRoom(null),
      lightboxIndex,
      openLightbox,
      closeLightbox,
      amenitiesOpen,
      openAmenities,
      closeAmenities,
      toast,
      showToast,
      saved,
      toggleSaved,
      share,
      reserved,
      reserve,
    }),
    [
      tourOpen,
      tourTargetRoom,
      openTour,
      closeTour,
      lightboxIndex,
      openLightbox,
      closeLightbox,
      amenitiesOpen,
      openAmenities,
      closeAmenities,
      toast,
      showToast,
      saved,
      toggleSaved,
      share,
      reserved,
      reserve,
    ],
  );

  return <ListingUIContext.Provider value={value}>{children}</ListingUIContext.Provider>;
}
