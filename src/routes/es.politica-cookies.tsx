import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/es/politica-cookies")({
  staticData: { sitemap: false },
  head: ({ matches }) => pageHead("es", "cookies", matches),
  component: function Page() {
    return <LegalPage kind="cookiePolicy" />;
  },
});
