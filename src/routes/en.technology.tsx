import { createFileRoute } from "@tanstack/react-router";
import { TechnologyPage } from "@/components/pages/InnerPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/en/technology")({
  head: ({ matches }) => pageHead("en", "technology", matches),
  component: function Page() {
    return <TechnologyPage />;
  },
});
