import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/pages/InnerPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/es/galeria")({
  staticData: { sitemap: true },
  head: ({ matches }) => pageHead("es", "gallery", matches),
  component: function Page() {
    return <GalleryPage />;
  },
});
