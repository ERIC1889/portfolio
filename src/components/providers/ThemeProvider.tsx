'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { isTheme, THEME_KEY, type Theme } from '@/lib/theme'

type ThemeContextValue = { theme: Theme; toggleTheme(): void }

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const applied = document.documentElement.dataset.theme
    if (isTheme(applied)) setTheme(applied)
  }, [])

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      // storage can be unavailable (private mode); the theme still applies for this visit
    }
    setTheme(next)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used inside <ThemeProvider>')
  return value
}
