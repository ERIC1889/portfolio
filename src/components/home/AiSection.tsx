'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import type { AiWork } from '@/content/types'
import { AI_LABELS, HOME_IDS, SECTION_TITLES } from '@/content/ui'
import { SectionHead } from './SectionHead'

export function AiSection({ ai }: { ai: AiWork }) {
  const { t } = useLang()
  return (
    <section className="section" aria-labelledby={HOME_IDS.ai}>
      <div className="wrap">
        <SectionHead id={HOME_IDS.ai} title={SECTION_TITLES.ai} lead={ai.lead} />

        <h3 className="label ai-label">{t(AI_LABELS.tools)}</h3>
        <ul className="ai-tools">
          {ai.tools.map((tool) => (
            <li key={tool.name}>
              <strong>{tool.name}</strong>
              <span>{t(tool.role)}</span>
            </li>
          ))}
        </ul>

        <h3 className="label ai-label">{t(AI_LABELS.flow)}</h3>
        <ol className="ai-flow">
          {ai.flow.map((item) => (
            <li key={item.step.ko}>
              <strong>{t(item.step)}</strong>
              <span className="muted">{t(item.who)}</span>
            </li>
          ))}
        </ol>

        <div className="ai-cards">
          {ai.cards.map((card) => (
            <article key={card.title.ko} className="ai-card">
              <h3>{t(card.title)}</h3>
              <p>{t(card.body)}</p>
            </article>
          ))}
        </div>

        <div className="ai-example">
          <h3 className="label ai-label">{t(AI_LABELS.example)}</h3>
          <p>
            {t(ai.example.text)}{' '}
            <Link href={ai.example.href}>
              {t(AI_LABELS.caseLink)} <span aria-hidden="true">→</span>
            </Link>
          </p>
          <p className="mono ai-figure">{t(ai.example.figure)}</p>
        </div>

      </div>
    </section>
  )
}
