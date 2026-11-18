import { Reveal } from "./Reveal";
import heroImg from "@/assets/golden-light-lines.jpg";

export function PageHero({ eyebrow, title, text, image = heroImg }: { eyebrow: string; title: string; text: string; image?: string }) {
  return (
    <section className="grain relative isolate overflow-hidden bg-ink pt-36 pb-20 text-ink-foreground md:pt-48 md:pb-28">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        width={1600}
        height={1008}
        fetchPriority="high"
        className="ken-burns absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
      />
      <div className="bg-ink-fade absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-luxe">
        <Reveal>
          <p className="eyebrow flex items-center gap-4 text-gold">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[1.02] md:text-7xl">{title}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">{text}</p>
        </Reveal>
      </div>
    </section>
  );
}
