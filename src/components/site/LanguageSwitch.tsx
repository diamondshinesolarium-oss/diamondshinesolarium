import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { dictionaries, useLang, useT } from "@/i18n";
import { LANGS, PAGE_PATHS, findPage } from "@/i18n/pages";

export function LanguageSwitch({ className }: { className?: string }) {
  const lang = useLang();
  const t = useT();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = findPage(pathname);

  return (
    <nav aria-label={t.common.language} className={cn("flex items-center gap-1 text-[0.6875rem] font-medium tracking-[0.2em]", className)}>
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-40" aria-hidden="true">/</span>}
          <Link
            to={PAGE_PATHS[current?.key ?? "home"][l]}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "true" : undefined}
            aria-label={dictionaries[l].meta.label}
            className={cn(
              "px-1.5 py-2 transition-colors duration-300",
              l === lang ? "text-neon" : "opacity-70 hover:opacity-100 hover:text-neon",
            )}
          >
            {dictionaries[l].meta.short}
          </Link>
        </span>
      ))}
    </nav>
  );
}
