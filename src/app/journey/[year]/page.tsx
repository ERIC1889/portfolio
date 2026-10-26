import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { YearChapter } from '@/components/journey/YearChapter'
import { YEARS } from '@/content'
import { getYearPage } from '../../_lib/pages'

type Props = { params: Promise<{ year: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return YEARS.map((year) => ({ year: String(year) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getYearPage((await params).year)
  if (!page) return {}
  const title = `${page.chapter.year} ${page.chapter.name.ko} — 허준영`
  return { title, description: page.chapter.lesson.ko, openGraph: { title, description: page.chapter.lesson.ko } }
}

// A direct visit or refresh shows the full page; clicks inside the site open @modal/(.)journey instead.
export default async function JourneyPage({ params }: Props) {
  const page = getYearPage((await params).year)
  if (!page) notFound()
  return <YearChapter years={YEARS} {...page} />
}
