'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import { StackList } from '@/components/common/bits'
import type { Profile } from '@/content/types'
import { HOME_IDS, UI } from '@/content/ui'

export function Intro({ profile }: { profile: Profile }) {
  const { t } = useLang()
  const github = profile.contacts.find((c) => c.kind === 'github')
  const blog = profile.contacts.find((c) => c.kind === 'blog')
  return (
    <section className="intro" aria-labelledby="intro-name">
      <div className="wrap">
        <div className="intro-id">
          {profile.photo && <img className="intro-photo" src={profile.photo} alt={t(UI.photoAlt)} width={64} height={64} />}
          <div>
            <h1 id="intro-name" className="intro-name">
              {t(profile.name)}
            </h1>
            <p className="intro-role">{t(profile.role)}</p>
          </div>
        </div>
        <p className="intro-quote">{t(profile.quote)}</p>
        <p className="intro-text">{t(profile.intro)}</p>
        <StackList items={profile.coreStack} label={UI.stack} />
        <div className="actions">
          <a href={`#${HOME_IDS.flagship}`} className="btn btn-primary">
            {t(UI.ctaProjects)} <span aria-hidden="true">↓</span>
          </a>
          <Link href="/resume" className="btn">
            {t(UI.ctaResume)}
          </Link>
          {github && (
            <a href={github.href} className="btn" target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          )}
          {blog && (
            <a href={blog.href} className="btn" target="_blank" rel="noopener noreferrer">
              {t(UI.blog)} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
