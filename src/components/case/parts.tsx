'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import type { CaseSection, Contribution, Metric, Product } from '@/content/types'
import { METRIC_HEADINGS, METRIC_SOURCES, PRODUCT_HEADINGS, SCOPE_LABELS } from '@/content/ui'

const SCOPE_ORDER: (keyof Contribution)[] = ['direct', 'joint', 'others', 'verified']

export function ScopeRows({ contribution, keys = ['direct', 'joint', 'others'] }: { contribution: Contribution; keys?: (keyof Contribution)[] }) {
  const { t } = useLang()
  const rows = SCOPE_ORDER.filter((key) => keys.includes(key) && contribution[key]?.length)
  if (rows.length === 0) return null
  return (
    <dl className="scope-rows">
      {rows.map((key) => (
        <div key={key} className={`scope-row is-${key}`}>
          <dt>{t(SCOPE_LABELS[key])}</dt>
          <dd>
            <ul className="dash-list">
              {contribution[key]!.map((item) => (
                <li key={item.ko}>{t(item)}</li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function ProductTable({ products, hrefBase = '' }: { products: Product[]; hrefBase?: string }) {
  const { t } = useLang()
  return (
    <table className="table product-table">
      <thead>
        <tr>
          <th scope="col">{t(PRODUCT_HEADINGS.product)}</th>
          <th scope="col">{t(PRODUCT_HEADINGS.status)}</th>
          <th scope="col">{t(PRODUCT_HEADINGS.role)}</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <th scope="row">
              <a href={`${hrefBase}#${product.id}`}>{t(product.name)}</a>
            </th>
            <td data-label={t(PRODUCT_HEADINGS.status)}>{t(product.status)}</td>
            <td data-label={t(PRODUCT_HEADINGS.role)}>{t(product.role)}</td>
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
          <th scope="col">{t(METRIC_HEADINGS.source)}</th>
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
            <td data-label={t(METRIC_HEADINGS.source)}>{t(METRIC_SOURCES[metric.source])}</td>
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
