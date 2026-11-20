import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { localBusinessJsonLd, originFrom } from "@/lib/seo";

export const Route = createFileRoute("/en")({
  staticData: { sitemap: false },
  head: ({ matches }) => ({
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusinessJsonLd("en", originFrom(matches))) }],
  }),
  component: function EnLayout() {
    return <SiteLayout lang="en" />;
  },
});
