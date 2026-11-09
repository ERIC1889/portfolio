'use client'

import type { CSSProperties } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import type { Diagram, L } from '@/content/types'
import { ARCH_LABELS, DIAGRAM_OWNER } from '@/content/ui'

export function ArchDiagram({ diagram }: { diagram: Diagram }) {
  const { t } = useLang()
  const titles = new Map<string, L>(diagram.columns.flatMap((column) => column.nodes.map((node) => [node.id, node.title] as const)))
  return (
    <figure className="arch">
      <div className="arch-columns" style={{ '--cols': diagram.columns.length } as CSSProperties}>
        {diagram.columns.map((column) => (
          <section key={column.title.ko} className="arch-column" aria-label={t(column.title)}>
            <h4 className="arch-column-title">{t(column.title)}</h4>
            <ul className="arch-nodes">
              {column.nodes.map((node) => (
                <li key={node.id} className={`arch-node is-${node.owner}`}>
                  <span className="arch-owner">{t(DIAGRAM_OWNER[node.owner])}</span>
                  <strong className="arch-node-title">{t(node.title)}</strong>
                  {node.subtitle && <span className="arch-node-sub">{t(node.subtitle)}</span>}
                  {node.items && node.items.length > 0 && (
                    <ul className="arch-items">
                      {node.items.map((item) => (
                        <li key={item.ko}>{t(item)}</li>
                      ))}
                    </ul>
                  )}
                  {node.links && node.links.length > 0 && (
                    <ul className="arch-links">
                      {node.links.map((link) => (
                        <li key={`${link.to}-${link.label.ko}`} className={`arch-link is-${link.kind ?? 'sync'}`}>
                          <span className="arch-arrow" aria-hidden="true">
                            →
                          </span>
                          <span className="arch-link-to">{t(titles.get(link.to) ?? { ko: link.to, en: link.to })}</span>
                          <span className="arch-link-label">{t(link.label)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      {diagram.legend && diagram.legend.length > 0 && (
        <ul className="arch-legend" aria-label={t(ARCH_LABELS.legend)}>
          {diagram.legend.map((item) => (
            <li key={item.kind} className={`is-${item.kind}`}>
              <span className="arch-legend-swatch" aria-hidden="true" />
              {t(item.label)}
            </li>
          ))}
        </ul>
      )}
      <figcaption>{t(diagram.caption)}</figcaption>
    </figure>
  )
}
