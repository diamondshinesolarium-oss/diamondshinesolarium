import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/pages/InnerPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/en/gallery")({
  staticData: { sitemap: true },
  head: ({ matches }) => pageHead("en", "gallery", matches),
  component: function Page() {
    return <GalleryPage />;
  },
});
