import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages/HomePage";
import { pageHead } from "@/lib/seo";
import ogImage from "@/assets/og-diamond-shine.jpg";

export const Route = createFileRoute("/es/")({
  staticData: { sitemap: true },
  head: ({ matches }) => pageHead("es", "home", matches, ogImage),
  component: function Page() {
    return <HomePage />;
  },
});
