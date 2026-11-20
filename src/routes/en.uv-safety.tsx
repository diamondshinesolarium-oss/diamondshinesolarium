import { createFileRoute } from "@tanstack/react-router";
import { SafetyPage } from "@/components/pages/InnerPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/en/uv-safety")({
  staticData: { sitemap: true },
  head: ({ matches }) => pageHead("en", "safety", matches),
  component: function Page() {
    return <SafetyPage />;
  },
});
