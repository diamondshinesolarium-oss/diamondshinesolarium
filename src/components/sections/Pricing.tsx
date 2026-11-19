import { Check } from "lucide-react";
import { useT } from "@/i18n";
import { pricing } from "@/content/pricing";
import { salonPhotos } from "@/content/gallery";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BookButton } from "@/components/site/BookButton";

function formatEuro(value: number, lang: string) {
  return new Intl.NumberFormat(lang === "en" ? "en-GB" : "es-ES", { style: "currency", currency: "EUR" }).formatToParts(value);
}

export function Pricing({ showProducts = true }: { showProducts?: boolean }) {
  const t = useT();
  return (
    <section className="py-24 md:py-36">
      <div className="container-luxe">
        <SectionHeading eyebrow={t.pricing.eyebrow} title={t.pricing.heading} intro={t.pricing.intro} align="center" />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pricing.map((p, i) => {
            const c = t.pricing.categories[p.key];
            const featured = p.featured;
            return (
              <Reveal
                key={p.key}
                delay={i * 100}
                className={cn(
                  "relative flex flex-col rounded-sm border p-8 transition-all duration-700 ease-[var(--ease-luxe)] hover:-translate-y-1 hover:shadow-luxe",
                  featured ? "border-ink bg-ink text-ink-foreground" : "border-border bg-card",
                )}
              >
                {featured && (
                  <span className="bg-gold-gradient eyebrow absolute -top-3 left-8 px-3 py-1.5 text-[0.6rem] text-ink">{t.pricing.featured}</span>
                )}
                <h3 className="text-[1.75rem] leading-tight">{c.title}</h3>
                <p className={cn("mt-3 min-h-12 text-sm leading-relaxed", featured ? "text-ink-muted" : "text-muted-foreground")}>{c.text}</p>

                <div className={cn("my-8 border-y py-6", featured ? "border-ink-line" : "border-border")}>
                  {p.pricePerMinute !== null ? (
                    <div>
                      <span className={cn("eyebrow", featured ? "text-gold" : "text-gold-deep")}>{t.pricing.from}</span>
                      <p className="mt-2 flex items-baseline gap-2 whitespace-nowrap">
                        <span className="font-display text-5xl">
                          {formatEuro(p.pricePerMinute, t.meta.htmlLang).map((part, idx) =>
                            part.type === "currency" ? (
                              <span key={idx} className="font-sans text-3xl font-light">{part.value}</span>
                            ) : (
                              <span key={idx}>{part.value}</span>
                            ),
                          )}
                        </span>
                        <span className={cn("text-sm", featured ? "text-ink-muted" : "text-muted-foreground")}>{t.pricing.perMinute}</span>
                      </p>
                    </div>
                  ) : (
                    <p className="font-display text-2xl italic">{t.pricing.onRequest}</p>
                  )}
                </div>

                <ul className="space-y-3 text-sm">
                  {c.benefits.map((b) => (
                    <li key={b} className="flex gap-3">
                      <Check className={cn("mt-0.5 h-4 w-4 shrink-0", featured ? "text-gold" : "text-gold-deep")} strokeWidth={1.5} />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <BookButton
                    variant={featured ? "gold" : "outline"}
                    className="w-full"
                    label={p.key === "sessions" ? t.pricing.ctaSessions : t.pricing.ctaInfo}
                    message={p.key === "sessions" ? t.common.bookingMessage : t.common.pricesMessage}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">{t.pricing.disclaimer}</p>

        {showProducts && (
          <Reveal className="mt-24 grid items-center gap-10 border-t border-border pt-16 md:grid-cols-2">
            <div>
              <h3 className="text-3xl md:text-4xl">{t.pricing.productsTitle}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{t.pricing.productsText}</p>
            </div>
            <img
              src={salonPhotos.products.url}
              alt={t.pricing.productsAlt}
              width={706}
              height={266}
              loading="lazy"
              className="w-full rounded-sm object-cover shadow-luxe"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
