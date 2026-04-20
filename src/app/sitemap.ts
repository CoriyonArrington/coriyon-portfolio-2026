import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export const revalidate = 0 // Ensures the sitemap is always fresh

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://coriyon.studio'

  // Fetch all published project slugs and published pages from Supabase
  const [{ data: projects }, { data: pages }] = await Promise.all([
    supabase.from('projects').select('slug, updated_at').eq('status', 'published'),
    supabase.from('pages').select('slug, updated_at').eq('status', 'PUBLISHED')
  ])

  const locales = ['en', 'es']

  // 1. Generate URLs dynamically for ALL published pages in the database
  const pageRoutes = (pages || []).flatMap((page) => 
    locales.map((locale) => {
      // Map 'home' to the root path, otherwise prefix with a slash
      const route = page.slug === 'home' ? '' : `/${page.slug}`
      
      return {
        url: `${baseUrl}/${locale}${route}`,
        lastModified: page.updated_at ? new Date(page.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: page.slug === 'home' ? 1.0 : 0.9,
      }
    })
  )

  // 2. Generate URLs for individual project case studies in both languages
  const projectRoutes = (projects || []).flatMap((project) => 
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/projects/${project.slug}`,
      lastModified: project.updated_at ? new Date(project.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  return [...pageRoutes, ...projectRoutes]
}