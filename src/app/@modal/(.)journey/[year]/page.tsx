import { notFound } from 'next/navigation'
import { YearChapter } from '@/components/journey/YearChapter'
import { RouteModal } from '@/components/shell/RouteModal'
import { YEARS } from '@/content'
import { getYearPage } from '../../../_lib/pages'

type Props = { params: Promise<{ year: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return YEARS.map((year) => ({ year: String(year) }))
}

export default async function YearModal({ params }: Props) {
  const page = getYearPage((await params).year)
  if (!page) notFound()
  const { year, name } = page.chapter
  return (
    <RouteModal label={{ ko: `${year} ${name.ko}`, en: `${year} ${name.en || name.ko}` }}>
      <YearChapter years={YEARS} {...page} variant="modal" />
    </RouteModal>
  )
}
