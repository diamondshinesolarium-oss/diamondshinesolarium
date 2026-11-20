import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { localBusinessJsonLd, originFrom } from "@/lib/seo";

export const Route = createFileRoute("/es")({
  staticData: { sitemap: false },
  head: ({ matches }) => ({
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusinessJsonLd("es", originFrom(matches))) }],
  }),
  component: function EsLayout() {
    return <SiteLayout lang="es" />;
  },
});
