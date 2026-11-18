import { Button, type ButtonProps } from "@/components/ui/button";
import { useT } from "@/i18n";
import { site, whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./icons";

/** Primary booking CTA: online booking if configured, otherwise WhatsApp with a prefilled message. */
export function BookButton({
  variant = "gold",
  size,
  className,
  label,
  message,
  icon = false,
}: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  label?: string;
  message?: string;
  icon?: boolean;
}) {
  const t = useT();
  const href = site.bookingUrl ?? whatsappLink(message ?? t.common.bookingMessage);
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {icon && <WhatsAppIcon />}
        {label ?? t.common.book}
      </a>
    </Button>
  );
}
