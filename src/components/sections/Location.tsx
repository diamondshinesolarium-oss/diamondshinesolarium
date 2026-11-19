import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useT } from "@/i18n";
import { site, telLink, whatsappLink } from "@/content/site";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Hours } from "@/components/site/Hours";
import { LocalLink } from "@/components/site/LocalLink";
import { Button } from "@/components/ui/button";
import { InstagramIcon, WhatsAppIcon } from "@/components/site/icons";
import { useConsent } from "@/components/site/consent";
import marinaImg from "@/assets/puerto-banus-golden-hour.jpg";

export function MapEmbed() {
  const t = useT();
  const { consent, ready, save } = useConsent();
  if (ready && consent.media) {
    return (
      <iframe
        title={t.location.mapTitle}
        src={site.google.embedUrl}
        className="h-full min-h-[420px] w-full grayscale-[0.4] sepia-[0.15]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }
  return (
    <div className="relative isolate flex h-full min-h-[420px] items-center justify-center overflow-hidden bg-ink p-8 text-center text-ink-foreground">
      <img src={marinaImg} alt="" aria-hidden="true" width={1600} height={1008} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" />
      <div className="max-w-sm">
        <MapPin className="mx-auto h-8 w-8 text-gold" strokeWidth={1.2} />
        <p className="mt-4 font-display text-2xl">{site.address.streetShort}</p>
        <p className="mt-1 text-sm text-ink-muted">
          {site.address.postalCode} {site.address.area}, {site.address.locality}
        </p>
        <p className="mt-6 text-xs leading-relaxed text-ink-muted">{t.location.mapConsent}</p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Button variant="gold" size="sm" onClick={() => save({ analytics: consent.analytics, media: true })}>
            {t.location.loadMap}
          </Button>
          <Button asChild variant="outlineLight" size="sm">
            <a href={site.google.directionsUrl} target="_blank" rel="noopener noreferrer">
              {t.common.directions}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ContactDetails() {
  const t = useT();
  const row = "flex gap-4 border-b border-border py-5";
  return (
    <div>
      <div className={row}>
        <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.3} />
        <div>
          <p className="eyebrow text-muted-foreground">{t.location.address}</p>
          <address className="mt-2 not-italic leading-relaxed">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.area}, {site.address.locality} ({site.address.region})
          </address>
        </div>
      </div>
      <div className={row}>
        <Phone className="mt-1 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.3} />
        <div>
          <p className="eyebrow text-muted-foreground">{t.location.phone}</p>
          <a href={telLink} className="link-underline mt-2 inline-block">
            {site.phone.display}
          </a>
        </div>
      </div>
      {site.email && (
        <div className={row}>
          <Mail className="mt-1 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.3} />
          <div>
            <p className="eyebrow text-muted-foreground">{t.location.email}</p>
            <a href={`mailto:${site.email}`} className="link-underline mt-2 inline-block">
              {site.email}
            </a>
          </div>
        </div>
      )}
      <div className={row}>
        <InstagramIcon className="mt-1 h-5 w-5 shrink-0 text-gold-deep" />
        <div>
          <p className="eyebrow text-muted-foreground">{t.location.social}</p>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="link-underline mt-2 inline-block">
            {site.social.instagramHandle}
          </a>
        </div>
      </div>
      <div className="flex gap-4 py-5">
        <Clock className="mt-1 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.3} />
        <div className="flex-1">
          <p className="eyebrow mb-3 text-muted-foreground">{t.location.hours}</p>
          <Hours />
        </div>
      </div>
    </div>
  );
}

export function ContactActions() {
  const t = useT();
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button asChild variant="whatsapp" className="sm:col-span-2">
        <a href={whatsappLink(t.common.bookingMessage)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon /> {t.common.writeWhatsapp}
        </a>
      </Button>
      <Button asChild variant="default">
        <a href={site.google.directionsUrl} target="_blank" rel="noopener noreferrer">
          <Navigation /> {t.common.directions}
        </a>
      </Button>
      <Button asChild variant="outline">
        <a href={telLink}>
          <Phone /> {t.common.callUs}
        </a>
      </Button>
    </div>
  );
}

export function Location({ showContactLink = true }: { showContactLink?: boolean }) {
  const t = useT();
  return (
    <section className="py-24 md:py-36">
      <div className="container-luxe">
        <SectionHeading eyebrow={t.location.eyebrow} title={t.location.heading} intro={t.location.intro} />
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <Reveal className="overflow-hidden rounded-sm shadow-luxe lg:col-span-7">
            <MapEmbed />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={150}>
            <ContactDetails />
            <div className="mt-6">
              <ContactActions />
            </div>
            {showContactLink && (
              <LocalLink page="contact" className="link-underline mt-6 inline-block text-sm text-muted-foreground hover:text-foreground">
                {t.common.contactUs} →
              </LocalLink>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
