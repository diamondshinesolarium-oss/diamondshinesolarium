import { createFileRoute } from "@tanstack/react-router";
import { TechnologyPage } from "@/components/pages/InnerPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/es/tecnologia")({
  head: ({ matches }) => pageHead("es", "technology", matches),
  component: function Page() {
    return <TechnologyPage />;
  },
});
