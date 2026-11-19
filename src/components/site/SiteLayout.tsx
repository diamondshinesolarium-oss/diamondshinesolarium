import { Outlet } from "@tanstack/react-router";
import { LangProvider, dictionaries } from "@/i18n";
import type { Lang } from "@/i18n/pages";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { CookieBanner } from "./CookieBanner";
import { ConsentProvider } from "./consent";

export function SiteLayout({ lang }: { lang: Lang }) {
  return (
    <LangProvider lang={lang}>
      <ConsentProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-ink focus:px-4 focus:py-3 focus:text-ink-foreground"
        >
          {dictionaries[lang].common.skip}
        </a>
        <Header />
        <main id="main" lang={lang}>
          <Outlet />
        </main>
        <Footer />
        <WhatsAppFloat />
        <CookieBanner />
      </ConsentProvider>
    </LangProvider>
  );
}
