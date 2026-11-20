import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/pages/InnerPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/es/el-centro")({
  staticData: { sitemap: true },
  head: ({ matches }) => pageHead("es", "studio", matches),
  component: function Page() {
    return <StudioPage />;
  },
});
