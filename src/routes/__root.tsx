import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { getRequestOrigin } from "../lib/origin.functions";
import { dictionaries } from "../i18n";
import { langFromPath } from "../i18n/pages";
import { site } from "../content/site";

function NotFoundComponent() {
  const pathname = useRouterState({ select: (st) => st.location.pathname });
  const lang = langFromPath(pathname);
  const t = dictionaries[lang].notFound;
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4 text-ink-foreground">
      <div className="max-w-md text-center">
        <p className="eyebrow text-gold">Diamond Shine Solarium</p>
        <h1 className="mt-6 font-display text-8xl">404</h1>
        <h2 className="mt-4 text-2xl">{t.title}</h2>
        <p className="mt-3 text-sm text-ink-muted">{t.text}</p>
        <div className="mt-8">
          <Link
            to={lang === "en" ? "/en" : "/es"}
            className="inline-flex h-12 items-center justify-center bg-gold-gradient px-7 text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-ink"
          >
            {t.back}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // Request origin for absolute canonical / hreflang / Open Graph URLs. Fetched once per visit.
  loader: async () => ({ origin: await getRequestOrigin() }),
  staleTime: Infinity,
  shouldReload: false,
  head: () => ({
    // Page-specific title, description, canonical and hreflang live in each page route's head().
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Diamond Shine Solarium — Puerto Banús, Marbella" },
      { name: "description", content: dictionaries.es.seo.home.description },
      { name: "author", content: site.name },
      { name: "theme-color", content: "#111111" },
      { property: "og:site_name", content: site.name },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(site.searchConsoleVerification
        ? [{ name: "google-site-verification", content: site.searchConsoleVerification }]
        : []),
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Jost:wght@300;400;500&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (st) => st.location.pathname });
  return (
    <html lang={langFromPath(pathname)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
