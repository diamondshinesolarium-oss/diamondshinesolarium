import { Phone } from "lucide-react";
import { useT } from "@/i18n";
import { telLink } from "@/content/site";
import { Reveal } from "@/components/site/Reveal";
import { BookButton } from "@/components/site/BookButton";
import { Button } from "@/components/ui/button";
import { NeonParticles } from "@/components/site/NeonParticles";
import marinaImg from "@/assets/puerto-banus-golden-hour.jpg";

export function CtaBand() {
  const t = useT();
  return (
    <section className="grain relative isolate overflow-hidden bg-ink py-28 text-center text-ink-foreground md:py-40">
      <img src={marinaImg} alt="" aria-hidden="true" width={1600} height={1008} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 -z-10 bg-ink/60" aria-hidden="true" />
      <div className="bg-neon-glow absolute inset-0 -z-10" aria-hidden="true" />
      <NeonParticles count={10} />
      <Reveal className="container-luxe">
        <h2 className="mx-auto max-w-3xl text-4xl leading-[1.05] md:text-6xl">{t.cta.heading}</h2>
        <p className="mx-auto mt-6 max-w-md text-ink-foreground/80">{t.cta.text}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <BookButton size="lg" icon />
          <Button asChild variant="outlineLight" size="lg">
            <a href={telLink}>
              <Phone /> {t.common.callUs}
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
