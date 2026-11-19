import { useT } from "@/i18n";
import { site } from "@/content/site";

type Kind = "notice" | "privacy" | "cookiePolicy";

export function LegalPage({ kind }: { kind: Kind }) {
  const t = useT();
  const doc = t.legal[kind];
  const pending = t.legal.pending;
  const fill = (s: string) =>
    s
      .replaceAll("{company}", site.legal.companyName ?? pending)
      .replaceAll("{taxId}", site.legal.taxId ?? pending)
      .replaceAll("{registry}", site.legal.registry ?? pending)
      .replaceAll("{address}", `${site.address.street}, ${site.address.postalCode} ${site.address.locality} (${site.address.region})`)
      .replaceAll("{phone}", site.phone.display)
      .replaceAll("{email}", site.email ?? pending);

  return (
    <article className="pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="container-luxe max-w-3xl">
        <p className="eyebrow text-gold-deep">{site.name}</p>
        <h1 className="mt-6 text-5xl md:text-6xl">{doc.title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">{t.legal.updated}</p>
        <div className="mt-14 space-y-12">
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-2xl md:text-3xl">{s.h}</h2>
              {s.p.map((p, i) => (
                <p key={i} className="mt-4 leading-relaxed text-muted-foreground">
                  {fill(p)}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
