'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import { NavLink, type LinkMode } from '@/components/shell/NavLink'
import type { Year } from '@/content/types'
import { UI } from '@/content/ui'

export function YearSwitcher({ years, current, mode = 'soft' }: { years: Year[]; current: Year; mode?: LinkMode }) {
  const { t } = useLang()
  return (
    <nav className="mono year-switcher" aria-label={t(UI.yearSwitcher)}>
      {years.map((year) =>
        year === current ? (
          <span key={year} className="year-switcher-current" aria-current="page">
            {year}
          </span>
        ) : (
          <NavLink key={year} href={`/journey/${year}`} mode={mode}>
            {year}
          </NavLink>
        ),
      )}
    </nav>
  )
}
