import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/es/politica-privacidad")({
  staticData: { sitemap: false },
  head: ({ matches }) => pageHead("es", "privacy", matches),
  component: function Page() {
    return <LegalPage kind="privacy" />;
  },
});
