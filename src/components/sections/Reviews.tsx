import { Star } from "lucide-react";
import { useT } from "@/i18n";
import { site } from "@/content/site";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/site/icons";

export function Reviews() {
  const t = useT();
  const rating = site.google.rating;
  return (
    <section className="grain relative bg-ink py-24 text-ink-foreground md:py-32">
      <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow flex items-center gap-4 text-neon">
            <span className="h-px w-10 bg-neon" aria-hidden="true" />
            {t.reviews.eyebrow}
          </p>
          <h2 className="mt-6 text-[2.15rem] leading-[1.08] md:text-5xl">{t.reviews.heading}</h2>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="neon">
              <a href={site.google.reviewsUrl} target="_blank" rel="noopener noreferrer">
                <GoogleIcon /> {t.reviews.read}
              </a>
            </Button>
            <Button asChild variant="outlineLight">
              <a href={site.google.reviewsUrl} target="_blank" rel="noopener noreferrer">
                {t.reviews.write}
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150} className="neon-border border border-ink-line p-10 text-center md:p-14">
          <p className="eyebrow text-ink-muted">{t.reviews.ratingLabel}</p>
          <p className="mt-6 font-display text-8xl leading-none md:text-9xl">
            {rating.toLocaleString(t.meta.htmlLang, { minimumFractionDigits: 1 })}
          </p>
          <div className="neon-pulse mt-6 flex justify-center gap-1.5" aria-label={`${rating} / 5`}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className={n <= Math.round(rating) ? "h-5 w-5 fill-neon text-neon" : "h-5 w-5 text-neon"}
                strokeWidth={1.2}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-muted">
            <span className="text-ink-foreground">{site.google.reviewCount}</span> {t.reviews.basedOn}
          </p>
          <p className="mt-8 text-[0.7rem] text-ink-muted/80">{t.reviews.source}</p>
        </Reveal>
      </div>
    </section>
  );
}
