import lounge from "@/assets/salon/lounge.jpg.asset.json";
import reception from "@/assets/salon/reception.jpg.asset.json";
import tanningBed from "@/assets/salon/tanning-bed.jpg.asset.json";
import cabin from "@/assets/salon/cabin.jpg.asset.json";
import mezzanine from "@/assets/salon/mezzanine.jpg.asset.json";
import corridor from "@/assets/salon/corridor.jpg.asset.json";
import products from "@/assets/salon/products.jpg.asset.json";

/** Real photos of the Diamond Shine studio (from the business's previous website). */
export const galleryImages = [
  { key: "lounge", src: lounge.url, width: 1920, height: 900 },
  { key: "tanningBed", src: tanningBed.url, width: 1920, height: 900 },
  { key: "reception", src: reception.url, width: 1920, height: 900 },
  { key: "mezzanine", src: mezzanine.url, width: 459, height: 571 },
  { key: "cabin", src: cabin.url, width: 1920, height: 900 },
  { key: "corridor", src: corridor.url, width: 414, height: 405 },
  { key: "products", src: products.url, width: 706, height: 266 },
] as const;

export type GalleryKey = (typeof galleryImages)[number]["key"];

export const salonPhotos = { lounge, reception, tanningBed, cabin, mezzanine, corridor, products };
