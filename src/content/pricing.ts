/**
 * Tanning options. Only "fromPerMinute" is confirmed (previous website: from 0,60 € / minute).
 * Set `price` to a string such as "25 €" once the business confirms it; null shows "price on request".
 */
export type PricingCategoryKey = "sessions" | "packages" | "memberships" | "offers";

export const pricing: { key: PricingCategoryKey; price: string | null; featured?: boolean }[] = [
  { key: "sessions", price: "0,60 €" },
  { key: "packages", price: null, featured: true },
  { key: "memberships", price: null },
  { key: "offers", price: null },
];
