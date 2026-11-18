import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  className,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow flex items-center gap-4", tone === "dark" ? "text-gold" : "text-gold-deep", align === "center" && "justify-center")}>
        <span className="h-px w-10 bg-gold" aria-hidden="true" />
        {eyebrow}
      </p>
      <Tag
        className={cn(
          "mt-6 text-[2.15rem] leading-[1.08] md:text-5xl lg:text-[3.4rem]",
          tone === "dark" ? "text-ink-foreground" : "text-foreground",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className={cn("mt-6 text-base leading-relaxed md:text-lg", tone === "dark" ? "text-ink-muted" : "text-muted-foreground")}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
