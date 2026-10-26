import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { themeInitScript } from '@/lib/theme'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { Background3D } from '@/components/shell/Background3D'
import { Nav } from '@/components/shell/Nav'
import { Footer } from '@/components/shell/Footer'
import { YEARS, getFeatured } from '@/content'
import { projectName } from '@/content/select'

export const metadata: Metadata = {
  title: '허준영 | Portfolio',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='24' font-size='24'>💻</text></svg>",
  },
}

export default function RootLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <Background3D />
            <Nav years={YEARS} cases={getFeatured().map((p) => ({ slug: p.slug, name: projectName(p) }))} />
            {children}
            <Footer />
            {modal}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
