'use client'

import type { ReactNode } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import { ScrollSection } from '@/components/motion'
import type { Archive as ArchiveData, L, Project } from '@/content/types'
import { projectName } from '@/content/select'
import { ARCHIVE_HEADINGS, SECTION_TITLES, UI } from '@/content/ui'
import { SectionHead } from './SectionHead'

function Group({ title, children }: { title: L; children: ReactNode }) {
  const { t } = useLang()
  return (
    <div className="archive-group">
      <h3>{t(title)}</h3>
      <ul>{children}</ul>
    </div>
  )
}

export function Archive({ archive, lines }: { archive: ArchiveData; lines: Project[] }) {
  const { t } = useLang()
  const { education } = archive
  return (
    <ScrollSection className="sec" id="archive">
      <div className="sec-inner">
        <SectionHead num="04" title={SECTION_TITLES.archive} />
        <details className="glass archive-box">
          <summary className="archive-summary">{t(UI.archiveToggle)}</summary>
          <div className="archive-body">
            <Group title={ARCHIVE_HEADINGS.lines}>
              {lines.map((project) => (
                <li key={project.slug}>
                  <strong>{t(projectName(project))}</strong> — {t(project.summary)}
                  <div className="mono archive-meta">{project.period}</div>
                </li>
              ))}
            </Group>
            <Group title={ARCHIVE_HEADINGS.papers}>
              {archive.papers.map((paper) => (
                <li key={paper.title}>
                  {t({ ko: paper.title, en: paper.titleEn ?? paper.title })}
                  <div className="archive-meta">
                    {t(paper.venue)} · {paper.year}
                    {paper.international && ` · ${t(UI.international)}`}
                  </div>
                </li>
              ))}
            </Group>
            <Group title={ARCHIVE_HEADINGS.awards}>
              {archive.awards.map((award) => (
                <li key={`${award.date}-${award.name.ko}`}>
                  {t(award.name)}
                  <div className="archive-meta">
                    {t(award.org)} · <span className="mono">{award.date}</span>
                  </div>
                </li>
              ))}
            </Group>
            <Group title={ARCHIVE_HEADINGS.activities}>
              {archive.activities.map((activity) => (
                <li key={`${activity.period}-${activity.name.ko}`}>
                  {t(activity.name)}
                  <div className="archive-meta">
                    {t(activity.org)} · <span className="mono">{activity.period}</span>
                  </div>
                </li>
              ))}
            </Group>
            <Group title={ARCHIVE_HEADINGS.work}>
              {archive.work.map((item) => (
                <li key={item.company.ko}>
                  {t(item.company)} · {t(item.role)}
                  <div className="mono archive-meta">{item.period}</div>
                </li>
              ))}
            </Group>
            <Group title={ARCHIVE_HEADINGS.skills}>
              {archive.skills.map((group) => (
                <li key={group.group.ko}>
                  <strong>{t(group.group)}</strong>
                  <div className="skill-pills">
                    {group.items.map((item) => (
                      <span key={item} className="tag-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </Group>
            <Group title={ARCHIVE_HEADINGS.education}>
              <li>
                {t(education.school)} · {t(education.major)}
                <div className="archive-meta">
                  <span className="mono">{education.period}</span> · {t(education.note)} · {t(UI.gpa)} {education.gpa}
                </div>
              </li>
            </Group>
            <Group title={ARCHIVE_HEADINGS.certs}>
              {archive.certs.map((cert) => (
                <li key={cert.name.ko}>
                  {t(cert.name)}
                  <div className="archive-meta">{t(cert.detail)}</div>
                </li>
              ))}
            </Group>
          </div>
        </details>
      </div>
    </ScrollSection>
  )
}
