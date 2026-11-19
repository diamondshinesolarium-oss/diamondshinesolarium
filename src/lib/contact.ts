import { z } from "zod";
import type { Dict } from "@/i18n/es";

export function contactSchema(t: Dict) {
  return z.object({
    name: z.string().trim().min(2, t.contactForm.errors.name).max(80, t.contactForm.errors.name),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s().-]{7,20}$/, t.contactForm.errors.phone),
    email: z.union([z.literal(""), z.string().trim().email(t.contactForm.errors.email).max(120)]),
    message: z.string().trim().min(10, t.contactForm.errors.message).max(1000, t.contactForm.errors.message),
    privacy: z.literal(true, { errorMap: () => ({ message: t.contactForm.errors.privacy }) }),
    // Honeypot: must stay empty.
    website: z.string().max(0),
  });
}

export type ContactValues = z.infer<ReturnType<typeof contactSchema>>;

export function buildContactMessage(t: Dict, v: Pick<ContactValues, "name" | "phone" | "email" | "message">) {
  return t.contactForm.template
    .replace("{name}", v.name.trim())
    .replace("{phone}", v.phone.trim())
    .replace("{email}", v.email.trim() ? ` · ${v.email.trim()}` : "")
    .replace("{message}", v.message.trim());
}
