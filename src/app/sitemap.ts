import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export const revalidate = 0 // Ensures the sitemap is always fresh

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.coriyon.com'

  // Fetch all published project slugs and published pages from Supabase
  const [{ data: projects }, { data: pages }] = await Promise.all([
    supabase.from('projects').select('slug, updated_at').eq('status', 'published'),
    supabase.from('pages').select('slug, updated_at').eq('status', 'published')
  ])

  const locales = ['en', 'es']
  
  // Define core static routes based on our new site architecture
  const coreRoutes = [
    '', 
    '/projects', 
    '/about', 
    '/services', 
    '/playground', 
    '/blog', 
    '/chat'
  ]

  // 1. Generate URLs for core marketing pages in both languages
  const staticRoutes = locales.flatMap((locale) => 
    coreRoutes.map((route) => {
      // Find matching page in DB for lastModified date, fallback to current date
      const pageSlug = route === '' ? 'home' : route.replace('/', '')
      const pageData = pages?.find(p => p.slug === pageSlug)
      
      return {
        url: `${baseUrl}/${locale}${route}`,
        lastModified: pageData?.updated_at ? new Date(pageData.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.9,
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

  return [...staticRoutes, ...projectRoutes]
}