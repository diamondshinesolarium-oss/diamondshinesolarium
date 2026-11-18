import { useT } from "@/i18n";
import { whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./icons";

export function WhatsAppFloat() {
  const t = useT();
  return (
    <a
      href={whatsappLink(t.common.bookingMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.common.whatsappFloat}
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-3 rounded-full bg-whatsapp py-3.5 pr-3.5 pl-3.5 text-whatsapp-foreground shadow-luxe transition-all duration-500 ease-[var(--ease-luxe)] hover:pl-5 md:right-6 md:bottom-6"
    >
      <span className="hidden max-w-0 overflow-hidden text-[0.6875rem] font-medium uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-500 group-hover:max-w-56 md:inline">
        {t.common.whatsappFloat}
      </span>
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
