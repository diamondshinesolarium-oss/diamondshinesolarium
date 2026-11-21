import { Check } from "lucide-react";
import { useT } from "@/i18n";
import { bestValuePackage, cabinRates, packageBonus, tanningPackages } from "@/content/pricing";
import { salonPhotos } from "@/content/gallery";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BookButton } from "@/components/site/BookButton";

function euroFormatter(lang: string, decimals: boolean) {
  return new Intl.NumberFormat(lang === "en" ? "en-GB" : "es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: 2,
  });
}

/** Big display price with a lighter currency sign. */
function Price({ value, lang, decimals = true, className }: { value: number; lang: string; decimals?: boolean; className?: string }) {
  return (
    <span className={cn("font-display", className)}>
      {euroFormatter(lang, decimals)
        .formatToParts(value)
        .map((part, idx) =>
          part.type === "currency" ? (
            <span key={idx} className="font-sans text-[0.6em] font-light">{part.value}</span>
          ) : (
            <span key={idx}>{part.value}</span>
          ),
        )}
    </span>
  );
}

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ""));
}

export function Pricing({ showProducts = true }: { showProducts?: boolean }) {
  const t = useT();
  const lang = t.meta.htmlLang;
  const p = t.pricing;
  const euro = euroFormatter(lang, false);

  return (
    <section className="py-24 md:py-36">
      <div className="container-luxe">
        <SectionHeading eyebrow={p.eyebrow} title={p.heading} intro={p.intro} align="center" />

        {/* Pay by the minute */}
        <Reveal className="mt-16 md:mt-20">
          <div className="flex flex-col gap-2 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
            <h3 className="text-3xl md:text-4xl">{p.sessionsTitle}</h3>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{p.sessionsText}</p>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cabinRates.map((c, i) => (
            <Reveal
              key={c.key}
              delay={i * 100}
              className="flex flex-col rounded-sm border border-border bg-card p-8 transition-all duration-700 ease-[var(--ease-luxe)] hover:-translate-y-1 hover:shadow-luxe"
            >
              <span className="eyebrow text-gold-deep">{p.cabin}</span>
              <h4 className="mt-3 text-[1.75rem] leading-tight">{c.name}</h4>
              <p className="mt-6 flex items-baseline gap-2 whitespace-nowrap border-t border-border pt-6">
                <Price value={c.pricePerMinute} lang={lang} className="text-5xl" />
                <span className="text-sm text-muted-foreground">{p.perMinute}</span>
              </p>
              <div className="mt-auto pt-8">
                <BookButton variant="outline" className="w-full" label={p.ctaSessions} message={t.common.bookingMessage} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Prepaid packages */}
        <Reveal className="mt-20 md:mt-28">
          <div className="flex flex-col gap-2 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
            <h3 className="text-3xl md:text-4xl">{p.packagesTitle}</h3>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{p.packagesText}</p>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {tanningPackages.map((pkg, i) => {
            const featured = pkg.size === bestValuePackage;
            return (
              <Reveal
                key={pkg.size}
                delay={i * 100}
                className={cn(
                  "relative flex flex-col rounded-sm border p-8 transition-all duration-700 ease-[var(--ease-luxe)] hover:-translate-y-1 hover:shadow-luxe",
                  featured ? "border-ink bg-ink text-ink-foreground" : "border-border bg-card",
                )}
              >
                {featured && (
                  <span className="bg-gold-gradient eyebrow absolute -top-3 left-8 px-3 py-1.5 text-[0.6rem] text-ink">{p.bestValue}</span>
                )}
                <h4 className="text-[1.75rem] leading-tight">{fill(p.packageName, { size: pkg.size })}</h4>

                <div className={cn("my-8 border-y py-6", featured ? "border-ink-line" : "border-border")}>
                  <span className={cn("eyebrow", featured ? "text-gold" : "text-gold-deep")}>{p.youGet}</span>
                  <p className="mt-2 flex items-baseline gap-2 whitespace-nowrap">
                    <Price value={pkg.credit} lang={lang} decimals={false} className="text-5xl" />
                    <span className={cn("text-sm", featured ? "text-ink-muted" : "text-muted-foreground")}>{p.credit}</span>
                  </p>
                  <p className={cn("mt-3 text-sm", featured ? "text-ink-muted" : "text-muted-foreground")}>
                    {p.youPay} <span className={cn("font-medium", featured ? "text-ink-foreground" : "text-foreground")}>{euro.format(pkg.pay)}</span>
                  </p>
                </div>

                <ul className="space-y-3 text-sm">
                  {[fill(p.bonus, { amount: euro.format(packageBonus(pkg)) }), fill(p.validFor, { months: pkg.validMonths })].map((b) => (
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
                    label={p.ctaPackage}
                    message={fill(p.packageMessage, { size: pkg.size })}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">{p.disclaimer}</p>

        {showProducts && (
          <Reveal className="mt-24 grid items-center gap-10 border-t border-border pt-16 md:grid-cols-2">
            <div>
              <h3 className="text-3xl md:text-4xl">{p.productsTitle}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{p.productsText}</p>
            </div>
            <img
              src={salonPhotos.products.url}
              alt={p.productsAlt}
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
