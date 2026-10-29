'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import { useTheme } from '@/components/providers/ThemeProvider'
import { profile } from '@/content/profile'
import { HOME_IDS, NAV_LABELS, UI } from '@/content/ui'

const ITEMS = [
  { href: `/#${HOME_IDS.flagship}`, label: NAV_LABELS.projects },
  { href: `/#${HOME_IDS.skills}`, label: NAV_LABELS.skills },
  { href: `/#${HOME_IDS.experience}`, label: NAV_LABELS.experience },
  { href: '/resume', label: NAV_LABELS.resume },
]

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  )
}

/** One row of plain links; on a phone the links drop to a second row instead of hiding behind a menu button. */
export function Nav() {
  const { lang, setLang, t } = useLang()
  const { theme, toggleTheme } = useTheme()
  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        {t(UI.skipToContent)}
      </a>
      <div className="wrap nav">
        <Link href="/" className="nav-brand">
          {t(profile.name)}
        </Link>
        <nav className="nav-links" aria-label={t(UI.mainMenu)}>
          <ul>
            {ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{t(item.label)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-tools">
          <button type="button" className="icon-btn lang-btn" aria-label={t(UI.langSwitch)} onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}>
            {lang === 'ko' ? 'EN' : 'KO'}
          </button>
          <button type="button" className="icon-btn" aria-label={t(theme === 'dark' ? UI.themeToLight : UI.themeToDark)} onClick={toggleTheme}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}
