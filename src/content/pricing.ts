/**
 * Tanning options. Only "fromPerMinute" is confirmed (previous website: from 0,60 € / minute).
 * Set `pricePerMinute` (in euros) once the business confirms it; null shows "price on request".
 */
export type PricingCategoryKey = "sessions" | "packages" | "memberships" | "offers";

export const pricing: { key: PricingCategoryKey; pricePerMinute: number | null; featured?: boolean }[] = [
  { key: "sessions", pricePerMinute: 0.6 },
  { key: "packages", pricePerMinute: null, featured: true },
  { key: "memberships", pricePerMinute: null },
  { key: "offers", pricePerMinute: null },
];
