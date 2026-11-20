import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/es/aviso-legal")({
  staticData: { sitemap: false },
  head: ({ matches }) => pageHead("es", "legal", matches),
  component: function Page() {
    return <LegalPage kind="notice" />;
  },
});
