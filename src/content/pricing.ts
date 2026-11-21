/**
 * Price list confirmed by the owner (Nov 2026).
 * Cabin rates are per minute; packages are prepaid credit with a bonus and an expiry.
 */
export type CabinKey = "excellence" | "prestige" | "premium";
export type PackageSize = "S" | "M" | "L";

export const cabinRates: { key: CabinKey; name: string; pricePerMinute: number }[] = [
  { key: "excellence", name: "Excellence", pricePerMinute: 1.2 },
  { key: "prestige", name: "Prestige", pricePerMinute: 1.5 },
  { key: "premium", name: "Premium", pricePerMinute: 1.95 },
];

export const tanningPackages: { size: PackageSize; pay: number; credit: number; validMonths: number }[] = [
  { size: "S", pay: 49, credit: 60, validMonths: 2 },
  { size: "M", pay: 79, credit: 100, validMonths: 4 },
  { size: "L", pay: 149, credit: 200, validMonths: 6 },
];

/** Free credit the client receives on top of what they pay. */
export function packageBonus(p: { pay: number; credit: number }) {
  return p.credit - p.pay;
}

/** Lowest per-minute rate, used in "from … / minute" copy. */
export const fromPerMinute = Math.min(...cabinRates.map((c) => c.pricePerMinute));

/** Package with the largest bonus relative to what is paid. */
export const bestValuePackage = tanningPackages.reduce((best, p) =>
  packageBonus(p) / p.pay > packageBonus(best) / best.pay ? p : best,
).size;
