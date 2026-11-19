import { createFileRoute } from "@tanstack/react-router";
import { FaqPage } from "@/components/pages/InnerPages";
import { faqJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/en/faq")({
  head: ({ matches }) => ({
    ...pageHead("en", "faq", matches),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd("en")) }],
  }),
  component: function Page() {
    return <FaqPage />;
  },
});
