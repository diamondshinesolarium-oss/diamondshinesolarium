import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useLang } from "@/i18n";
import { pathFor, type PageKey } from "@/i18n/pages";

export function LocalLink({
  page,
  className,
  children,
  onClick,
  "aria-label": ariaLabel,
}: {
  page: PageKey;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  const lang = useLang();
  return (
    <Link to={pathFor(page, lang)} activeOptions={{ exact: true }} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
