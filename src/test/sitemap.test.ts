import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { site } from "@/content/site";
import { sitemapStaticPaths, sitemapXML } from "@/lib/sitemap";
import { PAGE_PATHS, type PageKey } from "@/i18n/pages";

const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

// Same normalisation the /sitemap.xml handler applies: canonical URLs carry no trailing slash.
const listed = sitemapStaticPaths(router).map((path) => path.replace(/\/+$/, "") || "/");

describe("sitemap", () => {
  const publicPages: PageKey[] = ["home", "studio", "technology", "prices", "gallery", "faq", "contact", "safety"];
  const hiddenPages: PageKey[] = ["legal", "privacy", "cookies"];

  it("is published for the domain the owner confirmed", () => {
    expect(site.url).toBe("https://diamondshine.es");
    const robots = readFileSync(new URL("../../public/robots.txt", import.meta.url), "utf8");
    expect(robots).toContain(`Sitemap: ${site.url}/sitemap.xml`);
  });

  it("lists every public page in both languages", () => {
    for (const key of publicPages) {
      for (const lang of ["es", "en"] as const) {
        expect(listed, `${key}/${lang}`).toContain(PAGE_PATHS[key][lang]);
      }
    }
  });

  it("keeps the noindex legal pages out of the sitemap", () => {
    for (const key of hiddenPages) {
      for (const lang of ["es", "en"] as const) {
        expect(listed, `${key}/${lang}`).not.toContain(PAGE_PATHS[key][lang]);
      }
    }
  });

  it("writes one absolute https URL per page and no invented lastmod dates", () => {
    const xml = sitemapXML(site.url, listed.map((path) => ({ path })));
    expect((xml.match(/<loc>/g) ?? []).length).toBe(listed.length);
    expect(xml).toContain(`<loc>${site.url}/es/tarifas</loc>`);
    expect(xml).not.toContain("<lastmod>");
  });
});
