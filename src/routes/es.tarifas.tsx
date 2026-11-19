import { createFileRoute } from "@tanstack/react-router";
import { PricesPage } from "@/components/pages/InnerPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/es/tarifas")({
  head: ({ matches }) => pageHead("es", "prices", matches),
  component: function Page() {
    return <PricesPage />;
  },
});
