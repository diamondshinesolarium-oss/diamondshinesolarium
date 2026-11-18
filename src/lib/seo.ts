import { dictionaries } from "@/i18n";
import { LANGS, PAGE_PATHS, type Lang, type PageKey } from "@/i18n/pages";
import { site } from "@/content/site";

type AnyMatch = { loaderData?: unknown; pathname?: string };

export function originFrom(matches: AnyMatch[]): string {
  const data = matches[0]?.loaderData as { origin?: string } | undefined;
  return data?.origin ?? "";
}

/** Page-specific title, description and social tags for one localized page. */
export function pageHead(lang: Lang, key: PageKey, matches: AnyMatch[], image?: string) {
  const t = dictionaries[lang];
  const { title, description } = t.seo[key];
  const origin = originFrom(matches);
  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: t.meta.locale },
    { property: "og:locale:alternate", content: dictionaries[lang === "es" ? "en" : "es"].meta.locale },
    { property: "og:site_name", content: site.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (image && origin) {
    const abs = image.startsWith("http") ? image : `${origin}${image}`;
    meta.push(
      { property: "og:image", content: abs },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: abs },
    );
  }
  if (key === "legal" || key === "privacy" || key === "cookies") {
    meta.push({ name: "robots", content: "noindex, follow" });
  }
  return { meta };
}

/** Canonical + hreflang links for the current page. */
export function alternateLinks(pathname: string, origin: string, key: PageKey | null) {
  if (!origin || !key) return [];
  const links: { rel: string; href: string; hrefLang?: string }[] = [
    { rel: "canonical", href: `${origin}${pathname.replace(/\/+$/, "") || "/"}` },
  ];
  for (const l of LANGS) {
    links.push({ rel: "alternate", hrefLang: l, href: `${origin}${PAGE_PATHS[key][l]}` });
  }
  links.push({ rel: "alternate", hrefLang: "x-default", href: `${origin}${PAGE_PATHS[key].es}` });
  return links;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function localBusinessJsonLd(lang: Lang, origin: string) {
  const t = dictionaries[lang];
  const open = site.hours.filter((h) => h.open && h.close);
  return {
    "@context": "https://schema.org",
    "@type": "TanningSalon",
    "@id": origin ? `${origin}/#business` : undefined,
    name: site.name,
    description: t.seo.home.description,
    url: origin ? `${origin}${PAGE_PATHS.home[lang]}` : undefined,
    telephone: site.phone.e164,
    email: site.email ?? undefined,
    foundingDate: String(site.foundedYear),
    inLanguage: lang,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Francisco Villalón 10, Marina Banús, bloque 3-4, local 10",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.google.mapsUrl,
    areaServed: ["Puerto Banús", "Marbella", "Nueva Andalucía", "Costa del Sol"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: open.map((h) => DAY_NAMES[h.day]),
        opens: open[0]?.open,
        closes: open[0]?.close,
      },
    ],
    sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
  };
}

export function faqJsonLd(lang: Lang) {
  const t = dictionaries[lang];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: t.faq.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
