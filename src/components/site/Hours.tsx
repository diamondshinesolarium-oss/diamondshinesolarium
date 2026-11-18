import { useT } from "@/i18n";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Opening hours, grouped when consecutive days share the same times. */
export function Hours({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const t = useT();
  const open = site.hours.filter((h) => h.open);
  const closed = site.hours.filter((h) => !h.open);
  const same = open.every((h) => h.open === open[0]?.open && h.close === open[0]?.close);
  const rows: { label: string; value: string }[] = same
    ? [
        { label: `${t.location.days[open[0].day]} – ${t.location.days[open[open.length - 1].day]}`, value: `${open[0].open} – ${open[0].close}` },
        ...closed.map((h) => ({ label: t.location.days[h.day], value: t.common.closed })),
      ]
    : site.hours.map((h) => ({ label: t.location.days[h.day], value: h.open ? `${h.open} – ${h.close}` : t.common.closed }));

  return (
    <dl className={cn("space-y-2 text-sm", className)}>
      {rows.map((r) => (
        <div key={r.label} className={cn("flex justify-between gap-6 border-b pb-2", tone === "dark" ? "border-ink-line" : "border-border")}>
          <dt className={tone === "dark" ? "text-ink-muted" : "text-muted-foreground"}>{r.label}</dt>
          <dd className="tabular-nums">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
