'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { L, Lang } from '@/content/types'

const LANG_KEY = 'lang'

type LanguageContextValue = { lang: Lang; setLang(lang: Lang): void; t(text: L): string }

const LanguageContext = createContext<LanguageContextValue | null>(null)

function isLang(value: unknown): value is Lang {
  return value === 'ko' || value === 'en'
}

function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_KEY)
    if (isLang(stored)) return stored
  } catch {
    // storage unavailable; fall through to the browser language
  }
  return (navigator.language || '').toLowerCase().startsWith('ko') ? 'ko' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // The server always renders Korean; the visitor's language is applied after mount.
  const [lang, setLangState] = useState<Lang>('ko')

  useEffect(() => {
    const detected = detectLang()
    document.documentElement.lang = detected
    setLangState(detected)
  }, [])

  const setLang = useCallback((next: Lang) => {
    document.documentElement.lang = next
    try {
      localStorage.setItem(LANG_KEY, next)
    } catch {
      // storage unavailable; the choice still applies for this visit
    }
    setLangState(next)
  }, [])

  const t = useCallback((text: L) => text[lang] || text.ko, [lang])

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}

export function useLang(): LanguageContextValue {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLang must be used inside <LanguageProvider>')
  return value
}
