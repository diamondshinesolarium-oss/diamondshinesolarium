import { useT } from "@/i18n";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Intro } from "@/components/sections/Intro";
import { Experience } from "@/components/sections/Experience";
import { Technology } from "@/components/sections/Technology";
import { Pricing } from "@/components/sections/Pricing";
import { Why } from "@/components/sections/Why";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { ContactActions, ContactDetails, MapEmbed } from "@/components/sections/Location";
import { ContactForm } from "@/components/sections/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { SafetyFull, SafetyNotice } from "@/components/sections/Safety";
import detailImg from "@/assets/editorial-bronze-detail.jpg";
import marinaImg from "@/assets/puerto-banus-golden-hour.jpg";
import heroImg from "@/assets/hero-golden-skin.jpg";

export function StudioPage() {
  const t = useT();
  return (
    <>
      <PageHero {...t.pages.studio} image={marinaImg} />
      <Intro />
      <Experience />
      <Why />
      <Gallery preview />
      <Reviews />
      <CtaBand />
    </>
  );
}

export function TechnologyPage() {
  const t = useT();
  return (
    <>
      <PageHero {...t.pages.technology} />
      <Technology />
      <SafetyNotice />
      <CtaBand />
    </>
  );
}

export function PricesPage() {
  const t = useT();
  return (
    <>
      <PageHero {...t.pages.prices} image={detailImg} />
      <Pricing />
      <SafetyNotice />
      <CtaBand />
    </>
  );
}

export function GalleryPage() {
  const t = useT();
  return (
    <>
      <PageHero {...t.pages.gallery} />
      <Gallery />
      <CtaBand />
    </>
  );
}

export function FaqPage() {
  const t = useT();
  return (
    <>
      <PageHero {...t.pages.faq} image={heroImg} />
      <Faq />
      <SafetyNotice />
      <CtaBand />
    </>
  );
}

export function SafetyPage() {
  const t = useT();
  return (
    <>
      <PageHero {...t.pages.safety} />
      <SafetyFull />
      <CtaBand />
    </>
  );
}

export function ContactPage() {
  const t = useT();
  return (
    <>
      <PageHero {...t.pages.contact} image={marinaImg} />
      <section className="py-24 md:py-32">
        <div className="container-luxe grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <ContactDetails />
            <div className="mt-6">
              <ContactActions />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={120}>
            <h2 className="text-4xl md:text-5xl">{t.contactForm.heading}</h2>
            <p className="mt-4 mb-10 text-muted-foreground">{t.contactForm.intro}</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>
      <section className="pb-24 md:pb-32">
        <div className="container-luxe">
          <Reveal className="overflow-hidden rounded-sm shadow-luxe">
            <MapEmbed />
          </Reveal>
        </div>
      </section>
    </>
  );
}
