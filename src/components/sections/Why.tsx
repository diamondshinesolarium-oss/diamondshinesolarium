import { Award, Gem, HeartHandshake, Info, MapPin, Sparkles } from "lucide-react";
import { useT } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

const ICONS = [Award, HeartHandshake, Gem, MapPin, Sparkles, Info];

export function Why() {
  const t = useT();
  return (
    <section className="bg-sand/60 py-24 md:py-36">
      <div className="container-luxe">
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.heading} />
        <ul className="mt-16 grid gap-x-12 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((item, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            return (
              <Reveal as="li" key={item.title} delay={(i % 3) * 100} className="group border-t border-gold/40 pt-8 pb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold-deep transition-colors duration-500 group-hover:bg-ink group-hover:text-gold">
                  <Icon className="h-5 w-5" strokeWidth={1.2} aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-2xl">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
