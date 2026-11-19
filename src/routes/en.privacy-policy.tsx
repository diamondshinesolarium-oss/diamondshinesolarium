import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/en/privacy-policy")({
  head: ({ matches }) => pageHead("en", "privacy", matches),
  component: function Page() {
    return <LegalPage kind="privacy" />;
  },
});
