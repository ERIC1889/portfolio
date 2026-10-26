import { notFound } from 'next/navigation'
import { CaseStudy } from '@/components/case/CaseStudy'
import { RouteModal } from '@/components/shell/RouteModal'
import { getFeatured } from '@/content'
import { projectName } from '@/content/select'
import { getCasePage } from '../../../_lib/pages'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getFeatured().map((project) => ({ slug: project.slug }))
}

export default async function CaseModal({ params }: Props) {
  const page = getCasePage((await params).slug)
  if (!page) notFound()
  return (
    <RouteModal label={projectName(page.project)}>
      <CaseStudy project={page.project} prev={page.prev} next={page.next} variant="modal" />
    </RouteModal>
  )
}
