'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import type { Scene } from '@/content/types'
import { UI } from '@/content/ui'

/** The two diff lines: "- constraint" and "+ what I did", with screen-reader labels. */
export function DiffLines({ scene }: { scene: Scene }) {
  const { t } = useLang()
  return (
    <>
      <p className="diff-line diff-minus">
        <span className="mono diff-sign" aria-hidden="true">
          -
        </span>{' '}
        <span className="sr-only">{t(UI.constraint)}: </span>
        <span>{t(scene.minus)}</span>
      </p>
      <p className="diff-line diff-plus">
        <span className="mono diff-sign" aria-hidden="true">
          +
        </span>{' '}
        <span className="sr-only">{t(UI.whatIDid)}: </span>
        <span>{t(scene.plus)}</span>
      </p>
    </>
  )
}

type DiffBlockProps = { hunk: string; scene: Scene; href?: string }

export function DiffBlock({ hunk, scene, href }: DiffBlockProps) {
  const block = (
    <div className="glass diff-block">
      <div className="mono diff-hunk">@@ {hunk} @@</div>
      <DiffLines scene={scene} />
    </div>
  )

  if (!href) return block
  return (
    <Link href={href} className="diff-link">
      {block}
    </Link>
  )
}
