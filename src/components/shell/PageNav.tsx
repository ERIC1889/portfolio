'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import type { L } from '@/content/types'
import { UI } from '@/content/ui'

type Step = { href: string; label: L }

/** Bottom navigation: ← previous · center (home or list) · next →, in the same place on every page. */
export function PageNav({ prev, center, next }: { prev?: Step; center?: Step; next?: Step }) {
  const { t } = useLang()
  return (
    <nav className="page-nav" aria-label={t(UI.pageNav)}>
      <div className="page-nav-side">
        {prev && (
          <Link href={prev.href}>
            <span aria-hidden="true">←</span> {t(prev.label)}
          </Link>
        )}
      </div>
      {center ? (
        <Link href={center.href} className="btn page-nav-center">
          {t(center.label)}
        </Link>
      ) : (
        <span />
      )}
      <div className="page-nav-side page-nav-next">
        {next && (
          <Link href={next.href}>
            {t(next.label)} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </nav>
  )
}
