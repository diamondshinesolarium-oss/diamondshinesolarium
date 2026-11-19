import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/en/legal-notice")({
  head: ({ matches }) => pageHead("en", "legal", matches),
  component: function Page() {
    return <LegalPage kind="notice" />;
  },
});
