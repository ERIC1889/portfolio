'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import type { L } from '@/content/types'
import { UI } from '@/content/ui'
import { NavLink, type LinkMode } from './NavLink'

type Step = { href: string; label: string }

/** Bottom navigation: ← previous · center (home or list) · next →, in the same place on every page. */
export function PageNav({
  prev,
  center,
  next,
  mode = 'soft',
}: {
  prev?: Step
  center?: { href: string; label: L }
  next?: Step
  mode?: LinkMode
}) {
  const { t } = useLang()
  return (
    <nav className="sec-inner page-nav" aria-label={t(UI.pageNav)}>
      <div className="page-nav-side">
        {prev && (
          <NavLink href={prev.href} mode={mode} className="page-nav-link">
            ← {prev.label}
          </NavLink>
        )}
      </div>
      {center ? (
        <NavLink href={center.href} mode={mode} className="btn-glass page-nav-center">
          {t(center.label)}
        </NavLink>
      ) : (
        <span />
      )}
      <div className="page-nav-side page-nav-next">
        {next && (
          <NavLink href={next.href} mode={mode} className="page-nav-link">
            {next.label} →
          </NavLink>
        )}
      </div>
    </nav>
  )
}
