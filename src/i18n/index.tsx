import { createContext, useContext, type ReactNode } from "react";
import { es, type Dict } from "./es";
import { en } from "./en";
import type { Lang } from "./pages";

export const dictionaries: Record<Lang, Dict> = { es, en };

const LangContext = createContext<Lang>("es");

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

export function useT(): Dict {
  return dictionaries[useLang()];
}

export type { Dict };
