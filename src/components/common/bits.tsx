'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import type { L, LinkItem, Project } from '@/content/types'
import { checkedOn } from '@/content/ui'

export const isExternal = (href: string) => /^(https?:|mailto:)/.test(href)

/** An internal link stays in the tab; an outside link opens a new one and says so with ↗. */
export function SmartLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (isExternal(href)) {
    const newTab = href.startsWith('http')
    return (
      <a href={href} className={className} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
        {newTab && <span aria-hidden="true">{'\u00a0'}↗</span>}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

export function StackList({ items, label }: { items: string[]; label?: L }) {
  const { t } = useLang()
  return (
    <ul className="chips" aria-label={label ? t(label) : undefined}>
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  )
}

/** "Live (finz.kr) · checked 2026-10-29", with a green dot when there is a live link. */
export function StatusBadge({ project }: { project: Pick<Project, 'status' | 'statusCheckedAt' | 'links'> }) {
  const { t } = useLang()
  if (!project.status) return null
  const live = project.links?.some((link) => link.kind === 'live')
  return (
    <span className={`status${live ? ' is-live' : ''}`}>
      <span className="status-dot" aria-hidden="true" />
      <span>
        {t(project.status)}
        {project.statusCheckedAt && <span className="status-date"> · {t(checkedOn(project.statusCheckedAt))}</span>}
      </span>
    </span>
  )
}

export function LinkList({ links }: { links: LinkItem[] }) {
  const { t } = useLang()
  return (
    <ul className="link-list">
      {links.map((link) => (
        <li key={link.href}>
          <SmartLink href={link.href}>{t(link.label)}</SmartLink>
        </li>
      ))}
    </ul>
  )
}
