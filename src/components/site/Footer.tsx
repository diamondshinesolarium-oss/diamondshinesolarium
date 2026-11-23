import { MapPin, Phone, Mail } from "lucide-react";
import { useT } from "@/i18n";
import { NAV_KEYS } from "@/i18n/pages";
import { site, telLink } from "@/content/site";
import { Logo } from "./Logo";
import { LocalLink } from "./LocalLink";
import { LanguageSwitch } from "./LanguageSwitch";
import { Hours } from "./Hours";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { useConsent } from "./consent";
import { whatsappLink } from "@/content/site";

export function Footer() {
  const t = useT();
  const { openSettings } = useConsent();
  const linkCls = "text-sm text-ink-muted transition-colors hover:text-neon";

  return (
    <footer className="grain relative bg-ink text-ink-foreground">
      <span className="led-line absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="container-luxe py-20 md:py-24">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-ink-muted">{t.footer.about}</p>
            <div className="mt-8 flex items-center gap-4">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-ink-foreground transition-colors hover:border-neon hover:text-neon">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href={whatsappLink(t.common.bookingMessage)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-ink-foreground transition-colors hover:border-neon hover:text-neon">
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label={t.footer.explore} className="lg:col-span-2">
            <p className="eyebrow text-neon">{t.footer.explore}</p>
            <ul className="mt-6 space-y-3">
              {(["home", ...NAV_KEYS, "safety"] as const).map((k) => (
                <li key={k}>
                  <LocalLink page={k} className={linkCls}>
                    {t.nav[k]}
                  </LocalLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow text-neon">{t.footer.contact}</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href={site.google.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${linkCls} flex gap-3`}>
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                  <span>
                    {site.address.streetShort}, Marina Banús
                    <br />
                    {site.address.postalCode} {site.address.area}, {site.address.locality}
                  </span>
                </a>
              </li>
              <li>
                <a href={telLink} className={`${linkCls} flex gap-3`}>
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                  {site.phone.display}
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className={`${linkCls} flex gap-3`}>
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                    {site.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-neon">{t.location.hours}</p>
            <Hours tone="dark" className="mt-6" />
          </div>
        </div>

        <div className="hairline mt-16 opacity-40" />

        <div className="mt-8 flex flex-col gap-6 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {(["legal", "privacy", "cookies"] as const).map((k) => (
              <li key={k}>
                <LocalLink page={k} className="hover:text-neon">
                  {t.nav[k]}
                </LocalLink>
              </li>
            ))}
            <li>
              <button type="button" onClick={openSettings} className="cursor-pointer hover:text-neon">
                {t.footer.cookieSettings}
              </button>
            </li>
          </ul>
          <LanguageSwitch className="text-ink-foreground" />
        </div>
      </div>
    </footer>
  );
}
