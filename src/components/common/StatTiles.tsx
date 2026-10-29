'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import type { L, Stat } from '@/content/types'

/** Big numbers first, then what they count. */
export function StatTiles({ stats, label }: { stats: Stat[]; label: L }) {
  const { t } = useLang()
  return (
    <dl className="stat-tiles" aria-label={t(label)}>
      {stats.map((stat) => (
        <div key={stat.label.ko} className="stat">
          <dt>{t(stat.label)}</dt>
          <dd className="stat-value">{stat.value}</dd>
          {stat.note && <dd className="stat-note">{t(stat.note)}</dd>}
        </div>
      ))}
    </dl>
  )
}
