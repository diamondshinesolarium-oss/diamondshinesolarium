import lounge from "@/assets/salon/lounge.jpg.asset.json";
import reception from "@/assets/salon/reception.jpg.asset.json";
import tanningBed from "@/assets/salon/tanning-bed.jpg.asset.json";
import cabin from "@/assets/salon/cabin.jpg.asset.json";
import corridor from "@/assets/salon/corridor.jpg.asset.json";
import products from "@/assets/salon/products.jpg.asset.json";

/** Current photos of the Diamond Shine studio, supplied by the owner (Nov 2026). */
export const galleryImages = [
  { key: "reception", src: reception.url, width: 1203, height: 715 },
  { key: "tanningBed", src: tanningBed.url, width: 1040, height: 709 },
  { key: "cabin", src: cabin.url, width: 1150, height: 705 },
  { key: "corridor", src: corridor.url, width: 1167, height: 706 },
  { key: "lounge", src: lounge.url, width: 1600, height: 683 },
] as const;

export type GalleryKey = (typeof galleryImages)[number]["key"];

export const salonPhotos = { lounge, reception, tanningBed, cabin, corridor, products };
