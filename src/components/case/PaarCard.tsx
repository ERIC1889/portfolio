'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import { Gallery } from '@/components/common/Media'
import { Rich } from '@/components/common/Rich'
import type { Case, L, PaarStep } from '@/content/types'
import { LEGACY_LABELS, PAAR_LABELS } from '@/content/ui'

export const isLegacyCase = (item: Case) => !item.analysis && !item.result

function Step({ label, step }: { label: L; step: PaarStep }) {
  const { t } = useLang()
  return (
    <div className="paar-step">
      <b className="paar-label">{t(label)}</b>
      <div className="paar-body">
        {step.lead && (
          <p className="paar-lead">
            <Rich text={t(step.lead)} />
          </p>
        )}
        {step.body.map((paragraph) => (
          <p key={paragraph.ko}>
            <Rich text={t(paragraph)} />
          </p>
        ))}
      </div>
    </div>
  )
}

export function PaarCard({ item, id, level = 3 }: { item: Case; id?: string; level?: 3 | 4 }) {
  const { t } = useLang()
  const legacy = isLegacyCase(item)
  const Title = `h${level}` as const
  const steps: [L, PaarStep | undefined][] = legacy
    ? [
        [LEGACY_LABELS.problem, item.problem],
        [LEGACY_LABELS.fix, item.action],
      ]
    : [
        [PAAR_LABELS.problem, item.problem],
        [PAAR_LABELS.analysis, item.analysis],
        [PAAR_LABELS.action, item.action],
        [PAAR_LABELS.result, item.result],
      ]
  return (
    <article id={id} className={`paar${legacy ? ' is-legacy' : ''}`}>
      <Title className="paar-title">
        <Rich text={t(item.title)} />
      </Title>
      {steps.map(([label, step]) => (step ? <Step key={label.en} label={label} step={step} /> : null))}
      {item.media && item.media.length > 0 && <Gallery media={item.media} />}
    </article>
  )
}
