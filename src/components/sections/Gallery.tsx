import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useT } from "@/i18n";
import { galleryImages } from "@/content/gallery";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { LocalLink } from "@/components/site/LocalLink";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const LAYOUT = [
  "md:col-span-8 md:row-span-2",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4 md:row-span-2",
  "md:col-span-8",
  "md:col-span-4",
  "md:col-span-4",
];

export function Gallery({ preview = false }: { preview?: boolean }) {
  const t = useT();
  const images = preview ? galleryImages.slice(0, 5) : galleryImages;
  const [index, setIndex] = useState<number | null>(null);
  const current = index !== null ? images[index] : null;
  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length));

  return (
    <section className="py-24 md:py-36">
      <div className="container-luxe">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.heading} intro={t.gallery.intro} />
          {preview && (
            <Button asChild variant="outline">
              <LocalLink page="gallery">{t.common.viewGallery}</LocalLink>
            </Button>
          )}
        </div>

        <ul className="mt-14 grid auto-rows-[220px] grid-cols-1 gap-4 sm:auto-rows-[260px] md:grid-cols-12">
          {images.map((img, i) => (
            <Reveal as="li" key={img.key} delay={(i % 3) * 90} className={cn("group relative overflow-hidden rounded-sm bg-muted", LAYOUT[i])}>
              <button type="button" onClick={() => setIndex(i)} className="block h-full w-full cursor-zoom-in" aria-label={t.gallery.alts[img.key]}>
                <img
                  src={img.src}
                  alt={t.gallery.alts[img.key]}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-105"
                />
                <span className="bg-ink-bottom absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true" />
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <Dialog open={current !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent className="max-w-6xl border-none bg-ink p-0 text-ink-foreground sm:rounded-sm [&>button:last-child]:hidden">
          {current && (
            <figure className="relative">
              <DialogTitle className="sr-only">{t.gallery.alts[current.key]}</DialogTitle>
              <img src={current.src} alt={t.gallery.alts[current.key]} className="max-h-[80vh] w-full object-contain" />
              <figcaption className="flex items-center justify-between gap-4 p-4 text-sm text-ink-muted">
                <span>{t.gallery.alts[current.key]}</span>
                <span className="flex gap-2">
                  <Button variant="outlineLight" size="icon" onClick={() => step(-1)} aria-label="Previous">
                    <ChevronLeft />
                  </Button>
                  <Button variant="outlineLight" size="icon" onClick={() => step(1)} aria-label="Next">
                    <ChevronRight />
                  </Button>
                  <Button variant="outlineLight" size="icon" onClick={() => setIndex(null)} aria-label={t.common.close}>
                    <X />
                  </Button>
                </span>
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
