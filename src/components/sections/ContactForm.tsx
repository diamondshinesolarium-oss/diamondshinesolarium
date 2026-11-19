import { useState, type FormEvent } from "react";
import { useT } from "@/i18n";
import { site, whatsappLink } from "@/content/site";
import { buildContactMessage, contactSchema } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LocalLink } from "@/components/site/LocalLink";
import { WhatsAppIcon } from "@/components/site/icons";

type Errors = Partial<Record<"name" | "phone" | "email" | "message" | "privacy", string>>;

export function ContactForm() {
  const t = useT();
  const [values, setValues] = useState({ name: "", phone: "", email: "", message: "", website: "" });
  const [privacy, setPrivacy] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }));

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = contactSchema(t).safeParse({ ...values, privacy });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Errors;
        if (k && !next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
    window.open(whatsappLink(buildContactMessage(t, parsed.data)), "_blank", "noopener,noreferrer");
  }

  const field = "h-12 rounded-sm border-input bg-card text-base font-light";
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-xs text-destructive">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label={t.contactForm.heading}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-name" className="eyebrow text-[0.6875rem] text-muted-foreground">{t.contactForm.name}</Label>
          <Input id="cf-name" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={`mt-2 ${field}`} />
          {err("name")}
        </div>
        <div>
          <Label htmlFor="cf-phone" className="eyebrow text-[0.6875rem] text-muted-foreground">{t.contactForm.phone}</Label>
          <Input id="cf-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} className={`mt-2 ${field}`} />
          {err("phone")}
        </div>
      </div>
      <div>
        <Label htmlFor="cf-email" className="eyebrow text-[0.6875rem] text-muted-foreground">{t.contactForm.email}</Label>
        <Input id="cf-email" type="email" autoComplete="email" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={`mt-2 ${field}`} />
        {err("email")}
      </div>
      <div>
        <Label htmlFor="cf-message" className="eyebrow text-[0.6875rem] text-muted-foreground">{t.contactForm.message}</Label>
        <Textarea id="cf-message" rows={5} value={values.message} onChange={set("message")} placeholder={t.contactForm.messagePlaceholder} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} className="mt-2 rounded-sm border-input bg-card text-base font-light" />
        {err("message")}
      </div>
      {/* Honeypot field, hidden from people */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
      </div>
      <div>
        <div className="flex items-start gap-3">
          <Checkbox id="cf-privacy" checked={privacy} onCheckedChange={(v) => setPrivacy(v === true)} aria-invalid={!!errors.privacy} className="mt-0.5" />
          <Label htmlFor="cf-privacy" className="text-sm font-light leading-relaxed text-muted-foreground">
            {t.contactForm.privacy}{" "}
            <LocalLink page="privacy" className="text-foreground underline underline-offset-4">
              {t.contactForm.privacyLink}
            </LocalLink>
            .
          </Label>
        </div>
        {err("privacy")}
      </div>
      <Button type="submit" variant="whatsapp" size="lg" className="w-full sm:w-auto">
        <WhatsAppIcon /> {t.contactForm.submit}
      </Button>
      <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
        {sent ? t.contactForm.success : null}
      </p>
      {site.email && (
        <p className="text-sm text-muted-foreground">
          {t.contactForm.orEmail}{" "}
          <a href={`mailto:${site.email}`} className="text-foreground underline underline-offset-4">
            {site.email}
          </a>
        </p>
      )}
    </form>
  );
}
