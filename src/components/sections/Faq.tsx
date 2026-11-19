import { useT } from "@/i18n";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { LocalLink } from "@/components/site/LocalLink";

export function Faq() {
  const t = useT();
  return (
    <section className="bg-sand/60 py-24 md:py-36">
      <div className="container-luxe grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.heading} />
          <Reveal delay={120}>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t.safety.intro}{" "}
              <LocalLink page="safety" className="text-foreground underline underline-offset-4">
                {t.nav.safety}
              </LocalLink>
            </p>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7" delay={100}>
          <Accordion type="single" collapsible defaultValue="item-0">
            {t.faq.items.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="py-6 text-left font-display text-xl font-normal hover:no-underline md:text-2xl">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
