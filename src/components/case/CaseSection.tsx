'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import { DiffBlock } from '@/components/term/DiffBlock'
import type { CaseSection as CaseSectionData, LinkItem } from '@/content/types'
import { UI } from '@/content/ui'

export function CaseSection({ section, hunk, links }: { section: CaseSectionData; hunk: string; links?: LinkItem[] }) {
  const { t } = useLang()
  return (
    <section className="case-section">
      <div className="sec-inner">
        <div className="case-section-head">
          <h2>{t(section.title)}</h2>
          {section.hold && <span className="hold-badge">{t(UI.onHold)}</span>}
        </div>
        <div className="case-body">
          {section.body.map((paragraph, i) => (
            <p key={i} className="body-text">
              {t(paragraph)}
            </p>
          ))}
        </div>
        {links && links.length > 0 && (
          <ul className="case-links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="mono">
                  → {t(link.label)}
                </a>
              </li>
            ))}
          </ul>
        )}
        {section.scenes && (
          <div className="diff-list case-scenes">
            {section.scenes.map((scene, i) => (
              <DiffBlock key={i} hunk={hunk} scene={scene} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
