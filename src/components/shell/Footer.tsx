'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import { UI } from '@/content/ui'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <p>{t(UI.footer)}</p>
        <p>
          <a href="https://github.com/ERIC1889/portfolio" target="_blank" rel="noopener noreferrer">
            {t(UI.footerSource)} <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>
    </footer>
  )
}
