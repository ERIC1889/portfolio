'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * soft    — client navigation; links to /projects or /journey open as a popup
 * replace — client navigation that swaps the open popup instead of stacking history
 * hard    — full page load, used on full pages so their own prev/next stay full pages
 */
export type LinkMode = 'soft' | 'replace' | 'hard'

export function NavLink({ href, mode = 'soft', className, children }: { href: string; mode?: LinkMode; className?: string; children: ReactNode }) {
  if (mode === 'hard') {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} replace={mode === 'replace'} className={className}>
      {children}
    </Link>
  )
}
