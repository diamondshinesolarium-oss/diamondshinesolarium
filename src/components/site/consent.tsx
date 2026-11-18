import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { site } from "@/content/site";

export type Consent = { analytics: boolean; media: boolean; decided: boolean };
const KEY = "ds-consent";
const DEFAULT: Consent = { analytics: false, media: false, decided: false };

type Ctx = {
  consent: Consent;
  ready: boolean;
  save: (c: Omit<Consent, "decided">) => void;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
};

const ConsentContext = createContext<Ctx | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<Consent>(DEFAULT);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setConsent({ ...DEFAULT, ...JSON.parse(raw), decided: true });
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  const save = useCallback((c: Omit<Consent, "decided">) => {
    const next = { ...c, decided: true };
    setConsent(next);
    setSettingsOpen(false);
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ analytics: c.analytics, media: c.media, date: new Date().toISOString() }));
    } catch {
      /* storage unavailable */
    }
  }, []);

  // Google Analytics 4 — injected only after explicit consent and when an ID is configured.
  useEffect(() => {
    const id = site.gaMeasurementId;
    if (!ready || !consent.analytics || !id || document.getElementById("ga4")) return;
    const s = document.createElement("script");
    s.id = "ga4";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);
    const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", id, { anonymize_ip: true });
  }, [ready, consent.analytics]);

  return (
    <ConsentContext.Provider
      value={{
        consent,
        ready,
        save,
        settingsOpen,
        openSettings: () => setSettingsOpen(true),
        closeSettings: () => setSettingsOpen(false),
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside ConsentProvider");
  return ctx;
}
