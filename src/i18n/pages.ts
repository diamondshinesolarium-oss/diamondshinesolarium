export type Lang = "es" | "en";
export const LANGS: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "es";

export type PageKey =
  | "home"
  | "studio"
  | "technology"
  | "prices"
  | "gallery"
  | "faq"
  | "contact"
  | "safety"
  | "legal"
  | "privacy"
  | "cookies";

/** Localized URL for every page. Each path has a matching route file in src/routes. */
export const PAGE_PATHS = {
  home: { es: "/es", en: "/en" },
  studio: { es: "/es/el-centro", en: "/en/our-studio" },
  technology: { es: "/es/tecnologia", en: "/en/technology" },
  prices: { es: "/es/tarifas", en: "/en/prices" },
  gallery: { es: "/es/galeria", en: "/en/gallery" },
  faq: { es: "/es/preguntas-frecuentes", en: "/en/faq" },
  contact: { es: "/es/contacto", en: "/en/contact" },
  safety: { es: "/es/seguridad-uv", en: "/en/uv-safety" },
  legal: { es: "/es/aviso-legal", en: "/en/legal-notice" },
  privacy: { es: "/es/politica-privacidad", en: "/en/privacy-policy" },
  cookies: { es: "/es/politica-cookies", en: "/en/cookie-policy" },
} as const satisfies Record<PageKey, Record<Lang, string>>;

export type PagePath = (typeof PAGE_PATHS)[PageKey][Lang];

export function pathFor(key: PageKey, lang: Lang): PagePath {
  return PAGE_PATHS[key][lang];
}

export function findPage(pathname: string): { key: PageKey; lang: Lang } | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  for (const key of Object.keys(PAGE_PATHS) as PageKey[]) {
    for (const lang of LANGS) {
      if (PAGE_PATHS[key][lang] === clean) return { key, lang };
    }
  }
  return null;
}

export function langFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

export const NAV_KEYS: PageKey[] = ["studio", "technology", "prices", "gallery", "faq", "contact"];
