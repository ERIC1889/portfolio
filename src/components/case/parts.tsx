'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import type { CaseSection, Contribution, Flow, Metric } from '@/content/types'
import { CONTRIBUTION_LABELS, FLOW_OWNER, METRIC_HEADINGS, METRIC_SOURCES } from '@/content/ui'

const CONTRIBUTION_ORDER: (keyof Contribution)[] = ['direct', 'joint', 'others', 'verified', 'notYet']

export function ContributionTable({ contribution }: { contribution: Contribution }) {
  const { t } = useLang()
  return (
    <table className="table contribution-table">
      <tbody>
        {CONTRIBUTION_ORDER.filter((key) => contribution[key]?.length).map((key) => (
          <tr key={key} className={`row-${key}`}>
            <th scope="row">{t(CONTRIBUTION_LABELS[key])}</th>
            <td>
              <ul className="dash-list">
                {contribution[key]!.map((item) => (
                  <li key={item.ko}>{t(item)}</li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function MetricsTable({ metrics }: { metrics: Metric[] }) {
  const { t } = useLang()
  return (
    <table className="table metrics-table">
      <thead>
        <tr>
          <th scope="col">{t(METRIC_HEADINGS.label)}</th>
          <th scope="col">{t(METRIC_HEADINGS.value)}</th>
          <th scope="col">{t(METRIC_HEADINGS.target)}</th>
          <th scope="col">{t(METRIC_HEADINGS.condition)}</th>
          <th scope="col">
            {t(METRIC_HEADINGS.source)} · {t(METRIC_HEADINGS.checkedAt)}
          </th>
        </tr>
      </thead>
      <tbody>
        {metrics.map((metric) => (
          <tr key={metric.label.ko}>
            <th scope="row">{t(metric.label)}</th>
            <td data-label={t(METRIC_HEADINGS.value)} className="mono metric-value">
              {metric.value}
            </td>
            <td data-label={t(METRIC_HEADINGS.target)}>{t(metric.target)}</td>
            <td data-label={t(METRIC_HEADINGS.condition)}>{t(metric.condition)}</td>
            <td data-label={`${t(METRIC_HEADINGS.source)} · ${t(METRIC_HEADINGS.checkedAt)}`}>
              {t(METRIC_SOURCES[metric.source])} · <span className="mono">{metric.checkedAt}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function SectionTable({ table }: { table: NonNullable<CaseSection['table']> }) {
  const { t } = useLang()
  return (
    <table className="table version-table">
      <thead>
        <tr>
          {table.head.map((cell) => (
            <th key={cell.ko} scope="col">
              {t(cell)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row) => (
          <tr key={row[0].ko}>
            {row.map((cell, i) =>
              i === 0 ? (
                <th key={i} scope="row">
                  {t(cell)}
                </th>
              ) : (
                <td key={i} data-label={t(table.head[i])}>
                  {t(cell)}
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/** The request flow as a top-to-bottom chain of boxes; my parts are solid, outside services dashed. */
export function FlowDiagram({ flow }: { flow: Flow }) {
  const { t } = useLang()
  return (
    <figure className="flow">
      <ol className="flow-steps">
        {flow.steps.map((step) => (
          <li key={step.label.ko} className={`flow-step is-${step.owner}`}>
            <div className="flow-box">
              <span className="flow-owner">{t(FLOW_OWNER[step.owner])}</span>
              <strong className="flow-label">{t(step.label)}</strong>
              {step.detail && <span className="flow-detail">{t(step.detail)}</span>}
              {step.branches && (
                <ul className="flow-branches">
                  {step.branches.map((branch) => (
                    <li key={branch.when.ko}>
                      <span className="flow-when">{t(branch.when)}</span>
                      <span className="flow-arrow" aria-hidden="true">
                        →
                      </span>
                      <span className="flow-then">{t(branch.then)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
      <figcaption>{t(flow.caption)}</figcaption>
    </figure>
  )
}
