import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";
import { NAV_KEYS } from "@/i18n/pages";
import { site, telLink, whatsappLink } from "@/content/site";
import { Logo } from "./Logo";
import { LocalLink } from "./LocalLink";
import { LanguageSwitch } from "./LanguageSwitch";
import { BookButton } from "./BookButton";
import { WhatsAppIcon, InstagramIcon } from "./icons";
import { Button } from "@/components/ui/button";

export function Header() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-ink-foreground transition-all duration-700 ease-[var(--ease-luxe)]",
          scrolled || open ? "border-b border-ink-line bg-ink/90 py-3 backdrop-blur-md shadow-luxe" : "border-b border-transparent bg-transparent py-6",
        )}
      >
        <div className="container-luxe flex items-center justify-between gap-6">
          <LocalLink page="home" aria-label={`${site.name} — ${t.common.home}`}>
            <Logo />
          </LocalLink>

          <nav aria-label="Main" className="hidden items-center gap-8 xl:flex">
            {NAV_KEYS.map((key) => (
              <LocalLink
                key={key}
                page={key}
                className="link-underline pb-1 text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-ink-foreground/85 transition-colors hover:text-neon [&.active]:text-neon"
              >
                {t.nav[key]}
              </LocalLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitch className="hidden sm:flex" />
            <BookButton size="sm" className="hidden md:inline-flex" />
            <Button
              variant="ghostLight"
              size="icon"
              className="xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.common.close : t.common.menu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="!size-6" /> : <Menu className="!size-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu — outside <header> so its backdrop-filter doesn't trap position:fixed */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[68px] bottom-0 z-[45] overflow-y-auto bg-ink text-ink-foreground xl:hidden"
      >
        <div className="container-luxe flex min-h-full flex-col py-10">
          <nav aria-label="Mobile" className="flex flex-col">
            {(["home", ...NAV_KEYS] as const).map((key, i) => (
              <LocalLink
                key={key}
                page={key}
                className="fade-up flex items-baseline justify-between border-b border-ink-line py-5 font-display text-3xl text-ink-foreground transition-colors hover:text-neon [&.active]:text-neon"
              >
                <span>{t.nav[key]}</span>
                <span className="text-xs font-sans tracking-[0.3em] text-neon">0{i + 1}</span>
              </LocalLink>
            ))}
          </nav>
          <div className="mt-10 grid gap-3">
            <BookButton size="lg" icon />
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outlineLight">
                <a href={telLink}>
                  <Phone /> {t.common.call}
                </a>
              </Button>
              <Button asChild variant="outlineLight">
                <a
                  href={whatsappLink(t.common.bookingMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon /> {t.common.whatsapp}
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between pt-10 text-ink-muted">
            <LanguageSwitch />
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs tracking-[0.2em] hover:text-neon"
            >
              <InstagramIcon className="h-5 w-5" /> {site.social.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
