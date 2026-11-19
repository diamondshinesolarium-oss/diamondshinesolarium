import { AlertTriangle, Check, Stethoscope } from "lucide-react";
import { useT } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { LocalLink } from "@/components/site/LocalLink";

/** Mandatory-style UV warning shown on pages that promote tanning. */
export function SafetyNotice() {
  const t = useT();
  return (
    <section className="py-16">
      <div className="container-luxe">
        <Reveal className="flex flex-col gap-6 border border-gold/50 bg-card p-8 md:flex-row md:items-start md:p-10">
          <AlertTriangle className="h-7 w-7 shrink-0 text-gold-deep" strokeWidth={1.2} aria-hidden="true" />
          <div>
            <p className="eyebrow text-gold-deep">{t.safety.warningTitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.safety.warning}</p>
            <LocalLink page="safety" className="link-underline mt-4 inline-block text-sm">
              {t.nav.safety} →
            </LocalLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SafetyFull() {
  const t = useT();
  return (
    <section className="py-24 md:py-32">
      <div className="container-luxe">
        <Reveal className="max-w-3xl">
          <h2 className="text-4xl leading-tight md:text-5xl">{t.safety.heading}</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t.safety.intro}</p>
        </Reveal>

        <Reveal className="mt-14 border-l-2 border-gold bg-card p-8 md:p-10">
          <p className="eyebrow flex items-center gap-3 text-gold-deep">
            <AlertTriangle className="h-4 w-4" /> {t.safety.warningTitle}
          </p>
          <p className="mt-4 text-lg leading-relaxed">{t.safety.warning}</p>
        </Reveal>

        <div className="mt-16 grid gap-14 md:grid-cols-2">
          <Reveal>
            <h3 className="text-3xl">{t.safety.guidelinesTitle}</h3>
            <ul className="mt-8 space-y-4">
              {t.safety.guidelines.map((g) => (
                <li key={g} className="flex gap-4 border-b border-border pb-4 leading-relaxed">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
                  {g}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <h3 className="text-3xl">{t.safety.contraTitle}</h3>
            <ul className="mt-8 space-y-4">
              {t.safety.contra.map((g) => (
                <li key={g} className="flex gap-4 border-b border-border pb-4 leading-relaxed">
                  <Stethoscope className="mt-1 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
                  {g}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-14 max-w-3xl">
          <p className="leading-relaxed">{t.safety.closing}</p>
          <p className="mt-4 text-xs text-muted-foreground">{t.safety.regulation}</p>
        </Reveal>
      </div>
    </section>
  );
}
