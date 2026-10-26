'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import { UI } from '@/content/ui'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <p>{t(UI.footer)}</p>
    </footer>
  )
}
