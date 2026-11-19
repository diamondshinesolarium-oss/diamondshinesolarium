import { createFileRoute } from "@tanstack/react-router";
import { PricesPage } from "@/components/pages/InnerPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/en/prices")({
  head: ({ matches }) => pageHead("en", "prices", matches),
  component: function Page() {
    return <PricesPage />;
  },
});
