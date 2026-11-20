import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/InnerPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/es/contacto")({
  staticData: { sitemap: true },
  head: ({ matches }) => pageHead("es", "contact", matches),
  component: function Page() {
    return <ContactPage />;
  },
});
