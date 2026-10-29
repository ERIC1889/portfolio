'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import { StackList } from '@/components/common/bits'
import type { SkillRow } from '@/content/types'
import { HOME_IDS, SECTION_LEADS, SECTION_TITLES, SKILL_HEADINGS } from '@/content/ui'
import { SectionHead } from './SectionHead'

export function Skills({ rows }: { rows: SkillRow[] }) {
  const { t } = useLang()
  return (
    <section className="section" aria-labelledby={HOME_IDS.skills}>
      <div className="wrap">
        <SectionHead id={HOME_IDS.skills} title={SECTION_TITLES.skills} lead={SECTION_LEADS.skills} />
        <table className="table skills-table">
          <thead>
            <tr>
              <th scope="col">{t(SKILL_HEADINGS.area)}</th>
              <th scope="col">{t(SKILL_HEADINGS.items)}</th>
              <th scope="col">{t(SKILL_HEADINGS.did)}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.area.ko}>
                <th scope="row">{t(row.area)}</th>
                <td data-label={t(SKILL_HEADINGS.items)}>
                  <StackList items={row.items} />
                </td>
                <td data-label={t(SKILL_HEADINGS.did)}>{t(row.did)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
