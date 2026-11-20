import { createFileRoute } from "@tanstack/react-router";
import { SafetyPage } from "@/components/pages/InnerPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/es/seguridad-uv")({
  staticData: { sitemap: true },
  head: ({ matches }) => pageHead("es", "safety", matches),
  component: function Page() {
    return <SafetyPage />;
  },
});
