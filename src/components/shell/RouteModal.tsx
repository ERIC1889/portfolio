'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, type ReactNode } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import type { L } from '@/content/types'
import { UI } from '@/content/ui'

/**
 * Popup for an intercepted route (@modal slot). Closing goes back in history,
 * so the URL, the back button and the popup always agree.
 */
export function RouteModal({ label, children }: { label: L; children: ReactNode }) {
  const router = useRouter()
  const { t } = useLang()
  const closeRef = useRef<HTMLButtonElement>(null)

  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'

    // Everything else on the page sits behind the popup: keep focus and clicks out of it.
    let ownBranch: Element | null = overlayRef.current
    while (ownBranch?.parentElement && ownBranch.parentElement !== document.body) ownBranch = ownBranch.parentElement
    const behind = Array.from(document.body.children).filter(
      (el) => el !== ownBranch && !el.hasAttribute('inert') && el.tagName !== 'SCRIPT' && el.tagName !== 'NEXT-ROUTE-ANNOUNCER',
    )
    behind.forEach((el) => el.setAttribute('inert', ''))

    // preventScroll: a #card target scrolled into view must stay in view.
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') router.back()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
      behind.forEach((el) => el.removeAttribute('inert'))
      previousFocus?.focus({ preventScroll: true })
    }
  }, [router])

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      data-testid="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) router.back()
      }}
    >
      {/* The frame holds the close button; only the inner area scrolls, so × never scrolls away. */}
      <div className="modal-body modal-wide" role="dialog" aria-modal="true" aria-label={t(label)}>
        <button ref={closeRef} className="modal-close" aria-label={t(UI.close)} onClick={() => router.back()}>
          ×
        </button>
        <div className="modal-scroll">{children}</div>
      </div>
    </div>
  )
}
