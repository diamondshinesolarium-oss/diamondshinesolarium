import { createFileRoute } from "@tanstack/react-router";
import { FaqPage } from "@/components/pages/InnerPages";
import { faqJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/es/preguntas-frecuentes")({
  staticData: { sitemap: true },
  head: ({ matches }) => ({
    ...pageHead("es", "faq", matches),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd("es")) }],
  }),
  component: function Page() {
    return <FaqPage />;
  },
});
