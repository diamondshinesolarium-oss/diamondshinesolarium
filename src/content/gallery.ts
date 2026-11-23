// Studio photos are bundled with the site (not CDN pointers) so they load on every host, Vercel included.
import facade from "@/assets/studio/facade.jpg";
import reception from "@/assets/studio/reception.jpg";
import counter from "@/assets/studio/counter.jpg";
import corridor from "@/assets/studio/corridor.jpg";
import tanningBed from "@/assets/studio/tanning-bed.jpg";
import cabinRed from "@/assets/studio/cabin-red.jpg";
import k11Gold from "@/assets/studio/k11-gold.jpg";
import k11Blue from "@/assets/studio/k11-blue.jpg";
import products from "@/assets/studio/products.jpg";

const PORTRAIT = { width: 1200, height: 1600 } as const;

/** Current photos of the Diamond Shine studio, supplied by the owner (Nov 2026). */
export const galleryImages = [
  { key: "facade", src: facade, ...PORTRAIT },
  { key: "tanningBed", src: tanningBed, width: 1600, height: 1200 },
  { key: "reception", src: reception, ...PORTRAIT },
  { key: "k11Blue", src: k11Blue, ...PORTRAIT },
  { key: "corridor", src: corridor, ...PORTRAIT },
  { key: "counter", src: counter, ...PORTRAIT },
  { key: "cabinRed", src: cabinRed, ...PORTRAIT },
  { key: "products", src: products, width: 1600, height: 558 },
  { key: "k11Gold", src: k11Gold, ...PORTRAIT },
] as const;

export type GalleryKey = (typeof galleryImages)[number]["key"];

export const salonPhotos = { facade, reception, counter, corridor, tanningBed, cabinRed, k11Gold, k11Blue, products };
