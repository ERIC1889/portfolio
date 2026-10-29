import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CaseStudy } from '@/components/case/CaseStudy'
import { getFeatured, getProject } from '@/content'
import { projectTitle } from '@/content/select'
import { getCasePage, pageMetadata } from '../../_lib/pages'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getFeatured().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return pageMetadata({
    title: projectTitle(project).ko,
    description: (project.product ?? project.summary).ko,
    path: `/projects/${slug}`,
  })
}

export default async function ProjectPage({ params }: Props) {
  const page = getCasePage((await params).slug)
  if (!page) notFound()
  return <CaseStudy project={page.project} prev={page.prev} next={page.next} />
}
