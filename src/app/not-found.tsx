'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import { UI } from '@/content/ui'

export default function NotFound() {
  const { t } = useLang()
  return (
    <main className="sec not-found">
      <div className="sec-inner glass not-found-box">
        <p className="mono diff-line diff-minus">
          <span aria-hidden="true">-</span> 404
        </p>
        <h1 className="gradient-text">404</h1>
        <p className="body-text">{t(UI.notFound)}</p>
        <Link href="/" className="hero-cta">
          ← {t(UI.home)}
        </Link>
      </div>
    </main>
  )
}
