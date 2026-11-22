import { useEffect, useState } from "react";
import { useT } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useConsent } from "./consent";
import { LocalLink } from "./LocalLink";

export function CookieBanner() {
  const t = useT();
  const { consent, ready, save, settingsOpen, openSettings, closeSettings } = useConsent();
  const [analytics, setAnalytics] = useState(consent.analytics);
  const [media, setMedia] = useState(consent.media);

  useEffect(() => {
    if (settingsOpen) {
      setAnalytics(consent.analytics);
      setMedia(consent.media);
    }
  }, [settingsOpen, consent]);

  const showBanner = ready && !consent.decided && !settingsOpen;

  return (
    <>
      {showBanner && (
        <div
          role="region"
          aria-label={t.cookies.title}
          className="fade-up fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl border border-ink-line bg-ink p-5 text-ink-foreground shadow-luxe md:bottom-6 md:p-7"
        >
          <p className="eyebrow text-neon">{t.cookies.title}</p>
          <p className="mt-2 text-xs leading-relaxed text-ink-muted md:mt-3 md:text-sm">
            {t.cookies.text}{" "}
            <LocalLink page="cookies" className="text-ink-foreground underline underline-offset-4 hover:text-neon">
              {t.cookies.more}
            </LocalLink>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap md:mt-5">
            <Button variant="neon" size="sm" onClick={() => save({ analytics: true, media: true })}>
              {t.cookies.accept}
            </Button>
            <Button variant="outlineLight" size="sm" onClick={() => save({ analytics: false, media: false })}>
              {t.cookies.reject}
            </Button>
            <Button variant="ghostLight" size="sm" className="col-span-2 h-8" onClick={openSettings}>
              {t.cookies.configure}
            </Button>
          </div>
        </div>
      )}

      <Dialog open={settingsOpen} onOpenChange={(o) => (o ? openSettings() : closeSettings())}>
        <DialogContent className="max-w-lg rounded-sm border-border bg-background">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl font-normal">{t.cookies.title}</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">{t.cookies.text}</DialogDescription>
          </DialogHeader>
          <div className="mt-2 divide-y divide-border">
            {(
              [
                ["necessary", true, undefined],
                ["analytics", analytics, setAnalytics],
                ["media", media, setMedia],
              ] as const
            ).map(([key, value, setter]) => (
              <div key={key} className="flex items-start justify-between gap-6 py-4">
                <div>
                  <p className="text-sm font-medium">{t.cookies.categories[key].title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t.cookies.categories[key].text}</p>
                </div>
                <Switch
                  checked={value}
                  disabled={!setter}
                  onCheckedChange={(v) => setter?.(v)}
                  aria-label={t.cookies.categories[key].title}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button onClick={() => save({ analytics, media })}>{t.cookies.save}</Button>
            <Button variant="outline" onClick={() => save({ analytics: true, media: true })}>
              {t.cookies.accept}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
