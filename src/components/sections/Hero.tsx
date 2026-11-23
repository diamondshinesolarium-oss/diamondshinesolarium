import { ArrowDown } from "lucide-react";
import { useT } from "@/i18n";
import { Button } from "@/components/ui/button";
import { BookButton } from "@/components/site/BookButton";
import { LocalLink } from "@/components/site/LocalLink";
import heroImg from "@/assets/hero-golden-skin.jpg";
import { NeonParticles } from "@/components/site/NeonParticles";

export function Hero() {
  const t = useT();
  return (
    <section className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-ink-foreground">
      <img
        src={heroImg}
        alt={t.hero.imageAlt}
        width={1920}
        height={1088}
        fetchPriority="high"
        className="ken-burns absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
      />
      <div className="bg-ink-fade absolute inset-0 -z-10" aria-hidden="true" />
      <div className="bg-ink-bottom absolute inset-0 -z-10" aria-hidden="true" />
      <div className="bg-neon-glow absolute inset-0 -z-10" aria-hidden="true" />
      <NeonParticles count={18} />

      <div className="container-luxe pb-20 pt-40 md:pb-28">
        <p className="eyebrow fade-up flex items-center gap-4 text-neon" style={{ animationDelay: "200ms" }}>
          <span className="led-line w-12" aria-hidden="true" />
          {t.hero.eyebrow}
        </p>
        <h1 className="fade-up mt-8 max-w-4xl text-[3.4rem] leading-[0.95] sm:text-7xl md:text-8xl lg:text-[8.5rem]" style={{ animationDelay: "350ms" }}>
          <span className="block uppercase tracking-[0.04em]">{t.hero.titleA}</span>
          <span className="text-neon-gradient block italic">{t.hero.titleB}</span>
          <span className="sr-only"> — Diamond Shine Solarium, Puerto Banús, Marbella</span>
        </h1>
        <p className="fade-up mt-8 max-w-md text-base leading-relaxed text-ink-foreground/80 md:text-lg" style={{ animationDelay: "550ms" }}>
          {t.hero.subtitle}
        </p>
        <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "700ms" }}>
          <BookButton size="lg" />
          <Button asChild variant="outlineLight" size="lg">
            <LocalLink page="studio">{t.common.discover}</LocalLink>
          </Button>
        </div>
      </div>

      <a
        href="#intro"
        className="absolute right-6 bottom-10 hidden flex-col items-center gap-4 text-[0.6rem] uppercase tracking-[0.4em] text-ink-foreground/70 transition-colors hover:text-neon md:flex"
      >
        <span className="[writing-mode:vertical-rl]">{t.hero.scroll}</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
