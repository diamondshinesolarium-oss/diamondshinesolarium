import { useT } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import detailImg from "@/assets/editorial-bronze-detail.jpg";
import { salonPhotos } from "@/content/gallery";

export function Experience() {
  const t = useT();
  return (
    <section className="bg-surface py-24 md:py-36">
      <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="relative lg:col-span-5">
          <Reveal className="lg:sticky lg:top-28">
            <img
              src={detailImg}
              alt={t.experience.imageAlt}
              width={1200}
              height={1504}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-sm object-cover shadow-luxe"
            />
            <img
              src={salonPhotos.reception}
              alt={t.gallery.alts.reception}
              width={1200}
              height={1600}
              loading="lazy"
              className="absolute -right-4 -bottom-10 hidden aspect-[4/5] w-1/2 rounded-sm border-4 border-background object-cover shadow-luxe md:block lg:-right-10"
            />
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <SectionHeading eyebrow={t.experience.eyebrow} title={t.experience.heading} intro={t.experience.intro} />
          <ol className="mt-14">
            {t.experience.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 80} className="group grid grid-cols-[3.5rem_1fr] gap-4 border-t border-border py-8 last:border-b">
                <span className="font-display text-2xl text-neon italic">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl transition-colors group-hover:text-neon md:text-[1.7rem]">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
