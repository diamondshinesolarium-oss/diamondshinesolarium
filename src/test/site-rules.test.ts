import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { site } from "@/content/site";
import { pricing } from "@/content/pricing";
import { es } from "@/i18n/es";
import { en } from "@/i18n/en";
import { LANGS, PAGE_PATHS, findPage, type PageKey } from "@/i18n/pages";
import { buildContactMessage, contactSchema } from "@/lib/contact";

describe("business data", () => {
  it("is open Monday to Saturday 10:00–21:00 and closed on Sunday", () => {
    for (const day of [1, 2, 3, 4, 5, 6]) {
      expect(site.hours.find((h) => h.day === day)).toMatchObject({ open: "10:00", close: "21:00" });
    }
    expect(site.hours.find((h) => h.day === 0)?.open).toBeNull();
  });

  it("uses the Google listing phone for calls and WhatsApp", () => {
    expect(site.phone.e164).toBe("+34622496077");
    expect(site.whatsapp).toBe("34622496077");
  });

  it("only shows the confirmed price (from €0.60/min); other options are on request", () => {
    expect(pricing.find((p) => p.key === "sessions")?.pricePerMinute).toBe(0.6);
    for (const key of ["packages", "memberships", "offers"] as const) {
      expect(pricing.find((p) => p.key === key)?.pricePerMinute).toBeNull();
    }
  });
});

describe("bilingual site", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("has a real page for every page in both Spanish and English", () => {
    for (const key of Object.keys(PAGE_PATHS) as PageKey[]) {
      for (const lang of LANGS) {
        const path = PAGE_PATHS[key][lang];
        expect(path.startsWith(`/${lang}`)).toBe(true);
        expect(router.matchRoutes(path).at(-1)?.routeId, path).not.toBe(rootRouteId);
        expect(findPage(path)).toEqual({ key, lang });
      }
    }
  });

  it("has the same number of FAQ answers in both languages", () => {
    expect(en.faq.items.length).toBe(es.faq.items.length);
  });

  it("never promises a safe, healthy or risk-free tan", () => {
    const text = JSON.stringify({ es, en }).toLowerCase();
    for (const banned of ["bronceado seguro", "bronceado sano", "bronceado saludable", "sin riesgo", "safe tan", "healthy tan", "risk-free", "no risk"]) {
      expect(text, banned).not.toContain(banned);
    }
  });
});

describe("contact form", () => {
  const valid = { name: "Ana", phone: "+34 600 000 000", email: "", message: "Quiero reservar el viernes", privacy: true, website: "" };

  it("accepts a complete message", () => {
    expect(contactSchema(es).safeParse(valid).success).toBe(true);
  });

  it("requires accepting the privacy policy", () => {
    expect(contactSchema(es).safeParse({ ...valid, privacy: false }).success).toBe(false);
  });

  it("rejects bots that fill the hidden field", () => {
    expect(contactSchema(es).safeParse({ ...valid, website: "spam" }).success).toBe(false);
  });

  it("puts the visitor's name, phone and message in the WhatsApp text", () => {
    const msg = buildContactMessage(en, { name: "Ana", phone: "600", email: "a@b.co", message: "Hi" });
    expect(msg).toBe("Hello Diamond Shine, this is Ana (600 · a@b.co).\n\nHi");
  });
});
