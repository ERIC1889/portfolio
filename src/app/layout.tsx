import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { DEFAULT_THEME, themeInitScript } from '@/lib/theme'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { Nav } from '@/components/shell/Nav'
import { Footer } from '@/components/shell/Footer'
import { SITE_URL, archive, profile } from '@/content'
import { pageMetadata } from './_lib/pages'

const TITLE = '허준영 | 백엔드 중심 풀스택 개발자'
const DESCRIPTION = '허준영 · 백엔드 중심 풀스택 개발자. 수지하우스 부동산 세금 비교, SkillPilot, ClosetMate.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/' }),
  title: { default: TITLE, template: '%s — 허준영' },
}

const sameAs = profile.contacts.filter((c) => c.href.startsWith('https://')).map((c) => c.href)

const PERSON = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name.ko,
  alternateName: profile.name.en,
  jobTitle: '백엔드 중심 풀스택 개발자',
  url: SITE_URL,
  email: 'mailto:eric1889@naver.com',
  sameAs,
  alumniOf: { '@type': 'CollegeOrUniversity', name: archive.education.school.ko },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Noto+Sans+KR:wght@400;500;700&display=swap"
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <Nav />
            {children}
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
