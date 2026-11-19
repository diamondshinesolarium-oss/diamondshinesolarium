import { createFileRoute, redirect } from "@tanstack/react-router";

// Spanish is the primary language; "/" sends visitors to /es (x-default in hreflang).
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/es", statusCode: 302 });
  },
});
