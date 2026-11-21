import { Star } from "lucide-react";
import { useT } from "@/i18n";
import { site } from "@/content/site";
import { Reveal } from "@/components/site/Reveal";
import marinaImg from "@/assets/puerto-banus-golden-hour.jpg";

export function Intro() {
  const t = useT();
  const stats = [
    { value: String(site.foundedYear), label: t.intro.stats.since },
    { value: site.google.rating.toLocaleString(t.meta.htmlLang), label: t.intro.stats.rating, star: true },
    { value: site.equipmentBrand, label: t.intro.stats.brands, small: true },
    { value: "10h · 21h", label: t.intro.stats.hours },
  ];
  return (
    <section id="intro" className="scroll-mt-24 py-24 md:py-36">
      <div className="container-luxe grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow flex items-center gap-4 text-gold-deep">
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              {t.intro.eyebrow}
            </p>
            <h2 className="mt-6 text-[2.15rem] leading-[1.08] md:text-5xl">{t.intro.heading}</h2>
          </Reveal>
          {t.intro.body.map((p, i) => (
            <Reveal key={i} delay={120 * (i + 1)}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="relative lg:col-span-6" delay={150}>
          <div className="overflow-hidden rounded-sm shadow-luxe">
            <img
              src={marinaImg}
              alt={t.intro.imageAlt}
              width={1600}
              height={1008}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[2s] ease-[var(--ease-luxe)] hover:scale-105 md:aspect-[5/4]"
            />
          </div>
          <div className="absolute -bottom-8 -left-4 hidden border border-gold/40 bg-background px-7 py-5 shadow-luxe md:block">
            <p className="font-display text-4xl">{site.foundedYear}</p>
            <p className="eyebrow mt-1 text-muted-foreground">{t.intro.stats.since}</p>
          </div>
        </Reveal>
      </div>

      <div className="container-luxe mt-24">
        <dl className="grid grid-cols-2 border-t border-border lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="border-b border-border py-8 pr-4 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
              <dt className="eyebrow text-muted-foreground">{s.label}</dt>
              <dd className={`mt-3 flex items-center gap-2 font-display ${s.small ? "text-2xl" : "text-4xl md:text-5xl"}`}>
                {s.value}
                {s.star && <Star className="h-5 w-5 fill-gold text-gold" aria-hidden="true" />}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
