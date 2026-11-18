/**
 * Business data for Diamond Shine Solarium — edit here to update the whole site.
 * Sources: Google Business listing (phone, hours, rating — Nov 2026) and the previous website.
 * Leave a value as null when it has not been confirmed: the site hides or flags it instead of inventing it.
 */
export const site = {
  name: "Diamond Shine Solarium",
  shortName: "Diamond Shine",
  foundedYear: 2013,

  phone: { display: "+34 622 49 60 77", e164: "+34622496077" },
  landline: { display: "+34 951 91 40 57", e164: "+34951914057" },
  whatsapp: "34622496077",
  email: "info@rmshinesolarium.es" as string | null,

  address: {
    street: "C. Francisco Villalón, 10 — Marina Banús, bloque 3-4, local 10",
    streetShort: "C. Francisco Villalón, 10",
    area: "Puerto Banús",
    locality: "Marbella",
    region: "Málaga",
    postalCode: "29660",
    country: "ES",
  },
  geo: { lat: 36.490515, lng: -4.951092 },

  /** 0 = Sunday … 6 = Saturday. null = closed. */
  hours: [
    { day: 1, open: "10:00", close: "21:00" },
    { day: 2, open: "10:00", close: "21:00" },
    { day: 3, open: "10:00", close: "21:00" },
    { day: 4, open: "10:00", close: "21:00" },
    { day: 5, open: "10:00", close: "21:00" },
    { day: 6, open: "10:00", close: "21:00" },
    { day: 0, open: null, close: null },
  ] as { day: number; open: string | null; close: string | null }[],

  social: {
    instagram: "https://www.instagram.com/rm_shine_solarium/",
    instagramHandle: "@rm_shine_solarium",
    facebook: "https://www.facebook.com/rmshinemarbella/" as string | null,
  },

  google: {
    rating: 4.6,
    reviewCount: 83,
    asOf: "2026-11",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=DIAMOND+SHINE+SOLARIUM%2C+C.+Francisco+Villal%C3%B3n+10%2C+29660+Marbella",
    reviewsUrl:
      "https://www.google.com/maps/search/?api=1&query=DIAMOND+SHINE+SOLARIUM%2C+C.+Francisco+Villal%C3%B3n+10%2C+29660+Marbella",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=DIAMOND+SHINE+SOLARIUM%2C+C.+Francisco+Villal%C3%B3n+10%2C+29660+Marbella",
    embedUrl:
      "https://maps.google.com/maps?q=DIAMOND%20SHINE%20SOLARIUM%2C%20C.%20Francisco%20Villal%C3%B3n%2010%2C%2029660%20Marbella&z=17&output=embed",
  },

  /** Online booking system URL, if the business adopts one. Until then bookings go through WhatsApp. */
  bookingUrl: null as string | null,

  /** Google Analytics 4 measurement ID (G-XXXXXXX). Loaded only after cookie consent. */
  gaMeasurementId: null as string | null,
  /** Google Search Console HTML-tag verification code. */
  searchConsoleVerification: null as string | null,

  equipmentBrands: ["Soltron", "Ergoline"],
  cabinFeatures: ["air", "music", "aquaflash", "aroma"] as const,
  productBrands: ["Australian Gold", "Tannymaxx", "Peau d'Or"],

  /** Owner details for the legal pages — complete before publishing. */
  legal: {
    companyName: null as string | null,
    taxId: null as string | null,
    registry: null as string | null,
  },
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:${site.phone.e164}`;
