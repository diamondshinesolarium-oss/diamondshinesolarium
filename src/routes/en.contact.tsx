import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/InnerPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/en/contact")({
  head: ({ matches }) => pageHead("en", "contact", matches),
  component: function Page() {
    return <ContactPage />;
  },
});
