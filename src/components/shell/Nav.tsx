'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '@/components/providers/LanguageProvider'
import { useTheme } from '@/components/providers/ThemeProvider'
import type { L, Year } from '@/content/types'
import { NAV_LABELS, UI } from '@/content/ui'

type NavProps = { years: Year[]; cases: { slug: string; name: L }[] }
type GroupId = 'journey' | 'cases'
type Item = { href: string; label: string }

export function Nav({ years, cases }: NavProps) {
  const { lang, setLang, t } = useLang()
  const { theme, toggleTheme } = useTheme()
  const [openGroup, setOpenGroup] = useState<GroupId | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // A disclosure menu closes on Escape or on a click anywhere outside the nav.
  useEffect(() => {
    if (!openGroup) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpenGroup(null)
    const onPointer = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenGroup(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
    }
  }, [openGroup])

  const groups: { id: GroupId; label: L; items: Item[] }[] = [
    {
      id: 'journey',
      label: NAV_LABELS.journey,
      items: [{ href: '/#journey', label: t(NAV_LABELS.journeyAll) }, ...years.map((year) => ({ href: `/journey/${year}`, label: String(year) }))],
    },
    {
      id: 'cases',
      label: NAV_LABELS.cases,
      items: [
        { href: '/#cases', label: t(NAV_LABELS.casesAll) },
        ...cases.map((item) => ({ href: `/projects/${item.slug}`, label: t(item.name) })),
      ],
    },
  ]
  const direct: Item[] = [
    { href: '/#archive', label: t(NAV_LABELS.archive) },
    { href: '/#contact', label: t(NAV_LABELS.contact) },
  ]

  const closeAll = () => {
    setOpenGroup(null)
    setMobileOpen(false)
  }

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        <Link href="/" className="nav-logo gradient-text" onClick={closeAll}>
          JY.DEV
        </Link>
        <ul className="nav-links">
          {groups.map((group) => (
            <li key={group.id} className="nav-dropdown">
              <button
                className="nav-trigger"
                aria-expanded={openGroup === group.id}
                aria-controls={`nav-${group.id}`}
                onClick={() => setOpenGroup((open) => (open === group.id ? null : group.id))}
              >
                {t(group.label)} <span aria-hidden="true">▾</span>
              </button>
              {openGroup === group.id && (
                <ul id={`nav-${group.id}`} className="glass nav-menu" aria-label={t(group.label)}>
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={closeAll}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          {direct.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={closeAll}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="toggle-btn" onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}>
            {lang === 'ko' ? 'EN' : 'KO'}
          </button>
          <button className="toggle-btn" aria-label={t(UI.themeToggle)} onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            className="hamburger"
            aria-label={t(UI.menu)}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            data-testid="nav-mobile"
            className="nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {groups.map((group) => (
              <div key={group.id} className="nav-mobile-group">
                <p className="nav-mobile-title">{t(group.label)}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={closeAll}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <ul>
              {direct.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={closeAll}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
