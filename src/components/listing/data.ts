import type { TourRoom } from "@/types/listing";

export const IMG = "/images/listing";

export const LISTING_TITLE = "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10";

/** Query-string state the original uses when the photo tour is open. */
export const PHOTO_TOUR_MODAL = "PHOTO_TOUR_SCROLLABLE";

/** Hero gallery (1 large + 4 small). */
export const HERO_PHOTOS = [
  `${IMG}/736a481e.jpg`,
  `${IMG}/dbd1e55f.jpg`,
  `${IMG}/8a5eaf59.jpg`,
  `${IMG}/967e6ad6.jpg`,
  `${IMG}/8626319e.jpg`,
];

export const TOUR_ROOMS: TourRoom[] = [
  {
    name: "Living room 1",
    subtitle: "Sofa · Air conditioning · Ceiling fan · TV",
    cover: `${IMG}/42cd77d9.jpg`,
    rows: [
      { layout: "single", photos: [{ idx: 0, src: `${IMG}/42cd77d9.jpg` }] },
      { layout: "double", photos: [{ idx: 1, src: `${IMG}/01c8ea38.jpg` }, { idx: 2, src: `${IMG}/2fb4c5cc.jpg` }] },
    ],
  },
  {
    name: "Living room 2",
    subtitle: "Ceiling fan · Hot tub",
    cover: `${IMG}/dbd1e55f.jpg`,
    rows: [
      { layout: "single", photos: [{ idx: 3, src: `${IMG}/dbd1e55f.jpg` }] },
      { layout: "double", photos: [{ idx: 4, src: `${IMG}/8a5eaf59.jpg` }, { idx: 5, src: `${IMG}/8ccdb460.jpg` }] },
      { layout: "single", photos: [{ idx: 6, src: `${IMG}/736a481e.jpg` }] },
      { layout: "double", photos: [{ idx: 7, src: `${IMG}/e00ce295.jpg` }, { idx: 8, src: `${IMG}/3234473b.jpg` }] },
      { layout: "single", photos: [{ idx: 9, src: `${IMG}/162b4a11.jpg` }] },
    ],
  },
  {
    name: "Full kitchen",
    subtitle: "Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery",
    cover: `${IMG}/8955bb30.jpg`,
    rows: [
      { layout: "double", photos: [{ idx: 10, src: `${IMG}/8955bb30.jpg` }, { idx: 11, src: `${IMG}/21114328.jpg` }] },
    ],
  },
  {
    name: "Bedroom",
    subtitle: "Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi",
    cover: `${IMG}/967e6ad6.jpg`,
    rows: [
      { layout: "single", photos: [{ idx: 12, src: `${IMG}/967e6ad6.jpg` }] },
      { layout: "double", photos: [{ idx: 13, src: `${IMG}/f95566ca.jpg` }, { idx: 14, src: `${IMG}/d8a74035.jpg` }] },
      { layout: "single", photos: [{ idx: 15, src: `${IMG}/967e6ad6.jpg` }] },
      { layout: "double", photos: [{ idx: 16, src: `${IMG}/2b171b38.jpg` }, { idx: 17, src: `${IMG}/e4f0f45a.jpg` }] },
    ],
  },
  {
    name: "Full bathroom",
    subtitle: "Hairdryer · Hot water · Shampoo · Shower gel",
    cover: `${IMG}/2a647912.jpg`,
    rows: [
      { layout: "single", photos: [{ idx: 18, src: `${IMG}/2a647912.jpg` }] },
    ],
  },
  {
    name: "Gym",
    subtitle: "Air conditioning · Gym · Exercise equipment · Ceiling fan",
    cover: `${IMG}/f08df14a.jpg`,
    rows: [
      { layout: "single", photos: [{ idx: 19, src: `${IMG}/f08df14a.jpg` }] },
      { layout: "double", photos: [{ idx: 20, src: `${IMG}/cab6a12e.jpg` }, { idx: 21, src: `${IMG}/1492183c.jpg` }] },
      { layout: "double", photos: [{ idx: 22, src: `${IMG}/a0e3040f.jpg` }, { idx: 23, src: `${IMG}/e1dd9e5b.jpg` }] },
    ],
  },
  {
    name: "Exterior",
    subtitle: "",
    cover: `${IMG}/88f39a25.jpg`,
    rows: [
      { layout: "single", photos: [{ idx: 24, src: `${IMG}/88f39a25.jpg` }] },
      { layout: "double", photos: [{ idx: 25, src: `${IMG}/85e108b8.jpg` }, { idx: 26, src: `${IMG}/0cb56064.jpg` }] },
      { layout: "single", photos: [{ idx: 27, src: `${IMG}/8626319e.jpg` }] },
      { layout: "double", photos: [{ idx: 28, src: `${IMG}/8626319e.jpg` }, { idx: 29, src: `${IMG}/afd49445.jpg` }] },
    ],
  },
  {
    name: "Pool",
    subtitle: "Pool",
    cover: `${IMG}/73859b43.jpg`,
    rows: [
      { layout: "single", photos: [{ idx: 30, src: `${IMG}/73859b43.jpg` }] },
      { layout: "double", photos: [{ idx: 31, src: `${IMG}/814963c7.jpg` }, { idx: 32, src: `${IMG}/73859b43.jpg` }] },
    ],
  },
  {
    name: "Additional photos",
    subtitle: "",
    cover: `${IMG}/05fe70d6.jpg`,
    rows: [
      { layout: "single", photos: [{ idx: 33, src: `${IMG}/05fe70d6.jpg` }] },
      { layout: "double", photos: [{ idx: 34, src: `${IMG}/6d10f788.jpg` }, { idx: 35, src: `${IMG}/be8c7063.jpg` }] },
      { layout: "single", photos: [{ idx: 36, src: `${IMG}/fa714b45.jpg` }] },
      { layout: "double", photos: [{ idx: 37, src: `${IMG}/a132c980.jpg` }, { idx: 38, src: `${IMG}/3c1a421c.jpg` }] },
      { layout: "single", photos: [{ idx: 39, src: `${IMG}/16623ddb.jpg` }] },
      { layout: "double", photos: [{ idx: 40, src: `${IMG}/495ad69b.jpg` }, { idx: 41, src: `${IMG}/62e985ac.jpg` }] },
      { layout: "single", photos: [{ idx: 42, src: `${IMG}/01c8ea38.jpg` }] },
    ],
  },
];

/** Every tour photo in lightbox order, with the room it belongs to. */
export const ALL_TOUR_PHOTOS = TOUR_ROOMS.flatMap((room) =>
  room.rows.flatMap((row) => row.photos.map((photo) => ({ ...photo, room: room.name }))),
).sort((a, b) => a.idx - b.idx);
