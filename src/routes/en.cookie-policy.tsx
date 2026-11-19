import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/en/cookie-policy")({
  head: ({ matches }) => pageHead("en", "cookies", matches),
  component: function Page() {
    return <LegalPage kind="cookiePolicy" />;
  },
});
