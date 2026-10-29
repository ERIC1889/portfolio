import type { MetadataRoute } from 'next'
import { SITE_URL, getFeatured } from '@/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', ...getFeatured().map((project) => `/projects/${project.slug}`), '/story', '/archive', '/resume']
  return paths.map((path) => ({ url: `${SITE_URL}${path === '/' ? '' : path}` }))
}
