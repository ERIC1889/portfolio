'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import { UI } from '@/content/ui'

export default function NotFound() {
  const { t } = useLang()
  return (
    <main id="main" className="page">
      <div className="wrap narrow not-found">
        <h1>404</h1>
        <p>{t(UI.notFound)}</p>
        <p>
          <Link href="/" className="btn btn-primary">
            <span aria-hidden="true">←</span> {t(UI.home)}
          </Link>
        </p>
      </div>
    </main>
  )
}
