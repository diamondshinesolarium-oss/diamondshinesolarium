import { AudioLines, Droplets, Flower2, Wind } from "lucide-react";
import { useT } from "@/i18n";
import { site } from "@/content/site";
import { salonPhotos } from "@/content/gallery";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import lightImg from "@/assets/golden-light-lines.jpg";
import { NeonParticles } from "@/components/site/NeonParticles";

const ICONS = { air: Wind, music: AudioLines, aquaflash: Droplets, aroma: Flower2 } as const;

export function Technology() {
  const t = useT();
  return (
    <section className="grain relative isolate overflow-hidden bg-ink py-24 text-ink-foreground md:py-36">
      <img src={lightImg} alt="" aria-hidden="true" width={1600} height={1008} loading="lazy" className="neon-tint absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
      <NeonParticles count={10} />
      <div className="container-luxe">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <SectionHeading tone="dark" eyebrow={t.technology.eyebrow} title={t.technology.heading} className="lg:col-span-7" />
          <Reveal className="lg:col-span-5" delay={150}>
            <p className="leading-relaxed text-ink-muted md:text-lg">{t.technology.body}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <Reveal className="overflow-hidden rounded-sm md:col-span-8">
            <img
              src={salonPhotos.tanningBed}
              alt={t.technology.imageAlt}
              width={1600}
              height={1200}
              loading="lazy"
              className="aspect-[16/9] h-full w-full object-cover transition-transform duration-[2s] ease-[var(--ease-luxe)] hover:scale-105"
            />
          </Reveal>
          <Reveal className="neon-border flex flex-col justify-between border border-ink-line p-8 md:col-span-4" delay={150}>
            <p className="eyebrow text-neon">{t.technology.brandsLabel}</p>
            <p className="mt-8 font-display text-4xl tracking-[0.06em] uppercase md:text-5xl">{site.equipmentBrand}</p>
            <p className="eyebrow mt-8 text-ink-muted">{t.technology.modelsLabel}</p>
            <ul className="mt-3 divide-y divide-ink-line border-y border-ink-line">
              {site.equipmentModels.map((m) => (
                <li key={m} className="flex items-baseline justify-between py-3">
                  <span className="text-sm text-ink-muted">{site.equipmentBrand}</span>
                  <span className="font-display text-2xl tracking-[0.04em]">{m}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 overflow-hidden rounded-sm">
              <img src={salonPhotos.k11Blue} alt={t.technology.image2Alt} width={1200} height={1600} loading="lazy" className="aspect-[16/9] w-full object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="mt-20">
          <p className="eyebrow text-neon">{t.technology.featuresLabel}</p>
          <ul className="mt-8 grid gap-px overflow-hidden border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-4">
            {site.cabinFeatures.map((key, i) => {
              const Icon = ICONS[key];
              const f = t.technology.features[key];
              return (
                <Reveal as="li" key={key} delay={i * 90} className="card-neon relative border border-transparent bg-ink p-8 hover:z-10 hover:bg-ink-soft">
                  <Icon className="neon-pulse h-6 w-6 text-neon" style={{ animationDelay: `${i * 0.9}s` }} strokeWidth={1.2} aria-hidden="true" />
                  <h3 className="mt-6 text-2xl">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.text}</p>
                </Reveal>
              );
            })}
          </ul>
          <p className="mt-6 text-xs text-ink-muted">{t.technology.note}</p>
        </div>
      </div>
    </section>
  );
}
